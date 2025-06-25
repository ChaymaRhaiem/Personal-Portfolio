"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages } from "lucide-react"

interface Language {
  name: string
  level: string
  flag: string
  proficiency: number
}

interface LanguagesSectionProps {
  languages: Language[]
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  const getProficiencyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "native":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "fluent":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "basic":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  return (
    <Card className="neon-border bg-slate-800/50 backdrop-blur-sm hover-glow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/20">
            <Languages className="w-6 h-6 text-indigo-400" />
          </div>
          <CardTitle className="text-indigo-300">Languages</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((language, index) => (
            <div
              key={index}
              className="group relative p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div className="font-medium text-slate-200">{language.name}</div>
                    <Badge className={`text-xs ${getProficiencyColor(language.level)}`}>{language.level}</Badge>
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-600/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${language.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
