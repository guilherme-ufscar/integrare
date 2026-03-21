"use client"

import { useState, useEffect } from "react"

const WA_NUMBER = "5586999210196"
const WA_MESSAGE = "Olá! Estou visitando o site da Integrare e gostaria de saber mais sobre o Canal de Denúncias para a minha empresa."

export function WhatsAppWidget() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (dismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {visible && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs w-72 animate-fade-in-up relative">
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Fechar"
          >
            ×
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg"
                alt="WhatsApp"
                className="w-5 h-5 invert"
              />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800 leading-tight">Integrare Compliance</p>
              <span className="flex items-center gap-1 text-xs text-[#25D366]">
                <span className="w-2 h-2 rounded-full bg-[#25D366] inline-block"></span>
                Online agora
              </span>
            </div>
          </div>
          <div className="bg-[#f0fdf4] rounded-xl rounded-tl-none px-3 py-2 mb-3">
            <p className="text-sm text-gray-700 leading-snug">
              👋 Olá! Posso te ajudar a encontrar o plano ideal de Canal de Denúncias para a sua empresa?
            </p>
          </div>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold rounded-xl py-2.5 transition-colors"
          >
            <img
              src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg"
              alt=""
              className="w-4 h-4 invert"
            />
            Iniciar conversa
          </a>
        </div>
      )}

      <a
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110"
        aria-label="Falar no WhatsApp"
        onClick={() => setVisible(false)}
      >
        <img
          src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg"
          alt="WhatsApp"
          className="w-7 h-7 invert"
        />
      </a>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.35s ease-out;
        }
      `}</style>
    </div>
  )
}
