
import { Context, IBlockHeader, LogContext } from './configs'
import { GameCreatedT, GameFinishedT, RewardClaimedT, SectorsBoughtT } from './events'
import { GameCreated, GameFinished, Initialized, ParticipantsInGames, SectorsBought, StakedByUsers, StakedByUsersTotal, User } from './model'
import { ClaimedByUsersTotal } from './model/generated/claimedByUsersTotal.model'
import { RewardsClaimed } from './model/generated/rewardsClaimed.model'


function getHash(event: LogContext): string | undefined {
  return event.transactions[event.transactionIndex]?.hash || event.block.hash
}

const getContractAddress = (event: LogContext) => event.transactions[event.transactionIndex]?.to?.toLowerCase()

const makeId = (event: LogContext) =>
  `${getHash(event)}-${event.transactionIndex}-${event.id}-${event.logIndex}`

export async function saveRewardsClaimed(
  ctx: Context,
  transfersData: {
    e: ReturnType<typeof RewardClaimedT.decode>
    event: LogContext
    block: IBlockHeader
  }[]
) {
  const transfers: Set<RewardsClaimed> = new Set()

  for (const transferData of transfersData) {
    const { e, event, block } = transferData

    const user = await getUser(e.owner, ctx)

    const gameAddress = getContractAddress(event)

    await saveClaimedByUsersTotal(ctx, block, user, e, gameAddress)

    const transfer = new RewardsClaimed({
      id: makeId(event),
      
      round: e.round,
      game: gameAddress,

      sectorIds: e.sectorIds.map(i => i.toString()),
      ownerAddress: user.address,
      owner: user,

      claimed: e.claimed,

      timestamp: new Date(block.timestamp),
      transactionHash: getHash(event),
    })

    transfers.add(transfer)
  }

  await ctx.store.save([...transfers])
}

export async function saveFinished(
  ctx: Context,
  transfersData: {
    e: ReturnType<typeof GameFinishedT.decode>
    event: LogContext
    block: IBlockHeader
  }[]
) {
  const transfers: Set<GameFinished> = new Set()

  for (const transferData of transfersData) {
    const { e, event, block } = transferData

    const transfer = new GameFinished({
      id: makeId(event),
      round: e.round,

      totalSpin: e.totalSpin,
      random: e.random,

      timestamp: new Date(block.timestamp),
      transactionHash: getHash(event),

      game: getContractAddress(event),
    })

    transfers.add(transfer)
  }

  await ctx.store.save([...transfers])
}


export async function saveCreated(
  ctx: Context,
  transfersData: {
    e: ReturnType<typeof GameCreatedT.decode>
    event: LogContext
    block: IBlockHeader
  }[]
) {
  const transfers: Set<GameCreated> = new Set()

  for (const transferData of transfersData) {
    const { e, event, block } = transferData

    const transfer = new GameCreated({
      id: makeId(event),
      game: e.game.toLowerCase(),

      name: e.name,
      sectorsAmount: e.sectorsAmount,
      everyNSectorIsAWinner: e.everyNSectorIsAWinner,
      prizes: e.prizes.map(i => i.toString()),
      sectorPrice: e.sectorPrice,

      timestamp: new Date(block.timestamp),
      transactionHash: getHash(event),
    })

    transfers.add(transfer)
  }

  await ctx.store.save([...transfers])
}

export async function saveBought(
  ctx: Context,
  transfersData: {
    e: ReturnType<typeof SectorsBoughtT.decode>
    event: LogContext
    block: IBlockHeader
  }[]
) {
  const transfers: Set<SectorsBought> = new Set()

  for (const transferData of transfersData) {
    const { e, event, block } = transferData

    const user = await getUser(e.owner, ctx)

    const gameAddress = getContractAddress(event)

    const sectors = e.sectorIds.map(i => i.toString())

    await saveParticipantInGame(ctx, block, user, e.round, sectors, gameAddress)
    await saveStakedByUsers(ctx, block, user, sectors, gameAddress)
    await saveStakedByUsersTotal(ctx, block, user, sectors)
    

    const transfer = new SectorsBought({
      id: makeId(event),
      round: e.round,
      sectorIds: sectors,
      ownerAddress: e.owner.toLowerCase(),
      owner: user,
      spin: e.spin,

      game: gameAddress,

      timestamp: new Date(block.timestamp),
      transactionHash: getHash(event),
    })

    transfers.add(transfer)
  }

  await ctx.store.save([...transfers])
}

