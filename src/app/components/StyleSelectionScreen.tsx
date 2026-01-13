"use client"

import { Briefcase, Palette, Sparkles, ArrowRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StyleSelectionScreenProps {
  onStyleSelect: (style: string) => void
}

export function StyleSelectionScreen({ onStyleSelect }: StyleSelectionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header com logo */}
      <div className="pt-8 px-6 pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#D4AF37]/20 p-2 rounded-xl border border-[#D4AF37]/30">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <span className="font-bold text-lg text-[#D4AF37]">InstaStyle</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 px-6 py-8">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
              Qual estilo você busca?
            </h2>
            <p className="text-base text-gray-400">
              Escolha o tipo de análise para seu perfil
            </p>
          </div>

          {/* Style Cards */}
          <div className="space-y-4 pt-4">
            {/* Executivo / Profissional */}
            <button
              onClick={() => onStyleSelect("Executivo / Profissional")}
              className="w-full group"
            >
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8960C]/10 border-2 border-[#D4AF37]/30 rounded-3xl p-6 hover:border-[#D4AF37] transition-all duration-200 active:scale-98">
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4AF37] p-3 rounded-2xl flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-black" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Executivo / Profissional
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Para empreendedores e executivos que buscam transmitir autoridade
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {[
                        "Análise de posicionamento executivo",
                        "Avaliação de autoridade visual",
                        "Coerência profissional"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* Criador de Conteúdo */}
            <div className="bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 p-3 rounded-2xl flex-shrink-0">
                  <Palette className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-600">
                      Criador de Conteúdo
                    </h3>
                    <span className="text-xs bg-zinc-800 text-gray-500 px-2 py-1 rounded-full font-medium">
                      Em breve
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Para influenciadores e criadores de conteúdo
                  </p>
                </div>
              </div>
            </div>

            {/* Lifestyle / Pessoal */}
            <div className="bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl p-6 opacity-60 cursor-not-allowed">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 p-3 rounded-2xl flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-gray-600" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-600">
                      Lifestyle / Pessoal
                    </h3>
                    <span className="text-xs bg-zinc-800 text-gray-500 px-2 py-1 rounded-full font-medium">
                      Em breve
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Para perfis pessoais e lifestyle
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
