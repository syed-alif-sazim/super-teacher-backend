import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { StudentClassroom } from "@/common/entities/students-classrooms.entity";

@Injectable()
export class StudentsClassroomsRepository extends EntityRepository<StudentClassroom>  {}