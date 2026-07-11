import api from "@/services/api";

export async function hasLinkedPatient(): Promise<boolean> {
    const { data } = await api.get("/invitations/linked-patient");

    return data.hasLinkedPatient;
}