import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import {
    getLinkedPatient,
    hasLinkedPatient,
    getPatientTherapist,
    getSessionsSummary,
    type TherapistSummary,
    type SessionsSummary,
} from "@/services/guardian";
import { acceptInvitation } from "@/services/invitation";
import type { Patient } from "@/services/patient";
import {
    getGuardianNextAppointment,
    type Appointment,
} from "@/services/appointment";
import { getReportsByPatient, type Report } from "@/services/report";


// Calcula a idade a partir da data de nascimento.
// Subtrai 1 ano se o aniversário ainda não aconteceu neste ano.
function calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();


    let age = today.getFullYear() - birth.getFullYear();


    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();


    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }


    return age;
}


// Formata data/hora do atendimento: "Hoje às 15:00" ou "05/09/2026 às 15:00"
function formatAppointmentWhen(startTime: string): string {
    const date = new Date(startTime);
    const today = new Date();


    const time = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });


    const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();


    if (isToday) {
        return `Hoje às ${time}`;
    }


    return `${date.toLocaleDateString("pt-BR")} às ${time}`;
}


export default function GuardianDashboard() {
    const navigate = useNavigate();


    const [hasLinked, setHasLinked] = useState<boolean | null>(null);


    // Dados reais do paciente vinculado
    const [patient, setPatient] = useState<Patient | null>(null);
    const [therapist, setTherapist] = useState<TherapistSummary | null>(null);
    const [sessions, setSessions] = useState<SessionsSummary | null>(null);
    const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [patientLoading, setPatientLoading] = useState(false);


    // Fluxo de convite
    const [showInviteInput, setShowInviteInput] = useState(false);
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function load() {
            const response = await hasLinkedPatient();
            setHasLinked(response);


            if (response) {
                await loadPatientData();
            }
        }


        load();
    }, []);


    // Carrega paciente, próximo atendimento e relatórios reais
    async function loadPatientData() {
        setPatientLoading(true);


        try {
            const patientData = await getLinkedPatient();
            setPatient(patientData);


            const [next, patientReports, therapistData, sessionsData] =
                await Promise.all([
                    getGuardianNextAppointment(),
                    getReportsByPatient(patientData.id).catch(() => []),
                    getPatientTherapist(),
                    getSessionsSummary().catch(() => ({
                        completed: 0,
                        total: 0,
                    })),
                ]);


            setNextAppointment(next);
            setReports(patientReports);
            setTherapist(therapistData);
            setSessions(sessionsData);
        } catch (err) {
            console.error("Erro ao carregar dados do paciente", err);
        } finally {
            setPatientLoading(false);
        }
    }


    async function handleAcceptInvitation() {
        if (!inviteCode.trim()) return;


        try {
            setLoading(true);
            setMessage(null);
            setError(null);


            await acceptInvitation({
                code: inviteCode
            });


            setMessage("Paciente vinculado com sucesso! 🎉");
            setHasLinked(true);
            await loadPatientData();
        } catch (error) {
            console.error("Erro ao aceitar convite:", error);
            setError("Não foi possível vincular o paciente. Verifique o código.");
        } finally {
            setLoading(false);
        }
    }


    if (hasLinked === null) {
        return <div>Carregando...</div>;
    }


    // Métricas reais dos relatórios
    const now = new Date();


    const reportsThisMonth = reports.filter((r) => {
        const created = new Date(r.createdAt);
        return (
            created.getFullYear() === now.getFullYear() &&
            created.getMonth() === now.getMonth()
        );
    }).length;


    const latestReport =
        reports.length > 0
            ? [...reports].sort(
                  (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
              )[0]
            : null;


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>


            {message && (
                <div className="rounded-md border border-green-500 bg-green-50 p-3 text-green-700">
                    {message}
                </div>
            )}


            {error && (
                <div className="rounded-md border border-red-500 bg-red-50 p-3 text-red-700">
                    {error}
                </div>
            )}


            {hasLinked ? (
                patientLoading || !patient ? (
                    <div className="rounded-lg border p-6">
                        Carregando dados do paciente...
                    </div>
                ) : (
                    <>
                        {/* Paciente */}
                        <div className="rounded-lg border p-6">
                            <h2 className="text-xl font-semibold">
                                {patient.fullName}
                            </h2>


                            <p className="text-muted-foreground">
                                {calculateAge(patient.birthDate)} anos
                            </p>


                            {patient.diagnosis && (
                                <p className="mt-2">
                                    Diagnóstico:{" "}
                                    <strong>{patient.diagnosis}</strong>
                                </p>
                            )}


                            {therapist?.fullName && (
                                <p className="mt-1">
                                    Terapeuta responsável:{" "}
                                    <strong>{therapist.fullName}</strong>
                                </p>
                            )}
                        </div>




                        {/* Resumo */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Próxima sessão
                                </p>
                                <p className="text-lg font-semibold">
                                    {nextAppointment
                                        ? formatAppointmentWhen(
                                              nextAppointment.startTime
                                          )
                                        : "Nenhuma agendada"}
                                </p>
                            </div>


                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Sessões realizadas
                                </p>


                                <p className="text-lg font-semibold">
                                    {sessions?.completed ?? 0}
                                </p>
                            </div>


                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Relatórios este mês
                                </p>


                                <p className="text-lg font-semibold">
                                    {reportsThisMonth}
                                </p>
                            </div>


                            <div className="rounded-lg border p-4">
                                <p className="text-sm text-muted-foreground">
                                    Total de relatórios
                                </p>


                                <p className="text-lg font-semibold">
                                    {reports.length}
                                </p>
                            </div>
                        </div>




                        {/* Último relatório */}
                        <div className="rounded-lg border p-6">
                            <h2 className="text-xl font-semibold">
                                Último relatório
                            </h2>


                            {latestReport ? (
                                <>
                                    <p className="mt-2 text-muted-foreground">
                                        Atualizado em{" "}
                                        {new Date(
                                            latestReport.createdAt
                                        ).toLocaleDateString("pt-BR")}
                                    </p>


                                    <button
                                        onClick={() =>
                                            navigate("/guardian/reports")
                                        }
                                        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
                                    >
                                        Visualizar relatório
                                    </button>
                                </>
                            ) : (
                                <p className="mt-2 text-muted-foreground">
                                    Nenhum relatório disponível ainda.
                                </p>
                            )}
                        </div>




                        {/* Observações */}
                        <div className="rounded-lg border p-6">
                            <h2 className="text-xl font-semibold">
                                Observações
                            </h2>


                            <p className="mt-3 text-muted-foreground">
                                {patient.observation
                                    ? patient.observation
                                    : "Nenhuma observação registrada."}
                            </p>
                        </div>




                        {/* Ações */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate("/guardian/reports")}
                                className="rounded-md bg-primary px-4 py-2 text-white"
                            >
                                Ver relatórios
                            </button>
                        </div>
                    </>
                )
            ) : (
                <div className="rounded-lg border p-6 space-y-4">
                    <h2 className="text-xl font-semibold">
                        Adicione um paciente
                    </h2>


                    <p className="text-muted-foreground">
                        Você ainda não possui nenhum paciente vinculado à sua conta.
                        Solicite o código de convite ao terapeuta responsável para
                        acompanhar os relatórios e informações do paciente.
                    </p>


                    {!showInviteInput ? (
                        <button
                            className="rounded-md bg-primary px-4 py-2 text-white"
                            onClick={() => setShowInviteInput(true)}
                        >
                            Inserir código de convite
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Código do convite"
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                            />


                            <button
                                className="rounded-md bg-primary px-4 py-2 text-white"
                                onClick={handleAcceptInvitation}
                                disabled={loading}
                            >
                                {loading
                                    ? "Vinculando..."
                                    : "Vincular paciente"}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}