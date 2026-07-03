import type { UserRole } from "@/types/user";

export const Roles = {
  Therapist: 2,
  Guardian: 1,
} as const;

export const roleMap: Record<UserRole, number> = Roles;