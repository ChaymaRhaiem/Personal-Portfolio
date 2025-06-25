"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface SkillCategoryProps {
  title: string
  icon: LucideIcon
  skills: Array<{
    name: string
    level: number
  }>
  delay?: number
}

export function SkillCategory({ title, icon: Icon, skills, delay = 0 }: SkillCategoryProps) {
  return (
    <Card className={`neon-border bg-slate-800/50 backdrop-blur-sm hover-glow stagger-${Math.min(delay + 1, 6)}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <CardTitle className="text-blue-300">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 text-sm">{skill.name}</span>
                <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-300">
                  {skill.level}%
                </Badge>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
