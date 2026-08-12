import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import axios from "axios";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { signUp } from "@/services/auth";
import type { UserRole } from "@/types/roles";
import { roleMap } from "@/constants/roles";

import logo from "@/assets/logo_conectea.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState<UserRole>("Guardian");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const passwordRules = [
    {
      label: "Pelo menos 8 caracteres",
      valid: password.length >= 8,
    },
    {
      label: "Uma letra maiúscula",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Uma letra minúscula",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Um número",
      valid: /\d/.test(password),
    },
    {
      label: "Um caractere especial",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Informe seu nome.");
      return;
    }

    if (!email.trim()) {
      setError("Informe seu e-mail.");
      return;
    }

    if (!password) {
      setError("Informe uma senha.");
      return;
    }

    if (!birthDate) {
      setError("Informe sua data de nascimento.");
      return;
    }

    try {
      await signUp({
        fullName: name,
        email,
        password,
        dateOfBirth: birthDate,
        role: roleMap[role],
      });

      toast.success("Conta criada com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        if (Array.isArray(data?.errors) && data.errors.length > 0) {
          setError(data.errors[0]);
        } else {
          setError("Erro ao criar conta.");
        }
      } else {
        setError("Erro inesperado.");
      }
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F7F5F2] px-4 py-8">

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-6"
        onClick={() => navigate("/")}
        type="button"
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
            onSubmit={handleSignUp}
            className="space-y-4"
          >
            <Input
              placeholder="Informe seu nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="h-11 rounded-lg border-neutral-300"
            />

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
                type={showPassword ? "text" : "password"}
                placeholder="Informe sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="h-11 rounded-lg border-neutral-300 pr-14"
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

            <div className="space-y-1.5 px-1">
              {passwordRules.map((rule) => (
                <div
                  key={rule.label}
                  className="flex items-center gap-2 text-xs"
                >
                  {rule.valid ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-gray-400" />
                  )}

                  <span
                    className={
                      rule.valid
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>

            <Input
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                setError("");
              }}
              className="h-11 rounded-lg border-neutral-300 text-muted-foreground"
            />

            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value as UserRole);
                setError("");
              }}
            >
              <SelectTrigger className="h-11 rounded-lg border-neutral-300">
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Therapist">
                  Terapeuta
                </SelectItem>

                <SelectItem value="Guardian">
                  Responsável
                </SelectItem>
              </SelectContent>
            </Select>

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
                w-28
                rounded-md
                bg-[#3B6FD8]
                text-xs
                font-semibold
                tracking-wide
                hover:bg-[#2D5FC6]
              "
            >
              CRIAR CONTA
            </Button>

            <div className="pt-1">
              <Button
                type="button"
                variant="link"
                className="w-fit p-0 text-xs text-[#3B6FD8] hover:underline"
                onClick={() => navigate("/login")}
              >
                Já tenho uma conta
              </Button>
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}

