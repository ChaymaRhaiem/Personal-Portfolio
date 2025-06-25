"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, GraduationCap } from "lucide-react"

interface EducationItemProps {
  degree: string
  specialization?: string
  institution: string
  institutionIcon?: string
  location: string
  period: string
  gpa?: string
  achievements: string[]
  relevantCourses: string[]
  index: number
}

function EducationItem({
  degree,
  specialization,
  institution,
  institutionIcon,
  location,
  period,
  gpa,
  achievements,
  relevantCourses,
  index,
}: EducationItemProps) {
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
    <div ref={itemRef} className="education-item-compact">
      <Card className="neon-border bg-slate-800/90 backdrop-blur-sm hover-glow">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            {institutionIcon ? (
              <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
                <img src={institutionIcon || "/placeholder.svg"} alt={institution} className="w-6 h-6 object-contain" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-purple-400 mb-1">
                <Calendar className="w-3 h-3" />
                {period}
              </div>
              <CardTitle className="text-base text-slate-100">
                {degree}
                {specialization && <span className="text-purple-300 text-sm"> - {specialization}</span>}
              </CardTitle>
            </div>
            {gpa && <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 text-xs">{gpa}</Badge>}
          </div>
          <CardDescription className="text-purple-300 font-medium text-sm">{institution}</CardDescription>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-purple-300 mb-2">Key Achievements</h4>
              <ul className="space-y-1">
                {achievements.slice(0, 2).map((achievement, idx) => (
                  <li key={idx} className="text-slate-300 text-xs flex items-start">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relevantCourses.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-purple-300 mb-2">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-1">
                {relevantCourses.slice(0, 6).map((course, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-2 py-0.5"
                  >
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface EducationTimelineProps {
  education: Array<{
    degree: string
    specialization?: string
    institution: string
    institutionIcon?: string
    location: string
    period: string
    gpa?: string
    achievements: string[]
    relevantCourses: string[]
  }>
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="education-timeline-compact">
      {education.map((edu, index) => (
        <EducationItem key={index} {...edu} index={index} />
      ))}
    </div>
  )
}
