"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Monitor,
  Smartphone,
  Laptop,
  HardDrive,
  Cpu,
  Wrench,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Shield,
  Phone,
} from "lucide-react"

const serviceTypes = [
  {
    id: "notebook",
    icon: Laptop,
    title: "Notebooks",
    description: "Reparo de tela, teclado, bateria, placa-mãe",
  },
  {
    id: "desktop",
    icon: Monitor,
    title: "Desktops",
    description: "Montagem, upgrade e manutenção",
  },
  {
    id: "smartphone",
    icon: Smartphone,
    title: "Smartphones",
    description: "Troca de tela, bateria, conectores",
  },
  {
    id: "storage",
    icon: HardDrive,
    title: "Recuperação de Dados",
    description: "HD, SSD, pen drives e cartões",
  },
  {
    id: "hardware",
    icon: Cpu,
    title: "Hardware",
    description: "Diagnóstico e reparo de componentes",
  },
  {
    id: "outros",
    icon: Wrench,
    title: "Outros",
    description: "Consultoria e serviços especiais",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "Atendimento Rápido",
    description: "Diagnóstico em até 24h",
  },
  {
    icon: Shield,
    title: "Garantia",
    description: "90 dias em todos os serviços",
  },
  {
    icon: Phone,
    title: "Suporte",
    description: "Acompanhamento pós-serviço",
  },
]

export default function ServicosPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="rounded-2xl border border-border bg-card p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">
              Solicitacao Enviada!
            </h1>
            <p className="mb-8 text-muted-foreground">
              Recebemos sua solicitacao de servico. Nossa equipe entrara em
              contato em ate 24 horas para agendar o atendimento.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Loja
                </Button>
              </Link>
              <Button
                onClick={() => setFormSubmitted(false)}
                className="w-full sm:w-auto"
              >
                Nova Solicitacao
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-accent/5 to-background">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a loja
            </Link>
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Assistencia Tecnica
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Equipe especializada em manutencao e reparo de equipamentos
              eletronicos. Solicite um orcamento sem compromisso.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <benefit.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {benefit.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Selection & Form */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Service Types */}
              <div>
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  Selecione o tipo de servico
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedService(service.id)}
                      className={`flex items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                        selectedService === service.id
                          ? "border-accent bg-accent/5 ring-1 ring-accent"
                          : "border-border bg-card hover:border-accent/50"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                          selectedService === service.id
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {service.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-xl font-semibold text-foreground">
                  Dados para contato
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 rounded-xl border border-border bg-card p-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        required
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        required
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgencia</Label>
                    <Select>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Selecione a urgencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          Baixa - Posso aguardar
                        </SelectItem>
                        <SelectItem value="medium">
                          Media - Preciso em alguns dias
                        </SelectItem>
                        <SelectItem value="high">
                          Alta - Urgente
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descreva o problema</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o problema ou servico que precisa..."
                      rows={4}
                      required
                      className="bg-background"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!selectedService}
                  >
                    Solicitar Orcamento
                  </Button>

                  {!selectedService && (
                    <p className="text-center text-sm text-muted-foreground">
                      Selecione um tipo de servico para continuar
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
