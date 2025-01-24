import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Student } from "@/common/entities/students.entity";
import { UniqueCode } from "@/common/entities/unique-code.entity";

@Injectable()
export class UniqueCodeRepository extends EntityRepository<UniqueCode>  {}