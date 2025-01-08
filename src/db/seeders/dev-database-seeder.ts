import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

import * as argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { Role } from "@/common/entities/roles.entity";
import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";
import { EUserRole } from "@/common/enums/roles.enums";

export class DevDatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    this.createRoles(em);
    await em.flush();
  }

  createRoles(em: EntityManager) {
    const superUserRole = new Role(EUserRole.SUPER_USER);
    const adminRole = new Role(EUserRole.ADMIN);

    em.persist([superUserRole, adminRole]);
  }
}
