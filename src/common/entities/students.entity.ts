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

  @Property()
  phoneNumber!: string;

  @Enum(() => EEducationLevel)
  educationLevel!: EEducationLevel;

  @Enum(() => EMedium)
  medium!: EMedium | null;

  @Property({ nullable: true })
  grade!: string | null;

  @Enum(() => EDegree)
  degree!: EDegree | null;

  @Property({ nullable: true })
  degreeName!: string | null;

  @Property({ nullable: true })
  semesterYear!: string | null;

  @OneToOne(() => User, { nullable: false })
  user!: Rel<User>;
}
