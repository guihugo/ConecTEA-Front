import { useEffect, useState } from "react";

import { hasLinkedPatient } from "@/services/guardian";
import { acceptInvitation } from "@/services/invitation";

export default function GuardianDashboard() {
    const [hasLinked, setHasLinked] = useState<boolean | null>(null);
    const [showInviteInput, setShowInviteInput] = useState(false);
    const [inviteCode, setInviteCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const response = await hasLinkedPatient();
            setHasLinked(response);
        }

        load();
    }, []);

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

    const patient = {
        name: "João Silva",
        age: 8,
        therapist: "Dra. Maria Souza",
        nextAppointment: "Hoje, 15:00",
        lastReport: "12/07/2026",
        reportsThisMonth: 6,
        sessionsThisMonth: 8,
        observations: [
            "Apresentou melhora na comunicação verbal.",
            "Participou melhor das atividades propostas."
        ]
    };

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
                <>
                    {/* Paciente */}
                    <div className="rounded-lg border p-6">
                        <h2 className="text-xl font-semibold">
                            {patient.name}
                        </h2>

                        <p className="text-muted-foreground">
                            {patient.age} anos
                        </p>

                        <p className="mt-2">
                            Terapeuta responsável:{" "}
                            <strong>{patient.therapist}</strong>
                        </p>
                    </div>


                    {/* Resumo */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-muted-foreground">
                                Próxima sessão
                            </p>
                            <p className="text-lg font-semibold">
                                {patient.nextAppointment}
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-muted-foreground">
                                Relatórios este mês
                            </p>

                            <p className="text-lg font-semibold">
                                {patient.reportsThisMonth}
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-muted-foreground">
                                Sessões realizadas
                            </p>

                            <p className="text-lg font-semibold">
                                {patient.sessionsThisMonth}
                            </p>
                        </div>
                    </div>


                    {/* Último relatório */}
                    <div className="rounded-lg border p-6">
                        <h2 className="text-xl font-semibold">
                            Último relatório
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Atualizado em {patient.lastReport}
                        </p>

                        <button className="mt-4 rounded-md bg-primary px-4 py-2 text-white">
                            Visualizar relatório
                        </button>
                    </div>


                    {/* Observações */}
                    <div className="rounded-lg border p-6">
                        <h2 className="text-xl font-semibold">
                            Últimas observações
                        </h2>

                        <ul className="mt-3 list-disc pl-5 space-y-2">
                            {patient.observations.map((item) => (
                                <li key={item}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Ações */}
                    <div className="flex gap-3">
                        <button className="rounded-md bg-primary px-4 py-2 text-white">
                            Ver relatórios
                        </button>

                        <button className="rounded-md border px-4 py-2">
                            Ver calendário
                        </button>
                    </div>
                </>
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