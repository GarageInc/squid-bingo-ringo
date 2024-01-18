import {} from './contract'
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


const hasIn = (item: LogContext, topic: string) => item.topics.indexOf(topic) !== -1

function handler<T>(block: IBlockHeader, ctx: LogContext, log: LogEvent<T>) {
  return { e: log.decode(ctx), event: ctx, block: block }
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
        }
        if (hasIn(logCtx, GameCreatedT.topic)) {
          gamesCreated.push(handler(block.header, logCtx, GameCreatedT))
        }

        if (hasIn(logCtx, SectorsBoughtT.topic)) {
          sectorsBought.push(handler(block.header, logCtx, SectorsBoughtT))
        }

        if (hasIn(logCtx, InitializedT.topic)) {
          initialized.push(handler(block.header, logCtx, InitializedT))
        }

        if (hasIn(logCtx, GameFinishedT.topic)) {
          gamesFinished.push(handler(block.header, logCtx, GameFinishedT))
        }
        
    }
  }

  await saveFinished(ctx, gamesFinished)

  await saveCreated(ctx, gamesCreated)

  await saveBought(ctx, sectorsBought)

  await saveInitialized(ctx, initialized)
})

