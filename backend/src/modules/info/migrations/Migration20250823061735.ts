import { Migration } from '@mikro-orm/migrations';

export class Migration20250823061735 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "info" ("id" text not null, "product_id" text not null, "desc1" text not null, "desc2" text not null, "desc3" text not null, "banner" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "info_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_info_deleted_at" ON "info" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "info" cascade;`);
  }

}
