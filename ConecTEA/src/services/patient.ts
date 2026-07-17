import api from "./api";

export interface Patient {
  id: string;
  fullName: string;
  birthDate: string;
  gender: number;
  diagnosis: string;
  observation: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientRequest {
  fullName: string;
  birthDate: string;
  gender: number;
  diagnosis: string;
  observation: string;
}

export interface CreatePatientResponse {
  patientId: string;
  invitationCode: string;
}

export async function createPatient(request: CreatePatientRequest): Promise<CreatePatientResponse> {
  const { data } = await api.post<CreatePatientResponse>(
    "/Patient", request
  );

  return data;
}

export async function getAllPatients(): Promise<Patient[]> {
  const { data } = await api.get<Patient[]>(
    "/Patient/therapist/patients" 
  ); 
    
  return data;
}