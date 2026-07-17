import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    Badge,
} from "@/components/ui/badge";

import type { Report } from "@/services/report";

interface Props {

    report: Report;

    patientName: string;

    onClose: () => void;

}

export default function ViewReportModal({

    report,

    patientName,

    onClose

}: Props) {

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

                <DialogHeader>

                    <DialogTitle>

                        {report.title}

                    </DialogTitle>

                </DialogHeader>


                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="text-sm text-muted-foreground">
                            Paciente
                        </p>

                        <p>
                            {patientName}
                        </p>

                    </div>


                    <div>

                        <p className="text-sm text-muted-foreground">
                            Status
                        </p>

                        <Badge>

                            {report.status == 2
                                ? "Concluído"
                                : "Rascunho"}

                        </Badge>

                    </div>


                    <div>

                        <p className="text-sm text-muted-foreground">
                            Tipo
                        </p>

                        <p>

                            {report.reportType == 1
                                ? "Sessão"
                                : "Avaliação"}

                        </p>

                    </div>


                    <div>

                        <p className="text-sm text-muted-foreground">
                            Criado em
                        </p>

                        <p>

                            {
                                new Date(
                                    report.createdAt
                                ).toLocaleString("pt-BR")
                            }

                        </p>

                    </div>

                </div>


                <div className="space-y-2">

                    <p className="text-sm text-muted-foreground">
                        Conteúdo
                    </p>


                    <div
                        className="
                            rounded-md
                            border
                            p-4
                            whitespace-pre-wrap
                            max-h-96
                            overflow-y-auto
                            bg-muted/30
                        "
                    >

                        {report.content}

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    );

}