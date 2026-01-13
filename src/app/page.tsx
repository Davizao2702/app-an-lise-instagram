"use client"

import { useState } from "react"
import { OnboardingScreen } from "./components/OnboardingScreen"
import { StyleSelectionScreen } from "./components/StyleSelectionScreen"
import { UploadScreen } from "./components/UploadScreen"
import { AnalysisScreen } from "./components/AnalysisScreen"
import { FreeResultScreen } from "./components/FreeResultScreen"
import { CompleteResultScreen } from "./components/CompleteResultScreen"

export type ScreenType = 
  | "onboarding" 
  | "style-selection" 
  | "upload" 
  | "analysis" 
  | "free-result" 
  | "complete-result"

export type UploadedImages = {
  bio: string | null
  feed: string | null
  highlights: string | null
}

export type AnalysisResult = {
  score: number
  classification: string
  impactPhrase: string
  detailedAnalysis?: {
    bio: CategoryAnalysis
    profilePhoto: CategoryAnalysis
    feed: CategoryAnalysis
    highlights: CategoryAnalysis
    overallCoherence: CategoryAnalysis
    photoSuggestions: string[]
    checklist: string[]
  }
}

export type CategoryAnalysis = {
  score: number
  whatIsWrong: string
  whatToImprove: string
  whatToAvoid: string
  contentSuggestions: string[]
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("onboarding")
  const [selectedStyle, setSelectedStyle] = useState<string>("")
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({
    bio: null,
    feed: null,
    highlights: null
  })
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style)
    setCurrentScreen("upload")
  }

  const handleImagesUpload = (images: UploadedImages) => {
    setUploadedImages(images)
    setCurrentScreen("analysis")
  }

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result)
    setCurrentScreen("free-result")
  }

  const handleUnlockAnalysis = () => {
    // Simula pagamento e desbloqueia análise completa diretamente
    setIsPaid(true)
    setCurrentScreen("complete-result")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
      {currentScreen === "onboarding" && (
        <OnboardingScreen onStart={() => setCurrentScreen("style-selection")} />
      )}
      
      {currentScreen === "style-selection" && (
        <StyleSelectionScreen onStyleSelect={handleStyleSelect} />
      )}
      
      {currentScreen === "upload" && (
        <UploadScreen 
          onUploadComplete={handleImagesUpload}
          onBack={() => setCurrentScreen("style-selection")}
        />
      )}
      
      {currentScreen === "analysis" && (
        <AnalysisScreen 
          images={uploadedImages}
          style={selectedStyle}
          onAnalysisComplete={handleAnalysisComplete}
        />
      )}
      
      {currentScreen === "free-result" && analysisResult && (
        <FreeResultScreen 
          result={analysisResult}
          onUnlock={handleUnlockAnalysis}
        />
      )}
      
      {currentScreen === "complete-result" && analysisResult && (
        <CompleteResultScreen 
          result={analysisResult}
          onNewAnalysis={() => {
            setCurrentScreen("onboarding")
            setUploadedImages({ bio: null, feed: null, highlights: null })
            setAnalysisResult(null)
            setIsPaid(false)
          }}
        />
      )}
    </div>
  )
}
