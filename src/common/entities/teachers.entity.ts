import {
  Entity,
  OneToOne,
  Property,
  Rel,
  PrimaryKey,
  Enum,
  EntityRepositoryType,
} from "@mikro-orm/core";
import { User } from "./users.entity";
import { EEducationLevel } from "../enums/educationLevel.enums";
import { EMedium } from "../enums/medium.enums";
import { EDegree } from "../enums/degree.enums";
import { StudentsRepository } from "@/students/students.repository";
import { CustomBaseEntity } from "./custom-base.entity";
import { TeachersRepository } from "@/teachers/teachers.repository";

@Entity({
  tableName: "teachers",
  repository: () => TeachersRepository,
})
@Entity()
export class Teacher extends CustomBaseEntity {
  [EntityRepositoryType]?: TeachersRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: "highest_education_level" })
  highestEducationLevel!: string;

  @Property({ fieldName: "major_subject" })
  majorSubject!: string;

  @Property({ fieldName: "subjects_to_teach" })
  subjectsToTeach!: Array<string>;

  @OneToOne(() => User, { nullable: false })
  user!: Rel<User>;
}
