import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { getPatientById, type Patient } from "@/services/patient";

import PatientHeader from "@/components/patient/PatientHeader";
import PatientInfoCard from "@/components/patient/PatientInfoCard";
import NextAppointmentCard from "@/components/patient/NextAppointmentCard";
import AppointmentHistoryCard from "@/components/patient/AppointmentHistoryCard";
import ReportsCard from "@/components/patient/ReportsCard";

export default function PatientDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPatient() {
            try {
                if (!id) return;
                console.log(id)
                const data = await getPatientById(id);

                setPatient(data);
            } finally {
                setLoading(false);
            }
        }

        loadPatient();
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!patient) {
        return <div>Paciente não encontrado.</div>;
    }

    return (
        <div className="mx-auto max-w-6xl p-6 space-y-6">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft size={18} />
                Voltar
            </button>

            <PatientHeader patient={patient} />

            <PatientInfoCard patient={patient} />

            <div className="grid gap-6 lg:grid-cols-2">

                <NextAppointmentCard patientId={patient.id} />

                <ReportsCard
                    patientId={patient.id}
                    patientName={patient.fullName}
                />

            </div>

            <AppointmentHistoryCard patientId={patient.id} />

        </div>
    );
}