import api from "./api";

export interface CreateReportRequest {
    patientId: string;
    title: string;
    reportType: number;
    content: string
}

export interface UpdateReportRequest{
    title: string;
    content: string;
    reportType: number;
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
export async function deleteReport(id: string): Promise<void> {
    await api.delete(`/reports/${id}`);
}


export async function updateReport(id: string, request: CreateReportRequest) : Promise<void> {
    console.log("Id:", id)
    await api.put(
        `/reports/${id}`,
        request
    );
}

export async function getOneReport(id: string): Promise<Report> {
    const { data } = await api.get<any>(`/reports/${id}`);

    return {
        ...data,
        content: data.encryptedContent,
    };
}