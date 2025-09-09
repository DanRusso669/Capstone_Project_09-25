export interface LoginData {
  email: string;
  password: string;
}

export interface UserData extends LoginData {
  name: string;
  surname: string;
  phoneNumber: string;
}

export interface UserState<Data> {
  data: Data;
  status: "succeeded" | "failed" | "pending";
  errorMessage: string;
}

export interface ProfileResponse extends UserData {
  id: number;
  roles: Role[];
}

export interface Role {
  id: number;
  roleDef: string;
}
