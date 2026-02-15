import Link from "next/link";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface TermsAndConditionsCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

export default function TermsAndConditionsCheckbox<T extends FieldValues>({
  control,
  name,
}: Readonly<TermsAndConditionsCheckboxProps<T>>) {
  const { field } = useController({
    name,
    control,
    rules: {
      required: {
        message: "Os termos devem ser aceitados para a criação de uma conta",
        value: true,
      },
    },
  });
  return (
    <label className="flex items-start gap-2">
      <input
        type="checkbox"
        {...field}
        className="mt-1 h-4 w-4 rounded border-border accent-primary"
      />
      <span className="text-sm text-muted-foreground">
        Li e aceito os{" "}
        <Link href="/" className="font-medium text-primary hover:underline">
          termos de uso
        </Link>{" "}
        e a{" "}
        <Link href="/" className="font-medium text-primary hover:underline">
          politica de privacidade
        </Link>
        .
      </span>
    </label>
  );
}
