import type { LoginResponse } from "@/services/auth";

const TOKEN_KEY = "conectea_token";
const SESSION = "conectea_session";

export function saveSession(session: LoginResponse) {
  localStorage.setItem(SESSION, JSON.stringify(session));
}

export function getSession() {
  const session = localStorage.getItem(SESSION);
  return session ? JSON.parse(session) : null;
}

export function removeSession() {
  localStorage.removeItem(SESSION);
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}