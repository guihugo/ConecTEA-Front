import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");

    const [role, setRole] = useState<UserRole>("Guardian");

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();

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

        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar conta");
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Criar conta no ConecTEA</CardTitle>
                </CardHeader>

                <CardContent>
                    <form className="space-y-4" onSubmit={handleSignUp}>

                        <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input
                                placeholder="Seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

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

                        <div className="space-y-2">
                            <Label>Data de nascimento</Label>
                            <Input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Tipo de conta</Label>

                            <Select
                                value={role}
                                onValueChange={(value) =>
                                    setRole(value as UserRole)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de conta" />
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

                        <Button className="w-full" type="submit">
                            Criar conta
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}