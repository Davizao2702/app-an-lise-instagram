"use client"

import { useEffect, useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import type { UploadedImages, AnalysisResult } from "../page"

interface AnalysisScreenProps {
  images: UploadedImages
  style: string
  onAnalysisComplete: (result: AnalysisResult) => void
}

export function AnalysisScreen({ images, style, onAnalysisComplete }: AnalysisScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Analisando bio...",
    "Avaliando foto de perfil...",
    "Examinando feed...",
    "Verificando destaques...",
    "Calculando score...",
    "Gerando recomendações..."
  ]

  useEffect(() => {
    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Update steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    // Complete analysis after 6 seconds
    const timeout = setTimeout(() => {
      // Generate mock analysis result
      const score = Math.floor(Math.random() * 40) + 30 // 30-70 for demo
      
      let classification = ""
      let impactPhrase = ""
      
      if (score <= 40) {
        classification = "Perfil fraco"
        impactPhrase = "Seu perfil não transmite a autoridade que você provavelmente quer passar."
      } else if (score <= 70) {
        classification = "Perfil mediano"
        impactPhrase = "Seu perfil tem potencial, mas ainda não transmite autoridade profissional completa."
      } else {
        classification = "Perfil profissional"
        impactPhrase = "Seu perfil transmite autoridade e profissionalismo de forma consistente."
      }

      const result: AnalysisResult = {
        score,
        classification,
        impactPhrase,
        detailedAnalysis: {
          bio: {
            score: Math.floor(Math.random() * 30) + 40,
            whatIsWrong: "Sua bio não deixa claro o que você faz e para quem você trabalha. Falta objetividade.",
            whatToImprove: "Adicione sua função/cargo, área de atuação e um diferencial claro. Use palavras-chave do seu mercado.",
            whatToAvoid: "Evite emojis em excesso, frases genéricas como 'apaixonado por...' e informações pessoais irrelevantes.",
            contentSuggestions: [
              "CEO na [Empresa] | Especialista em [Área]",
              "Ajudo [público] a [resultado específico]",
              "Adicione link profissional (site, LinkedIn, calendário)"
            ]
          },
          profilePhoto: {
            score: Math.floor(Math.random() * 30) + 35,
            whatIsWrong: "Foto muito casual ou com baixa qualidade. Não transmite profissionalismo.",
            whatToImprove: "Use foto profissional, com boa iluminação, fundo neutro e vestimenta adequada ao seu mercado.",
            whatToAvoid: "Selfies, fotos de corpo inteiro, fundos bagunçados, filtros exagerados.",
            contentSuggestions: [
              "Foto headshot profissional",
              "Fundo neutro ou ambiente corporativo",
              "Expressão confiante e acessível",
              "Vestimenta alinhada ao seu mercado"
            ]
          },
          feed: {
            score: Math.floor(Math.random() * 30) + 40,
            whatIsWrong: "Feed sem coerência visual. Mistura conteúdo pessoal com profissional sem estratégia clara.",
            whatToImprove: "Defina uma paleta de cores, mantenha padrão visual e foque em conteúdo que reforce sua autoridade.",
            whatToAvoid: "Fotos aleatórias, memes sem contexto, excesso de posts pessoais, falta de consistência.",
            contentSuggestions: [
              "Carrosséis educativos sobre sua área",
              "Bastidores profissionais",
              "Resultados e cases de sucesso",
              "Conteúdo de valor para seu público"
            ]
          },
          highlights: {
            score: Math.floor(Math.random() * 30) + 45,
            whatIsWrong: "Destaques desorganizados ou com capas inconsistentes. Falta estratégia de apresentação.",
            whatToImprove: "Crie capas padronizadas, organize por temas estratégicos (Sobre, Serviços, Depoimentos, etc).",
            whatToAvoid: "Capas coloridas demais, muitos destaques sem propósito, falta de organização.",
            contentSuggestions: [
              "Sobre mim/Empresa",
              "Serviços/Produtos",
              "Depoimentos/Cases",
              "Bastidores/Processo",
              "Contato/FAQ"
            ]
          },
          overallCoherence: {
            score: Math.floor(Math.random() * 30) + 40,
            whatIsWrong: "Falta coerência entre bio, foto, feed e destaques. Não há uma narrativa profissional clara.",
            whatToImprove: "Alinhe todos os elementos para contar uma história profissional única e consistente.",
            whatToAvoid: "Mudanças bruscas de estilo, mensagens contraditórias, falta de identidade visual.",
            contentSuggestions: [
              "Defina sua identidade visual",
              "Mantenha tom de voz consistente",
              "Reforce seu posicionamento em todos os pontos"
            ]
          },
          photoSuggestions: [
            "Foto profissional headshot com fundo neutro",
            "Você em ambiente de trabalho (escritório, reunião)",
            "Palestrando ou apresentando (se aplicável)",
            "Com clientes/parceiros (contexto profissional)",
            "Produto/serviço em uso",
            "Bastidores do seu processo de trabalho",
            "Certificações ou conquistas relevantes"
          ],
          checklist: [
            "Atualizar foto de perfil para headshot profissional",
            "Reescrever bio com clareza sobre o que você faz",
            "Adicionar link profissional na bio",
            "Criar capas padronizadas para os destaques",
            "Organizar destaques por categorias estratégicas",
            "Definir paleta de cores para o feed",
            "Remover posts que não agregam autoridade",
            "Criar conteúdo educativo sobre sua área",
            "Adicionar depoimentos nos destaques",
            "Manter consistência visual em todos os posts"
          ]
        }
      }

      onAnalysisComplete(result)
    }, 6000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <div className="max-w-md w-full space-y-8">
        {/* Icon - UMAX style: minimal, centered */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-zinc-900 p-8 rounded-2xl border border-amber-500/20">
              <Sparkles className="w-16 h-16 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Text - UMAX style: bold, minimal */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Analisando seu perfil
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            {steps[currentStep]}
          </p>
        </div>

        {/* Progress Bar - UMAX style: clean, bold */}
        <div className="space-y-2">
          <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden border border-zinc-800">
            <div 
              className="h-full bg-amber-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Processando</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
