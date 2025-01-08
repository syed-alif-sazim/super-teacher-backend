import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Student } from "@/common/entities/students.entity";
import { CustomBaseEntity } from "@/common/entities/custom-base.entity";

@Injectable()
export class StudentsRepository extends CustomBaseEntity {}
