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
import { UniqueCodeRepository } from "@/unique-code/unique-code.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
    private readonly usersRepository: UsersRepository,
    private readonly uniqueCodeRepository: UniqueCodeRepository
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.doesEmailExist(createUserDto.email)

    if (emailExists) {
      throw new ConflictException("Email already exists!");
    }
    const hashedPassword = await argon2.hash(createUserDto.password, ARGON2_OPTIONS);

    if (createUserDto.role === ERoles.Student) {
      this.usersRepository.createStudentUser({ ...createUserDto, password: hashedPassword });
    }else if (createUserDto.role === ERoles.Teacher) {
      const uniqueCodeRecord = await this.uniqueCodeRepository.findOne({
        email: createUserDto.email,
      });
  
      if (!uniqueCodeRecord) {
        return { message: "No unique code has been generated for this email. Please contact admin." };
      }

      if(uniqueCodeRecord.attemptsLeft == 0){
        return { message: "Sorry, you have no attempts left."}
      }
  
      if (uniqueCodeRecord.code !== createUserDto.teacherForm.code) {
        if (uniqueCodeRecord.attemptsLeft < 1) {
          return { message: "Wrong unique code. No attempts left.", attemptsLeft: 0 };
        }
  
        uniqueCodeRecord.attemptsLeft -= 1;
        await this.uniqueCodeRepository.getEntityManager().flush();
        return {
          message: `Wrong unique code. You have ${uniqueCodeRecord.attemptsLeft} attempts left`,
          attemptsLeft: uniqueCodeRecord.attemptsLeft,
        };
      }
  
      await this.usersRepository.createTeacherUser({
        ...createUserDto,
        password: hashedPassword,
      });
  
      return { message: "Teacher account has been registered successfully!" };
    }
    return { message: "User registered successfully" };
  }
}
