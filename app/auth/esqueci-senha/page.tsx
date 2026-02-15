"use client";

import Link from "next/link";
import { SubmitEventHandler, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import EmailInput from "@/components/features/auth/esqueci-senha/EmailInput";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

interface ForgotPasswordForm {
  email: string;
}

export default function EsqueciSenhaPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit: submit,
    getValues,
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
  });

  const handleSucces: SubmitHandler<ForgotPasswordForm> = async ({
    email,
  }: ForgotPasswordForm) => {
    setIsLoading(true);
    console.log(email);

    setIsLoading(false);

    const success = true;

    if (success) {
      alert("Esqueceu senha chamado!");
      setSent(true);
    } else {
      setError("Ocorreu um erro, tente novamente mais tarde!");
    }
  };

  const handleError: SubmitErrorHandler<ForgotPasswordForm> = (error) => {
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
            <CardTitle className="text-2xl">Recuperar senha</CardTitle>
            <CardDescription>
              {sent
                ? "Verifique seu email."
                : "Insira seu email para receber o link de recuperacao."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email enviado!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Enviamos um link de recuperacao para{" "}
                    <strong className="text-foreground">
                      {getValues("email")}
                    </strong>{""}
                    . Verifique sua caixa de entrada e spam.
                  </p>
                </div>
                <Button asChild variant="outline" className="mt-2">
                  <Link href="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao login
                  </Link>
                </Button>
              </div>
            ) : (
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

                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar link de recuperacao"
                  )}
                </Button>

                <Button asChild variant="ghost" className="mt-1">
                  <Link href="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao login
                  </Link>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </DefaultLayout>
  );
}
