export interface PasswordCheckRequest {
  password: string;
}

export interface PasswordCheckResponse {
  result: boolean;
}

export interface LoginData {
  userEmail: string;
  userPassword: string;
}

export interface UserData extends LoginData {
  userName: string;
  userSurname: string;
  userPhoneNumber: string;
}

export interface NewPasswordData {
  newPassword: string;
  newPasswordRepeated: string;
  oldPassword: string;
}

export interface DefinitiveUserState extends UserState<UserData> {
  newPasswordData: NewPasswordData;
}

export interface UserState<Data> {
  data: Data;
  status: "succeeded" | "failed" | "pending";
  errorMessage: string;
  passwordCheckResult?: boolean | null;
}

export interface ProfileResponse extends UserData {
  id: number;
  roles: Role[];
}

export interface Role {
  id: number;
  roleDef: string;
}
