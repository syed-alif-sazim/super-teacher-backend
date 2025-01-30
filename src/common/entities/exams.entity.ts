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
import { ExamsRepository } from "@/exams/exams.respository";

@Entity({
  tableName: "exams",
  repository: () => ExamsRepository,
})
@Entity()
export class Exams extends CustomBaseEntity {
  [EntityRepositoryType]?: ExamsRepository;

  @PrimaryKey()
  id!: number;

  @Property({ fieldName: "title" })
  title!: string;

  @Property({ fieldName: "file_url" })
  fileUrl!: string;

  @Property({ fieldName: "instruction" })
  instruction!: string;

  @Property({ fieldName: "schedule_date" })
  scheduleDate!: Date;

  @ManyToOne(() => Classroom, { deleteRule: "cascade" })
  classroom!: Rel<Classroom>;
}
