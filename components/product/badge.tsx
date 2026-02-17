import { cn } from "@/lib/utils";

export type BadgeType = "new" | "discount" | "bestseller" | "limited" | null;

interface BadgeProps {
  type: BadgeType;
  discountPercent?: number;
}

export default function Badge({ type, discountPercent }: Readonly<BadgeProps>) {
  if (!type) return null;

  const badgeConfig = {
    new: {
      label: "Novo",
      className: "bg-accent text-accent-foreground",
    },
    discount: {
      label: `-${discountPercent}%`,
      className: "bg-destructive text-destructive-foreground",
    },
    bestseller: {
      label: "Mais Vendido",
      className: "bg-primary text-primary-foreground",
    },
    limited: {
      label: "Limitado",
      className: "bg-foreground text-background",
    },
  };

  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        "absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-xs font-semibold",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
