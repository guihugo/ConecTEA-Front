import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Badge,
} from "@/components/ui/badge";

import CreateReportModal from "@/components/reports/CreateReportModal";
import ViewReportModal from "@/components/reports/ViewReportModal";

import {
    getAllPatients,
    type Patient,
} from "@/services/patient";

import {
    getAllReportsByTherapist,
    type Report,
} from "@/services/report";


export default function Reports() {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedPatient, setSelectedPatient] =
        useState<Patient | null>(null);


    useEffect(() => {
        loadData();
    }, []);


    async function loadData() {

        try {

            const [patientsData, reportsData] = await Promise.all([
                getAllPatients(),
                getAllReportsByTherapist(),
            ]);

            setPatients(patientsData);
            setReports(reportsData);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }


    function getPatientName(patientId: string) {

        return (
            patients.find(
                patient => patient.id === patientId
            )?.fullName ?? "-"
        );

    }


    function getReportType(type: number) {

        switch (type) {

            case 1:
                return "Sessão";
            case 2:
                return "Avaliação";
            default:
                return "Outro";
        }
    }


    function getStatus(status: number) {

        switch (status) {
            case 1:
                return "Rascunho";
            case 2:
                return "Concluído";
            default:
                return "Desconhecido";
        }

    }


    return (

        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold">
                        Relatórios
                    </h1>

                    <p className="text-muted-foreground">
                        Gerencie os relatórios dos pacientes.
                    </p>
                </div>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button disabled={loading}>
                            <Plus className="mr-2 h-4 w-4" />
                            Criar relatório
                        </Button>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent
                        align="end"
                        className="w-56"
                    >

                        {
                            patients.length === 0 ? (
                                <DropdownMenuItem disabled>
                                    Nenhum paciente encontrado
                                </DropdownMenuItem>
                            ) : (
                                patients.map(patient => (
                                    <DropdownMenuItem
                                        key={patient.id}
                                        onClick={() =>
                                            setSelectedPatient(patient)
                                        }
                                    >
                                        {patient.fullName}
                                    </DropdownMenuItem>
                                ))
                            )
                        }
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            {
                loading ? (
                    <div className="rounded-lg border bg-white p-6">
                        Carregando...
                    </div>
                ) : reports.length === 0 ? (
                    <div className="rounded-lg border bg-white p-6">
                        Nenhum relatório encontrado.
                    </div>

                ) : (
                    <div className="rounded-lg border bg-white">

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Paciente
                                    </TableHead>
                                    <TableHead>
                                        Título
                                    </TableHead>
                                    <TableHead>
                                        Tipo
                                    </TableHead>
                                    <TableHead>
                                        Status
                                    </TableHead>
                                    <TableHead>
                                        Data
                                    </TableHead>

                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {
                                    reports.map(report => (
                                        <TableRow
                                            key={report.id}
                                            className="cursor-pointer"
                                            onClick={() => setSelectedReport(report)}
                                        >
                                            <TableCell>
                                                {
                                                    getPatientName(
                                                        report.patientId
                                                    )
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {report.title}
                                            </TableCell>
                                            <TableCell>
                                                {getReportType(report.reportType)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>

                                                    {
                                                        getStatus(report.status)
                                                    }
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    new Date(
                                                        report.createdAt
                                                    ).toLocaleDateString(
                                                        "pt-BR"
                                                    )
                                                }

                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>

                )
            }


            {
                selectedPatient && (
                    <CreateReportModal
                        patient={selectedPatient}
                        onClose={() => setSelectedPatient(null)}
                    />
                )
            }

            {
                selectedReport && (
                    <ViewReportModal
                        report={selectedReport}
                        patientName={getPatientName(selectedReport.patientId)}
                        onClose={() => setSelectedReport(null)}
                    />
                )
            }
        </div>
    );

}