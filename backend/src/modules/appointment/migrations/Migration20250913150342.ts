import { Migration } from '@mikro-orm/migrations';

export class Migration20250913150342 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "appointment" ("id" text not null, "patient_name" text not null, "patient_age" integer not null, "patient_address" text not null, "contact_number" text not null, "problem" text not null, "appointment_date" timestamptz not null, "appointment_time" text not null, "status" text check ("status" in ('scheduled', 'completed', 'cancelled', 'rescheduled')) not null default 'scheduled', "payment_status" text check ("payment_status" in ('pending', 'paid', 'refunded')) not null default 'pending', "payment_id" text null, "consultation_fee" integer not null default 99, "doctor_notes" text null, "cancellation_reason" text null, "rescheduled_from" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "appointment_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_appointment_deleted_at" ON "appointment" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "doctor_availability" ("id" text not null, "date" timestamptz not null, "is_available" boolean not null default true, "unavailable_reason" text null, "start_time" text null, "end_time" text null, "max_slots" integer not null default 10, "slot_duration" integer not null default 15, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "doctor_availability_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_doctor_availability_deleted_at" ON "doctor_availability" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "holiday" ("id" text not null, "name" text not null, "date" timestamptz not null, "is_recurring" boolean not null default false, "description" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "holiday_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_holiday_deleted_at" ON "holiday" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "appointment" cascade;`);

    this.addSql(`drop table if exists "doctor_availability" cascade;`);

    this.addSql(`drop table if exists "holiday" cascade;`);
  }

}
