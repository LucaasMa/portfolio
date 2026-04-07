import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Search, Trophy, Gamepad2, Target, Loader2 } from 'lucide-react'
import { fetchSummonerData } from '../services/riot-api'
import type { SummonerProfile } from '../services/riot-api'

export const Route = createFileRoute('/lol')({
  component: LoLPage,
})

const REGIONS = [
  { value: 'br1', label: 'Brazil (BR)' },
  { value: 'euw1', label: 'Europe West (EUW)' },
  { value: 'eune1', label: 'Europe Nordic & East (EUNE)' },
  { value: 'na1', label: 'North America (NA)' },
  { value: 'kr', label: 'Korea (KR)' },
  { value: 'jp1', label: 'Japan (JP)' },
  { value: 'la1', label: 'Latin America North (LAN)' },
  { value: 'la2', label: 'Latin America South (LAS)' },
  { value: 'oc1', label: 'Oceania (OCE)' },
  { value: 'tr1', label: 'Turkey (TR)' },
  { value: 'ru', label: 'Russia (RU)' },
] as const

function LoLPage() {
  const [gameName, setGameName] = useState('')
  const [tagLine, setTagLine] = useState('')
  const [region, setRegion] = useState('br1')
  const [profile, setProfile] = useState<SummonerProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameName.trim() || !tagLine.trim()) return

    setLoading(true)
    setError(null)
    setProfile(null)

    try {
      const data = await fetchSummonerData({
        data: { gameName: gameName.trim(), tagLine: tagLine.trim(), region },
      })
      setProfile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch summoner data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            League of Legends Lookup
          </h1>
          <p className="text-gray-400 text-lg">
            Search for any summoner to see their stats, rank, and recent matches
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="gameName" className="block text-sm text-gray-400 mb-2">
                Game Name
              </label>
              <input
                type="text"
                id="gameName"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Faker"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="w-full md:w-32">
              <label htmlFor="tagLine" className="block text-sm text-gray-400 mb-2">
                Tag
              </label>
              <input
                type="text"
                id="tagLine"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                placeholder="KR1"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="region" className="block text-sm text-gray-400 mb-2">
                Region
              </label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                {REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !gameName.trim() || !tagLine.trim()}
            className="mt-4 w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search Summoner
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}

        {profile && (
          <div className="space-y-8">
            <SummonerCard profile={profile} />
            <RankedInfo rankedData={profile.ranked} />
            <MatchHistory matches={profile.matches} />
          </div>
        )}
      </div>
    </div>
  )
}

function SummonerCard({ profile }: { profile: SummonerProfile }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${profile.profileIconId}.png`}
            alt="Profile Icon"
            className="w-24 h-24 rounded-xl border-2 border-cyan-500"
          />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-sm text-cyan-400 font-semibold">
            {profile.summonerLevel}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {profile.gameName}
            <span className="text-gray-500">#{profile.tagLine}</span>
          </h2>
          <p className="text-gray-400">Level {profile.summonerLevel}</p>
        </div>
      </div>
    </div>
  )
}

function RankedInfo({ rankedData }: { rankedData: SummonerProfile['ranked'] }) {
  if (!rankedData || rankedData.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Ranked Stats
        </h3>
        <p className="text-gray-400">No ranked data available for this season.</p>
      </div>
    )
  }

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      IRON: 'text-gray-400',
      BRONZE: 'text-amber-700',
      SILVER: 'text-gray-300',
      GOLD: 'text-yellow-500',
      PLATINUM: 'text-emerald-400',
      EMERALD: 'text-emerald-500',
      DIAMOND: 'text-cyan-400',
      MASTER: 'text-purple-400',
      GRANDMASTER: 'text-red-400',
      CHALLENGER: 'text-yellow-300',
    }
    return colors[tier] || 'text-white'
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Ranked Stats
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {rankedData.map((queue) => (
          <div
            key={queue.queueType}
            className="bg-slate-900 border border-slate-700 rounded-lg p-4"
          >
            <p className="text-sm text-gray-400 mb-2">
              {queue.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo/Duo' : 'Ranked Flex'}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${queue.tier.toLowerCase()}.svg`}
                alt={queue.tier}
                className="w-12 h-12"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <div>
                <p className={`text-lg font-bold ${getTierColor(queue.tier)}`}>
                  {queue.tier} {queue.rank}
                </p>
                <p className="text-cyan-400 font-semibold">{queue.leaguePoints} LP</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="text-green-400">{queue.wins}W</span>
              <span className="text-red-400">{queue.losses}L</span>
              <span className="text-gray-400">
                {((queue.wins / (queue.wins + queue.losses)) * 100).toFixed(1)}% WR
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MatchHistory({ matches }: { matches: SummonerProfile['matches'] }) {
  if (!matches || matches.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-purple-500" />
          Recent Matches
        </h3>
        <p className="text-gray-400">No recent matches found.</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5 text-purple-500" />
        Recent Matches
      </h3>
      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.matchId}
            className={`p-4 rounded-lg border ${
              match.win
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${match.championName}.png`}
                alt={match.championName}
                className="w-12 h-12 rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Aatrox.png'
                }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{match.championName}</span>
                  <span
                    className={`text-sm px-2 py-0.5 rounded ${
                      match.win ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {match.win ? 'Victory' : 'Defeat'}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{match.gameMode}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-white font-semibold">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-green-400">{match.kills}</span>/
                  <span className="text-red-400">{match.deaths}</span>/
                  <span className="text-cyan-400">{match.assists}</span>
                </div>
                <p className="text-sm text-gray-400">
                  {match.cs} CS • {Math.round(match.gameDuration / 60)}m
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
