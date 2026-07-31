import api from "@/services/api";
import type { Patient } from "./patient";

export async function hasLinkedPatient(): Promise<boolean> {
    const { data } = await api.get("/invitations/linked-patient");

    return data.hasLinkedPatient;
}

export async function getLinkedPatient(): Promise<Patient>
{
    const {data} = await api.get("/Patient/my")
    return data
}