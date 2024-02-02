import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {SectorsBought} from "./sectorsBought.model"
import {ParticipantsInGames} from "./participantsInGames.model"
import {StakedByUsers} from "./stakedByUsers.model"
import {StakedByUsersTotal} from "./stakedByUsersTotal.model"
import {RewardsClaimed} from "./rewardsClaimed.model"
import {ClaimedByUsersTotal} from "./claimedByUsersTotal.model"

@Entity_()
export class User {
    constructor(props?: Partial<User>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    address!: string

    @OneToMany_(() => SectorsBought, e => e.owner)
    sectorsBought!: SectorsBought[]

    @OneToMany_(() => ParticipantsInGames, e => e.user)
    participatedInGames!: ParticipantsInGames[]

    @OneToMany_(() => StakedByUsers, e => e.user)
    stakedByUser!: StakedByUsers[]

    @OneToMany_(() => StakedByUsersTotal, e => e.user)
    stakedByUserTotal!: StakedByUsersTotal[]

    @OneToMany_(() => RewardsClaimed, e => e.owner)
    rewardsClaimed!: RewardsClaimed[]

    @OneToMany_(() => ClaimedByUsersTotal, e => e.user)
    claimedByUserTotal!: ClaimedByUsersTotal[]
}
