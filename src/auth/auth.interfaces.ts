import { EUserRole } from "@/common/enums/roles.enums";

export interface IJwtPayload {
  userId: number;  
  email: string; 
  role: string;
  roleId : number | null;
}

export interface ITokenizedUser extends Omit<IJwtPayload, "sub"> {
  userId: number;  
  email: string; 
  role: string;
  roleId : number | null;
}
