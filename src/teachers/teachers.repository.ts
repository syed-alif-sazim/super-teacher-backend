import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Student } from "@/common/entities/students.entity";
import { Teacher } from "@/common/entities/teachers.entity";

@Injectable()
export class TeachersRepository extends EntityRepository<Teacher>  {}