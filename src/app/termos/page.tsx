import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      <header className="bg-white border-b border-[#D7E2DD]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-[#123C33] rounded-lg">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#123C33]">Integrare</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1E2421] mb-2">Termos de Uso</h1>
        <p className="text-sm text-[#5F6B66] mb-8">Última atualização: março de 2026</p>

        <div className="bg-white rounded-2xl border border-[#D7E2DD] p-8 space-y-8 text-sm text-[#1E2421] leading-relaxed">
          <Section title="1. Aceitação dos Termos">
            <p>
              Ao utilizar a plataforma Integrare Compliance ("Serviço"), você concorda com estes Termos de Uso.
              Caso não concorde, não utilize o Serviço. Estes termos constituem um contrato vinculante entre você
              e a Integrare Compliance Ltda.
            </p>
          </Section>

          <Section title="2. Descrição do Serviço">
            <p>
              A Integrare oferece uma plataforma SaaS de canal de denúncias e compliance, que permite às empresas
              contratantes ("Clientes") disponibilizar um canal seguro e anônimo para recebimento de relatos de
              seus colaboradores, fornecedores e partes interessadas.
            </p>
          </Section>

          <Section title="3. Cadastro e Acesso">
            <p>
              <strong>3.1</strong> O acesso ao painel de gestão é restrito a usuários cadastrados por meio do
              processo de checkout. Não é permitido o compartilhamento de credenciais.
            </p>
            <p className="mt-2">
              <strong>3.2</strong> O Cliente é responsável por manter a confidencialidade de suas credenciais de
              acesso e por todas as atividades realizadas em sua conta.
            </p>
            <p className="mt-2">
              <strong>3.3</strong> O cadastro de usuários adicionais deve ser solicitado ao suporte.
            </p>
          </Section>

          <Section title="4. Planos e Pagamento">
            <p>
              <strong>4.1</strong> O Serviço é cobrado mensalmente de forma recorrente, conforme o plano contratado.
              Os valores vigentes estão disponíveis em nossa página de planos.
            </p>
            <p className="mt-2">
              <strong>4.2</strong> O pagamento é processado via Stripe. Ao fornecer dados de cartão, você autoriza
              a cobrança mensal automática até o cancelamento.
            </p>
            <p className="mt-2">
              <strong>4.3</strong> Em caso de falha no pagamento, o acesso ao painel será suspenso automaticamente.
              O serviço é reativado após regularização.
            </p>
          </Section>

          <Section title="5. Uso Permitido">
            <p>Você concorda em utilizar o Serviço apenas para fins legítimos e em conformidade com:</p>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>A legislação brasileira vigente</li>
              <li>A Lei Geral de Proteção de Dados (LGPD)</li>
              <li>A Lei 14.457/2022 (Canal de Denúncias para CIPA)</li>
              <li>Estes Termos de Uso</li>
            </ul>
          </Section>

          <Section title="6. Uso Proibido">
            <p>É expressamente proibido:</p>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Registrar relatos falsos ou de má-fé</li>
              <li>Tentar identificar denunciantes anônimos</li>
              <li>Acessar dados de outras empresas</li>
              <li>Realizar engenharia reversa ou tentar violar a segurança da plataforma</li>
            </ul>
          </Section>

          <Section title="7. Confidencialidade dos Relatos">
            <p>
              A Integrare garante a confidencialidade dos relatos recebidos. Nenhum dado identificador do
              denunciante é coletado ou armazenado sem seu consentimento. As chaves de acesso são hashed e
              não podem ser recuperadas pela Integrare.
            </p>
          </Section>

          <Section title="8. Limitação de Responsabilidade">
            <p>
              A Integrare não se responsabiliza por decisões tomadas pelo Cliente com base nos relatos recebidos.
              A Integrare atua como canal de recebimento e, nos planos gerenciados, como apoio técnico à investigação,
              nunca como responsável final pelas medidas disciplinares ou legais adotadas.
            </p>
          </Section>

          <Section title="9. Cancelamento">
            <p>
              O cancelamento pode ser solicitado a qualquer momento por e-mail para
              {" "}<a href="mailto:financeiro@integrarecorp.com.br" className="text-[#123C33] underline">
                financeiro@integrarecorp.com.br
              </a>{" "}
              com prazo mínimo de 30 dias. Não há reembolso proporcional para o mês em curso.
            </p>
          </Section>

          <Section title="10. Alterações nos Termos">
            <p>
              A Integrare pode atualizar estes termos a qualquer momento. Alterações relevantes serão comunicadas
              por e-mail com 15 dias de antecedência. O uso continuado do Serviço após a vigência das alterações
              constitui aceite dos novos termos.
            </p>
          </Section>

          <Section title="11. Foro e Lei Aplicável">
            <p>
              Estes termos são regidos pela lei brasileira. Para dirimir controvérsias, fica eleito o foro da
              Comarca de São Paulo/SP, com renúncia expressa a qualquer outro.
            </p>
          </Section>

          <Section title="12. Contato">
            <p>
              Integrare Compliance Ltda.<br />
              contato@integrarecorp.com.br
            </p>
          </Section>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold text-[#1E2421] mb-3">{title}</h2>
      {children}
    </div>
  )
}
