import api from "./api";

export interface CreateAppointmentRequest {

    patientId: string;
    startTime: string;
    endTime: string;
    notes: string;

}

export async function createAppointment( request: CreateAppointmentRequest
) {
    const { data } = await api.post(
        "/appointment",
        request
    );

    return data;
}