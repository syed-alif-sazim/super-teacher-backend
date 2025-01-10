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

@Entity({
  tableName: "students",
  repository: () => StudentsRepository,
})
@Entity()
export class Student extends CustomBaseEntity {
  [EntityRepositoryType]?: StudentsRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  address!: string;

  @Property({fieldName: "phone_number"})
  phoneNumber!: string;

  @Enum(() => EEducationLevel)
  @Property({fieldName: "education_level"})
  educationLevel!: EEducationLevel;

  @Enum({items: Object.values(EMedium), nullable: true})
  medium!: EMedium | null;

  @Property({nullable: true})
  grade!: string | null;

  @Enum({items: Object.values(EDegree), nullable: true})
  degree!: EDegree | null;

  @Property({ nullable: true, fieldName: "degree_name"})
  degreeName!: string | null;

  @Property({ nullable: true, fieldName: "semester_year"})
  semesterYear!: string | null;

  @OneToOne(() => User, { nullable: false })
  user!: Rel<User>;
}
