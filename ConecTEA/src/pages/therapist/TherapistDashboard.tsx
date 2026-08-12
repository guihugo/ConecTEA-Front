export default function TherapistDashboard() {
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


            {/* Cards resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Pacientes
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        24
                    </h2>
                </div>


                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Atendimentos hoje
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        5
                    </h2>
                </div>


                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Relatórios pendentes
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        3
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


                <div className="divide-y">

                    <div className="flex justify-between items-center p-5">
                        <div>
                            <p className="font-medium">
                                Maria Silva
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Hoje às 14:00 • Acompanhamento
                            </p>
                        </div>


                        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                            Ver paciente
                        </button>

                    </div>


                    <div className="flex justify-between items-center p-5">

                        <div>
                            <p className="font-medium">
                                Pedro Oliveira
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Hoje às 15:30 • Avaliação
                            </p>
                        </div>


                        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                            Ver paciente
                        </button>

                    </div>

                </div>

            </div>


            {/* Pacientes recentes */}
            <div className="rounded-xl border bg-card p-5">

                <h2 className="font-semibold text-lg mb-4">
                    Pacientes recentes
                </h2>


                <div className="space-y-3">

                    <div className="flex justify-between">
                        <span>
                            Maria Silva
                        </span>

                        <span className="text-green-600">
                            Ativo
                        </span>
                    </div>


                    <div className="flex justify-between">
                        <span>
                            Pedro Oliveira
                        </span>

                        <span className="text-green-600">
                            Ativo
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
}