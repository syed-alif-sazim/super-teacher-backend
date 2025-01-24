import {
  Entity,
  ManyToOne,
  Property,
  Rel,
  PrimaryKey,
  Enum,
  EntityRepositoryType,
} from "@mikro-orm/core";
import { Teacher } from "./teachers.entity";
import { CustomBaseEntity } from "./custom-base.entity";
import { ClassroomsRepository } from "@/classrooms/classrooms.repository";

@Entity({
  tableName: "classrooms",
  repository: () => ClassroomsRepository,
})
export class Classroom extends CustomBaseEntity {
  [EntityRepositoryType]?: ClassroomsRepository;

  @PrimaryKey({ autoincrement: true, fieldName: "id" })
  id!: number;

  @Property({ fieldName: "title" })
  title!: string;

  @Property({ fieldName: "subject" })
  subject!: string;

  @Property({ fieldName: "days" })
  days!: string[];

  @Property({ fieldName: "class_time" })
  classTime!: Date;

  @Property({ fieldName: "meet_link", nullable: true })
  meetLink?: string;

  @ManyToOne(() => Teacher, { fieldName: "teacher_id" })
  teacher!: Rel<Teacher>;
}
