import api from "./api";


export interface CreateAppointmentRequest {


    patientId: string;
    startTime: string;
    endTime: string;
    notes: string;


}


// Resumo do paciente que vem dentro de cada atendimento
export interface AppointmentPatientSummary {
    id: string;
    fullName: string;
    age: number;
    gender: number;
    diagnosis: string | null;
}


// Formato do atendimento retornado pelo back-end.
// status: 1 = Agendado, 2 = Concluído, 3 = Cancelado, 4 = Faltou
export interface Appointment {
    id: string;
    patient: AppointmentPatientSummary;
    therapist: { id: string };
    startTime: string;
    endTime: string;
    status: number;
    notes: string | null;
}


// Busca todos os atendimentos do terapeuta logado.
export async function getTherapistAppointments(): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>(
        "/appointment/therapist"
    );


    return data;
}


// Busca o próximo atendimento do paciente vinculado ao Responsável logado.
// O back-end responde com erro quando não há próximo atendimento; nesse
// caso retornamos null para a tela tratar como "nenhuma sessão agendada".
export async function getGuardianNextAppointment(): Promise<Appointment | null> {
    try {
        const { data } = await api.get<Appointment>(
            "/appointment/guardian/next"
        );
        return data;
    } catch {
        return null;
    }
}


export async function createAppointment( request: CreateAppointmentRequest) {
    const { data } = await api.post(
        "/appointment",
        request
    );


    return data;
}


export async function getPatientAppointments(patientId: string) {
    const { data } = await api.get(
        `/Patient/appointment/${patientId}`
    );
    console.log(data)
    return data;
}