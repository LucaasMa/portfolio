import { createServerFn } from '@tanstack/react-start'

export interface RankedEntry {
  queueType: string
  tier: string
  rank: string
  leaguePoints: number
  wins: number
  losses: number
}

export interface MatchInfo {
  matchId: string
  championName: string
  kills: number
  deaths: number
  assists: number
  cs: number
  win: boolean
  gameMode: string
  gameDuration: number
}

export interface SummonerProfile {
  gameName: string
  tagLine: string
  puuid: string
  summonerLevel: number
  profileIconId: number
  ranked: RankedEntry[]
  matches: MatchInfo[]
}

const getRegionalRoute = (platformRegion: string): string => {
  const americasRegions = ['na1', 'br1', 'la1', 'la2']
  const asiaRegions = ['kr', 'jp1']
  const seaRegions = ['oc1', 'ph2', 'sg2', 'th2', 'tw2', 'vn2']

  if (americasRegions.includes(platformRegion)) return 'americas'
  if (asiaRegions.includes(platformRegion)) return 'asia'
  if (seaRegions.includes(platformRegion)) return 'sea'
  return 'europe'
}

export const fetchSummonerData = createServerFn({ method: 'GET' })
  .inputValidator((data: { gameName: string; tagLine: string; region: string }) => data)
  .handler(async ({ data }): Promise<SummonerProfile> => {
    const apiKey = process.env.RIOT_API_KEY

    if (!apiKey) {
      throw new Error('Riot API key not configured. Please add RIOT_API_KEY to your environment variables.')
    }

    const { gameName, tagLine, region } = data
    const regionalRoute = getRegionalRoute(region)

    // Step 1: Get account by Riot ID (gameName#tagLine)
    const accountResponse = await fetch(
      `https://${regionalRoute}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      {
        headers: { 'X-Riot-Token': apiKey },
      }
    )

    if (!accountResponse.ok) {
      if (accountResponse.status === 404) {
        throw new Error('Summoner not found. Please check the game name and tag.')
      }
      throw new Error(`Failed to fetch account: ${accountResponse.statusText}`)
    }

    const accountData = await accountResponse.json()
    const { puuid } = accountData

    // Step 2: Get summoner data by PUUID
    const summonerResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      {
        headers: { 'X-Riot-Token': apiKey },
      }
    )

    if (!summonerResponse.ok) {
      throw new Error(`Failed to fetch summoner data: ${summonerResponse.statusText}`)
    }

    const summonerData = await summonerResponse.json()

    // Step 3: Get ranked data
    const rankedResponse = await fetch(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}`,
      {
        headers: { 'X-Riot-Token': apiKey },
      }
    )

    let rankedData: RankedEntry[] = []
    if (rankedResponse.ok) {
      const rawRanked = await rankedResponse.json()
      rankedData = rawRanked.map((entry: Record<string, unknown>) => ({
        queueType: entry.queueType,
        tier: entry.tier,
        rank: entry.rank,
        leaguePoints: entry.leaguePoints,
        wins: entry.wins,
        losses: entry.losses,
      }))
    }

    // Step 4: Get match history
    const matchListResponse = await fetch(
      `https://${regionalRoute}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
      {
        headers: { 'X-Riot-Token': apiKey },
      }
    )

    let matches: MatchInfo[] = []
    if (matchListResponse.ok) {
      const matchIds = await matchListResponse.json()

      // Fetch details for each match (limit to 5 to avoid rate limiting)
      const matchPromises = matchIds.slice(0, 5).map(async (matchId: string) => {
        const matchResponse = await fetch(
          `https://${regionalRoute}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
          {
            headers: { 'X-Riot-Token': apiKey },
          }
        )

        if (!matchResponse.ok) return null

        const matchData = await matchResponse.json()
        const participant = matchData.info.participants.find(
          (p: Record<string, unknown>) => p.puuid === puuid
        )

        if (!participant) return null

        return {
          matchId,
          championName: participant.championName,
          kills: participant.kills,
          deaths: participant.deaths,
          assists: participant.assists,
          cs: participant.totalMinionsKilled + participant.neutralMinionsKilled,
          win: participant.win,
          gameMode: matchData.info.gameMode,
          gameDuration: matchData.info.gameDuration,
        } satisfies MatchInfo
      })

      const matchResults = await Promise.all(matchPromises)
      matches = matchResults.filter((m): m is MatchInfo => m !== null)
    }

    return {
      gameName: accountData.gameName,
      tagLine: accountData.tagLine,
      puuid,
      summonerLevel: summonerData.summonerLevel,
      profileIconId: summonerData.profileIconId,
      ranked: rankedData,
      matches,
    }
  })
