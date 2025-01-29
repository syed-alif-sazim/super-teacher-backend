import {
    Entity,
    OneToOne,
    Property,
    Rel,
    PrimaryKey,
    Enum,
    EntityRepositoryType,
    ManyToOne,
} from "@mikro-orm/core";
import { CustomBaseEntity } from "./custom-base.entity";
import { Classroom } from "./classrooms.entity";
import { Student } from "./students.entity";
import { StudentsClassroomsRepository } from "@/students-classrooms/students-classrooms.repository";

@Entity({ tableName: "student_classroom", repository: () => StudentsClassroomsRepository })
export class StudentClassroom extends CustomBaseEntity {
  [EntityRepositoryType]?: StudentsClassroomsRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Classroom, {deleteRule: "cascade" })
  classroom!: Rel<Classroom>;

  @ManyToOne(() => Student)
  student!: Rel<Student>;
}
