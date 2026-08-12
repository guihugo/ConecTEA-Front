export default function Statistics() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Estatísticas
                </h1>

                <p className="text-muted-foreground">
                    Acompanhe indicadores dos seus pacientes e atendimentos.
                </p>
            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Pacientes ativos
                    </p>

                    <h2 className="text-3xl font-bold">
                        24
                    </h2>
                </div>


                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Sessões realizadas
                    </p>

                    <h2 className="text-3xl font-bold">
                        128
                    </h2>
                </div>


                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Relatórios
                    </p>

                    <h2 className="text-3xl font-bold">
                        56
                    </h2>
                </div>


                <div className="rounded-xl border p-5">
                    <p className="text-sm text-muted-foreground">
                        Taxa de evolução
                    </p>

                    <h2 className="text-3xl font-bold">
                        82%
                    </h2>
                </div>

            </div>


            {/* Gráfico */}
            <div className="rounded-xl border p-5">

                <h2 className="font-semibold text-lg mb-4">
                    Atendimentos por mês
                </h2>


                <div className="h-48 flex items-end gap-4">

                    {[40, 70, 55, 90, 65, 80].map((height, index) => (
                        <div
                            key={index}
                            className="flex-1 bg-primary rounded-t-lg"
                            style={{
                                height: `${height}%`
                            }}
                        />
                    ))}

                </div>

            </div>


            {/* Evolução */}
            <div className="rounded-xl border">

                <div className="p-5 border-b">
                    <h2 className="font-semibold text-lg">
                        Evolução dos pacientes
                    </h2>
                </div>


                <div className="divide-y">

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