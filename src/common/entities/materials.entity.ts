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
import { MaterialsRepository } from "@/materials/materials.repository";
import { Classroom } from "./classrooms.entity";

@Entity({
  tableName: "materials",
  repository: () => MaterialsRepository,
})
@Entity()
export class Materials extends CustomBaseEntity {
  [EntityRepositoryType]?: MaterialsRepository;

  @PrimaryKey()
  id!: number;

  @Property({ fieldName: "title" })
  title!: string;

  @Property({ fieldName: "file_url" })
  fileUrl!: string;

  @Property({ fieldName: "instruction" })
  instruction!: string;

  @ManyToOne(() => Classroom, { deleteRule: "cascade" })
  classroom!: Rel<Classroom>;
}
