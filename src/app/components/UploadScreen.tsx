"use client"

import { useState, useRef } from "react"
import { Upload, Check, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { UploadedImages } from "../page"

interface UploadScreenProps {
  onUploadComplete: (images: UploadedImages) => void
  onBack: () => void
}

type UploadStep = "bio" | "feed" | "highlights"

export function UploadScreen({ onUploadComplete, onBack }: UploadScreenProps) {
  const [images, setImages] = useState<UploadedImages>({
    bio: null,
    feed: null,
    highlights: null
  })
  
  const bioInputRef = useRef<HTMLInputElement>(null)
  const feedInputRef = useRef<HTMLInputElement>(null)
  const highlightsInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (step: UploadStep, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImages(prev => ({
        ...prev,
        [step]: reader.result as string
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (step: UploadStep, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(step, file)
    }
  }

  const removeImage = (step: UploadStep) => {
    setImages(prev => ({
      ...prev,
      [step]: null
    }))
  }

  const isComplete = images.bio && images.feed && images.highlights

  const uploadSteps = [
    {
      id: "bio" as UploadStep,
      title: "Print da Bio",
      description: "Capture sua bio completa",
      ref: bioInputRef,
      uploaded: images.bio
    },
    {
      id: "feed" as UploadStep,
      title: "Print do Feed",
      description: "Grade de fotos do perfil",
      ref: feedInputRef,
      uploaded: images.feed
    },
    {
      id: "highlights" as UploadStep,
      title: "Print dos Destaques",
      description: "Stories salvos",
      ref: highlightsInputRef,
      uploaded: images.highlights
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header - Compacto */}
      <div className="pt-6 px-4 pb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Voltar</span>
        </button>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white">
            Envie 3 prints
          </h2>
          <p className="text-sm text-gray-400">
            Apenas a visão geral já é suficiente
          </p>
        </div>
      </div>

      {/* Upload Cards - Compacto */}
      <div className="flex-1 px-4 py-4">
        <div className="max-w-md w-full mx-auto space-y-3">
          {uploadSteps.map((step, index) => (
            <div
              key={step.id}
              className={`bg-zinc-900 border-2 rounded-xl p-4 transition-all duration-200 ${
                step.uploaded 
                  ? "border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20" 
                  : "border-zinc-800"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Number/Check */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.uploaded 
                    ? "bg-[#D4AF37] text-black" 
                    : "bg-zinc-800 text-gray-500"
                }`}>
                  {step.uploaded ? <Check className="w-4 h-4" /> : index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-0.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {step.description}
                  </p>

                  {/* Upload Button or Preview */}
                  {step.uploaded ? (
                    <div className="relative group">
                      <img 
                        src={step.uploaded} 
                        alt={step.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(step.id)}
                        className="absolute top-1.5 right-1.5 bg-black/90 backdrop-blur-sm p-1.5 rounded-full hover:bg-red-900/50 transition-colors shadow-lg"
                      >
                        <X className="w-3.5 h-3.5 text-white hover:text-red-400" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => step.ref.current?.click()}
                      className="w-full bg-zinc-800 hover:bg-[#D4AF37]/10 border-2 border-dashed border-zinc-700 hover:border-[#D4AF37] rounded-lg p-6 transition-all duration-200"
                    >
                      <div className="flex flex-col items-center gap-1.5">
                        <Upload className="w-6 h-6 text-gray-500" />
                        <span className="text-xs text-gray-400 font-medium">
                          Toque para enviar
                        </span>
                      </div>
                    </button>
                  )}

                  <input
                    ref={step.ref}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(step.id, e)}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button - Fixo */}
      <div className="p-4 bg-black border-t border-[#D4AF37]/20">
        <div className="max-w-md w-full mx-auto">
          <Button
            onClick={() => onUploadComplete(images)}
            disabled={!isComplete}
            size="lg"
            className={`w-full font-semibold text-sm py-5 rounded-xl transition-all duration-200 ${
              isComplete
                ? "bg-[#D4AF37] hover:bg-[#B8960C] text-black shadow-lg shadow-[#D4AF37]/20"
                : "bg-zinc-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isComplete ? "Analisar perfil" : `${Object.values(images).filter(Boolean).length}/3 enviados`}
          </Button>
        </div>
      </div>
    </div>
  )
}
