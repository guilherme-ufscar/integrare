import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Integrare | Canal de Denúncias Seguro e Confidencial B2B",
  description: "Plataforma corporativa de Canal de Denúncias da Integrare. Garantia de anonimato, conformidade com a LGPD e Leis 14.457/22 e 14.611/23. Proteja seu ambiente de trabalho contra assédio e fraudes.",
  keywords: ["Canal de denúncias", "Compliance", "LGPD", "Governança Corporativa", "Canal de Ética", "Denúncia Anônima", "Integrare", "B2B", "Jurídico", "Lei 14.457/22", "Lei CIPA"],
  authors: [{ name: "Integrare Compliance" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://integrarecorp.com.br",
    title: "Integrare | Canal de Denúncias Terceirizado",
    description: "Plataforma de relatos e integridade corporativa da Integrare. Em conformidade com a LGPD.",
    siteName: "Integrare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrare | Canal de Denúncias Seguro",
    description: "Proteja o ambiente corporativo e reduza passivos trabalhistas com nosso canal anônimo.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-brand-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
