import type { Patient } from "@/services/patient";
import {
    Calendar,
    User,
    ClipboardList
} from "lucide-react";



interface Props {
    patient: Patient;
}

const genderMap: Record<number, string> = {
    1: "Masculino",
    2: "Feminino",
    3: "Outro",
    4: "Prefiro não informar",
};

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pt-BR");
}

export default function PatientCard({ patient }: Props) {
    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
            <h2 className="text-lg font-semibold">
                {patient.fullName}
            </h2>

            <p className="mt-1 text-sm text-primary font-medium">
                {patient.diagnosis}
            </p>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">

                <div className="flex items-center gap-2">
                    <User size={16} />
                    {genderMap[patient.gender]}
                </div>

                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(patient.birthDate)}
                </div>

                <div className="flex items-start gap-2">
                    <ClipboardList
                        size={16}
                        className="mt-0.5"
                    />

                    <span>
                        {patient.observation}
                    </span>
                </div>

            </div>

            <button
                className="
                    mt-6
                    w-full
                    rounded-lg
                    border
                    py-2
                    text-sm
                    font-medium
                    transition
                    hover:bg-muted
                "
            >
                Ver detalhes
            </button>
        </div>
    );
}