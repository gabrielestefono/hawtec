import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Control,
  FieldValues,
  Path,
  useController,
  UseFormGetValues,
} from "react-hook-form";

interface ConfirmPassowrdInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  getValues: UseFormGetValues<T>;
  namePassword: Path<T>;
}

export default function ConfirmPasswordInput<T extends FieldValues>({
  control,
  name,
  getValues,
  namePassword,
}: Readonly<ConfirmPassowrdInputProps<T>>) {
  const { field } = useController({
    name,
    control,
    rules: {
      validate: (value) =>
        value === getValues(namePassword) || "As senhas não coincidem",
      required: {
        message: "O campo confirmação de senha deve ser preenchido!",
        value: true,
      },
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="confirmPassword">Confirmar senha</Label>
      <Input
        id="confirmPassword"
        type="password"
        placeholder="Repita a senha"
        {...field}
        autoComplete="new-password"
      />
    </div>
  );
}
