import { useEffect, useState } from "react";
import { getPatientAppointments } from "@/services/appointment";

interface Props {
    patientId: string;
    refreshKey?: number;
}

interface Appointment {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
    notes: string;
    patient: {
        id: string;
        fullName: string;
    };
    therapist: {
        id: string;
        fullName: string;
    };
}

export default function NextAppointmentCard({
    patientId,
    refreshKey
}: Props) {

    const [appointment, setAppointment] = useState<Appointment | null>(null);

    useEffect(() => {
        async function loadAppointment() {
            const data = await getPatientAppointments(patientId);

            console.log(data)
            setAppointment(data[0]);
        }

        loadAppointment();
    }, [patientId, refreshKey]);


    if (!appointment) {
        return (
            <div className="rounded-xl border bg-white p-6">
                <h2 className="font-semibold mb-4">
                    Próxima consulta
                </h2>

                <p>Nenhuma consulta encontrada</p>
            </div>
        );
    }


    const date = new Date(appointment.startTime);


    return (
        <div className="rounded-xl border bg-white p-6">
            <h2 className="font-semibold mb-4">
                Próxima consulta
            </h2>

            <div className="space-y-2">
                <p>
                    📅 {date.toLocaleDateString("pt-BR")}
                </p>

                <p>
                    🕒 {date.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>

                <p>
                    {appointment.notes ?? "Sessão"}
                </p>
            </div>

        </div>
    );
}