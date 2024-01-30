
import { Context, IBlockHeader, LogContext } from './configs'
import { GameCreatedT, GameFinishedT, InitializedT, SectorsBoughtT } from './events'
import { GameCreated, GameFinished, Initialized, ParticipantsInGames, SectorsBought, User } from './model'


function getHash(event: LogContext): string | undefined {
  return event.transactions[event.transactionIndex]?.hash || event.block.hash
}

const getContractAddress = (event: LogContext) => event.transactions[event.transactionIndex]?.to 

const makeId = (event: LogContext) =>
  `${getHash(event)}-${event.transactionIndex}-${event.id}-${event.logIndex}`

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
      game: e.game,

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

    const game = getContractAddress(event)

    await saveParticipantInGame(ctx, block, user, e.round, game)

    const transfer = new SectorsBought({
      id: makeId(event),
      round: e.round,
      sectodIds: e.sectodIds.map(i => i.toString()),
      ownerAddress: e.owner.toLowerCase(),
      owner: user,
      spin: e.spin,

      game: game,

      timestamp: new Date(block.timestamp),
      transactionHash: getHash(event),
    })

    transfers.add(transfer)
  }

  await ctx.store.save([...transfers])
}

export async function saveParticipantInGame(ctx: Context, block: IBlockHeader, user: User, round: bigint, game?: string) {
  const targetAddress = user.address.toLowerCase()

  const id = `${targetAddress}-${game}-${round}`

  const participant = await ctx.store.findOneBy(ParticipantsInGames, {
    id,
  })

  if (participant) {
    return participant
  }

  const newParticipant = new ParticipantsInGames({
    id: id,
    game,
    user,
    round,
    timestamp: new Date(block.timestamp)
  })

  return await ctx.store.save([newParticipant])
} 

export async function saveInitialized(
  ctx: Context,
  transfersData: {
    e: ReturnType<typeof InitializedT.decode>
    event: LogContext
    block: IBlockHeader
  }[]
) {
  const transfers: Set<Initialized> = new Set()

  for (const transferData of transfersData) {
    const { e, event, block } = transferData

    const transfer = new Initialized({
      id: makeId(event),
      version: e.version,

      timestamp: new Date(block.timestamp),
      transactionHash: getHash(event),
    })

    transfers.add(transfer)
  }

  await ctx.store.save([...transfers])
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

