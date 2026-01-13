"use client"

import { Instagram, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OnboardingScreenProps {
  onStart: () => void
}

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header com logo minimalista */}
      <div className="pt-6 px-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-[#D4AF37]/20 p-2 rounded-xl border border-[#D4AF37]/30">
            <Instagram className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <span className="font-bold text-lg text-[#D4AF37]">InstaStyle</span>
        </div>
      </div>

      {/* Conteúdo principal - Compacto */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-6">
        <div className="w-full max-w-md space-y-6">
          {/* Ilustração/Ícone principal - Reduzido */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B8960C]/20 p-8 rounded-3xl border border-[#D4AF37]/30">
              <Instagram className="w-16 h-16 text-[#D4AF37]" />
            </div>
          </div>

          {/* Título e descrição - Compacto */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Transforme seu Instagram no estilo em que você procura
            </h1>
            
            <p className="text-sm text-gray-400 leading-relaxed">
              A IA analisa seu perfil e mostra exatamente o que melhorar
            </p>
          </div>

          {/* Features em cards limpos - Compacto */}
          <div className="space-y-2 pt-2">
            {[
              { icon: "✨", text: "Análise em segundos" },
              { icon: "🎯", text: "Feedback direto" },
              { icon: "💡", text: "Sugestões personalizadas" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-zinc-900 border border-[#D4AF37]/20 p-3 rounded-xl flex items-center gap-3"
              >
                <span className="text-xl">{feature.icon}</span>
                <span className="text-gray-300 text-xs font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button fixo no bottom */}
      <div className="p-4 bg-black border-t border-[#D4AF37]/20">
        <div className="w-full max-w-md mx-auto space-y-2">
          <Button
            onClick={onStart}
            size="lg"
            className="w-full bg-[#D4AF37] hover:bg-[#B8960C] text-black font-semibold text-sm py-5 rounded-xl transition-all duration-200 shadow-lg shadow-[#D4AF37]/20"
          >
            Avaliar meu Instagram
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-[10px] text-gray-500 text-center">
            Análise gratuita • Sem cadastro necessário
          </p>
        </div>
      </div>
    </div>
  )
}
