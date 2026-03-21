import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/landing/Hero"
import { Problem } from "@/components/landing/Problem"
import { Solution } from "@/components/landing/Solution"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Benefits } from "@/components/landing/Benefits"
import { Pricing } from "@/components/landing/Pricing"
import { Contact } from "@/components/landing/Contact"
import { WhatsAppWidget } from "@/components/landing/WhatsAppWidget"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
