import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"

@Entity_()
export class RewardsClaimed {
    constructor(props?: Partial<RewardsClaimed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    owner!: User

    @Index_()
    @Column_("text", {nullable: false})
    ownerAddress!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    round!: bigint

    @Column_("text", {array: true, nullable: false})
    sectorIds!: (string | undefined | null)[]

    @Index_()
    @Column_("text", {nullable: false})
    game!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    claimed!: bigint

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    transactionHash!: string
}
