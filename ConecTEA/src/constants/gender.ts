import type { Gender } from "@/types/gender";

export const Genders = {
  Male: 1,
  Female: 2,
  Other: 3,
  PreferNotToSay: 4,
} as const;

export const genderMap: Record<Gender, number> = Genders;

export const genderMapInverse = {
  1: "Male",
  2: "Female",
  3: "Other",
  4: "PreferNotToSay",
} as const;

export const genderLabels: Record<Gender, string> = {
  Male: "Masculino",
  Female: "Feminino",
  Other: "Outro",
  PreferNotToSay: "Prefiro não informar",
};