"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, ExternalLink } from "lucide-react"

interface CertificationProps {
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  logo?: string
  skills?: string[]
  credentialUrl?: string
  index: number
}

function CertificationCard({
  name,
  issuer,
  date,
  expiryDate,
  credentialId,
  logo,
  skills,
  credentialUrl,
  index,
}: CertificationProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed")
            }, index * 100)
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

  const getIssuerColor = (issuer: string) => {
    const colors = {
      Microsoft: "from-blue-500 to-cyan-500",
      SAP: "from-blue-600 to-blue-800",
      "DeepLearning.AI": "from-orange-500 to-red-500",
      NVIDIA: "from-green-500 to-green-700",
      Google: "from-red-500 to-yellow-500",
      "The Hashgraph Association": "from-purple-500 to-pink-500",
    }
    return colors[issuer as keyof typeof colors] || "from-slate-500 to-slate-700"
  }

  return (
    <div ref={itemRef} className="certification-item opacity-0 transform translate-y-8 transition-all duration-800">
      <Card className="neon-border bg-slate-800/50 backdrop-blur-sm hover-glow group h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            {logo ? (
              <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={logo || "/placeholder.svg"} alt={issuer} className="w-6 h-6 object-contain" />
              </div>
            ) : (
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getIssuerColor(issuer)} flex items-center justify-center flex-shrink-0`}
              >
                <Award className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm text-slate-100 leading-tight mb-1 group-hover:text-blue-200 transition-colors">
                {name}
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-blue-400 mb-1">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span>{date}</span>
                {expiryDate && <span className="text-slate-400">• Exp {expiryDate}</span>}
              </div>
              <p className="text-blue-300 font-medium text-xs">{issuer}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {skills && skills.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {skills.slice(0, 3).map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-1.5 py-0.5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {credentialUrl && (
            <div className="pt-1">
              <a
                href={credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View Credential
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface CertificationsSectionProps {
  certifications: Array<{
    name: string
    issuer: string
    date: string
    expiryDate?: string
    credentialId?: string
    logo?: string
    skills?: string[]
    credentialUrl?: string
  }>
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map((cert, index) => (
        <CertificationCard key={index} {...cert} index={index} />
      ))}
    </div>
  )
}
