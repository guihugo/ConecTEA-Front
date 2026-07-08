import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

import { login } from "@/services/auth";
import { saveSession, saveToken } from "@/storage/storage";
import { roleMapInverse } from "@/constants/roles";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

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
          navigate("/therapist");
          break;

        case "Guardian":
          navigate("/guardian");
          break;

        default:
          navigate("/");
          break;
      }


    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-[400px]">
        <CardHeader>
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
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="space-y-2">
              <Label>Senha</Label>

              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="w-full">
              Entrar
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}