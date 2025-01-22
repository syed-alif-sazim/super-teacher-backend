import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Otp } from "@/common/entities/otp.entity";

@Injectable()
export class OtpRepository extends EntityRepository<Otp>  {}