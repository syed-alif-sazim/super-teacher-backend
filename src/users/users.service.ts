import { BadRequestException, Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import * as argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { EUserRole } from "@/common/enums/roles.enums";

import { RolesRepository } from "../roles/roles.repository";
import { RegisterUserDto } from "./users.dtos";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  hashPassword(password: string) {
    return argon2.hash(password, ARGON2_OPTIONS);
  }

  async findByIdOrThrow(id: number) {
    const user = await this.usersRepository.findOneOrFail(id);

    await this.entityManager.populate(user, user.role === 'student' ? ['student', 'student.id'] : user.role === 'teacher' ? ['teacher', 'teacher.id'] : []);
    return user;
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.usersRepository.findOneOrFail({ email });

    await this.entityManager.populate(user, user.role === 'student' ? ['student', 'student.id'] : user.role === 'teacher' ? ['teacher', 'teacher.id'] : []);
    
    return user;
  }

  async checkIfEmailExists(email: string) {
    const user = await this.usersRepository.findOne({ email })
    if(!user){
      return false
    }
    return true
  }
  
}
