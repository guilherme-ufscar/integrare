"use client"

import { useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, Share2, Link2 } from "lucide-react"

interface QRCodeCardProps {
  slug: string
  companyName: string
}

export function QRCodeCard({ slug, companyName }: QRCodeCardProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const url = `https://integrarecorp.com.br/canal/${slug}`

  function copyLink() {
    navigator.clipboard.writeText(url)
  }

  function downloadPNG() {
    const canvas = canvasRef.current?.querySelector("canvas")
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `qrcode-canal-${slug}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  async function downloadPDF() {
    const canvas = canvasRef.current?.querySelector("canvas")
    if (!canvas) return

    const { jsPDF } = await import("jspdf")
    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageW = pdf.internal.pageSize.getWidth()

    // Título
    pdf.setFontSize(20)
    pdf.setTextColor(18, 60, 51)
    pdf.text("Canal de Denúncias", pageW / 2, 30, { align: "center" })

    // Nome da empresa
    pdf.setFontSize(14)
    pdf.setTextColor(30, 36, 33)
    pdf.text(companyName, pageW / 2, 42, { align: "center" })

    // QR Code centralizado
    const qrSize = 80
    const qrX = (pageW - qrSize) / 2
    pdf.addImage(imgData, "PNG", qrX, 55, qrSize, qrSize)

    // Instrução
    pdf.setFontSize(11)
    pdf.setTextColor(95, 107, 102)
    pdf.text("Aponte a câmera do seu celular para o QR Code", pageW / 2, 145, { align: "center" })
    pdf.text("ou acesse o link abaixo:", pageW / 2, 152, { align: "center" })

    // URL
    pdf.setFontSize(10)
    pdf.setTextColor(18, 60, 51)
    pdf.text(url, pageW / 2, 162, { align: "center" })

    // Rodapé
    pdf.setFontSize(9)
    pdf.setTextColor(150, 150, 150)
    pdf.text("Canal operado pela Integrare Compliance — em conformidade com a LGPD", pageW / 2, 285, { align: "center" })

    pdf.save(`canal-denuncia-${slug}.pdf`)
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: `Canal de Denúncias — ${companyName}`,
        text: "Acesse o canal de denúncias de forma segura e anônima.",
        url,
      })
    } else {
      copyLink()
      alert("Link copiado para a área de transferência!")
    }
  }

  return (
    <div className="bg-[#EAF4F0] rounded-xl border border-[#D7E2DD] p-6 space-y-5">
      {/* Cabeçalho */}
      <div>
        <h2 className="font-semibold text-[#1E2421] mb-1">URL do Canal de Denúncias</h2>
        <p className="text-xs text-[#5F6B66]">
          Compartilhe o link ou o QR Code abaixo com os colaboradores da empresa para que possam
          registrar denúncias de forma <strong>segura e anônima</strong>. O acesso é direto —
          sem cadastro, sem identificação.
        </p>
      </div>

      {/* Link copiável */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#D7E2DD] px-3 py-2 rounded-lg">
          <Link2 className="w-4 h-4 text-[#123C33] shrink-0" />
          <code className="text-sm text-[#123C33] truncate flex-1">{url}</code>
        </div>
        <button
          onClick={copyLink}
          className="px-3 py-2 text-xs rounded-lg border border-[#D7E2DD] bg-white text-[#5F6B66] hover:bg-[#F8FAF9] transition-colors whitespace-nowrap"
        >
          Copiar link
        </button>
      </div>

      {/* QR Code */}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="bg-white p-4 rounded-xl border border-[#D7E2DD] shadow-sm" ref={canvasRef}>
          <QRCodeCanvas
            value={url}
            size={160}
            bgColor="#ffffff"
            fgColor="#123C33"
            level="H"
            includeMargin={false}
          />
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="bg-white rounded-lg border border-[#D7E2DD] px-4 py-3 space-y-1">
            <p className="text-xs font-medium text-[#1E2421]">Como usar o QR Code</p>
            <p className="text-xs text-[#5F6B66]">
              Imprima e fixe em murais, banheiros ou áreas de convivência. O colaborador aponta
              a câmera do celular e acessa o canal instantaneamente — sem precisar digitar o link.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadPNG}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg bg-[#123C33] text-white hover:bg-[#1a5244] transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Salvar como imagem
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-[#123C33] text-[#123C33] hover:bg-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Salvar como PDF
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-[#D7E2DD] text-[#5F6B66] bg-white hover:bg-[#F8FAF9] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" /> Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
