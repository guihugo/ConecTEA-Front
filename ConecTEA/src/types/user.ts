import type { UserRole } from "./roles";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}
