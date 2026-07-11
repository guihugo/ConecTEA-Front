import api from "./api";

export interface AcceptInvitationRequest {
  code: string;
}

export interface AcceptInvitationResponse {
  patientId: string;
}

export async function acceptInvitation(
  request: AcceptInvitationRequest
): Promise<AcceptInvitationResponse> {
  const { data } = await api.put<AcceptInvitationResponse>(
    "/invitations/accept",
    request
  );

  return data;
}