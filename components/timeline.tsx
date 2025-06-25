"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2 } from "lucide-react"

interface TimelineItemProps {
  title: string
  company: string
  companyIcon?: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  index: number
}

function TimelineItem({
  title,
  company,
  companyIcon,
  location,
  period,
  description,
  technologies,
  index,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed")
            }, index * 200)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={itemRef} className="timeline-item-compact">
      <div className="timeline-content-compact">
        <Card className="neon-border bg-slate-800/90 backdrop-blur-sm hover-glow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 mb-2">
              {companyIcon ? (
                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
                  <img src={companyIcon || "/placeholder.svg"} alt={company} className="w-6 h-6 object-contain" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-blue-400 mb-1">
                  <Calendar className="w-3 h-3" />
                  {period}
                </div>
                <CardTitle className="text-lg text-slate-100">{title}</CardTitle>
              </div>
            </div>
            <CardDescription className="text-blue-300 font-medium">{company}</CardDescription>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3 h-3" />
              {location}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1 mb-4">
              {description.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1">
              {technologies.slice(0, 6).map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-2 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface TimelineProps {
  experiences: Array<{
    title: string
    company: string
    companyIcon?: string
    location: string
    period: string
    description: string[]
    technologies: string[]
  }>
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="timeline-compact">
      {experiences.map((exp, index) => (
        <TimelineItem key={index} {...exp} index={index} />
      ))}
    </div>
  )
}
