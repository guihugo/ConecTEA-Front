export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  token: string;
  role: number;
}

export interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
  role: number;
  dateOfBirth: string;
}

export interface SignUpResponse {
  userId: string;
  email: string;
}