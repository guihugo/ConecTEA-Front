import { X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface Props {
    onClose: () => void;
}


export default function CreatePatientModal({
    onClose
}: Props) {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [observations, setObservations] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Aqui depois entra o PatientService.create()

        console.log("Cadastrar paciente");

        onClose();
    }



    return (
        <div
            onClick={onClose}
            className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
    "
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className="
        w-full
        max-w-xl
        rounded-xl
        bg-white
        p-6
        shadow-xl
    "
            >

                <div className="
                    mb-6
                    flex
                    items-center
                    justify-between
                ">

                    <h2 className="
                        text-xl
                        font-semibold
                    ">
                        Cadastrar paciente
                    </h2>


                    <button
                        onClick={onClose}
                        className="
                            rounded-md
                            p-2
                            hover:bg-muted
                        "
                    >
                        <X size={20} />
                    </button>

                </div>



                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>
                        <label className="text-sm font-medium">
                            Nome completo
                        </label>

                        <div className="space-y-2">
                            <Input
                                placeholder="Digite o nome do paciente"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>



                    <div>
                        <label className="text-sm font-medium">
                            Data de nascimento
                        </label>

                        <Input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>




                    <div>
                        <label className="text-sm font-medium">
                            Gênero
                        </label>

                        <Select
                                value={gender}
                                onValueChange={(value) =>
                                    setGender(value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o gênero" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Male">
                                        Masculino
                                    </SelectItem>

                                    <SelectItem value="Female">
                                        Feminino
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                    </div>




                    <div>
                        <label className="text-sm font-medium">
                            Diagnóstico
                        </label>

                        <Input
                                placeholder="Ex: Transtorno do Espectro Autista"
                                value={diagnosis}
                                onChange={(e) => setDiagnosis(e.target.value)}
                            />
                    </div>




                    <div>
                        <label className="text-sm font-medium">
                            Observações
                        </label>

                        <Textarea
                            className="mt-1"
                            rows={4}
                            placeholder="Informações adicionais..."
                            value={observations}
                            onChange={(e) => setObservations(e.target.value)}
                        />

                    </div>




                    <div className="
                        flex
                        justify-end
                        gap-3
                        pt-4
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-lg
                                px-4
                                py-2
                                hover:bg-muted
                            "
                        >
                            Cancelar
                        </button>



                        <button
                            type="submit"
                            className="
                                rounded-lg
                                bg-primary
                                px-4
                                py-2
                                text-primary-foreground
                            "
                        >
                            Cadastrar
                        </button>

                    </div>


                </form>

            </div>

        </div>
    );
}