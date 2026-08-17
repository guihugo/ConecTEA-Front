import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { getAllPatients, type Patient } from "@/services/patient";
import {
    getTherapistAppointments,
    type Appointment,
} from "@/services/appointment";
import { getAllReportsByTherapist, type Report } from "@/services/report";


// Status de atendimento (definidos no back-end): 1 = Agendado
const APPOINTMENT_SCHEDULED = 1;


// Status de relatório (back-end): 1=Rascunho, 2=Gerado, 3=Revisado, 4=Aprovado, 5=Arquivado.
// Consideramos "pendente" tudo que ainda não foi aprovado nem arquivado.
const REPORT_APPROVED = 4;
const REPORT_ARCHIVED = 5;


function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}


// Formata quando o atendimento acontece: "Hoje às 14:00" ou "05/09/2026 às 14:00"
function formatAppointmentWhen(startTime: string) {
    const date = new Date(startTime);
    const time = date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });


    if (isSameDay(date, new Date())) {
        return `Hoje às ${time}`;
    }


    const day = date.toLocaleDateString("pt-BR");
    return `${day} às ${time}`;
}


export default function TherapistDashboard() {
    const navigate = useNavigate();


    const [patients, setPatients] = useState<Patient[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadDashboard();
    }, []);


    async function loadDashboard() {
        try {
            // Busca os 3 conjuntos de dados em paralelo
            const [patientsData, appointmentsData, reportsData] =
                await Promise.all([
                    getAllPatients(),
                    getTherapistAppointments(),
                    getAllReportsByTherapist(),
                ]);


            setPatients(patientsData);
            setAppointments(appointmentsData);
            setReports(reportsData);
        } catch (error) {
            console.error("Erro ao carregar o dashboard", error);
        } finally {
            setLoading(false);
        }
    }


    const now = new Date();


    // Card 1: total de pacientes do terapeuta
    const patientsCount = patients.length;


    // Card 2: atendimentos agendados para hoje
    const appointmentsToday = appointments.filter(
        (a) =>
            a.status === APPOINTMENT_SCHEDULED &&
            isSameDay(new Date(a.startTime), now)
    ).length;


    // Card 3: relatórios pendentes (ainda não aprovados nem arquivados)
    const pendingReports = reports.filter(
        (r) => r.status !== REPORT_APPROVED && r.status !== REPORT_ARCHIVED
    ).length;


    // Lista: próximos atendimentos agendados (a partir de agora), ordenados por data
    const upcomingAppointments = appointments
        .filter(
            (a) =>
                a.status === APPOINTMENT_SCHEDULED &&
                new Date(a.startTime) >= now
        )
        .sort(
            (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
        )
        .slice(0, 5);


    // Lista: pacientes mais recentes (cadastrados por último)
    const recentPatients = [...patients]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(0, 5);


    return (
        <div className="space-y-6">


            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>


                <p className="text-muted-foreground">
                    Bem-vindo ao ConecTEA. Aqui está o resumo dos seus atendimentos.
                </p>
            </div>


            {loading ? (
                <div className="rounded-xl border bg-card p-6">
                    Carregando...
                </div>
            ) : (
                <>
                    {/* Cards resumo */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                        <div className="rounded-xl border bg-card p-5">
                            <p className="text-sm text-muted-foreground">
                                Pacientes
                            </p>


                            <h2 className="text-3xl font-bold mt-2">
                                {patientsCount}
                            </h2>
                        </div>




                        <div className="rounded-xl border bg-card p-5">
                            <p className="text-sm text-muted-foreground">
                                Atendimentos hoje
                            </p>


                            <h2 className="text-3xl font-bold mt-2">
                                {appointmentsToday}
                            </h2>
                        </div>




                        <div className="rounded-xl border bg-card p-5">
                            <p className="text-sm text-muted-foreground">
                                Relatórios pendentes
                            </p>


                            <h2 className="text-3xl font-bold mt-2">
                                {pendingReports}
                            </h2>
                        </div>


                    </div>




                    {/* Próximos atendimentos */}
                    <div className="rounded-xl border bg-card">


                        <div className="p-5 border-b">
                            <h2 className="font-semibold text-lg">
                                Próximos atendimentos
                            </h2>
                        </div>




                        {upcomingAppointments.length === 0 ? (
                            <div className="p-5 text-muted-foreground">
                                Nenhum atendimento agendado.
                            </div>
                        ) : (
                            <div className="divide-y">
                                {upcomingAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="flex justify-between items-center p-5"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {appointment.patient.fullName}
                                            </p>


                                            <p className="text-sm text-muted-foreground">
                                                {formatAppointmentWhen(
                                                    appointment.startTime
                                                )}
                                                {appointment.notes
                                                    ? ` • ${appointment.notes}`
                                                    : ""}
                                            </p>
                                        </div>




                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/therapist/patients/${appointment.patient.id}`
                                                )
                                            }
                                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
                                        >
                                            Ver paciente
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>




                    {/* Pacientes recentes */}
                    <div className="rounded-xl border bg-card p-5">


                        <h2 className="font-semibold text-lg mb-4">
                            Pacientes recentes
                        </h2>




                        {recentPatients.length === 0 ? (
                            <p className="text-muted-foreground">
                                Nenhum paciente cadastrado.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {recentPatients.map((patient) => (
                                    <div
                                        key={patient.id}
                                        className="flex justify-between"
                                    >
                                        <span>
                                            {patient.fullName}
                                        </span>


                                        <span className="text-green-600">
                                            Ativo
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>
                </>
            )}


        </div>
    );
}