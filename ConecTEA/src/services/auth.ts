import api from "./api";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: string;
  email: string;
  token: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

interface SignUpResponse {
  userId: string;
  email: string;
}


export async function login(data: LoginRequest): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}

export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {

  const response = await api.post<SignUpResponse>(
    "/auth/register",
    data
  );
  return response.data;
}