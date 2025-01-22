import {
  Entity,
  OneToOne,
  Property,
  Rel,
  PrimaryKey,
  Enum,
  EntityRepositoryType,
} from "@mikro-orm/core";
import { OtpRepository } from "@/otp/otp.respository";
import { CustomBaseEntity } from "./custom-base.entity";

@Entity({
  tableName: "otp",
  repository: () => OtpRepository,
})
@Entity()
export class Otp extends CustomBaseEntity {
  [EntityRepositoryType]?: OtpRepository;

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  email!: string;

  @Property()
  code!: string;

  @Property({ default: false })
  used?: boolean;
}
