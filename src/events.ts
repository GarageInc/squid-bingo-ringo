import * as gameAbi from './abi/generated/game'
import * as bingoRingoAbi from './abi/generated/bingo-ringo'

export const GameFinishedT = gameAbi.events.GameFinished
export const SectorsBoughtT = gameAbi.events.SectorsBought
export const InitializedT = gameAbi.events.Initialized

export const GameCreatedT = bingoRingoAbi.events.GameCreated
