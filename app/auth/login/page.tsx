"use client";

import EmailInput from "@/components/features/auth/login/EmailInput";
import PasswordInput from "@/components/features/auth/login/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitEventHandler, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { control, handleSubmit: submit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSucces: SubmitHandler<LoginForm> = async ({
    email,
    password,
  }: LoginForm) => {
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      router.push("/");
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  const handleError: SubmitErrorHandler<LoginForm> = (error) => {
    const parameters = Object.values(error);
    if (parameters.length === 0) {
      return;
    }
    const firstParameter = parameters[0];
    if (!firstParameter) {
      return;
    }
    const message = firstParameter.message;
    if (!message) {
      return;
    }
    setError(message);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    submit(handleSucces, handleError)();
  };

  return (
    <DefaultLayout>
      <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Image
                src="/logo.webp"
                alt="TEC HAW Logo"
                width={50}
                height={50}
                className="h-10 w-auto lg:h-12"
                unoptimized
              />
            </div>
            <CardTitle className="text-2xl">Entrar na sua conta</CardTitle>
            <CardDescription>
              Acesse sua conta HawTec para acompanhar pedidos e muito mais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <EmailInput name="email" control={control} />

              <PasswordInput name="password" control={control}></PasswordInput>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                ou continue com
              </span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" disabled>
                Google
              </Button>
              {/* <Button variant="outline" className="flex-1" disabled>
                Facebook
              </Button> */}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Nao tem uma conta?{" "}
              <Link
                href="/auth/cadastro"
                className="font-medium text-primary hover:underline"
              >
                Criar conta
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </DefaultLayout>
  );
}
