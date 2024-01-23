import {
  saveBought,
  saveCreated,
  saveFinished,
  saveInitialized,
} from './transformers'
import { IBlockHeader, LogContext, database, processor } from './configs'
import {
  GameCreatedT,
  SectorsBoughtT,
  InitializedT,
  GameFinishedT
} from './events'
import { LogEvent } from './abi/generated/abi.support'
import { BlockData } from '@subsquid/evm-processor'


const hasIn = (item: LogContext, topic: string) => item.topics.indexOf(topic) !== -1

type IBlockData = BlockData<{
  log: {
      topics: true;
      data: true;
  };
  transaction: {
      input: true;
      hash: true;
      from: true;
  };
}>

function handler<T>(block: IBlockData, ctx: LogContext, log: LogEvent<T>) {
  const decoded = log.decode(ctx)
  return { e: decoded, event: ctx, block: block.header }
}

processor.run(database, async (ctx) => {
  const gamesCreated = []
  const sectorsBought = []
  const initialized = []
  const gamesFinished = []
  
  for (const block of ctx.blocks) {
    for (const item of block.logs) {
        const logCtx: LogContext = {
          ...item,
          ...block
        }
        if (hasIn(logCtx, GameCreatedT.topic)) {
          gamesCreated.push(handler(block, logCtx, GameCreatedT))
        }

        if (hasIn(logCtx, SectorsBoughtT.topic)) {
          sectorsBought.push(handler(block, logCtx, SectorsBoughtT))
        }

        if (hasIn(logCtx, InitializedT.topic)) {
          initialized.push(handler(block, logCtx, InitializedT))
        }

        if (hasIn(logCtx, GameFinishedT.topic)) {
          gamesFinished.push(handler(block, logCtx, GameFinishedT))
        }
        
    }
  }

  await saveFinished(ctx, gamesFinished)

  await saveCreated(ctx, gamesCreated)

  await saveBought(ctx, sectorsBought)

  await saveInitialized(ctx, initialized)
})

