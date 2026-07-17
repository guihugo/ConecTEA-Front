import api from "./api";

export interface CreateReportRequest {
    patientId: string;
    title: string;
    reportType: number;
    content: string
}

export interface CreateReportResponse {
    reportId: string;
}
export interface Report {
    id: string;
    patientId: string;
    title: string;
    reportType: number;
    status: number;
    content: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string | null;
}


export async function createReport(request: CreateReportRequest): Promise<CreateReportResponse> {
  const { data } = await api.post<CreateReportResponse>(
    "/reports", request
  );

  return data;
}

export async function getReportsByPatient(patientId: string): Promise<Report[]> {

    const { data } = await api.get<Report[]>(
        `/reports/patient/${patientId}`
    );

    return data;
}

export async function getAllReportsByTherapist() : Promise<Report[]> {
    const {data} = await api.get<Report[]>(
        `/reports`
    );
    return data;
}