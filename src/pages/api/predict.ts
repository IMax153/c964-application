import { now } from 'fp-ts/Date'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as TD from 'io-ts/TaskDecoder'

import { MatchData, Predictions } from '../../lib/decoders'
import { request } from '../../lib/remote'
import { withSession } from '../../lib/session'

export default withSession<unknown>(async (req, res) => {
  try {
    const decoded = await pipe(
      TE.of<string, unknown>(req.body),
      TE.bindTo('body'),
      TE.bind('now', () => TE.fromIO<string, number>(now)),
      TE.bind('data', ({ body }) => pipe(MatchData.decode(body), TE.mapLeft(TD.draw))),
      TE.map(({ data, now }) => ({
        // Defaulted since they are note a part of the neural network but
        // are required by the model API
        gameId: 1111111111,
        platformId: 'NA1',
        gameCreation: now,
        gameDuration: 0,
        queueId: 0,
        mapId: 0,
        seasonId: 0,
        gameVersion: '10.10.100.1000',
        gameMode: 'CLASSIC',
        gameType: 'MATCHED_GAME',

        'participant1.player.platformId': 'NA1',
        'participant2.player.platformId': 'NA1',
        'participant3.player.platformId': 'NA1',
        'participant4.player.platformId': 'NA1',
        'participant5.player.platformId': 'NA1',
        'participant6.player.platformId': 'NA1',
        'participant7.player.platformId': 'NA1',
        'participant8.player.platformId': 'NA1',
        'participant9.player.platformId': 'NA1',
        'participant10.player.platformId': 'NA1',

        'participant1.player.currentPlatformId': 'NA1',
        'participant2.player.currentPlatformId': 'NA1',
        'participant3.player.currentPlatformId': 'NA1',
        'participant4.player.currentPlatformId': 'NA1',
        'participant5.player.currentPlatformId': 'NA1',
        'participant6.player.currentPlatformId': 'NA1',
        'participant7.player.currentPlatformId': 'NA1',
        'participant8.player.currentPlatformId': 'NA1',
        'participant9.player.currentPlatformId': 'NA1',
        'participant10.player.currentPlatformId': 'NA1',

        'participant1.player.summonerName': '1',
        'participant2.player.summonerName': '1',
        'participant3.player.summonerName': '1',
        'participant4.player.summonerName': '1',
        'participant5.player.summonerName': '1',
        'participant6.player.summonerName': '1',
        'participant7.player.summonerName': '1',
        'participant8.player.summonerName': '1',
        'participant9.player.summonerName': '1',
        'participant10.player.summonerName': '1',

        'participant1.player.profileIcon': 1,
        'participant2.player.profileIcon': 1,
        'participant3.player.profileIcon': 1,
        'participant4.player.profileIcon': 1,
        'participant5.player.profileIcon': 1,
        'participant6.player.profileIcon': 1,
        'participant7.player.profileIcon': 1,
        'participant8.player.profileIcon': 1,
        'participant9.player.profileIcon': 1,
        'participant10.player.profileIcon': 1,

        // Red Team
        'participant1.teamId': 200,
        'participant2.teamId': 200,
        'participant3.teamId': 200,
        'participant4.teamId': 200,
        'participant5.teamId': 200,

        // Blue Team
        'participant6.teamId': 100,
        'participant7.teamId': 100,
        'participant8.teamId': 100,
        'participant9.teamId': 100,
        'participant10.teamId': 100,

        'participant1.championId': data.participant1.champion,
        'participant2.championId': data.participant2.champion,
        'participant3.championId': data.participant3.champion,
        'participant4.championId': data.participant4.champion,
        'participant5.championId': data.participant5.champion,
        'participant6.championId': data.participant6.champion,
        'participant7.championId': data.participant7.champion,
        'participant8.championId': data.participant8.champion,
        'participant9.championId': data.participant9.champion,
        'participant10.championId': data.participant10.champion,

        'participant1.spell1Id': data.participant1.spell1,
        'participant2.spell1Id': data.participant2.spell1,
        'participant3.spell1Id': data.participant3.spell1,
        'participant4.spell1Id': data.participant4.spell1,
        'participant5.spell1Id': data.participant5.spell1,
        'participant6.spell1Id': data.participant6.spell1,
        'participant7.spell1Id': data.participant7.spell1,
        'participant8.spell1Id': data.participant8.spell1,
        'participant9.spell1Id': data.participant9.spell1,
        'participant10.spell1Id': data.participant10.spell1,

        'participant1.spell2Id': data.participant1.spell2,
        'participant2.spell2Id': data.participant2.spell2,
        'participant3.spell2Id': data.participant3.spell2,
        'participant4.spell2Id': data.participant4.spell2,
        'participant5.spell2Id': data.participant5.spell2,
        'participant6.spell2Id': data.participant6.spell2,
        'participant7.spell2Id': data.participant7.spell2,
        'participant8.spell2Id': data.participant8.spell2,
        'participant9.spell2Id': data.participant9.spell2,
        'participant10.spell2Id': data.participant10.spell2,

        'banned1.championId': data.banned1.champion,
        'banned2.championId': data.banned2.champion,
        'banned3.championId': data.banned3.champion,
        'banned4.championId': data.banned4.champion,
        'banned5.championId': data.banned5.champion,
        'banned6.championId': data.banned6.champion,
        'banned7.championId': data.banned7.champion,
        'banned8.championId': data.banned8.champion,
        'banned9.championId': data.banned9.champion,
        'banned10.championId': data.banned10.champion,

        'participant1.championSpecificWinRate': data.participant1.championSpecificWinRate,
        'participant2.championSpecificWinRate': data.participant2.championSpecificWinRate,
        'participant3.championSpecificWinRate': data.participant3.championSpecificWinRate,
        'participant4.championSpecificWinRate': data.participant4.championSpecificWinRate,
        'participant5.championSpecificWinRate': data.participant5.championSpecificWinRate,
        'participant6.championSpecificWinRate': data.participant6.championSpecificWinRate,
        'participant7.championSpecificWinRate': data.participant7.championSpecificWinRate,
        'participant8.championSpecificWinRate': data.participant8.championSpecificWinRate,
        'participant9.championSpecificWinRate': data.participant9.championSpecificWinRate,
        'participant10.championSpecificWinRate': data.participant10.championSpecificWinRate
      })),
      TE.map((obj) =>
        Object.entries(obj).reduce((acc, [key, value]) => ({ ...acc, [key]: [value] }), {})
      )
    )()

    if (E.isLeft(decoded)) {
      res.status(400).json({ message: 'Failed to decode input' })
    } else {
      const body = {
        signature_name: 'serving_default',
        instances: [decoded.right]
      }

      const predictions = await request(process.env.API_URL, {
        method: 'POST',
        body: JSON.stringify(body)
      })

      const predictedWinner = Predictions.decode(predictions)

      if (E.isLeft(predictedWinner)) {
        res.status(400).json({ message: 'Bad prediction' })
      } else {
        res.status(200).json(predictedWinner.right)
      }
    }
  } catch (e) {
    res.status(400).json({ message: 'Internal server error' })
  }
})
