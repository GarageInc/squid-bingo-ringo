import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './bingo-ringo.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    GameCreated: new LogEvent<([game: string, name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, prizes: Array<bigint>, sectorPrice: bigint] & {game: string, name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, prizes: Array<bigint>, sectorPrice: bigint})>(
        abi, '0x57abe528363d3c20a1e2b01b736e882eeb4fa6b63c60130397bed21324ba5d5e'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
}

export const functions = {
    activeGames: new Func<[_: bigint], {}, string>(
        abi, '0x13e4c714'
    ),
    deleteGame: new Func<[], {}, []>(
        abi, '0xc8011be9'
    ),
    gameLogicImplementation: new Func<[], {}, string>(
        abi, '0xf5c52a9a'
    ),
    games: new Func<[_: string], {}, ([name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, sectorPrice: bigint] & {name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, sectorPrice: bigint})>(
        abi, '0x79131a19'
    ),
    getActiveGames: new Func<[], {}, Array<string>>(
        abi, '0x1b76929c'
    ),
    initGame: new Func<[name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, prizes: Array<bigint>, sectorPrice: bigint], {name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, prizes: Array<bigint>, sectorPrice: bigint}, string>(
        abi, '0xca343298'
    ),
    maxSectorsAmount: new Func<[], {}, bigint>(
        abi, '0x6eb21632'
    ),
    minSectorsAmount: new Func<[], {}, bigint>(
        abi, '0xf68ae8e3'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    activeGames(arg0: bigint): Promise<string> {
        return this.eth_call(functions.activeGames, [arg0])
    }

    gameLogicImplementation(): Promise<string> {
        return this.eth_call(functions.gameLogicImplementation, [])
    }

    games(arg0: string): Promise<([name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, sectorPrice: bigint] & {name: string, sectorsAmount: bigint, everyNSectorIsAWinner: bigint, sectorPrice: bigint})> {
        return this.eth_call(functions.games, [arg0])
    }

    getActiveGames(): Promise<Array<string>> {
        return this.eth_call(functions.getActiveGames, [])
    }

    maxSectorsAmount(): Promise<bigint> {
        return this.eth_call(functions.maxSectorsAmount, [])
    }

    minSectorsAmount(): Promise<bigint> {
        return this.eth_call(functions.minSectorsAmount, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }
}
