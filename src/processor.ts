import { saveBought, saveCreated, saveFinished, savePaused, saveRewardsClaimed, saveUnpaused } from './transformers'
import { LogContext, database, processor } from './configs'
import { GameCreatedT, SectorsBoughtT, GameFinishedT, RewardClaimedT, PausedT, UnPausedT } from './events'
import { LogEvent } from './abi/generated/abi.support'
import { BlockData } from '@subsquid/evm-processor'

const hasIn = (item: LogContext, topic: string) => item.topics.indexOf(topic) !== -1

type IBlockData = BlockData<{
  log: {
    topics: true
    data: true
  }
  transaction: {
    input: true
    hash: true
    from: true
  }
}>

function handler<T>(block: IBlockData, ctx: LogContext, log: LogEvent<T>) {
  const decoded = log.decode(ctx)
  return { e: decoded, event: ctx, block: block.header }
}

processor.run(database, async (ctx) => {
  const gamesCreated = []
  const sectorsBought = []
  const rewardsClaimed = []
  const gamesFinished = []
  const paused = []
  const unpaused = []

  for (const block of ctx.blocks) {
    for (const item of block.logs) {
      const logCtx: LogContext = {
        ...item,
        ...block,
      }
      if (hasIn(logCtx, GameCreatedT.topic)) {
        gamesCreated.push(handler(block, logCtx, GameCreatedT))
      }

      if (hasIn(logCtx, SectorsBoughtT.topic)) {
        sectorsBought.push(handler(block, logCtx, SectorsBoughtT))
      }

      if (hasIn(logCtx, RewardClaimedT.topic)) {
        rewardsClaimed.push(handler(block, logCtx, RewardClaimedT))
      }

      if (hasIn(logCtx, GameFinishedT.topic)) {
        gamesFinished.push(handler(block, logCtx, GameFinishedT))
      }

      if (hasIn(logCtx, PausedT.topic)) {
        paused.push(handler(block, logCtx, PausedT))
      }

      if (hasIn(logCtx, UnPausedT.topic)) {
        unpaused.push(handler(block, logCtx, UnPausedT))
      }
    }
  }

  await saveFinished(ctx, gamesFinished)

  await saveCreated(ctx, gamesCreated)

  await saveBought(ctx, sectorsBought)

  await saveRewardsClaimed(ctx, rewardsClaimed)

  await savePaused(ctx, paused)

  await saveUnpaused(ctx, unpaused)
})
