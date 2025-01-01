import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as argon2 from "argon2";

import { ARGON2_OPTIONS } from "@/common/config/argon2.config";
import { User } from "@/common/entities/users.entity";
import { RolesService } from "@/roles/roles.service";
import { UsersService } from "@/users/users.service";

import { INVALID_USER_CREDENTIALS } from "./auth.constants";
import { IJwtPayload } from "./auth.interfaces";
import { UsersRepository } from "@/users/users.repository";
import { CreateUserDto } from "./auth.dtos";
import { ERoles } from "@/common/enums/roles.enums";
import { InjectEntityManager } from "@mikro-orm/nestjs";
import { EntityManager } from "@mikro-orm/core";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.doesEmailExist(createUserDto.email)

    if (emailExists) {
      throw new ConflictException("Email already exists");
    }

    if (createUserDto.role === ERoles.Student) {
      const hashedPassword = await argon2.hash(createUserDto.password, ARGON2_OPTIONS);
      this.usersRepository.createStudentUser({ ...createUserDto, password: hashedPassword });
    }
  }
}
