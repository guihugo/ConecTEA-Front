import type { UserRole } from "@/types/roles";

export const Roles = {
  Therapist: 2,
  Guardian: 1,
} as const;

export const roleMap: Record<UserRole, number> = Roles;

export const roleMapInverse = {
  1: "Guardian",
  2: "Therapist",
} as const;