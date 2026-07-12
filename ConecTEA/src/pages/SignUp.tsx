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
import { ArrowLeft, Eye, EyeOff, CheckCircle2, Circle } from "lucide-react";

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
    const [role, setRole] = useState<UserRole>("Guardian");
    const [showPassword, setShowPassword] = useState(false);
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
                        Criar conta no ConecTEA
                    </CardTitle>
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

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                />

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>

                            <div className="space-y-1 pt-1">
                                {passwordRules.map((rule) => (
                                    <div
                                        key={rule.label}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        {rule.valid ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Circle className="h-4 w-4 text-gray-400" />
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
                                    <SelectItem value="Therapist">
                                        Terapeuta
                                    </SelectItem>

                                    <SelectItem value="Guardian">
                                        Responsável
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