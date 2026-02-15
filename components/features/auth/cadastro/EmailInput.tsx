import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface EmailInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export default function EmailInput<T extends FieldValues>({
  control,
  name,
}: Readonly<EmailInputProps<T>>) {
  const { field } = useController({
    control,
    name,
    rules: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        message: "O campo email deve ter o formato email@email.com",
      },
      minLength: {
        message: "O email deve ter no mínimo 5 caracteres",
        value: 5,
      },
      required: {
        message: "O campo email é obrigatório!",
        value: true,
      },
      maxLength: {
        message: "O campo email deve ter no máximo, 255 caracteres!",
        value: 255,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="seu@email.com"
        {...field}
        autoComplete="email"
        required
      />
    </div>
  );
}
