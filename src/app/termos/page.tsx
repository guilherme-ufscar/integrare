import Link from "next/link"
import Image from "next/image"

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      <header className="bg-white border-b border-[#D7E2DD]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <Link href="/">
            <Image src="/files/logo.svg" alt="Integrare" width={120} height={32} priority />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#1E2421] mb-1">Contrato de Prestação de Serviços</h1>
        <p className="text-sm text-[#5F6B66] mb-1">Canal de Relacionamento Corporativo</p>
        <p className="text-xs text-[#5F6B66] mb-8 italic">com Adendo de Proteção de Dados (DPA)</p>

        <div className="bg-white rounded-2xl border border-[#D7E2DD] p-8 space-y-8 text-sm text-[#1E2421] leading-relaxed">

          <Section title="1. Qualificação das Partes">
            <p>
              São partes neste instrumento:
            </p>
            <p className="mt-3">
              <strong>CONTRATADA:</strong> INTEGRARE SOLUÇÕES CORPORATIVAS, pessoa jurídica de direito privado,
              com sede na cidade de Teresina, Estado do Piauí, doravante denominada simplesmente <strong>INTEGRARE</strong>.
            </p>
            <p className="mt-2">
              <strong>CONTRATANTE:</strong> Empresa cliente identificada no momento da contratação, pessoa jurídica
              de direito privado, doravante denominada simplesmente <strong>CONTRATANTE</strong>.
            </p>
            <p className="mt-2">
              A INTEGRARE e a CONTRATANTE são individualmente referidas como "Parte" e, conjuntamente, como "Partes".
            </p>
          </Section>

          <Section title="2. Objeto do Contrato">
            <p>
              <strong>2.1.</strong> O presente contrato tem por objeto a prestação, pela INTEGRARE, de serviços de
              Canal de Relacionamento Corporativo Terceirizado — canal de ética e denúncias —, consistente em
              plataforma digital 100% segura, anônima e em conformidade com a legislação vigente, na modalidade
              do Plano indicado no momento da contratação.
            </p>
            <p className="mt-3"><strong>2.2.</strong> Os serviços incluem, conforme o Plano contratado:</p>
            <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1.5">
              <li>Portal web exclusivo com formulário anônimo criptografado, acessível via link ou QR Code personalizado da CONTRATANTE;</li>
              <li>Geração automática de protocolo único por denúncia, com canal de acompanhamento anônimo (chat assíncrono);</li>
              <li>Funcionalidade de upload de evidências e anexos pelo denunciante;</li>
              <li>Painel gerencial para a CONTRATANTE acompanhar, classificar e gerir os casos recebidos;</li>
              <li>Relatórios periódicos com indicadores de compliance;</li>
              <li>Nos planos Canal Gerenciado e Compliance 360°: triagem, categorização e classificação de gravidade dos relatos pela INTEGRARE;</li>
              <li>No plano Compliance 360°, adicionalmente: relatório trimestral executivo e apoio ao desenvolvimento do Código de Ética.</li>
            </ul>
            <p className="mt-3">
              <strong>2.3.</strong> O canal ficará disponível 24 horas por dia, 7 dias por semana, com setup
              concluído em até 5 (cinco) dias úteis após a assinatura deste instrumento e o pagamento da taxa de setup.
            </p>
            <p className="mt-2">
              <strong>2.4.</strong> Quaisquer serviços adicionais (add-ons) não previstos no Plano contratado
              deverão ser solicitados por escrito e serão formalizados em Aditivo a este Contrato.
            </p>
          </Section>

          <Section title="3. Obrigações da Integrare">
            <p><strong>3.1.</strong> Compete à INTEGRARE:</p>
            <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1.5">
              <li>Manter a plataforma operacional e disponível conforme o SLA aplicável ao Plano contratado;</li>
              <li>Garantir o anonimato absoluto do denunciante em todas as etapas do processo, não revelando à CONTRATANTE qualquer dado que permita a identificação do informante;</li>
              <li>Tratar os dados pessoais exclusivamente nos termos do Adendo de Proteção de Dados (Anexo I);</li>
              <li>Comunicar à CONTRATANTE, no prazo de até 72 (setenta e duas) horas, qualquer incidente de segurança que possa comprometer dados pessoais tratados no âmbito deste Contrato;</li>
              <li>Disponibilizar URL exclusiva e material de divulgação interna para comunicação do canal aos colaboradores da CONTRATANTE (endomarketing);</li>
              <li>Prestar suporte técnico nos canais e horários definidos para o Plano contratado;</li>
              <li>Manter sigilo sobre todas as informações relativas à CONTRATANTE, seus colaboradores e os relatos recebidos.</li>
            </ul>
          </Section>

          <Section title="4. Obrigações da Contratante">
            <p><strong>4.1.</strong> Compete à CONTRATANTE:</p>
            <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1.5">
              <li>Efetuar o pagamento do valor mensal e da taxa de setup nas datas e condições previstas neste instrumento;</li>
              <li>Designar um representante interno (gestor do canal) responsável pelo acesso ao painel gerencial e pela condução das investigações;</li>
              <li>Divulgar o canal de denúncias a todos os colaboradores, terceiros e parceiros, na forma recomendada pela INTEGRARE;</li>
              <li>Conduzir, de forma independente e responsável, as investigações internas relativas aos relatos recebidos, sendo a decisão disciplinar final de exclusiva responsabilidade da CONTRATANTE;</li>
              <li>Não utilizar a plataforma para finalidades diversas do objeto deste Contrato;</li>
              <li>Comunicar imediatamente à INTEGRARE qualquer suspeita de uso indevido ou acesso não autorizado ao painel gerencial.</li>
            </ul>
          </Section>

          <Section title="5. Remuneração e Condições de Pagamento">
            <p>
              <strong>5.1.</strong> A CONTRATANTE pagará à INTEGRARE os valores indicados no momento da contratação, sendo:
            </p>
            <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1.5">
              <li>Taxa de setup (única e não reembolsável): devida no ato da contratação ou, no máximo, antes do início do processo de implementação;</li>
              <li>Mensalidade: devida a partir do mês de ativação do canal, cobrada de forma recorrente via cartão de crédito.</li>
            </ul>
            <p className="mt-3">
              <strong>5.2.</strong> O pagamento é processado de forma segura via Stripe. Ao fornecer os dados do
              cartão, a CONTRATANTE autoriza a cobrança mensal automática até o cancelamento formal do serviço.
            </p>
            <p className="mt-2">
              <strong>5.3.</strong> O atraso no pagamento sujeitará a CONTRATANTE à incidência de multa moratória
              de 2% (dois por cento) sobre o valor devido, acrescida de juros de mora de 1% (um por cento) ao mês
              e correção monetária pelo IPCA, calculados pro rata die.
            </p>
            <p className="mt-2">
              <strong>5.4.</strong> O inadimplemento por período superior a 30 (trinta) dias corridos autorizará
              a INTEGRARE a suspender o acesso ao canal, sem prejuízo da cobrança dos valores em aberto.
            </p>
            <p className="mt-2">
              <strong>5.5.</strong> Os valores mensais serão reajustados anualmente, na data de aniversário do
              Contrato, pelo índice IPCA acumulado nos últimos 12 (doze) meses.
            </p>
          </Section>

          <Section title="6. Prazo e Renovação">
            <p>
              <strong>6.1.</strong> O presente Contrato vigorará pelo prazo de 12 (doze) meses, contados da data
              de ativação, renovando-se automaticamente por períodos iguais e sucessivos, salvo manifestação
              contrária de qualquer das Partes com antecedência mínima de 30 (trinta) dias do término da vigência
              ou de qualquer renovação.
            </p>
            <p className="mt-2">
              <strong>6.2.</strong> A rescisão antecipada por iniciativa da CONTRATANTE, sem justa causa, antes
              do término da vigência contratual em curso, implicará o pagamento de multa compensatória equivalente
              a 2 (duas) mensalidades vigentes à época da rescisão.
            </p>
            <p className="mt-2">
              <strong>6.3.</strong> A rescisão por justa causa — configurada pelo descumprimento material de
              obrigação contratual não sanado no prazo de 15 (quinze) dias após notificação escrita — poderá ser
              exercida por qualquer das Partes, sem ônus para a Parte inocente.
            </p>
          </Section>

          <Section title="7. Confidencialidade">
            <p>
              <strong>7.1.</strong> As Partes se obrigam a manter em sigilo todas as informações confidenciais
              a que tiverem acesso em razão deste Contrato, inclusive o conteúdo dos relatos, os dados dos
              denunciantes, as investigações internas e os pareceres emitidos.
            </p>
            <p className="mt-2">
              <strong>7.2.</strong> A obrigação de confidencialidade prevista nesta cláusula subsistirá por
              5 (cinco) anos após o encerramento ou rescisão deste Contrato.
            </p>
            <p className="mt-2">
              <strong>7.3.</strong> Não será considerada violação de confidencialidade a divulgação de informações:
              (a) exigida por determinação judicial ou autoridade regulatória competente; (b) que sejam de domínio
              público sem culpa da Parte; ou (c) que já fossem de conhecimento da Parte receptora antes da
              celebração deste Contrato.
            </p>
          </Section>

          <Section title="8. Propriedade Intelectual">
            <p>
              <strong>8.1.</strong> Todos os direitos de propriedade intelectual sobre a plataforma, o software,
              os relatórios e demais materiais desenvolvidos pela INTEGRARE são e permanecerão de titularidade
              exclusiva da INTEGRARE.
            </p>
            <p className="mt-2">
              <strong>8.2.</strong> A CONTRATANTE recebe, pelo período de vigência deste Contrato, licença de
              uso não exclusiva, intransferível e limitada ao objeto contratado, para acesso à plataforma e ao
              painel gerencial.
            </p>
          </Section>

          <Section title="9. Limitação de Responsabilidade">
            <p>
              <strong>9.1.</strong> A INTEGRARE não se responsabiliza pela tomada de decisões disciplinares ou
              administrativas da CONTRATANTE em relação aos relatos recebidos, sendo a decisão final de
              competência exclusiva da CONTRATANTE.
            </p>
            <p className="mt-2">
              <strong>9.2.</strong> A responsabilidade total da INTEGRARE perante a CONTRATANTE, por quaisquer
              danos decorrentes deste Contrato, limita-se ao valor das mensalidades efetivamente pagas nos
              últimos 3 (três) meses anteriores ao evento danoso, exceto em casos de dolo ou culpa grave.
            </p>
            <p className="mt-2">
              <strong>9.3.</strong> Em nenhuma hipótese será a INTEGRARE responsável por danos indiretos,
              lucros cessantes ou danos emergentes decorrentes do uso ou impossibilidade de uso da plataforma,
              salvo por ato doloso.
            </p>
          </Section>

          <Section title="10. Disposições Gerais">
            <p>
              <strong>10.1.</strong> O presente Contrato é celebrado em caráter irrevogável e irretratável,
              obrigando as Partes e seus sucessores a qualquer título.
            </p>
            <p className="mt-2">
              <strong>10.2.</strong> Qualquer alteração a este Contrato somente será válida se formalizada
              por instrumento escrito assinado por ambas as Partes.
            </p>
            <p className="mt-2">
              <strong>10.3.</strong> A tolerância de qualquer das Partes quanto ao descumprimento de obrigação
              pela outra Parte não implicará novação, renúncia ou alteração das condições pactuadas.
            </p>
            <p className="mt-2">
              <strong>10.4.</strong> Se qualquer disposição deste Contrato for considerada inválida ou
              inexequível, as demais disposições permanecerão em pleno vigor.
            </p>
            <p className="mt-2">
              <strong>10.5.</strong> Este Contrato representa o acordo integral entre as Partes em relação
              ao seu objeto, substituindo quaisquer entendimentos anteriores, verbais ou escritos.
            </p>
          </Section>

          <Section title="11. Foro">
            <p>
              <strong>11.1.</strong> As Partes elegem o Foro da Comarca de Teresina, Estado do Piauí, como
              competente para dirimir quaisquer controvérsias decorrentes deste Contrato, renunciando
              expressamente a qualquer outro, por mais privilegiado que seja.
            </p>
          </Section>

          {/* Adendo */}
          <div className="border-t-2 border-[#D7E2DD] pt-8">
            <h2 className="text-lg font-bold text-[#1E2421] mb-1 text-center">Anexo I — Adendo de Proteção de Dados (DPA)</h2>
            <p className="text-xs text-[#5F6B66] text-center mb-6 italic">Data Protection Agreement — Lei nº 13.709/2018 (LGPD)</p>
            <p className="text-xs text-[#5F6B66] mb-6">
              Este Adendo integra o Contrato Principal e disciplina o tratamento de dados pessoais pela INTEGRARE
              na qualidade de OPERADORA, em nome da CONTRATANTE como CONTROLADORA, nos termos da LGPD. Em caso de
              conflito entre este Adendo e o Contrato, prevalecem as disposições deste Adendo em matéria de
              proteção de dados.
            </p>
          </div>

          <Section title="D.1. Papéis e Finalidade">
            <p>
              <strong>D.1.1.</strong> A CONTRATANTE é CONTROLADORA dos dados pessoais tratados no canal. A
              INTEGRARE é OPERADORA, processando dados exclusivamente conforme as instruções da Controladora e
              para as finalidades deste Contrato: operação do canal, gestão dos relatos, geração de relatórios
              e cumprimento das Leis 14.457/22, 14.611/23 e NR-01.
            </p>
            <p className="mt-2">
              <strong>D.1.2.</strong> As bases legais aplicáveis são: cumprimento de obrigação legal
              (art. 7º, II, LGPD); execução de contrato (art. 7º, V); e legítimo interesse da Controladora
              na prevenção de passivos trabalhistas (art. 7º, IX).
            </p>
          </Section>

          <Section title="D.2. Dados Tratados">
            <p>
              <strong>D.2.1.</strong> A plataforma é projetada para garantir o anonimato absoluto (Privacy by
              Design). Nenhum dado identificador do denunciante é coletado ou vinculado ao relato. São tratados:
              (a) metadados técnicos de acesso, para fins de segurança; (b) dados dos gestores da CONTRATANTE
              (nome, e-mail, cargo, logs de acesso); (c) dados de terceiros mencionados nos relatos, inseridos
              pelo próprio denunciante.
            </p>
          </Section>

          <Section title="D.3. Obrigações da Integrare como Operadora">
            <p><strong>D.3.1.</strong> A INTEGRARE se obriga a:</p>
            <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1.5">
              <li>Tratar dados pessoais somente conforme as instruções da Controladora e para as finalidades previstas;</li>
              <li>Garantir confidencialidade a todos os colaboradores com acesso aos dados;</li>
              <li>Adotar medidas técnicas adequadas de segurança, incluindo criptografia em trânsito e em repouso, controle de acesso por perfis e hospedagem em servidores nacionais;</li>
              <li>Não subcontratar o tratamento sem autorização prévia da Controladora, exceto quanto aos suboperadores já utilizados (provedor de hospedagem nacional e provedor de e-mail transacional);</li>
              <li>Notificar a Controladora em até 72 horas sobre qualquer incidente de segurança;</li>
              <li>Cooperar com a Controladora no atendimento às requisições dos titulares (art. 18, LGPD);</li>
              <li>Eliminar ou devolver os dados ao término do Contrato, no prazo de 60 dias, salvo obrigação legal de retenção.</li>
            </ul>
          </Section>

          <Section title="D.4. Retenção e Exclusão">
            <p>
              <strong>D.4.1.</strong> Os dados serão retidos pelo prazo necessário às finalidades e ao
              cumprimento dos prazos prescricionais trabalhistas aplicáveis. Findo o Contrato, os dados serão
              eliminados de forma segura em até 60 dias, salvo obrigação legal em contrário.
            </p>
          </Section>

          <Section title="D.5. Contato para Privacidade">
            <p>
              <strong>D.5.1.</strong> Encarregado de Dados (DPO) da INTEGRARE:{" "}
              <a href="mailto:privacidade@integrarecorp.com.br" className="text-[#123C33] underline">
                privacidade@integrarecorp.com.br
              </a>
            </p>
          </Section>

        </div>
      </main>

      <footer className="py-6 border-t border-[#D7E2DD] bg-white text-center text-xs text-[#5F6B66] mt-8">
        © {new Date().getFullYear()} Integrare Soluções Corporativas. Todos os direitos reservados. —{" "}
        Teresina, Piauí, Brasil.
      </footer>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-bold text-[#1E2421] mb-3 text-[#123C33]">{title}</h2>
      {children}
    </div>
  )
}
