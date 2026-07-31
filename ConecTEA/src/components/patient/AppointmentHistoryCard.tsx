import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getPatientAppointments } from "@/services/appointment";

interface Props {
    patientId: string;
    refreshKey?: number;
}

export default function AppointmentHistoryCard({
    patientId,refreshKey
}: Props){

    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        async function loadAppointments(){
            const data = await getPatientAppointments(patientId);
            setAppointments(data);
        }

        loadAppointments();
    }, [patientId, refreshKey]);


    return(
        <div className="rounded-xl border bg-white p-6">

            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">
                    Histórico
                </h2>

                <Button variant="outline">
                    Ver todas
                </Button>
            </div>


            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 text-left">
                            Data
                        </th>
                        <th className="text-left">
                            Tipo
                        </th>
                        <th className="text-left">
                            Status
                        </th>
                    </tr>
                </thead>


                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td className="py-3">
                                {new Date(
                                    appointment.startTime
                                ).toLocaleDateString("pt-BR")}
                            </td>

                            <td>
                                ABA
                            </td>

                            <td>
                                {appointment.status === 1
                                    ? "Agendada"
                                    : "Concluída"}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}