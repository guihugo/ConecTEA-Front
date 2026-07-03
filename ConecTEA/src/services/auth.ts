import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/auth";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
  const response = await api.post<SignUpResponse>("/auth/register", data);
  return response.data;
}