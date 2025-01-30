import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Student } from "@/common/entities/students.entity";
import { CustomBaseEntity } from "@/common/entities/custom-base.entity";
import { Exams } from "@/common/entities/exams.entity";

@Injectable()
export class ExamsRepository extends EntityRepository<Exams>  {}