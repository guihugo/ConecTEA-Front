import { useState } from "react";

import type { Patient } from "@/services/patient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createReport } from "@/services/report";


interface Props {
    patient: Patient;
    onClose: () => void;

}

export default function CreateReportModal({ patient, onClose }: Props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [observations, setObservations] = useState("");

    async function handleSubmit() {


        try {
            const response = await createReport({
                patientId: patient.id,
                title, reportType: 1,
                content: description
            });
            console.log("Report created:", response);
        }
        catch (error) {
            console.error(error);
        }

        onClose();
    }

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
            "
        >
            <div
                className="
                    w-full
                    max-w-lg
                    rounded-xl
                    bg-white
                    p-6
                    space-y-5
                "
            >
                <div>
                    <h2 className="text-xl font-semibold">
                        Criar relatório
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Paciente:
                        {" "}
                        <strong>
                            {patient.fullName}
                        </strong>

                    </p>

                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Título
                    </label>

                    <Input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }

                        className="
                            w-full
                            rounded-md
                            border
                            px-3
                            py-2
                        "

                        placeholder="
                            Ex: Evolução mensal
                        "

                    />


                </div>




                <div className="space-y-2">


                    <label className="text-sm font-medium">

                        Descrição

                    </label>


                    <Input

                        value={description}

                        onChange={(e) =>
                            setDescription(e.target.value)
                        }

                        className="
                            w-full
                            rounded-md
                            border
                            px-3
                            py-2
                            min-h-28
                        "

                        placeholder="
                            Descreva a evolução do paciente
                        "

                    />


                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Observações
                    </label>

                    <Input
                        value={observations}
                        onChange={(e) =>
                            setObservations(e.target.value)
                        }
                        className="
                            w-full
                            rounded-md
                            border
                            px-3
                            py-2
                            min-h-24
                        "
                        placeholder="
                            Observações adicionais
                        "
                    />
                </div>

                <div className="
                    flex
                    justify-end
                    gap-3
                ">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>



                    <Button
                        onClick={handleSubmit}
                    >
                        Salvar relatório
                    </Button>


                </div>
            </div>
        </div>
    );
}