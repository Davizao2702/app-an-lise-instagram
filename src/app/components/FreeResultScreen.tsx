"use client"

import { useState } from "react"
import { Lock, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AnalysisResult } from "../page"

interface FreeResultScreenProps {
  result: AnalysisResult
  onUnlock: () => void
}

export function FreeResultScreen({ result, onUnlock }: FreeResultScreenProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header Compacto */}
      <div className="pt-4 px-4 pb-2">
        <h2 className="text-lg font-bold text-white">Seu resultado</h2>
      </div>

      {/* Content - Otimizado para mobile */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="max-w-md w-full mx-auto space-y-4">
          {/* Score Card - Compacto */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8960C]/10 border-2 border-[#D4AF37]/30 rounded-2xl p-5">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-black border-4 border-[#D4AF37]">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D4AF37]">
                    {result.score}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">de 100</div>
                </div>
              </div>

              <div className={`inline-block px-4 py-1.5 rounded-full font-bold text-xs ${
                result.score <= 40 
                  ? "bg-red-900/30 text-red-400 border-2 border-red-800"
                  : result.score <= 70
                  ? "bg-yellow-900/30 text-yellow-400 border-2 border-yellow-800"
                  : "bg-green-900/30 text-green-400 border-2 border-green-800"
              }`}>
                {result.classification}
              </div>
              
              <p className="text-sm text-gray-300 leading-snug px-1">
                {result.impactPhrase}
              </p>
            </div>
          </div>

          {/* Paywall Card - Destaque Principal */}
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B8960C]/20 border-2 border-[#D4AF37] rounded-2xl p-6 space-y-4">
            {/* Título forte */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white leading-tight">
                Desbloqueie sua análise profissional completa
              </h3>
              <p className="text-sm text-gray-300 leading-snug">
                Receba insights detalhados, sugestões personalizadas e um plano de ação para transformar seu perfil
              </p>
            </div>

            {/* Preview Bloqueado */}
            <div className="bg-black/50 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-4 space-y-3 relative overflow-hidden">
              {/* Overlay de blur */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 backdrop-blur-[2px] z-10 flex items-center justify-center">
                <div className="bg-[#D4AF37] p-3 rounded-full">
                  <Lock className="w-6 h-6 text-black" />
                </div>
              </div>

              {/* Conteúdo borrado */}
              <div className="space-y-2 opacity-40">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-300">Análise detalhada de cada elemento</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-300">Sugestões específicas de melhoria</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-300">Checklist completo de ações</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-300">Ideias de conteúdo profissional</span>
                </div>
              </div>
            </div>

            {/* Planos de Assinatura */}
            <div className="space-y-3">
              {/* Plano Anual - Destaque */}
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8960C] p-[2px] rounded-xl relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                  ECONOMIZE 44%
                </div>
                <div className="bg-black rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-sm">Plano Anual</div>
                      <div className="text-gray-400 text-xs">Acesso ilimitado por 1 ano</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#D4AF37] font-bold text-xl">R$199</div>
                      <div className="text-gray-500 text-[10px] line-through">R$358,80</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plano Mensal */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold text-sm">Plano Mensal</div>
                    <div className="text-gray-400 text-xs">Renovação automática</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-xl">R$29,90</div>
                    <div className="text-gray-500 text-[10px]">por mês</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Principal */}
            <Button
              onClick={onUnlock}
              size="lg"
              className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-black font-bold text-base py-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#D4AF37]/30"
            >
              Desbloquear análise completa
            </Button>

            <p className="text-center text-[10px] text-gray-500">
              Acesso imediato • Cancele quando quiser
            </p>
          </div>

          {/* Seção Colapsável - Ver mais (opcional) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full p-3 flex items-center justify-between hover:bg-zinc-800 transition-colors"
            >
              <span className="text-white font-semibold text-sm">O que está incluído?</span>
              {showDetails ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {showDetails && (
              <div className="px-3 pb-3 space-y-1.5 border-t border-zinc-800 pt-3">
                {[
                  "Análise detalhada da bio e posicionamento",
                  "Avaliação profissional da foto de perfil",
                  "Análise completa do feed e consistência",
                  "Avaliação dos destaques e stories",
                  "Sugestões específicas de fotos profissionais",
                  "Checklist completo de melhorias prioritárias",
                  "Ideias de conteúdo personalizadas"
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-gray-300 p-2 rounded-lg bg-zinc-800/50"
                  >
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
