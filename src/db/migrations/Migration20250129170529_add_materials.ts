import { Migration } from '@mikro-orm/migrations';

export class Migration20250129170529_add_materials extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "materials" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "file_url" varchar(255) not null, "instruction" varchar(255) not null, "classroom_id" int not null);');

    this.addSql('alter table "materials" add constraint "materials_classroom_id_foreign" foreign key ("classroom_id") references "classrooms" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "materials" cascade;');
  }

}
