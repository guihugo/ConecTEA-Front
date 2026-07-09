import { useState } from "react";
import { Plus } from "lucide-react";
import CreatePatientModal from "./CreatePatientModal";

export default function Patients() {

    const [isCreateOpen, setIsCreateOpen] = useState(false);


    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Pacientes
                    </h1>

                    <p className="text-muted-foreground">
                        Gerencie os pacientes cadastrados.
                    </p>
                </div>


                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="
                        flex items-center gap-2
                        rounded-lg
                        bg-primary
                        px-4 py-2
                        text-primary-foreground
                        hover:opacity-90
                    "
                >
                    <Plus size={18} />

                    Cadastrar paciente

                </button>

            </div>


            {/* 
                Aqui futuramente entra:
                - tabela
                - cards
                - busca
                - filtros
            */}

            <div className="
                rounded-lg
                border
                bg-white
                p-6
            ">
                Nenhum paciente carregado.
            </div>



            {isCreateOpen && (
                <CreatePatientModal
                    onClose={() => setIsCreateOpen(false)}
                />
            )}

        </div>
    );
}