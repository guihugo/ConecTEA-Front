import { useState } from "react";

import { Button } from "@/components/ui/button";

import type { Patient } from "@/services/patient";

import CreateAppointmentDialog from "./CreateAppointmentDialog";

interface Props {
    patient: Patient;
}

export default function PatientHeader({ patient }: Props) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between rounded-xl border bg-white p-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        {patient.fullName}
                    </h1>

                    <p className="text-muted-foreground">
                        {patient.diagnosis}
                    </p>

                </div>

                <div className="flex gap-2">

                    <Button variant="outline">
                        Editar
                    </Button>

                    <Button onClick={() => setOpen(true)}>
                        Nova consulta
                    </Button>

                </div>

            </div>

            <CreateAppointmentDialog
                patientId={patient.id}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}