import { Injectable } from "@nestjs/common";
import { EntityRepository } from "@mikro-orm/core";
import { User } from "../common/entities/users.entity";
import { Student } from "../common/entities/students.entity";
import { CreateUserDto } from "@/auth/auth.dtos";

@Injectable()
export class UsersRepository extends EntityRepository<User> {
  async createStudentUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, gender, role, studentForm } = createUserDto;
    const {
      address,
      phoneNumber,
      educationLevel,
      medium,
      grade,
      degree,
      degreeName,
      semesterYear,
    } = studentForm;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.gender = gender;
    user.role = role;
    const student = new Student();
    student.address = address;
    student.phoneNumber = phoneNumber;
    student.educationLevel = educationLevel;
    student.medium = medium;
    student.grade = grade;
    student.degree = degree;
    student.degreeName = degreeName;
    student.semesterYear = semesterYear;
    student.user = user;
    await this.em.persist([user, student]);
    this.em.flush();
  }

  async doesEmailExist(email: string): Promise<boolean> {
    const userCount = await this.em.count(User, { email });
    return userCount > 0;
  }
}
