import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './game.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    GameFinished: new LogEvent<([round: bigint, random: bigint, totalSpin: number] & {round: bigint, random: bigint, totalSpin: number})>(
        abi, '0x00b0c245cf541f01114d267121d845c6850b17ae97cab2ed85d0981f866b78d9'
    ),
    'Initialized(uint64)': new LogEvent<([version: bigint] & {version: bigint})>(
        abi, '0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2'
    ),
    'Initialized(string,uint256,uint256,uint256[],uint256)': new LogEvent<([name: string, sectorAmount: bigint, everyNSectorIsAWinner: bigint, prizes: Array<bigint>, sectorPrice: bigint] & {name: string, sectorAmount: bigint, everyNSectorIsAWinner: bigint, prizes: Array<bigint>, sectorPrice: bigint})>(
        abi, '0xc3fd971b82b801a62eaefb178cbc9c4c866b2d35dfec4729ab043512b3814700'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    RewardsClaimed: new LogEvent<([owner: string, round: bigint, sectorIds: Array<bigint>, claimed: bigint] & {owner: string, round: bigint, sectorIds: Array<bigint>, claimed: bigint})>(
        abi, '0xb75fcac1fb337298c9e9a4e54cabc43b96aa51704e08637a259e63e153762950'
    ),
    SectorsBought: new LogEvent<([owner: string, round: bigint, sectorIds: Array<number>, spin: number] & {owner: string, round: bigint, sectorIds: Array<number>, spin: number})>(
        abi, '0x946870df20e4dbbbb2261672b9953d5d78b916d0c833f0f60b8818a7583c030f'
    ),
}

export const functions = {
    activeRound: new Func<[], {}, bigint>(
        abi, '0x11f0281e'
    ),
    boughtSectors: new Func<[_: bigint], {}, number>(
        abi, '0x2c8e7e92'
    ),
    buy: new Func<[sectorIds: Array<number>, spin: number], {sectorIds: Array<number>, spin: number}, []>(
        abi, '0x29a6c93c'
    ),
    claimRewards: new Func<[round: bigint, sectorIds: Array<bigint>], {round: bigint, sectorIds: Array<bigint>}, bigint>(
        abi, '0xb0ee5e28'
    ),
    destroy: new Func<[], {}, []>(
        abi, '0x83197ef0'
    ),
    everyNSectorIsAWinner: new Func<[], {}, bigint>(
        abi, '0x446455fb'
    ),
    getBoughtSectors: new Func<[], {}, Array<number>>(
        abi, '0x470e9394'
    ),
    getPrizeIndexBySectorAndSpin: new Func<[sectorId: bigint, spin: bigint], {sectorId: bigint, spin: bigint}, bigint>(
        abi, '0x1f502c1c'
    ),
    getPrizes: new Func<[], {}, Array<bigint>>(
        abi, '0xec000bb5'
    ),
    getRewardByRoundAndSectorId: new Func<[round: bigint, sectorId: bigint], {round: bigint, sectorId: bigint}, bigint>(
        abi, '0x2be5ddf1'
    ),
    getTotalPrize: new Func<[_owner: string, round: bigint, sectorIds: Array<bigint>], {_owner: string, round: bigint, sectorIds: Array<bigint>}, bigint>(
        abi, '0x5d22cd84'
    ),
    init: new Func<[name_: string, sectorsAmount_: bigint, everyNSectorIsAWinner_: bigint, prizes_: Array<bigint>, sectorPrice_: bigint], {name_: string, sectorsAmount_: bigint, everyNSectorIsAWinner_: bigint, prizes_: Array<bigint>, sectorPrice_: bigint}, []>(
        abi, '0x6c9037c5'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    prizes: new Func<[_: bigint], {}, bigint>(
        abi, '0xeccb3a4f'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    rounds: new Func<[round: bigint], {round: bigint}, ([totalSpin: bigint, random: bigint] & {totalSpin: bigint, random: bigint})>(
        abi, '0x8c65c81f'
    ),
    sectorPrice: new Func<[], {}, bigint>(
        abi, '0x657e37b9'
    ),
    sectorSpinPower: new Func<[], {}, number>(
        abi, '0x796f2c5c'
    ),
    sectorsAmount: new Func<[], {}, bigint>(
        abi, '0x878e6656'
    ),
    sectorsOwnerByRound: new Func<[round: bigint, sectorId: bigint], {round: bigint, sectorId: bigint}, string>(
        abi, '0x76b519fa'
    ),
    totalBoughtSectors: new Func<[], {}, number>(
        abi, '0xfd5e48f8'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
}

export class Contract extends ContractBase {

    activeRound(): Promise<bigint> {
        return this.eth_call(functions.activeRound, [])
    }

    boughtSectors(arg0: bigint): Promise<number> {
        return this.eth_call(functions.boughtSectors, [arg0])
    }

    everyNSectorIsAWinner(): Promise<bigint> {
        return this.eth_call(functions.everyNSectorIsAWinner, [])
    }

    getBoughtSectors(): Promise<Array<number>> {
        return this.eth_call(functions.getBoughtSectors, [])
    }

    getPrizeIndexBySectorAndSpin(sectorId: bigint, spin: bigint): Promise<bigint> {
        return this.eth_call(functions.getPrizeIndexBySectorAndSpin, [sectorId, spin])
    }

    getPrizes(): Promise<Array<bigint>> {
        return this.eth_call(functions.getPrizes, [])
    }

    getRewardByRoundAndSectorId(round: bigint, sectorId: bigint): Promise<bigint> {
        return this.eth_call(functions.getRewardByRoundAndSectorId, [round, sectorId])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    prizes(arg0: bigint): Promise<bigint> {
        return this.eth_call(functions.prizes, [arg0])
    }

    rounds(round: bigint): Promise<([totalSpin: bigint, random: bigint] & {totalSpin: bigint, random: bigint})> {
        return this.eth_call(functions.rounds, [round])
    }

    sectorPrice(): Promise<bigint> {
        return this.eth_call(functions.sectorPrice, [])
    }

    sectorSpinPower(): Promise<number> {
        return this.eth_call(functions.sectorSpinPower, [])
    }

    sectorsAmount(): Promise<bigint> {
        return this.eth_call(functions.sectorsAmount, [])
    }

    sectorsOwnerByRound(round: bigint, sectorId: bigint): Promise<string> {
        return this.eth_call(functions.sectorsOwnerByRound, [round, sectorId])
    }

    totalBoughtSectors(): Promise<number> {
        return this.eth_call(functions.totalBoughtSectors, [])
    }
}
