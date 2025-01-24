import { ITokenizedUser } from "@/auth/auth.interfaces";
import { User } from "@/common/entities/users.entity";

export function makeTokenizedUser(user: User): ITokenizedUser {
  return {
    userId: user.id, 
    email: user.email,
    role: user.role,
    roleId : user.role === 'student' ? user.student.id : user.role === 'teacher' ? user.teacher.id : null,
  };
}
