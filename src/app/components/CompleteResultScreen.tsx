"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Share2, RefreshCw, Check, X, AlertCircle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AnalysisResult, CategoryAnalysis } from "../page"

interface CompleteResultScreenProps {
  result: AnalysisResult
  onNewAnalysis: () => void
}

export function CompleteResultScreen({ result, onNewAnalysis }: CompleteResultScreenProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const handleShare = () => {
    alert("Funcionalidade de compartilhamento em desenvolvimento")
  }

  const categories = [
    { id: "bio", title: "Bio", data: result.detailedAnalysis?.bio },
    { id: "profilePhoto", title: "Foto", data: result.detailedAnalysis?.profilePhoto },
    { id: "feed", title: "Feed", data: result.detailedAnalysis?.feed },
    { id: "highlights", title: "Destaques", data: result.detailedAnalysis?.highlights },
    { id: "overallCoherence", title: "Coerência", data: result.detailedAnalysis?.overallCoherence }
  ]

  const getScoreColor = (score: number) => {
    if (score <= 40) return "text-red-400 bg-red-500/20 border-red-500/30"
    if (score <= 70) return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
    return "text-green-400 bg-green-500/20 border-green-500/30"
  }

  // Top 3 insights baseados nos piores scores
  const topInsights = categories
    .filter(c => c.data)
    .sort((a, b) => (a.data?.score || 100) - (b.data?.score || 100))
    .slice(0, 3)
    .map(c => ({
      title: c.title,
      issue: c.data?.whatIsWrong || "",
      score: c.data?.score || 0
    }))

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header Compacto */}
      <div className="pt-4 px-4 pb-2">
        <h2 className="text-lg font-bold text-white">Análise completa</h2>
      </div>

      {/* Content - Scroll otimizado */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-24">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* Score Principal - Compacto */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8960C]/10 border-2 border-[#D4AF37]/30 rounded-2xl p-5 text-center space-y-3">
            <div className="text-5xl font-bold text-[#D4AF37]">
              {result.score}
            </div>
            <div className="text-sm font-bold text-white">{result.classification}</div>
            <p className="text-xs text-gray-400 leading-snug">{result.impactPhrase}</p>
          </div>

          {/* Top 3 Insights - Destaque */}
          <div className="bg-zinc-900 border-2 border-[#D4AF37]/30 rounded-xl p-4 space-y-2">
            <h3 className="text-white font-bold text-sm flex items-center gap-2">
              <span className="text-[#D4AF37]">⚡</span>
              Top 3 prioridades
            </h3>
            <div className="space-y-2">
              {topInsights.map((insight, index) => (
                <div 
                  key={index}
                  className="bg-zinc-800 p-3 rounded-lg space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-xs">{insight.title}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getScoreColor(insight.score)}`}>
                      {insight.score}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[11px] leading-snug">{insight.issue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs para organizar conteúdo */}
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-900 p-1 rounded-xl">
              <TabsTrigger value="analysis" className="text-xs text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
                Análise
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="text-xs text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
                Sugestões
              </TabsTrigger>
              <TabsTrigger value="checklist" className="text-xs text-white data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
                Checklist
              </TabsTrigger>
            </TabsList>

            {/* Tab: Análise Detalhada */}
            <TabsContent value="analysis" className="space-y-2 mt-3">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleSection(category.id)}
                    className="w-full p-3 flex items-center justify-between hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 ${getScoreColor(category.data?.score || 0)}`}>
                        {category.data?.score}
                      </div>
                      <span className="text-sm font-bold text-white">{category.title}</span>
                    </div>
                    {expandedSections.includes(category.id) ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Content Colapsável */}
                  {expandedSections.includes(category.id) && category.data && (
                    <div className="px-3 pb-3 space-y-3 border-t border-zinc-800 pt-3">
                      {/* O que está errado */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs">
                          <X className="w-3 h-3" />
                          <span>Problema</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-snug pl-5">{category.data.whatIsWrong}</p>
                      </div>

                      {/* O que melhorar */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-green-400 font-bold text-xs">
                          <Check className="w-3 h-3" />
                          <span>Solução</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-snug pl-5">{category.data.whatToImprove}</p>
                      </div>

                      {/* O que evitar */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-xs">
                          <AlertCircle className="w-3 h-3" />
                          <span>Evitar</span>
                        </div>
                        <p className="text-gray-300 text-xs leading-snug pl-5">{category.data.whatToAvoid}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            {/* Tab: Sugestões */}
            <TabsContent value="suggestions" className="space-y-3 mt-3">
              {/* Sugestões de Fotos */}
              {result.detailedAnalysis?.photoSuggestions && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#D4AF37]" />
                    Ideias de fotos
                  </h3>
                  <div className="space-y-1.5">
                    {result.detailedAnalysis.photoSuggestions.slice(0, 5).map((suggestion, index) => (
                      <div 
                        key={index}
                        className="bg-zinc-800 p-2.5 rounded-lg flex items-start gap-2"
                      >
                        <div className="bg-[#D4AF37] w-5 h-5 rounded-full flex items-center justify-center text-black font-bold text-[10px] flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-gray-300 text-xs leading-snug">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sugestões de Conteúdo por Categoria */}
              {categories.map(category => (
                category.data?.contentSuggestions && category.data.contentSuggestions.length > 0 && (
                  <div key={category.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white">{category.title}</h3>
                    <div className="space-y-1">
                      {category.data.contentSuggestions.slice(0, 3).map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0"></div>
                          <span className="text-gray-300 text-xs leading-snug">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </TabsContent>

            {/* Tab: Checklist */}
            <TabsContent value="checklist" className="space-y-2 mt-3">
              {result.detailedAnalysis?.checklist && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Ações para implementar
                  </h3>
                  <div className="space-y-1.5">
                    {result.detailedAnalysis.checklist.map((item, index) => (
                      <label 
                        key={index}
                        className="flex items-start gap-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer group"
                      >
                        <input 
                          type="checkbox" 
                          className="mt-0.5 w-4 h-4 rounded border-2 border-[#D4AF37]/30 bg-zinc-800 checked:bg-[#D4AF37] checked:border-[#D4AF37] cursor-pointer flex-shrink-0"
                        />
                        <span className="text-gray-300 text-xs leading-snug group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* CTA Fixo no Bottom */}
      <div className="sticky bottom-0 p-4 bg-black border-t border-[#D4AF37]/20 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full sm:flex-1 bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#D4AF37]/50 justify-center text-xs py-5"
            >
              <Share2 className="w-3.5 h-3.5 mr-2" />
              Compartilhar
            </Button>
            <Button
              onClick={onNewAnalysis}
              className="w-full sm:flex-1 bg-[#D4AF37] hover:bg-[#B8960C] text-black font-semibold justify-center text-xs py-5"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              Nova análise
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
