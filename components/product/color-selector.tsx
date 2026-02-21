"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { SelectableSpecGroup } from "@/types/components/products";

interface ColorSelectorProps {
  colors: SelectableSpecGroup[];
}

export function ColorSelector({ colors: group }: Readonly<ColorSelectorProps>) {
  const colorsArray = group.flatMap((g) =>
    g.name.toLowerCase() === "cor" ? g.values : [],
  );
  const [arrayColors, setArrayColors] = useState(colorsArray);
  const [selectedColor, setSelectedColor] = useState(
    colorsArray[0]?.value || "Padrão",
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">Cor:</span>
        <span className="text-sm text-muted-foreground">{selectedColor}</span>
      </div>
      <div className="flex items-center gap-3">
        {arrayColors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => color.available && setSelectedColor(color.name)}
            disabled={!color.available}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
              selectedColor === color.name
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-muted-foreground/40",
              !color.available && "cursor-not-allowed opacity-40",
            )}
            aria-label={`${color.name}${!color.available ? " - Indisponivel" : ""}`}
            title={color.name}
          >
            <span
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: color.value }}
            />
            {selectedColor === color.name && (
              <Check
                className="absolute h-3.5 w-3.5 text-primary"
                style={{
                  filter:
                    color.value === "#1a1a1a"
                      ? "drop-shadow(0 0 2px rgba(255,255,255,0.8))"
                      : "none",
                  color: color.value === "#1a1a1a" ? "white" : undefined,
                }}
              />
            )}
            {!color.available && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-[2px] w-8 rotate-45 rounded-full bg-muted-foreground/60" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
