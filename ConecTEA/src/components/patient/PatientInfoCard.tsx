import type { Patient } from "@/services/patient";

interface Props{
    patient: Patient;
}

export default function PatientInfoCard({patient}:Props){

    return(

        <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-4 text-xl font-semibold">
                Informações
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

                <Info label="Nome" value={patient.fullName}/>

                <Info label="Nascimento" value={new Date(patient.birthDate).toLocaleDateString("pt-BR")}/>

                <Info label="Diagnóstico" value={patient.diagnosis}/>

                <Info label="Sexo" value={patient.gender.toString()}/>

            </div>

            <div className="mt-6">

                <span className="font-medium">
                    Observações
                </span>

                <p className="mt-2 text-muted-foreground">
                    {patient.observation}
                </p>

            </div>

        </div>

    );

}

function Info({label,value}:{label:string,value:string}){

    return(
        <div>

            <div className="text-sm text-muted-foreground">
                {label}
            </div>

            <div className="font-medium">
                {value}
            </div>

        </div>
    )

}