import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">

      <div>
        <h1 className="text-4xl font-bold">
          ConecTEA
        </h1>

        <p>
          Conectando pais, terapeutas e profissionais para um melhor desenvolvimento de crianças com TEA.
        </p>
      </div>


      <div className="flex gap-4">

        <Button
          onClick={() => navigate("/login")}
        >
          Entrar
        </Button>


        <Button
          variant="outline"
          onClick={() => navigate("/signup")}
        >
          Criar conta
        </Button>

      </div>

    </div>
  );
}