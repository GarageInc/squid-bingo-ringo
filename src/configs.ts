import { TypeormDatabase, Store } from '@subsquid/typeorm-store'
import {
  GAME,
  BINGO_RINGO,
} from './contract'
import {
  GameCreatedT,
  SectorsBoughtT,
  InitializedT,
  GameFinishedT
} from './events'
import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from '@subsquid/evm-processor'

const FROM = 1397725

export const database = new TypeormDatabase()

export const processor = new EvmBatchProcessor()
  .setBlockRange({ from: FROM })
  .setFinalityConfirmation(12)
  .setRpcEndpoint('https://rpc.testnet.ms')
  .setFields({
    log: {
      topics: true,
      data: true
    },
    transaction: {
      input: true,
      hash: true,
      from: true,
    }
  })
  .addLog({address: [GAME], topic0: [GameFinishedT.topic], transaction: true})

  .addLog({address: [GAME], topic0: [InitializedT.topic], transaction: true})
  .addLog({address: [GAME], topic0: [SectorsBoughtT.topic], transaction: true})

  .addLog({address: [BINGO_RINGO], topic0: [GameCreatedT.topic], transaction: true})

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>

export type Context = DataHandlerContext<Store, { log: { topics: true; data: true }; transaction: { input: true; hash: true; from: true } }>

export interface LogContext {
  id: string;
  logIndex: number;
  transactionIndex: number;
  address: string;
  data: string;
  topics: string[];
  block: {
      id: string;
      hash: string;
      height: number;
      parentHash: string;
      timestamp: number;
  };
  transaction?: {
    hash: string
  }
}

export interface IBlockHeader {
  id: string;
  hash: string;
  height: number;
  parentHash: string;
  timestamp: number;
}