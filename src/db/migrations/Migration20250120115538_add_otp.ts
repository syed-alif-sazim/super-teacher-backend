import { Migration } from '@mikro-orm/migrations';

export class Migration20250120115538_add_otp extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "otp" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "code" varchar(255) not null, "used" boolean not null default false);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "otp" cascade;');
  }

}
