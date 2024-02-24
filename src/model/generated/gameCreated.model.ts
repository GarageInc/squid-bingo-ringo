import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class GameCreated {
    constructor(props?: Partial<GameCreated>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    game!: string

    @Index_()
    @Column_("text", {nullable: false})
    name!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    sectorsAmount!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    everyNSectorIsAWinner!: bigint

    @Column_("text", {array: true, nullable: false})
    prizes!: (string | undefined | null)[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    sectorPrice!: bigint

    @Column_("bool", {nullable: false})
    paused!: boolean

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    transactionHash!: string
}
