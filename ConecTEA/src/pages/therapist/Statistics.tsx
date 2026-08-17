import { useEffect, useMemo, useState } from "react";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import { getAllPatients, type Patient } from "@/services/patient";
import {
    getTherapistAppointments,
    type Appointment,
} from "@/services/appointment";
import { getAllReportsByTherapist, type Report } from "@/services/report";


// Status de atendimento (definidos no back-end):
// 1 = Agendado, 2 = Concluído, 3 = Cancelado, 4 = Faltou
const APPOINTMENT_SCHEDULED = 1;
const APPOINTMENT_COMPLETED = 2;
const APPOINTMENT_CANCELLED = 3;
const APPOINTMENT_NO_SHOW = 4;


// Calcula o status "efetivo" de um atendimento, replicando a mesma regra
// que o back-end usa na tela de histórico do paciente (GetEffectiveStatus):
// atendimento agendado cujo horário já passou é considerado concluído.
function getEffectiveStatus(appointment: Appointment): number {
    if (appointment.status === APPOINTMENT_CANCELLED) {
        return APPOINTMENT_CANCELLED;
    }
    if (appointment.status === APPOINTMENT_NO_SHOW) {
        return APPOINTMENT_NO_SHOW;
    }
    if (appointment.status === APPOINTMENT_COMPLETED) {
        return APPOINTMENT_COMPLETED;
    }


    // Está agendado: se já terminou, tratamos como concluído
    return new Date(appointment.endTime) < new Date()
        ? APPOINTMENT_COMPLETED
        : APPOINTMENT_SCHEDULED;
}


// Valor especial do seletor que representa "todos os pacientes"
const ALL_PATIENTS = "all";


// Quantos meses mostrar no gráfico "Atendimentos por mês"
const MONTHS_TO_SHOW = 6;


// Gera a lista dos últimos N meses (do mais antigo para o mais recente)
function getLastMonths(count: number) {
    const now = new Date();
    const months: { year: number; month: number; label: string }[] = [];


    for (let i = count - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);


        months.push({
            year: date.getFullYear(),
            month: date.getMonth(),
            label: date.toLocaleDateString("pt-BR", { month: "short" }),
        });
    }


    return months;
}


