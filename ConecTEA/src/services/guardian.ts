import api from "@/services/api";
import type { Patient } from "./patient";


export async function hasLinkedPatient(): Promise<boolean> {
    const { data } = await api.get("/invitations/linked-patient");


    return data.hasLinkedPatient;
}


export async function getLinkedPatient(): Promise<Patient>
{
    // Endpoint do Responsável que devolve o paciente vinculado à conta.
    const {data} = await api.get("/guardian/patient")
    return data
}


export interface TherapistSummary {
    id: string;
    fullName: string;
}


// Terapeuta responsável pelo paciente vinculado (retorna null se não houver).
export async function getPatientTherapist(): Promise<TherapistSummary | null> {
    try {
        const { data } = await api.get<TherapistSummary>("/guardian/therapist");
        return data;
    } catch {
        return null;
    }
}


export interface SessionsSummary {
    completed: number;
    total: number;
}


// Resumo de sessões (realizadas e total) do paciente vinculado.
export async function getSessionsSummary(): Promise<SessionsSummary> {
    const { data } = await api.get<SessionsSummary>("/guardian/sessions");
    return data;
}