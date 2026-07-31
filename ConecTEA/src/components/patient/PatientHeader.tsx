import { useState } from "react";

import { Button } from "@/components/ui/button";

import type { Patient } from "@/services/patient";

import CreateAppointmentDialog from "./CreateAppointmentDialog";
import CreateReportModal from "@/components/reports/CreateReportModal";

interface Props {
    patient: Patient;
    onReportCreated?: () => void;
    onAppointmentCreated: () => void;
}

export default function PatientHeader({ patient, onReportCreated, onAppointmentCreated,}: Props) {

    const [open, setOpen] = useState(false);
    const [reportModalOpen, setReportModalOpen] = useState(false);

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

                    <Button
                        variant="outline"
                        onClick={() => setReportModalOpen(true)}
                    >
                        Novo relatório
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
                onCreated={onAppointmentCreated}
            />

            {reportModalOpen && (
                <CreateReportModal
                    patient={patient}
                    onClose={() => setReportModalOpen(false)}
                    onCreated={onReportCreated}
                />
            )}
        </>
    );
}