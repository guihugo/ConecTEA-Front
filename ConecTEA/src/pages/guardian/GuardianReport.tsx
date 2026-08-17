import { useEffect, useState } from "react";


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


import { getLinkedPatient } from "@/services/guardian";
import { getReportsByPatient, type Report } from "@/services/report";


// Status de relatório (back-end): 1=Rascunho, 2=Gerado, 3=Revisado, 4=Aprovado, 5=Arquivado.
// Para o Responsável, escondemos rascunhos (ainda em elaboração) e arquivados.
const REPORT_DRAFT = 1;
const REPORT_ARCHIVED = 5;


// Tipos de relatório (back-end): 1=Sessão, 2=Progresso, 3=Avaliação.
function getReportTypeLabel(type: number): string {
    switch (type) {
        case 1:
            return "Sessão";
        case 2:
            return "Progresso";
        case 3:
            return "Avaliação";
        default:
            return "Relatório";
    }
}


function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("pt-BR");
}


export default function GuardianReports() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Relatório aberto na janela de detalhes
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);


    useEffect(() => {
        loadReports();
    }, []);


    async function loadReports() {
        try {
            const patient = await getLinkedPatient();
            const data = await getReportsByPatient(patient.id);


            // Mostra apenas relatórios finalizados (esconde rascunho e arquivado)
            const visible = data
                .filter(
                    (r) =>
                        r.status !== REPORT_DRAFT &&
                        r.status !== REPORT_ARCHIVED
                )
                .sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );


            setReports(visible);
        } catch (err) {
            console.error("Erro ao carregar relatórios", err);
            setError(
                "Não foi possível carregar os relatórios. Verifique se há um paciente vinculado."
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Relatórios
                </h1>


                <p className="text-muted-foreground">
                    Relatórios compartilhados pelo terapeuta responsável.
                    Clique em um card para ver os detalhes.
                </p>
            </div>


            {loading ? (
                <div className="rounded-lg border p-6">
                    Carregando...
                </div>
            ) : error ? (
                <div className="rounded-lg border p-6">
                    {error}
                </div>
            ) : reports.length === 0 ? (
                <div className="rounded-lg border p-6">
                    Nenhum relatório disponível ainda.
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {reports.map((report) => (
                        <button
                            key={report.id}
                            onClick={() => setSelectedReport(report)}
                            className="rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <h2 className="min-w-0 text-lg font-semibold break-words">
                                    {report.title}
                                </h2>


                                <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                                    {getReportTypeLabel(report.reportType)}
                                </span>
                            </div>


                            <p className="mt-2 text-sm text-muted-foreground">
                                {formatDate(report.createdAt)}
                            </p>
                        </button>
                    ))}
                </div>
            )}


            {/* Janela de detalhes (somente leitura) */}
            <Dialog
                open={selectedReport !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedReport(null);
                    }
                }}
            >
                <DialogContent className="max-w-2xl">
                    {selectedReport && (
                        <>
                            <DialogHeader className="min-w-0">
                                <DialogTitle className="min-w-0 break-words pr-6">
                                    {selectedReport.title}
                                </DialogTitle>
                            </DialogHeader>


                            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                                <div>
                                    <span className="text-muted-foreground">
                                        Tipo:{" "}
                                    </span>
                                    {getReportTypeLabel(
                                        selectedReport.reportType
                                    )}
                                </div>


                                <div>
                                    <span className="text-muted-foreground">
                                        Data:{" "}
                                    </span>
                                    {formatDate(selectedReport.createdAt)}
                                </div>
                            </div>


                            <div className="min-w-0 space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Conteúdo
                                </p>


                                <div
                                    className="
                                        max-h-96
                                        overflow-y-auto
                                        rounded-md
                                        border
                                        bg-muted/30
                                        p-4
                                        whitespace-pre-wrap
                                        [overflow-wrap:anywhere]
                                    "
                                >
                                    {selectedReport.content}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}