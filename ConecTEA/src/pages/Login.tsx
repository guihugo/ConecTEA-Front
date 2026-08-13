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
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { refreshUser } = useAuth();

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

      await refreshUser();

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
        className="
        absolute left-6 top-6
        transition-all duration-200
        hover:-translate-x-0.5
        hover:bg-white/60
      "
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Card
        className="
        page-enter
        w-full
        max-w-[360px]
        rounded-2xl
        border
        border-neutral-200
        bg-white
        shadow-[0_4px_18px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]
      "
      >
        <CardContent className="p-6">

          <div
            className="login-item-enter"
            style={{ animationDelay: "50ms" }}
          >
            <img
              src={logo}
              alt="ConecTEA"
              className="
              mx-auto mb-8 h-12 w-auto object-contain
              transition-transform duration-300
              hover:scale-[1.02]
            "
            />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            <div
              className="login-item-enter"
              style={{ animationDelay: "100ms" }}
            >
              <Input
                type="email"
                placeholder="Informe seu e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="
                h-11
                rounded-lg
                border-neutral-300
                transition-all
                duration-200
                focus:border-[#3B6FD8]
                focus:ring-2
                focus:ring-[#3B6FD8]/10
              "
              />
            </div>

            <div
              className="login-item-enter relative"
              style={{ animationDelay: "150ms" }}
            >
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Informe sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="
                h-11
                rounded-lg
                border-neutral-300
                pr-20
                transition-all
                duration-200
                focus:border-[#3B6FD8]
                focus:ring-2
                focus:ring-[#3B6FD8]/10
              "
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                absolute
                right-2
                top-1/2
                h-8
                w-8
                -translate-y-1/2
                text-muted-foreground
                transition-all
                duration-200
                hover:scale-105
                hover:bg-transparent
                hover:text-foreground
              "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </Button>
            </div>

            {error && (
              <div
                className="
                login-item-enter
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-red-200
                bg-red-50
                p-3
                text-sm
                text-red-600
              "
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div
              className="login-item-enter"
              style={{ animationDelay: "200ms" }}
            >
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
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#2D5FC6]
                hover:shadow-md
                active:translate-y-0
                active:scale-[0.98]
              "
              >
                ENTRAR
              </Button>
            </div>

            <div
              className="
              login-item-enter
              flex
              flex-col
              gap-2
              pt-2
            "
              style={{ animationDelay: "250ms" }}
            >
              <Button
                type="button"
                variant="link"
                className="
                w-fit
                text-xs
                text-[#3B6FD8]
                transition-all
                duration-200
                hover:translate-x-0.5
                hover:underline
              "
              >
                Esqueci minha senha
              </Button>

              <Button
                type="button"
                variant="link"
                className="
                w-fit
                text-xs
                text-[#3B6FD8]
                transition-all
                duration-200
                hover:translate-x-0.5
                hover:underline
              "
                onClick={() => navigate("/signup")}
              >
                Criar conta
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}