import { Migration } from '@mikro-orm/migrations';

export class Migration20250901130203 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "blog" drop constraint if exists "blog_slug_unique";`);
    this.addSql(`create table if not exists "blog" ("id" text not null, "title" text null, "subtitle" text null, "tags" text null, "cover_image" text null, "content" text null, "author_name" text null, "status" text check ("status" in ('draft', 'published', 'archived')) not null default 'draft', "slug" text null, "published_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "blog_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_blog_slug_unique" ON "blog" (slug) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_blog_deleted_at" ON "blog" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "blog" cascade;`);
  }

}
