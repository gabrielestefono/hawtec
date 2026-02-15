"use client"

import Link from "next/link"
import { Mail, Phone, Instagram, MessageCircle } from "lucide-react"

const contacts = [
  {
    id: 1,
    title: "E-mail",
    description: "Resposta em até 24h",
    value: "contato@techaw.com.br",
    href: "mailto:contato@techaw.com.br",
    icon: Mail,
    color: "bg-red-500/10 text-red-500 dark:bg-red-500/20",
  },
  {
    id: 2,
    title: "WhatsApp",
    description: "Atendimento rápido",
    value: "(11) 99999-9999",
    href: "https://wa.me/5511999999999",
    icon: MessageCircle,
    color: "bg-green-500/10 text-green-500 dark:bg-green-500/20",
  },
  {
    id: 3,
    title: "Telefone",
    description: "Seg a Sex, 9h às 18h",
    value: "(11) 3333-3333",
    href: "tel:+551133333333",
    icon: Phone,
    color: "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20",
  },
  {
    id: 4,
    title: "Instagram",
    description: "@techaw.oficial",
    value: "Siga-nos",
    href: "https://instagram.com/techaw.oficial",
    icon: Instagram,
    color: "bg-pink-500/10 text-pink-500 dark:bg-pink-500/20",
  },
]

export function ContactSection() {
  return (
    <section className="border-t border-border bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Precisa de Ajuda?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Entre em contato conosco pelos canais abaixo
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {contacts.map((contact) => {
            const Icon = contact.icon
            return (
              <Link
                key={contact.id}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className={`rounded-full p-2.5 ${contact.color} transition-transform group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {contact.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {contact.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
