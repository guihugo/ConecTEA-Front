import { Button } from "@/components/ui/button";

interface Props {
    patientId: string;
}

export default function AppointmentHistoryCard({
    patientId,
}: Props){

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

                    <tr>

                        <td className="py-3">
                            20/07
                        </td>

                        <td>
                            ABA
                        </td>

                        <td>
                            Concluída
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    );

}