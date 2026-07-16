import { useState } from "react";

import axios from "axios";
import { AlertCircle, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { roleMapInverse } from "@/constants/roles";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { login } from "@/services/auth";

import { saveSession, saveToken } from "@/storage/storage";

import logo from "@/assets/logo_conectea.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await login({
        email,
        password,
      });

      saveToken(response.token);
      saveSession(response);

      const role =
        roleMapInverse[
          response.role as keyof typeof roleMapInverse
        ];

      switch (role) {
        case "Therapist":
          navigate("/therapist");
          break;

        case "Guardian":
          navigate("/guardian");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ??
            "Erro ao fazer login."
        );
      } else {
        setError("Erro inesperado.");
      }
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F7F5F2] px-4">

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Card
        className="
          w-full
          max-w-[360px]
          rounded-2xl
          border
          border-neutral-200
          bg-white
          shadow-[0_4px_18px_rgba(0,0,0,0.08)]
        "
      >
        <CardContent className="p-6">

          <img
            src={logo}
            alt="ConecTEA"
            className="mx-auto mb-8 h-12 w-auto object-contain"
          />

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <Input
              type="email"
              placeholder="Informe seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="h-11 rounded-lg border-neutral-300"
            />

            <div className="relative">
              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Informe sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="h-11 rounded-lg border-neutral-300 pr-20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  flex
                  items-center
                  gap-1
                  text-[11px]
                  font-medium
                  uppercase
                  text-neutral-500
                  hover:text-neutral-700
                "
              >
                {showPassword ? (
                  <>
                    <EyeOff size={14} />
                    Ocultar
                  </>
                ) : (
                  <>
                    <Eye size={14} />
                    Mostrar
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="
                h-10
                w-24
                rounded-md
                bg-[#3B6FD8]
                text-xs
                font-semibold
                tracking-wide
                hover:bg-[#2D5FC6]
              "
            >
              ENTRAR
            </Button>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                className="w-fit text-xs text-[#3B6FD8] hover:underline"
              >
                Esqueci minha senha
              </button>

              <button
                type="button"
                className="w-fit text-xs text-[#3B6FD8] hover:underline"
              >
                Criar conta
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}