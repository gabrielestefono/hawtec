import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface EmailInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export default function PasswordInput<T extends FieldValues>({
  control,
  name,
}: Readonly<EmailInputProps<T>>) {
  const [showPassword, setShowPassword] = useState(false);

  const { field } = useController({
    control,
    name,
    rules: {
      maxLength: {
        message: "A senha dev ter no máximo 16 caracteres",
        value: 16,
      },
      minLength: {
        message: "A senha deve ter no mínimo 8 caracteres",
        value: 8,
      },
      pattern: {
        message:
          "A senha deve ser composta por uma letra minúscula, uma maiúscula, um número e um dos caracteres especiais ($*&@#()!)",
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$*&@#()!])[A-Za-z\d$*&@#()!]+$/,
      },
      required: {
        message: "A campo senha deve ser preenchido",
        value: true,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Senha</Label>
        <Link
          href="/esqueci-senha"
          className="text-xs font-medium text-primary hover:underline"
        >
          Esqueci minha senha
        </Link>
      </div>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Sua senha"
          {...field}
          autoComplete="current-password"
          required
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
