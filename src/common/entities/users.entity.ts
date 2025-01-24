import {
  Entity,
  OneToOne,
  Property,
  Rel,
  PrimaryKey,
  Enum,
  EntityRepositoryType,
} from "@mikro-orm/core";
import { Student } from "./students.entity";
import { ERoles } from "../enums/roles.enums";
import { EGender } from "../enums/gender.enums";
import { UsersRepository } from "@/users/users.repository";
import { CustomBaseEntity } from "./custom-base.entity";
import { Teacher } from "./teachers.entity";

@Entity({
  tableName: "users",
  repository: () => UsersRepository,
})
@Entity()
export class User extends CustomBaseEntity {
  [EntityRepositoryType]?: UsersRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({fieldName:'first_name'})
  firstName!: string;

  @Property({fieldName:'last_name'})
  lastName!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Enum(() => EGender)
  gender!: EGender;

  @Enum(() => ERoles)
  role!: ERoles;

  @OneToOne(() => Student, { mappedBy: (student) => student.user })
  student!: Rel<Student>;

  @OneToOne(() => Teacher, { mappedBy: (teacher) => teacher.user })
  teacher!: Rel<Teacher>;

}
