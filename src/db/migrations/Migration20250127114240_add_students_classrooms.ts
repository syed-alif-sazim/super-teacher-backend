import { Migration } from '@mikro-orm/migrations';

export class Migration20250127114240_add_students_classrooms extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "student_classroom" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "classroom_id" int not null, "student_id" int not null);');

    this.addSql('alter table "student_classroom" add constraint "student_classroom_classroom_id_foreign" foreign key ("classroom_id") references "classrooms" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "student_classroom" add constraint "student_classroom_student_id_foreign" foreign key ("student_id") references "students" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "student_classroom" cascade;');
  }

}
