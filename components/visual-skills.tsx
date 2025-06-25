"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Code2, Cloud, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Skill {
  name: string
  logo?: string
}

interface SkillCategoryProps {
  title: string
  icon: LucideIcon
  skills: Skill[]
  color: string
  delay?: number
}

function SkillCategory({ title, icon: Icon, skills, color, delay = 0 }: SkillCategoryProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/50",
        hover: "hover:bg-blue-500/30",
      },
      purple: {
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        border: "border-purple-500/50",
        hover: "hover:bg-purple-500/30",
      },
      pink: {
        bg: "bg-pink-500/20",
        text: "text-pink-400",
        border: "border-pink-500/50",
        hover: "hover:bg-pink-500/30",
      },
      cyan: {
        bg: "bg-cyan-500/20",
        text: "text-cyan-400",
        border: "border-cyan-500/50",
        hover: "hover:bg-cyan-500/30",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const colorClasses = getColorClasses(color)

  return (
    <Card className={`neon-border bg-slate-800/50 backdrop-blur-sm hover-glow group stagger-${Math.min(delay + 1, 6)}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${colorClasses.bg} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${colorClasses.text}`} />
          </div>
          <CardTitle className={`${colorClasses.text} text-lg`}>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`group/skill relative p-4 rounded-lg bg-slate-700/30 ${colorClasses.hover} transition-all duration-300 hover:scale-105 border border-slate-600/30`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {skill.logo ? (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img
                      src={skill.logo || "/placeholder.svg"}
                      alt={skill.name}
                      className="w-8 h-8 object-contain filter brightness-0 invert opacity-80 group-hover/skill:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                ) : (
                  <div className={`w-8 h-8 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
                    <span className={`text-sm font-bold ${colorClasses.text}`}>{skill.name.charAt(0)}</span>
                  </div>
                )}
                <div className="text-sm font-medium text-slate-200 group-hover/skill:text-slate-100 transition-colors duration-300">
                  {skill.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface VisualSkillsProps {
  skills: Record<string, Skill[]>
}

export function VisualSkills({ skills }: VisualSkillsProps) {
  const skillCategories = [
    { key: "Machine Learning", icon: Brain, color: "blue" },
    { key: "Programming", icon: Code2, color: "purple" },
    { key: "Web Scraping & Tools", icon: Wrench, color: "pink" },
    { key: "Cloud & Data", icon: Cloud, color: "cyan" },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {skillCategories.map((category, index) => {
        const categorySkills = skills[category.key] || []
        return (
          <SkillCategory
            key={category.key}
            title={category.key}
            icon={category.icon}
            skills={categorySkills}
            color={category.color}
            delay={index}
          />
        )
      })}
    </div>
  )
}
