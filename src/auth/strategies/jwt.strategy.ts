import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { IJwtPayload, ITokenizedUser } from "@/auth/auth.interfaces";

import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: IJwtPayload): Promise<ITokenizedUser> {
    const user = await this.authService.checkUserExists(payload.userId);

    if (!user) throw new UnauthorizedException("User not found");

    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      roleId: user.role === 'student' ? user.student.id : user.role === 'teacher' ? user.teacher.id : null
    };
  }
}
