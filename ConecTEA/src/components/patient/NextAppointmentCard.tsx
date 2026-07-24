interface Props {
    patientId: string;
}

export default function NextAppointmentCard({
    patientId,
}: Props){

    return(

        <div className="rounded-xl border bg-white p-6">

            <h2 className="font-semibold mb-4">
                Próxima consulta
            </h2>

            <div className="space-y-2">

                <p>📅 25/07/2026</p>

                <p>🕒 15:00</p>

                <p>Sessão ABA</p>

            </div>

        </div>

    );

}