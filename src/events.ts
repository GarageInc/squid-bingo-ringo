import * as gameAbi from './abi/generated/game'
import * as bingoRingoAbi from './abi/generated/bingo-ringo'

export const GameFinishedT = gameAbi.events.GameFinished
export const SectorsBoughtT = gameAbi.events.SectorsBought
export const RewardClaimedT = gameAbi.events.RewardsClaimed
export const PausedT = gameAbi.events.Paused
export const UnPausedT = gameAbi.events.Unpaused

export const GameCreatedT = bingoRingoAbi.events.GameCreated
