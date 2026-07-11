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


export async function login(data: LoginRequest): Promise<LoginResponse> {

  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
}