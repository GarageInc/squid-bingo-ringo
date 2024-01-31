import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {User} from "./user.model"

@Entity_()
export class ParticipantsInGames {
    constructor(props?: Partial<ParticipantsInGames>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    game!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    round!: bigint

    @Column_("text", {array: true, nullable: false})
    sectorIds!: (string | undefined | null)[]

    @Index_()
    @ManyToOne_(() => User, {nullable: true})
    user!: User

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
