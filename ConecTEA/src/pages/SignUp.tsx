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

import { signUp } from "@/services/auth";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("");

    async function handleSignUp(e: React.FormEvent) {
        e.preventDefault();

        try {
            const response = await signUp({
                name,
                email,
                password,
                birthDate,
            });

            console.log(response);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>
                        Criar conta no ConecTEA
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        className="space-y-4"
                        onSubmit={handleSignUp}
                    >
                        <div className="space-y-2">
                            <Label>
                                Nome
                            </Label>

                            <Input
                                placeholder="Seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>


                        <div className="space-y-2">
                            <Label>
                                Email
                            </Label>

                            <Input
                                type="email"
                                placeholder="email@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <div className="space-y-2">
                            <Label>
                                Senha
                            </Label>

                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <div className="space-y-2">
                            <Label>
                                Data de nascimento
                            </Label>

                            <Input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>


                        <Button className="w-full">
                            Criar conta
                        </Button>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}