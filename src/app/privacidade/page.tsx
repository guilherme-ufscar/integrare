import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export default function PrivacidadePage() {
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
        <h1 className="text-3xl font-bold text-[#1E2421] mb-2">Política de Privacidade</h1>
        <p className="text-sm text-[#5F6B66] mb-8">Última atualização: março de 2026</p>

        <div className="bg-white rounded-2xl border border-[#D7E2DD] p-8 space-y-8 text-sm text-[#1E2421] leading-relaxed">
          <Section title="1. Sobre esta Política">
            <p>
              A Integrare Compliance Ltda. ("Integrare", "nós" ou "nosso") respeita sua privacidade e está comprometida
              em proteger os dados pessoais que coletamos. Esta Política de Privacidade descreve como tratamos as
              informações coletadas por meio de nossa plataforma de canal de denúncias e site institucional, em
              conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </Section>

          <Section title="2. Dados que Coletamos">
            <p><strong>2.1 Denunciantes:</strong> Quando um relato é registrado, coletamos apenas as informações
            fornecidas voluntariamente (categoria, descrição, local, data do ocorrido). Não coletamos endereço IP,
            dispositivo ou qualquer dado que possa identificar o denunciante sem seu consentimento expresso.</p>
            <p className="mt-2"><strong>2.2 Empresas Clientes:</strong> Coletamos nome da empresa, nome do responsável,
            e-mail, telefone e dados de cobrança (processados com segurança via Stripe) para viabilizar a prestação
            do serviço.</p>
            <p className="mt-2"><strong>2.3 Usuários do Painel:</strong> Coletamos nome, e-mail e senha (armazenada
            com hash bcrypt) dos usuários que acessam o painel de gestão.</p>
          </Section>

          <Section title="3. Finalidade do Tratamento">
            <ul className="list-disc ml-4 space-y-1">
              <li>Operar o canal de denúncias de forma segura e confidencial</li>
              <li>Gerenciar a relação contratual com empresas clientes</li>
              <li>Processar pagamentos e gerenciar assinaturas</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Melhorar a plataforma com base em dados agregados e anonimizados</li>
            </ul>
          </Section>

          <Section title="4. Base Legal">
            <p>O tratamento de dados é realizado com base no legítimo interesse, execução de contrato e cumprimento
            de obrigação legal, conforme previsto no Art. 7º da LGPD.</p>
          </Section>

          <Section title="5. Compartilhamento de Dados">
            <p>Não vendemos, alugamos ou compartilhamos dados pessoais com terceiros para fins comerciais.
            Compartilhamos dados apenas com:</p>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li><strong>Stripe:</strong> para processamento seguro de pagamentos</li>
              <li><strong>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial</li>
            </ul>
          </Section>

          <Section title="6. Segurança">
            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo:</p>
            <ul className="list-disc ml-4 mt-2 space-y-1">
              <li>Criptografia em trânsito (HTTPS/TLS)</li>
              <li>Hash de chaves de acesso e senhas com bcrypt</li>
              <li>Controle de acesso baseado em perfis (RBAC)</li>
              <li>Segregação de dados por empresa (multi-tenant)</li>
            </ul>
          </Section>

          <Section title="7. Retenção de Dados">
            <p>Os dados são retidos pelo prazo necessário para a prestação do serviço e cumprimento de obrigações
            legais. Após o encerramento contratual, os dados são anonimizados ou excluídos no prazo de 90 dias,
            salvo obrigação legal em contrário.</p>
          </Section>

          <Section title="8. Seus Direitos (LGPD)">
            <p>Você tem direito a: confirmar a existência de tratamento; acessar seus dados; corrigir dados
            incompletos; anonimizar, bloquear ou eliminar dados desnecessários; portabilidade; e revogar consentimento.
            Para exercer esses direitos, entre em contato pelo e-mail{" "}
            <a href="mailto:privacidade@integrarecorp.com.br" className="text-[#123C33] underline">
              privacidade@integrarecorp.com.br
            </a>.</p>
          </Section>

          <Section title="9. Contato">
            <p>
              Controlador: Integrare Compliance Ltda.<br />
              DPO: privacidade@integrarecorp.com.br<br />
              Autoridade Nacional de Proteção de Dados (ANPD):{" "}
              <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-[#123C33] underline">
                www.gov.br/anpd
              </a>
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
