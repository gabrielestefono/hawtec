"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, SubmitEventHandler, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import NameInput from "@/components/features/auth/cadastro/NameInput";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import EmailInput from "@/components/features/auth/cadastro/EmailInput";
import PasswordInput from "@/components/features/auth/cadastro/PasswordInput";
import ConfirmPasswordInput from "@/components/features/auth/cadastro/ConfirmPasswordInput";
import TermsAndConditionsCheckbox from "@/components/features/auth/cadastro/TermsAndConditionsCheckbox";

interface CadastroForm {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}

export default function CadastroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    getValues,
    handleSubmit: submit,
  } = useForm<CadastroForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      accept_terms: false,
    },
  });

  const handleSucces: SubmitHandler<CadastroForm> = async ({
    email,
    password,
  }: CadastroForm) => {
    setIsLoading(true);
    const success = await register(name, email, password);
    setIsLoading(false);

    if (success) {
      router.push("/");
    } else {
      setError("Email ou senha incorretos.");
    }
  };

  const handleError: SubmitErrorHandler<CadastroForm> = (error) => {
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
            <CardTitle className="text-2xl">Criar conta</CardTitle>
            <CardDescription>
              Crie sua conta HawTec e aproveite ofertas exclusivas.
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

              <NameInput name="name" control={control} />

              <EmailInput name="email" control={control} />

              <PasswordInput name="password" control={control} />

              <ConfirmPasswordInput
                name="confirm_password"
                control={control}
                getValues={getValues}
                namePassword="password"
              />

              <TermsAndConditionsCheckbox
                name="accept_terms"
                control={control}
              />

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Ja tem uma conta?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Entrar
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </DefaultLayout>
  );
}
