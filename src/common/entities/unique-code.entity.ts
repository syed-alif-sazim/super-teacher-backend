import {
    Entity,
    OneToOne,
    Property,
    Rel,
    PrimaryKey,
    Enum,
    EntityRepositoryType,
} from "@mikro-orm/core";
import { User } from "./users.entity";
import { UniqueCodeRepository } from "@/unique-code/unique-code.repository";
import { CustomBaseEntity } from "./custom-base.entity";

@Entity({
    tableName: "unique_code",
    repository: () => UniqueCodeRepository,
})
export class UniqueCode extends CustomBaseEntity {
    [EntityRepositoryType]?: UniqueCodeRepository;

    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Property()
    email!: string;

    @Property()
    code!: string;

    @Property({ fieldName: "attempts_left" })
    attemptsLeft!: number;
}
