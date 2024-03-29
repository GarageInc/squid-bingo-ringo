module.exports = class Data1707491460703 {
  name = 'Data1707491460703'

  async up(db) {
    await db.query(
      `CREATE TABLE "sectors_bought" ("id" character varying NOT NULL, "owner_address" text NOT NULL, "round" numeric NOT NULL, "sector_ids" text array NOT NULL, "spin" integer NOT NULL, "game" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "owner_id" character varying, CONSTRAINT "PK_0347d910e30668638dac60566ef" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_33323091f44e34d798926edf2c" ON "sectors_bought" ("owner_address") `)
    await db.query(`CREATE INDEX "IDX_e26b833434a88a25f0a248f823" ON "sectors_bought" ("owner_id") `)
    await db.query(`CREATE INDEX "IDX_16955aa570b094db79d42bb55e" ON "sectors_bought" ("game") `)
    await db.query(`CREATE INDEX "IDX_4735c628e8d7cb78dbc2ba0833" ON "sectors_bought" ("timestamp") `)
    await db.query(
      `CREATE TABLE "participants_in_games" ("id" character varying NOT NULL, "game" text NOT NULL, "round" numeric NOT NULL, "sector_ids" text array NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" character varying, CONSTRAINT "PK_b12e76c1e80ec10317e1b337748" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_89bcd08f188a82f3b3981adef6" ON "participants_in_games" ("game") `)
    await db.query(`CREATE INDEX "IDX_61523535038168a297f3092330" ON "participants_in_games" ("round") `)
    await db.query(`CREATE INDEX "IDX_a909afd5d0d7d16c27aa21ce22" ON "participants_in_games" ("user_id") `)
    await db.query(`CREATE INDEX "IDX_c49c50b30d08544825d192b6d2" ON "participants_in_games" ("timestamp") `)
    await db.query(
      `CREATE TABLE "staked_by_users" ("id" character varying NOT NULL, "user_address" text NOT NULL, "game" text NOT NULL, "amount" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" character varying, CONSTRAINT "PK_ac47f1cdc23b49af942028773ae" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_a4fcc0c9d2fa0eff9aa8635881" ON "staked_by_users" ("user_id") `)
    await db.query(`CREATE INDEX "IDX_7d34f2aa5715461eba1ecdfec6" ON "staked_by_users" ("user_address") `)
    await db.query(`CREATE INDEX "IDX_83e0fa1deefc04defe350ceebd" ON "staked_by_users" ("game") `)
    await db.query(`CREATE INDEX "IDX_bfe8962de882fe1688b49852b6" ON "staked_by_users" ("timestamp") `)
    await db.query(
      `CREATE TABLE "staked_by_users_total" ("id" character varying NOT NULL, "user_address" text NOT NULL, "amount" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" character varying, CONSTRAINT "PK_35a8dfa064e7e1e69e9e25e4b1e" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_7c54928dd379b0b9f696f3acd5" ON "staked_by_users_total" ("user_id") `)
    await db.query(`CREATE INDEX "IDX_f34906ca3d91da9604ba3536c4" ON "staked_by_users_total" ("user_address") `)
    await db.query(`CREATE INDEX "IDX_ac31b9824973d91b8a9b8d224a" ON "staked_by_users_total" ("timestamp") `)
    await db.query(
      `CREATE TABLE "game_finished" ("id" character varying NOT NULL, "round" numeric NOT NULL, "game" text NOT NULL, "random" numeric NOT NULL, "total_spin" integer NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b634eca889cb461a7f22a4f7323" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_db75bb101c39915c65b5dddbec" ON "game_finished" ("game") `)
    await db.query(`CREATE INDEX "IDX_09d77ebdbc37206f7463cacb44" ON "game_finished" ("timestamp") `)
    await db.query(
      `CREATE TABLE "game_finished_for_user" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "game_finished_id" character varying, "user_id" character varying, CONSTRAINT "PK_bfc52c304f8f659d2a7610b7f7d" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_2b77d97ad199f52bd6ccbb9d7a" ON "game_finished_for_user" ("game_finished_id") `)
    await db.query(`CREATE INDEX "IDX_d025ae9d32b0ac827a27d9eb98" ON "game_finished_for_user" ("user_id") `)
    await db.query(`CREATE INDEX "IDX_69837834709d09b01a7b173a5e" ON "game_finished_for_user" ("timestamp") `)
    await db.query(
      `CREATE TABLE "rewards_claimed" ("id" character varying NOT NULL, "owner_address" text NOT NULL, "round" numeric NOT NULL, "sector_ids" text array NOT NULL, "game" text NOT NULL, "claimed" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "owner_id" character varying, CONSTRAINT "PK_1cd951d72b1ba32f8ae09fe8dbd" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_185dbd738fc7681528610ed1b6" ON "rewards_claimed" ("owner_id") `)
    await db.query(`CREATE INDEX "IDX_5605ff1ded71ed45733edfe445" ON "rewards_claimed" ("owner_address") `)
    await db.query(`CREATE INDEX "IDX_5b9b45a218a11310b98d4304b8" ON "rewards_claimed" ("round") `)
    await db.query(`CREATE INDEX "IDX_5eee109355bb7014e53621ca41" ON "rewards_claimed" ("game") `)
    await db.query(`CREATE INDEX "IDX_2fefbed9000c43aa80dad18392" ON "rewards_claimed" ("timestamp") `)
    await db.query(
      `CREATE TABLE "claimed_by_users_total" ("id" character varying NOT NULL, "user_address" text NOT NULL, "claimed" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "user_id" character varying, CONSTRAINT "PK_89b924a0d51fe71d61d2fd0748d" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_07526a8dcb771b25391d1c741b" ON "claimed_by_users_total" ("user_id") `)
    await db.query(`CREATE INDEX "IDX_3f42cc410e97811a5e95af43e3" ON "claimed_by_users_total" ("user_address") `)
    await db.query(`CREATE INDEX "IDX_ab2d41fe8c1e5f02dfb7131146" ON "claimed_by_users_total" ("timestamp") `)
    await db.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "address" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
    await db.query(
      `CREATE TABLE "game_created" ("id" character varying NOT NULL, "game" text NOT NULL, "name" text NOT NULL, "sectors_amount" numeric NOT NULL, "every_n_sector_is_a_winner" numeric NOT NULL, "prizes" text array NOT NULL, "sector_price" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "paused" boolean NOT NULL, CONSTRAINT "PK_1cfe4397ab852dabfc75b665594" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_438ac2359d3f5f608e1d91c86e" ON "game_created" ("game") `)
    await db.query(`CREATE INDEX "IDX_2999f18d0d5af4f9cac2370040" ON "game_created" ("name") `)
    await db.query(`CREATE INDEX "IDX_e64b9239ff0dd6e93dbe15a369" ON "game_created" ("timestamp") `)
    await db.query(
      `CREATE TABLE "initialized" ("id" character varying NOT NULL, "version" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b3cbe9e4a57e3e7d64bfd6b67ce" PRIMARY KEY ("id"))`
    )
    await db.query(`CREATE INDEX "IDX_ab514bcce24a9d9f47b1508438" ON "initialized" ("timestamp") `)
    await db.query(
      `ALTER TABLE "sectors_bought" ADD CONSTRAINT "FK_e26b833434a88a25f0a248f8238" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "participants_in_games" ADD CONSTRAINT "FK_a909afd5d0d7d16c27aa21ce224" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "staked_by_users" ADD CONSTRAINT "FK_a4fcc0c9d2fa0eff9aa86358818" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "staked_by_users_total" ADD CONSTRAINT "FK_7c54928dd379b0b9f696f3acd5e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "game_finished_for_user" ADD CONSTRAINT "FK_2b77d97ad199f52bd6ccbb9d7a4" FOREIGN KEY ("game_finished_id") REFERENCES "game_finished"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "game_finished_for_user" ADD CONSTRAINT "FK_d025ae9d32b0ac827a27d9eb982" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "rewards_claimed" ADD CONSTRAINT "FK_185dbd738fc7681528610ed1b60" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await db.query(
      `ALTER TABLE "claimed_by_users_total" ADD CONSTRAINT "FK_07526a8dcb771b25391d1c741bf" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  async down(db) {
    await db.query(`DROP TABLE "sectors_bought"`)
    await db.query(`DROP INDEX "public"."IDX_33323091f44e34d798926edf2c"`)
    await db.query(`DROP INDEX "public"."IDX_e26b833434a88a25f0a248f823"`)
    await db.query(`DROP INDEX "public"."IDX_16955aa570b094db79d42bb55e"`)
    await db.query(`DROP INDEX "public"."IDX_4735c628e8d7cb78dbc2ba0833"`)
    await db.query(`DROP TABLE "participants_in_games"`)
    await db.query(`DROP INDEX "public"."IDX_89bcd08f188a82f3b3981adef6"`)
    await db.query(`DROP INDEX "public"."IDX_61523535038168a297f3092330"`)
    await db.query(`DROP INDEX "public"."IDX_a909afd5d0d7d16c27aa21ce22"`)
    await db.query(`DROP INDEX "public"."IDX_c49c50b30d08544825d192b6d2"`)
    await db.query(`DROP TABLE "staked_by_users"`)
    await db.query(`DROP INDEX "public"."IDX_a4fcc0c9d2fa0eff9aa8635881"`)
    await db.query(`DROP INDEX "public"."IDX_7d34f2aa5715461eba1ecdfec6"`)
    await db.query(`DROP INDEX "public"."IDX_83e0fa1deefc04defe350ceebd"`)
    await db.query(`DROP INDEX "public"."IDX_bfe8962de882fe1688b49852b6"`)
    await db.query(`DROP TABLE "staked_by_users_total"`)
    await db.query(`DROP INDEX "public"."IDX_7c54928dd379b0b9f696f3acd5"`)
    await db.query(`DROP INDEX "public"."IDX_f34906ca3d91da9604ba3536c4"`)
    await db.query(`DROP INDEX "public"."IDX_ac31b9824973d91b8a9b8d224a"`)
    await db.query(`DROP TABLE "game_finished"`)
    await db.query(`DROP INDEX "public"."IDX_db75bb101c39915c65b5dddbec"`)
    await db.query(`DROP INDEX "public"."IDX_09d77ebdbc37206f7463cacb44"`)
    await db.query(`DROP TABLE "game_finished_for_user"`)
    await db.query(`DROP INDEX "public"."IDX_2b77d97ad199f52bd6ccbb9d7a"`)
    await db.query(`DROP INDEX "public"."IDX_d025ae9d32b0ac827a27d9eb98"`)
    await db.query(`DROP INDEX "public"."IDX_69837834709d09b01a7b173a5e"`)
    await db.query(`DROP TABLE "rewards_claimed"`)
    await db.query(`DROP INDEX "public"."IDX_185dbd738fc7681528610ed1b6"`)
    await db.query(`DROP INDEX "public"."IDX_5605ff1ded71ed45733edfe445"`)
    await db.query(`DROP INDEX "public"."IDX_5b9b45a218a11310b98d4304b8"`)
    await db.query(`DROP INDEX "public"."IDX_5eee109355bb7014e53621ca41"`)
    await db.query(`DROP INDEX "public"."IDX_2fefbed9000c43aa80dad18392"`)
    await db.query(`DROP TABLE "claimed_by_users_total"`)
    await db.query(`DROP INDEX "public"."IDX_07526a8dcb771b25391d1c741b"`)
    await db.query(`DROP INDEX "public"."IDX_3f42cc410e97811a5e95af43e3"`)
    await db.query(`DROP INDEX "public"."IDX_ab2d41fe8c1e5f02dfb7131146"`)
    await db.query(`DROP TABLE "user"`)
    await db.query(`DROP TABLE "game_created"`)
    await db.query(`DROP INDEX "public"."IDX_438ac2359d3f5f608e1d91c86e"`)
    await db.query(`DROP INDEX "public"."IDX_2999f18d0d5af4f9cac2370040"`)
    await db.query(`DROP INDEX "public"."IDX_e64b9239ff0dd6e93dbe15a369"`)
    await db.query(`DROP TABLE "initialized"`)
    await db.query(`DROP INDEX "public"."IDX_ab514bcce24a9d9f47b1508438"`)
    await db.query(`ALTER TABLE "sectors_bought" DROP CONSTRAINT "FK_e26b833434a88a25f0a248f8238"`)
    await db.query(`ALTER TABLE "participants_in_games" DROP CONSTRAINT "FK_a909afd5d0d7d16c27aa21ce224"`)
    await db.query(`ALTER TABLE "staked_by_users" DROP CONSTRAINT "FK_a4fcc0c9d2fa0eff9aa86358818"`)
    await db.query(`ALTER TABLE "staked_by_users_total" DROP CONSTRAINT "FK_7c54928dd379b0b9f696f3acd5e"`)
    await db.query(`ALTER TABLE "game_finished_for_user" DROP CONSTRAINT "FK_2b77d97ad199f52bd6ccbb9d7a4"`)
    await db.query(`ALTER TABLE "game_finished_for_user" DROP CONSTRAINT "FK_d025ae9d32b0ac827a27d9eb982"`)
    await db.query(`ALTER TABLE "rewards_claimed" DROP CONSTRAINT "FK_185dbd738fc7681528610ed1b60"`)
    await db.query(`ALTER TABLE "claimed_by_users_total" DROP CONSTRAINT "FK_07526a8dcb771b25391d1c741bf"`)
  }
}
