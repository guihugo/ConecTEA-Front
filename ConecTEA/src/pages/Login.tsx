import { useState } from "react";

import axios from "axios";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { roleMapInverse } from "@/constants/roles";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "@/services/auth";

import { saveSession, saveToken } from "@/storage/storage";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


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

      const role = roleMapInverse[
        response.role as keyof typeof roleMapInverse
      ];

      switch (role) {
        case "Therapist":
          console.log("Navigating to therapist");
          navigate("/therapist");
          break;

        case "Guardian":
          console.log("Navigating to guardian");
          navigate("/guardian");
          break;

        default:
          navigate("/");
          break;
      }


    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.error ?? "Erro ao fazer login."
        );
      } else {
        setError("Erro inesperado.");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-[400px]">
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 w-fit"
            onClick={() => navigate("/")}
            type="button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <CardTitle>
            Entrar no ConecTEA
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleLogin}
          >

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />

            </div>


            <div className="space-y-2">
              <Label>Senha</Label>

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button className="w-full">
              Entrar
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}