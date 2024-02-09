import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {GameFinishedForUser} from "./gameFinishedForUser.model"

@Entity_()
export class GameFinished {
    constructor(props?: Partial<GameFinished>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    round!: bigint

    @Index_()
    @Column_("text", {nullable: false})
    game!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    random!: bigint

    @Column_("int4", {nullable: false})
    totalSpin!: number

    @OneToMany_(() => GameFinishedForUser, e => e.gameFinished)
    gameFinishedForUser!: GameFinishedForUser[]

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    transactionHash!: string
}
