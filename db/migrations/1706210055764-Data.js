module.exports = class Data1706210055764 {
    name = 'Data1706210055764'

    async up(db) {
        await db.query(`CREATE TABLE "sectors_bought" ("id" character varying NOT NULL, "owner_address" text NOT NULL, "round" numeric NOT NULL, "sectod_ids" text array NOT NULL, "spin" integer NOT NULL, "game" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, "owner_id" character varying, CONSTRAINT "PK_0347d910e30668638dac60566ef" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_33323091f44e34d798926edf2c" ON "sectors_bought" ("owner_address") `)
        await db.query(`CREATE INDEX "IDX_e26b833434a88a25f0a248f823" ON "sectors_bought" ("owner_id") `)
        await db.query(`CREATE INDEX "IDX_16955aa570b094db79d42bb55e" ON "sectors_bought" ("game") `)
        await db.query(`CREATE INDEX "IDX_4735c628e8d7cb78dbc2ba0833" ON "sectors_bought" ("timestamp") `)
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "address" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "game_created" ("id" character varying NOT NULL, "game" text NOT NULL, "name" text NOT NULL, "sectors_amount" numeric NOT NULL, "every_n_sector_is_a_winner" numeric NOT NULL, "prizes" text array NOT NULL, "sector_price" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_1cfe4397ab852dabfc75b665594" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_438ac2359d3f5f608e1d91c86e" ON "game_created" ("game") `)
        await db.query(`CREATE INDEX "IDX_2999f18d0d5af4f9cac2370040" ON "game_created" ("name") `)
        await db.query(`CREATE INDEX "IDX_e64b9239ff0dd6e93dbe15a369" ON "game_created" ("timestamp") `)
        await db.query(`CREATE TABLE "game_finished" ("id" character varying NOT NULL, "round" numeric NOT NULL, "game" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b634eca889cb461a7f22a4f7323" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_db75bb101c39915c65b5dddbec" ON "game_finished" ("game") `)
        await db.query(`CREATE INDEX "IDX_09d77ebdbc37206f7463cacb44" ON "game_finished" ("timestamp") `)
        await db.query(`CREATE TABLE "initialized" ("id" character varying NOT NULL, "version" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "transaction_hash" text NOT NULL, CONSTRAINT "PK_b3cbe9e4a57e3e7d64bfd6b67ce" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ab514bcce24a9d9f47b1508438" ON "initialized" ("timestamp") `)
        await db.query(`ALTER TABLE "sectors_bought" ADD CONSTRAINT "FK_e26b833434a88a25f0a248f8238" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "sectors_bought"`)
        await db.query(`DROP INDEX "public"."IDX_33323091f44e34d798926edf2c"`)
        await db.query(`DROP INDEX "public"."IDX_e26b833434a88a25f0a248f823"`)
        await db.query(`DROP INDEX "public"."IDX_16955aa570b094db79d42bb55e"`)
        await db.query(`DROP INDEX "public"."IDX_4735c628e8d7cb78dbc2ba0833"`)
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "game_created"`)
        await db.query(`DROP INDEX "public"."IDX_438ac2359d3f5f608e1d91c86e"`)
        await db.query(`DROP INDEX "public"."IDX_2999f18d0d5af4f9cac2370040"`)
        await db.query(`DROP INDEX "public"."IDX_e64b9239ff0dd6e93dbe15a369"`)
        await db.query(`DROP TABLE "game_finished"`)
        await db.query(`DROP INDEX "public"."IDX_db75bb101c39915c65b5dddbec"`)
        await db.query(`DROP INDEX "public"."IDX_09d77ebdbc37206f7463cacb44"`)
        await db.query(`DROP TABLE "initialized"`)
        await db.query(`DROP INDEX "public"."IDX_ab514bcce24a9d9f47b1508438"`)
        await db.query(`ALTER TABLE "sectors_bought" DROP CONSTRAINT "FK_e26b833434a88a25f0a248f8238"`)
    }
}
