import type { Product } from "./types"

export const mockProduct: Product = {
  id: "haw-pro-x1",
  name: "HawTec Pro X1 - Headphone Bluetooth Premium",
  description:
    "Headphone over-ear com cancelamento de ruido ativo, som Hi-Res e bateria de 40h.",
  longDescription:
    "O HawTec Pro X1 redefine a experiencia sonora com drivers personalizados de 40mm, cancelamento de ruido ativo adaptativo e codec LDAC para audio de alta resolucao. Seu design ergonomico com almofadas de espuma viscoelastica garante conforto por horas. A bateria de longa duracao oferece ate 40 horas de reproducao continua com ANC ativado e carga rapida que entrega 5 horas de uso em apenas 10 minutos de carregamento. Conexao multipoint permite conectar dois dispositivos simultaneamente, perfeito para alternar entre trabalho e entretenimento.",
  price: 899.9,
  originalPrice: 1299.9,
  discountPercent: 31,
  images: [
    "/images/product-headphone.jpg",
    "/images/product-headphone-2.jpg",
    "/images/product-headphone-3.jpg",
    "/images/product-headphone-4.jpg",
  ],
  rating: 4.7,
  reviewCount: 342,
  badge: "desconto",
  category: "Audio",
  brand: "HawTec",
  sku: "HAW-PRX1-BK",
  inStock: true,
  stockCount: 23,
  colors: [
    { name: "Preto", value: "#1a1a1a", available: true },
    { name: "Azul Marinho", value: "#1e3a5f", available: true },
    { name: "Prata", value: "#c0c0c0", available: true },
    { name: "Branco", value: "#f5f5f5", available: false },
  ],
  specs: [
    { label: "Driver", value: "40mm Neodimio" },
    { label: "Resposta de Frequencia", value: "4Hz - 40kHz" },
    { label: "Impedancia", value: "32 Ohms" },
    { label: "Bluetooth", value: "5.3 (LDAC, AAC, SBC)" },
    { label: "ANC", value: "Cancelamento Ativo Adaptativo" },
    { label: "Bateria", value: "40h (ANC ligado) / 60h (ANC desligado)" },
    { label: "Carga Rapida", value: "10 min = 5h de uso" },
    { label: "Peso", value: "254g" },
    { label: "Conexao", value: "Multipoint (2 dispositivos)" },
    { label: "Microfone", value: "4 microfones com beamforming" },
    { label: "Dobravel", value: "Sim, com estojo incluso" },
    { label: "Garantia", value: "2 anos HawTec" },
  ],
  reviews: [
    {
      id: "r1",
      author: "Lucas M.",
      rating: 5,
      date: "2026-01-15",
      title: "Melhor headphone que ja tive",
      content:
        "Som absurdo, cancelamento de ruido impressionante. Uso no trabalho e no transporte publico, isola tudo. Bateria dura facil uma semana com uso diario.",
      verified: true,
    },
    {
      id: "r2",
      author: "Ana P.",
      rating: 5,
      date: "2026-01-08",
      title: "Conforto incrivel",
      content:
        "Uso por horas sem nenhum desconforto. As almofadas sao macias e a pressao na cabeca e bem distribuida. A qualidade do som e excepcional, especialmente com LDAC.",
      verified: true,
    },
    {
      id: "r3",
      author: "Rafael S.",
      rating: 4,
      date: "2025-12-22",
      title: "Otimo custo-beneficio",
      content:
        "Muito bom pelo preco. O ANC funciona bem, som limpo e detalhado. Unico ponto e que o app poderia ser mais intuitivo, mas o headphone em si e excelente.",
      verified: true,
    },
    {
      id: "r4",
      author: "Mariana C.",
      rating: 5,
      date: "2025-12-10",
      title: "Superou minhas expectativas",
      content:
        "Vindo de um headphone de marca famosa, fiquei surpresa com a qualidade do HawTec. Cancelamento de ruido no mesmo nivel, som ate melhor na minha opiniao. Recomendo demais!",
      verified: false,
    },
  ],
}
