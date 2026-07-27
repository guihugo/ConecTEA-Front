import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createAppointment } from "@/services/appointment";

interface Props {

    patientId: string;
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export default function CreateAppointmentDialog({
    patientId,
    open,
    onClose,
    onCreated
}: Props) {

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [notes, setNotes] = useState("");
    async function handleSubmit() {
        const body = {
            patientId,
            startTime: new Date(startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            notes,

        };

        console.log(body);
        await createAppointment(body);
        onCreated?.();
        onClose();
    }

    return (

        <Dialog
            open={open}
            onOpenChange={(o) => !o && onClose()}
        >

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Nova consulta
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <label>Início</label>

                        <Input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) =>
                                setStartTime(e.target.value)
                            }
                        />

                    </div>

                    <div>
                        <label>Fim</label>
                        <Input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) =>
                                setEndTime(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label>Observações</label>
                        <Textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                        />
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Salvar consulta
                    </Button>

                </div>
            </DialogContent>
        </Dialog>

    );

}