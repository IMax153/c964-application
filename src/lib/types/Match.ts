import type { Integer } from '../decoders'

export interface Match {
  readonly gameId: number
  readonly platformId: string
  readonly gameCreation: number
  readonly gameDuration: number
  readonly queueId: number
  readonly mapId: number
  readonly seasonId: number
  readonly gameVersion: string
  readonly gameMode: string
  readonly gameType: string

  readonly 'participant1.player.platformId': string
  readonly 'participant2.player.platformId': string
  readonly 'participant3.player.platformId': string
  readonly 'participant4.player.platformId': string
  readonly 'participant5.player.platformId': string
  readonly 'participant6.player.platformId': string
  readonly 'participant7.player.platformId': string
  readonly 'participant8.player.platformId': string
  readonly 'participant9.player.platformId': string
  readonly 'participant10.player.platformId': string

  readonly 'participant1.player.currentPlatformId': string
  readonly 'participant2.player.currentPlatformId': string
  readonly 'participant3.player.currentPlatformId': string
  readonly 'participant4.player.currentPlatformId': string
  readonly 'participant5.player.currentPlatformId': string
  readonly 'participant6.player.currentPlatformId': string
  readonly 'participant7.player.currentPlatformId': string
  readonly 'participant8.player.currentPlatformId': string
  readonly 'participant9.player.currentPlatformId': string
  readonly 'participant10.player.currentPlatformId': string

  readonly 'participant1.player.summonerName': string
  readonly 'participant2.player.summonerName': string
  readonly 'participant3.player.summonerName': string
  readonly 'participant4.player.summonerName': string
  readonly 'participant5.player.summonerName': string
  readonly 'participant6.player.summonerName': string
  readonly 'participant7.player.summonerName': string
  readonly 'participant8.player.summonerName': string
  readonly 'participant9.player.summonerName': string
  readonly 'participant10.player.summonerName': string

  readonly 'participant1.player.profileIcon': number
  readonly 'participant2.player.profileIcon': number
  readonly 'participant3.player.profileIcon': number
  readonly 'participant4.player.profileIcon': number
  readonly 'participant5.player.profileIcon': number
  readonly 'participant6.player.profileIcon': number
  readonly 'participant7.player.profileIcon': number
  readonly 'participant8.player.profileIcon': number
  readonly 'participant9.player.profileIcon': number
  readonly 'participant10.player.profileIcon': number

  // Red Team
  readonly 'participant1.teamId': number
  readonly 'participant2.teamId': number
  readonly 'participant3.teamId': number
  readonly 'participant4.teamId': number
  readonly 'participant5.teamId': number

  // Blue Team
  readonly 'participant6.teamId': number
  readonly 'participant7.teamId': number
  readonly 'participant8.teamId': number
  readonly 'participant9.teamId': number
  readonly 'participant10.teamId': number

  readonly 'participant1.championId': Integer
  readonly 'participant2.championId': Integer
  readonly 'participant3.championId': Integer
  readonly 'participant4.championId': Integer
  readonly 'participant5.championId': Integer
  readonly 'participant6.championId': Integer
  readonly 'participant7.championId': Integer
  readonly 'participant8.championId': Integer
  readonly 'participant9.championId': Integer
  readonly 'participant10.championId': Integer

  readonly 'participant1.spell1Id': Integer
  readonly 'participant2.spell1Id': Integer
  readonly 'participant3.spell1Id': Integer
  readonly 'participant4.spell1Id': Integer
  readonly 'participant5.spell1Id': Integer
  readonly 'participant6.spell1Id': Integer
  readonly 'participant7.spell1Id': Integer
  readonly 'participant8.spell1Id': Integer
  readonly 'participant9.spell1Id': Integer
  readonly 'participant10.spell1Id': Integer

  readonly 'participant1.spell2Id': Integer
  readonly 'participant2.spell2Id': Integer
  readonly 'participant3.spell2Id': Integer
  readonly 'participant4.spell2Id': Integer
  readonly 'participant5.spell2Id': Integer
  readonly 'participant6.spell2Id': Integer
  readonly 'participant7.spell2Id': Integer
  readonly 'participant8.spell2Id': Integer
  readonly 'participant9.spell2Id': Integer
  readonly 'participant10.spell2Id': Integer

  readonly 'banned1.championId': Integer
  readonly 'banned2.championId': Integer
  readonly 'banned3.championId': Integer
  readonly 'banned4.championId': Integer
  readonly 'banned5.championId': Integer
  readonly 'banned6.championId': Integer
  readonly 'banned7.championId': Integer
  readonly 'banned8.championId': Integer
  readonly 'banned9.championId': Integer
  readonly 'banned10.championId': Integer

  readonly 'participant1.championSpecificWinRate': number
  readonly 'participant2.championSpecificWinRate': number
  readonly 'participant3.championSpecificWinRate': number
  readonly 'participant4.championSpecificWinRate': number
  readonly 'participant5.championSpecificWinRate': number
  readonly 'participant6.championSpecificWinRate': number
  readonly 'participant7.championSpecificWinRate': number
  readonly 'participant8.championSpecificWinRate': number
  readonly 'participant9.championSpecificWinRate': number
  readonly 'participant10.championSpecificWinRate': number
}
