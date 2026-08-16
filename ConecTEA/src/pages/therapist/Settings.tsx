export default function Settings() {
    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    Configurações
                </h1>

                <p className="text-muted-foreground">
                    Gerencie sua conta e preferências.
                </p>
            </div>


            {/* Perfil */}
            <section className="rounded-xl border p-6 space-y-4">

                <h2 className="text-lg font-semibold">
                    Perfil
                </h2>


                <div className="grid gap-4 md:grid-cols-2">

                    <div>
                        <label className="text-sm">
                            Nome
                        </label>

                        <input
                            className="mt-1 w-full rounded-lg border p-2"
                            value="João da Silva"
                            readOnly
                        />
                    </div>


                    <div>
                        <label className="text-sm">
                            Email
                        </label>

                        <input
                            className="mt-1 w-full rounded-lg border p-2"
                            value="joao@email.com"
                            readOnly
                        />
                    </div>


                    <div>
                        <label className="text-sm">
                            Especialidade
                        </label>

                        <input
                            className="mt-1 w-full rounded-lg border p-2"
                            value="Psicólogo"
                            readOnly
                        />
                    </div>

                </div>


                <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
                    Salvar alterações
                </button>

            </section>



            {/* Segurança */}
            <section className="rounded-xl border p-6 space-y-4">

                <h2 className="text-lg font-semibold">
                    Segurança
                </h2>


                <button className="rounded-lg border px-4 py-2">
                    Alterar senha
                </button>

            </section>



            {/* Notificações */}
            <section className="rounded-xl border p-6 space-y-4">

                <h2 className="text-lg font-semibold">
                    Notificações
                </h2>


                <label className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    Lembretes de consultas
                </label>


                <label className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    Relatórios pendentes
                </label>


            </section>


        </div>
    );
}