import { Migration } from '@mikro-orm/migrations';

export class Migration20250915172642 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "doctor_availability" add column if not exists "unavailable_type" text null, add column if not exists "notes" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "doctor_availability" drop column if exists "unavailable_type", drop column if exists "notes";`);
  }

}
