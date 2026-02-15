import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { label: "Entrega", step: 1 },
  { label: "Pagamento", step: 2 },
  { label: "Revisao", step: 3 },
]

interface CheckoutStepperProps {
  currentStep: number
}

export function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <nav className="flex items-center justify-center gap-0" aria-label="Etapas do checkout">
      {steps.map((s, idx) => {
        const isCompleted = currentStep > s.step
        const isActive = currentStep === s.step

        return (
          <div key={s.step} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isActive && "border-primary bg-background text-primary",
                  !isCompleted && !isActive && "border-border bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : s.step}
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 mb-5 h-0.5 w-12 sm:w-20",
                  currentStep > s.step ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </nav>
  )
}
