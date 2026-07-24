// components/patient/ReportsCard.tsx

import { useEffect, useState } from "react";

import ViewReportModal from "@/components/reports/ViewReportModal";

import {
    getReportsByPatient,
    type Report,
} from "@/services/report";

interface Props {
    patientId: string;
    patientName: string;
}

export default function ReportsCard({
    patientId,
    patientName,
}: Props) {

    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    useEffect(() => {
        getReportsByPatient(patientId).then(setReports);
    }, [patientId]);

    return (
        <>
            <div className="rounded-xl border bg-white p-6">

                <h2 className="mb-4 text-xl font-semibold">
                    Relatórios
                </h2>

                <div className="space-y-2">

                    {reports.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                            Nenhum relatório encontrado.
                        </p>
                    )}

                    {reports.map(report => (
                        <button
                            key={report.id}
                            onClick={() => setSelectedReport(report)}
                            className="w-full rounded-md border p-3 text-left hover:bg-muted"
                        >
                            <div className="font-medium">
                                {report.title}
                            </div>

                            <div className="text-sm text-muted-foreground">
                                {new Date(report.createdAt).toLocaleDateString("pt-BR")}
                            </div>
                        </button>
                    ))}

                </div>
            </div>

            {selectedReport && (
                <ViewReportModal
                    report={selectedReport}
                    patientName={patientName}
                    onClose={() => setSelectedReport(null)}
                />
            )}
        </>
    );
}