export default function Statistics() {


    const [patients, setPatients] = useState<Patient[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);


    // Paciente selecionado no filtro ("all" = agregado de todos)
    const [selectedPatientId, setSelectedPatientId] = useState<string>(ALL_PATIENTS);


    useEffect(() => {
        loadData();
    }, []);


    async function loadData() {
        try {
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
            console.error("Erro ao carregar estatísticas", error);
        } finally {
            setLoading(false);
        }
    }


    // Aplica o filtro de paciente aos atendimentos e relatórios
    const filteredAppointments = useMemo(() => {
        if (selectedPatientId === ALL_PATIENTS) {
            return appointments;
        }
        return appointments.filter(
            (a) => a.patient.id === selectedPatientId
        );
    }, [appointments, selectedPatientId]);


    const filteredReports = useMemo(() => {
        if (selectedPatientId === ALL_PATIENTS) {
            return reports;
        }
        return reports.filter(
            (r) => r.patientId === selectedPatientId
        );
    }, [reports, selectedPatientId]);


    // Métricas dos cards (recalculadas conforme o filtro).
    // Usamos o status "efetivo" para ficar coerente com a tela de histórico.
    const completedCount = filteredAppointments.filter(
        (a) => getEffectiveStatus(a) === APPOINTMENT_COMPLETED
    ).length;


    const scheduledCount = filteredAppointments.filter(
        (a) => getEffectiveStatus(a) === APPOINTMENT_SCHEDULED
    ).length;


    const reportsCount = filteredReports.length;


    // Dados reais do gráfico: atendimentos por mês (últimos meses)
    const monthlyData = useMemo(() => {
        const months = getLastMonths(MONTHS_TO_SHOW);


        return months.map((m) => {
            const count = filteredAppointments.filter((a) => {
                const date = new Date(a.startTime);
                return (
                    date.getFullYear() === m.year &&
                    date.getMonth() === m.month
                );
            }).length;


            return { ...m, count };
        });
    }, [filteredAppointments]);


    // Maior valor do gráfico (mínimo 1 para evitar divisão por zero)
    const maxMonthly = Math.max(...monthlyData.map((m) => m.count), 1);


    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Estatísticas</h1>
                </div>
                <div className="rounded-xl border p-6">
                    Carregando...
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6">


            {/* Cabeçalho + seletor de paciente */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Estatísticas
                    </h1>


                    <p className="text-muted-foreground">
                        Acompanhe indicadores dos seus pacientes e atendimentos.
                    </p>
                </div>


                <div className="w-full sm:w-64">
                    <Select
                        value={selectedPatientId}
                        onValueChange={setSelectedPatientId}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Todos os pacientes" />
                        </SelectTrigger>


                        <SelectContent>
                            <SelectItem value={ALL_PATIENTS}>
                                Todos os pacientes
                            </SelectItem>


                            {patients.map((patient) => (
                                <SelectItem
                                    key={patient.id}
                                    value={patient.id}
                                >
                                    {patient.fullName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>




            {/* Cards com dados reais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Sessões concluídas
                    </p>


                    <h2 className="text-3xl font-bold">
                        {completedCount}
                    </h2>
                </div>




                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Sessões agendadas
                    </p>


                    <h2 className="text-3xl font-bold">
                        {scheduledCount}
                    </h2>
                </div>




                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Relatórios
                    </p>


                    <h2 className="text-3xl font-bold">
                        {reportsCount}
                    </h2>
                </div>


            </div>




            {/* Gráfico real: atendimentos por mês */}
            <div className="rounded-xl border p-5">


                <h2 className="font-semibold text-lg mb-1">
                    Atendimentos por mês
                </h2>


                <p className="text-sm text-muted-foreground mb-4">
                    Quantidade de atendimentos realizados em cada mês.
                </p>


                <div className="flex gap-3">


                    {/* Rótulo do eixo Y (vertical) */}
                    <span className="self-center text-xs text-muted-foreground [writing-mode:vertical-rl] rotate-180">
                        Nº de atendimentos
                    </span>


                    {/* Barras */}
                    <div className="flex flex-1 items-end gap-4">
                        {monthlyData.map((m, index) => (
                            <div
                                key={index}
                                className="flex flex-1 flex-col items-center"
                            >
                                {/* Área da barra: número no topo, barra crescendo de baixo */}
                                <div className="flex h-40 w-full flex-col items-center justify-end">
                                    <span className="mb-1 text-xs font-medium">
                                        {m.count}
                                    </span>


                                    <div
                                        className="w-full rounded-t-lg bg-primary transition-all"
                                        style={{
                                            height: `${(m.count / maxMonthly) * 100}%`,
                                        }}
                                        title={`${m.label}: ${m.count} atendimento(s)`}
                                    />
                                </div>


                                <span className="mt-2 text-xs text-muted-foreground capitalize">
                                    {m.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>


            </div>




            {/*
                Seção de EXEMPLO (dados fictícios).
                Mantida propositalmente para demonstrar que a área de
                estatísticas pode ser expandida futuramente com novos
                indicadores. Os valores abaixo NÃO vêm do banco de dados.
            */}
            <div className="rounded-xl border border-dashed">


                <div className="p-5 border-b">
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-lg">
                            Evolução dos pacientes
                        </h2>


                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                            Exemplo · dados fictícios
                        </span>
                    </div>


                    <p className="mt-1 text-sm text-muted-foreground">
                        Visão de demonstração. Espaço reservado para futuros
                        indicadores de acompanhamento.
                    </p>
                </div>




                <div className="divide-y opacity-70">


                    <div className="p-5 flex justify-between">
                        <span>Maria Silva</span>
                        <span className="text-green-600">
                            ↑ 15%
                        </span>
                    </div>




                    <div className="p-5 flex justify-between">
                        <span>Pedro Oliveira</span>
                        <span className="text-green-600">
                            ↑ 8%
                        </span>
                    </div>


                </div>


            </div>


        </div>
    );
}