import { Migration } from '@mikro-orm/migrations';

export class Migration20250129192402_create_all_tables_again extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "otp" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "code" varchar(255) not null, "used" boolean not null default false);');

    this.addSql('create table "permissions" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in (\'CREATE_USER\', \'READ_USER\', \'UPDATE_USER\', \'DELETE_USER\')) not null);');

    this.addSql('create table "roles" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in (\'student\', \'teacher\')) not null);');

    this.addSql('create table "roles_permissions" ("role_id" int not null, "permission_id" int not null, constraint "roles_permissions_pkey" primary key ("role_id", "permission_id"));');

    this.addSql('create table "unique_code" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "code" varchar(255) not null, "attempts_left" int not null);');

    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "gender" text check ("gender" in (\'Male\', \'Female\')) not null, "role" text check ("role" in (\'student\', \'teacher\')) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "teachers" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "highest_education_level" varchar(255) not null, "major_subject" varchar(255) not null, "subjects_to_teach" text[] not null, "user_id" int not null);');
    this.addSql('alter table "teachers" add constraint "teachers_user_id_unique" unique ("user_id");');

    this.addSql('create table "classrooms" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "subject" varchar(255) not null, "days" text[] not null, "class_time" timestamptz not null, "meet_link" varchar(255) null, "teacher_id" int not null);');

    this.addSql('create table "materials" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "file_url" varchar(255) not null, "instruction" varchar(255) not null, "classroom_id" int not null);');

    this.addSql('create table "students" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "address" varchar(255) not null, "phone_number" varchar(255) not null, "education_level" text check ("education_level" in (\'School\', \'College\', \'University\')) not null, "medium" text check ("medium" in (\'English\', \'Bangla\')) null, "grade" varchar(255) null, "degree" text check ("degree" in (\'Bachelors\', \'Masters\')) null, "degree_name" varchar(255) null, "semester_year" varchar(255) null, "user_id" int not null);');
    this.addSql('alter table "students" add constraint "students_user_id_unique" unique ("user_id");');

    this.addSql('create table "student_classroom" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "classroom_id" int not null, "student_id" int not null);');

    this.addSql('create table "user_profiles" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "user_id" int not null, "role_id" int not null);');
    this.addSql('alter table "user_profiles" add constraint "user_profiles_user_id_unique" unique ("user_id");');

    this.addSql('alter table "roles_permissions" add constraint "roles_permissions_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "roles_permissions" add constraint "roles_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "teachers" add constraint "teachers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "classrooms" add constraint "classrooms_teacher_id_foreign" foreign key ("teacher_id") references "teachers" ("id") on update cascade;');

    this.addSql('alter table "materials" add constraint "materials_classroom_id_foreign" foreign key ("classroom_id") references "classrooms" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "students" add constraint "students_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "student_classroom" add constraint "student_classroom_classroom_id_foreign" foreign key ("classroom_id") references "classrooms" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "student_classroom" add constraint "student_classroom_student_id_foreign" foreign key ("student_id") references "students" ("id") on update cascade;');

    this.addSql('alter table "user_profiles" add constraint "user_profiles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "user_profiles" add constraint "user_profiles_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "roles_permissions" drop constraint "roles_permissions_permission_id_foreign";');

    this.addSql('alter table "roles_permissions" drop constraint "roles_permissions_role_id_foreign";');

    this.addSql('alter table "user_profiles" drop constraint "user_profiles_role_id_foreign";');

    this.addSql('alter table "teachers" drop constraint "teachers_user_id_foreign";');

    this.addSql('alter table "students" drop constraint "students_user_id_foreign";');

    this.addSql('alter table "user_profiles" drop constraint "user_profiles_user_id_foreign";');

    this.addSql('alter table "classrooms" drop constraint "classrooms_teacher_id_foreign";');

    this.addSql('alter table "materials" drop constraint "materials_classroom_id_foreign";');

    this.addSql('alter table "student_classroom" drop constraint "student_classroom_classroom_id_foreign";');

    this.addSql('alter table "student_classroom" drop constraint "student_classroom_student_id_foreign";');

    this.addSql('drop table if exists "otp" cascade;');

    this.addSql('drop table if exists "permissions" cascade;');

    this.addSql('drop table if exists "roles" cascade;');

    this.addSql('drop table if exists "roles_permissions" cascade;');

    this.addSql('drop table if exists "unique_code" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "teachers" cascade;');

    this.addSql('drop table if exists "classrooms" cascade;');

    this.addSql('drop table if exists "materials" cascade;');

    this.addSql('drop table if exists "students" cascade;');

    this.addSql('drop table if exists "student_classroom" cascade;');

    this.addSql('drop table if exists "user_profiles" cascade;');
  }

}
