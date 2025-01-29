import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Materials } from "@/common/entities/materials.entity";

@Injectable()
export class MaterialsRepository extends EntityRepository<Materials>  {}