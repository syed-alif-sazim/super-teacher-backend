import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";

import { User } from "@/common/entities/users.entity";
import { ResponseTransformInterceptor } from "@/common/interceptors/response-transform.interceptor";

import { CreateUserDto, LoginResponseDto } from "./auth.dtos";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { makeTokenizedUser } from "./auth.helpers";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const res = await this.authService.registerUser(createUserDto);

    return res;

  }

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ResponseTransformInterceptor)
  @Post("login")
  async login(@CurrentUser() user: User): Promise<LoginResponseDto> {
    const accessToken = await this.authService.createAccessToken(user);
    console.log('acces token',accessToken)
    return {
      accessToken,
      user: makeTokenizedUser(user),
    };
  }
}
