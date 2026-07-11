import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CreatePatientModal from "./CreatePatientModal";
import PatientCard from "./PatientCard";
import { getAllPatients, type Patient } from "@/services/patient";



export default function Patients() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPatients();
    }, []);

    async function loadPatients() {
        try {
            const data = await getAllPatients();
            console.log("Patientes:", data);
            setPatients(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

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

            {loading ? (
                <div className="rounded-lg border bg-white p-6">
                    Carregando...
                </div>
            ) : patients.length === 0 ? (
                <div className="rounded-lg border bg-white p-6">
                    Nenhum paciente encontrado.
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {patients.map((patient) => (
                        <PatientCard
                            key={patient.id}
                            patient={patient}
                        />
                    ))}
                </div>
            )}

            {isCreateOpen && (
                <CreatePatientModal
                    onClose={() => setIsCreateOpen(false)}
                />
            )}
        </div>
    );
}