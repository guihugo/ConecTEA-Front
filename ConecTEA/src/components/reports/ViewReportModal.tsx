import { useState } from "react";


import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import {
    updateReport,
    getOneReport,
    type Report,
} from "@/services/report";


interface Props {
    report: Report;
    patientName: string;
    onClose: () => void;
    onDelete: (id: string) => Promise<void>;
    onUpdated: () => void;
}


export default function ViewReportModal({
    report,
    patientName,
    onClose,
    onDelete,
    onUpdated,
}: Props) {


    const [currentReport, setCurrentReport] = useState<Report>(report);


    const [isEditing, setIsEditing] = useState(false);


    const [title, setTitle] = useState(currentReport.title);
    const [reportType, setReportType] = useState(
        String(currentReport.reportType)
    );
    const [content, setContent] = useState(currentReport.content);


    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);


    async function handleSave() {
        try {
            setLoading(true);


            await updateReport(currentReport.id, {
                patientId: currentReport.patientId,
                title,
                reportType: Number(reportType),
                content,
            });
            const updatedReport = await getOneReport(currentReport.id);


            setCurrentReport(updatedReport);
            console.log("Updated report:", updatedReport)


            setTitle(updatedReport.title);
            setReportType(String(updatedReport.reportType));
            setContent(updatedReport.content);


            onUpdated();


            setIsEditing(false);


        } catch (error) {
            console.error(
                "Erro ao atualizar relatório",
                error
            );


        } finally {
            setLoading(false);
        }


    }


    function handleCancelEdit() {


        setTitle(currentReport.title);
        setReportType(String(currentReport.reportType));
        setContent(currentReport.content);


        setIsEditing(false);


    }


    async function handleDelete() {
        const confirmed = window.confirm(
            "Deseja realmente excluir este relatório?"
        );


        if (!confirmed) {
            return;
        }


        try {
            setDeleting(true);
            await onDelete(currentReport.id);
        } catch (error) {
            console.error(
                "Erro ao excluir relatório",
                error
            );


        } finally {
            setDeleting(false);
        }


    }


    return (
        <Dialog
            open
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader className="min-w-0">
                    <DialogTitle className="min-w-0 [overflow-wrap:anywhere] pr-6">
                        {isEditing ? "Editar relatório" : currentReport.title}
                    </DialogTitle>


                </DialogHeader>


                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Paciente
                        </p>


                        <p>{patientName}</p>
                    </div>
                   
                    <div>


                        <p className="text-sm text-muted-foreground">
                            Status
                        </p>


                        <Badge>
                            {
                                currentReport.status === 2
                                    ? "Concluído"
                                    : "Rascunho"
                            }
                        </Badge>


                    </div>


                    <div>


                        <p className="text-sm text-muted-foreground">
                            Título
                        </p>
                        {
                            isEditing ? (


                                <Input
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />


                            ) : (


                                <p className="[overflow-wrap:anywhere]">{currentReport.title}</p>


                            )
                        }


                    </div>


                    <div>


                        <p className="text-sm text-muted-foreground">
                            Tipo
                        </p>
                        {
                            isEditing ? (


                                <Select
                                    value={reportType}
                                    onValueChange={setReportType}
                                >


                                    <SelectTrigger>


                                        <SelectValue />


                                    </SelectTrigger>


                                    <SelectContent>


                                        <SelectItem value="1">
                                            Sessão
                                        </SelectItem>


                                        <SelectItem value="2">
                                            Avaliação
                                        </SelectItem>


                                    </SelectContent>


                                </Select>


                            ) : (


                                <p>
                                    {
                                        currentReport.reportType === 1
                                            ? "Sessão"
                                            : "Avaliação"
                                    }
                                </p>


                            )
                        }


                    </div>


                    <div>
                        <p className="text-sm text-muted-foreground">
                            Criado em
                        </p>


                        <p>
                            {
                                new Date(
                                    currentReport.createdAt
                                ).toLocaleString("pt-BR")
                            }
                        </p>
                    </div>
                </div>


                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                        Conteúdo
                    </p>


                    {
                        isEditing ? (
                            <Textarea
                                value={content}
                                onChange={(e) =>
                                    setContent(e.target.value)
                                }
                                className="min-h-72"
                            />


                        ) : (
                            <div
                                className="
                                    rounded-md
                                    border
                                    p-4
                                    whitespace-pre-wrap
                                    [overflow-wrap:anywhere]
                                    max-h-96
                                    overflow-y-auto
                                    bg-muted/30
                                "
                            >
                                {currentReport.content}
                            </div>


                        )
                    }


                </div>
                <div className="flex justify-end gap-3 pt-4">
                    {
                        isEditing ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                    disabled={loading}
                                >
                                    Cancelar
                                </Button>


                                <Button
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ? "Salvando..."
                                            : "Salvar"
                                    }
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                    disabled={deleting}
                                >
                                    Editar
                                </Button>


                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >
                                    {
                                        deleting
                                            ? "Excluindo..."
                                            : "Excluir"
                                    }
                                </Button>
                            </>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>


    );


}