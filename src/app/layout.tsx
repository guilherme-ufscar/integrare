import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Integrare | Canal de Denúncias Seguro e Confidencial",
  description: "Plataforma de relatos e integridade corporativa da Integrare. Em conformidade com a LGPD e Leis 14.457/22 e 14.611/23.",
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
