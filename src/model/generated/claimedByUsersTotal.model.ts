import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"

@Entity_()
export class ClaimedByUsersTotal {
    constructor(props?: Partial<ClaimedByUsersTotal>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @Column_("text", {nullable: false})
    userAddress!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    claimed!: bigint

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