export async function saveParticipantInGame(ctx: Context, block: IBlockHeader, user: User, round: bigint,  sectors: string[], game?: string) {
  const targetAddress = user.address.toLowerCase()

  const id = `${targetAddress}-${game}-${round}`

  const participant = await ctx.store.findOneBy(ParticipantsInGames, {
    id,
  })

  if (participant) {
    participant.sectorIds = [...participant.sectorIds, ...sectors]

    await ctx.store.save([participant])

    return participant
  }

  const newParticipant = new ParticipantsInGames({
    id: id,
    game,
    user,
    round,
    sectorIds: sectors,
    timestamp: new Date(block.timestamp)
  })

  return await ctx.store.save([newParticipant])
} 


export async function saveStakedByUsers(ctx: Context, block: IBlockHeader, user: User, sectors: string[], game?: string) {
  const targetAddress = user.address.toLowerCase()

  const id = `${targetAddress}-${game}`

  const prevStakedInfo = await ctx.store.findOneBy(StakedByUsers, {
    id,
  })

  const gameEntity = await ctx.store.findOneBy(GameCreated, {
    game,
  })

  const amount = BigInt(sectors.length) * (gameEntity ? gameEntity.sectorPrice : BigInt(0))

  if (prevStakedInfo) {
    prevStakedInfo.amount = prevStakedInfo.amount + amount

    await ctx.store.save([prevStakedInfo])

    return prevStakedInfo
  }

  const stakedInfo = new StakedByUsers({
    id: id,
    game,
    user,
    amount,
    userAddress: targetAddress,
    timestamp: new Date(block.timestamp)
  })

  return await ctx.store.save([stakedInfo])
} 

export async function saveStakedByUsersTotal(ctx: Context, block: IBlockHeader, user: User, sectors: string[], game?: string) {
  const targetAddress = user.address.toLowerCase()

  const id = `${targetAddress}`

  const prevStakedInfo = await ctx.store.findOneBy(StakedByUsersTotal, {
    id,
  })

  const gameEntity = await ctx.store.findOneBy(GameCreated, {
    game,
  })

  const amount = BigInt(sectors.length) * (gameEntity ? gameEntity.sectorPrice : BigInt(0))

  if (prevStakedInfo) {
    prevStakedInfo.amount = prevStakedInfo.amount + amount

    await ctx.store.save([prevStakedInfo])

    return prevStakedInfo
  }

  const stakedInfo = new StakedByUsersTotal({
    id: id,
    user,
    amount,
    userAddress: targetAddress,
    timestamp: new Date(block.timestamp)
  })

  return await ctx.store.save([stakedInfo])
} 

export async function saveClaimedByUsersTotal(ctx: Context, block: IBlockHeader, user: User, event: ReturnType<typeof RewardClaimedT.decode>, game?: string) {
  const targetAddress = user.address.toLowerCase()

  const id = `${targetAddress}`

  const prevStakedInfo = await ctx.store.findOneBy(ClaimedByUsersTotal, {
    id,
  })

  const amount = event.claimed

  if (prevStakedInfo) {
    prevStakedInfo.claimed = prevStakedInfo.claimed + amount

    await ctx.store.save([prevStakedInfo])

    return prevStakedInfo
  }

  const stakedInfo = new ClaimedByUsersTotal({
    id: id,
    user,
    claimed: amount,
    userAddress: targetAddress,
    timestamp: new Date(block.timestamp)
  })

  return await ctx.store.save([stakedInfo])
} 


async function getUser(address: string, ctx: Context) {
  const targetAddress = address.toLowerCase()

  const user = await ctx.store.findOneBy(User, {
    address: targetAddress,
    id: targetAddress
  })

  if (user) {
    return user
  }

  const newUser = new User({
    address: targetAddress,
    id: targetAddress
  })

  await ctx.store.save([newUser])

  return newUser
}

