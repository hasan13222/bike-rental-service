import { USER_ROLE } from "./user.contsts";

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
}

export type TUserLoginDetails = {  
  email: string;
  password: string;
}