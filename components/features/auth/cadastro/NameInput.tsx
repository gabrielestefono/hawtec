import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface NameInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export default function NameInput<T extends FieldValues>({
  control,
  name,
}: Readonly<NameInputProps<T>>) {
  const { field } = useController({
    name,
    control,
    rules: {
      minLength: {
        message: "O nome deve ter no mínimo 3 caracteres",
        value: 3,
      },
      maxLength: {
        message: "O nome deve ter no máximo 255 caracteres",
        value: 255,
      },
      required: {
        message: "O campo nome deve ser preenchido!",
        value: true,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name">Nome completo</Label>
      <Input
        id="name"
        type="text"
        placeholder="Seu nome"
        {...field}
        autoComplete="name"
        required
      />
    </div>
  );
}
