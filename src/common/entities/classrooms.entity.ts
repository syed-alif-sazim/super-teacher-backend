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

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  title!: string;

  @Property()
  subject!: string;

  @Property()
  days!: string[];

  @Property({ fieldName: "class_time" })
  classTime!: Date;

  @Property({ fieldName: "meet_link", nullable: true })
  meetLink?: string;

  @ManyToOne(() => Teacher)
  teacher!: Rel<Teacher>;
}
