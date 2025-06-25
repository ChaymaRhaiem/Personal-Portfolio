"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building2, FileText, ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectProps {
  title: string
  description: string
  image: string
  technologies: string[]
  impact?: string
  isEarlyRAG?: boolean
}

interface TimelineItemProps {
  title: string
  company: string
  companyIcon?: string
  location: string
  period: string
  description: string[]
  technologies: string[]
  projects?: ProjectProps[]
  experienceLetter?: string
  index: number
}

function ProjectCard({ project }: { project: ProjectProps }) {
  return (
    <div className="flex-shrink-0 w-80 mr-6">
      <Card className="neon-border bg-slate-800/90 backdrop-blur-sm hover-glow group h-full">
        <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative overflow-hidden">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          {project.impact && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 text-xs">{project.impact}</Badge>
            </div>
          )}
          {project.isEarlyRAG && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50 text-xs animate-pulse">
                Early RAG Era
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-blue-300 group-hover:text-blue-200 transition-colors text-base leading-tight">
            {project.title}
          </CardTitle>
          <CardDescription className="text-slate-300 text-sm line-clamp-3">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <Badge
                key={techIndex}
                variant="outline"
                className="text-xs border-purple-500/50 text-purple-300 px-2 py-0.5"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs border-slate-500/50 text-slate-400 px-2 py-0.5">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProjectGallery({ projects }: { projects: ProjectProps[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320 // width of card + margin
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-blue-300">Key Projects</h4>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("left")}
            className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("right")}
            className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({
  title,
  company,
  companyIcon,
  location,
  period,
  description,
  technologies,
  projects,
  experienceLetter,
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
              {experienceLetter && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-green-500/50 text-green-300 hover:bg-green-500/10"
                >
                  <a href={experienceLetter} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-1" />
                    Letter
                  </a>
                </Button>
              )}
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

            {projects && projects.length > 0 && <ProjectGallery projects={projects} />}

            <div className="flex flex-wrap gap-1 mt-4">
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

interface EnhancedTimelineProps {
  experiences: Array<{
    title: string
    company: string
    companyIcon?: string
    location: string
    period: string
    description: string[]
    technologies: string[]
    projects?: ProjectProps[]
    experienceLetter?: string
  }>
}

export function EnhancedTimeline({ experiences }: EnhancedTimelineProps) {
  return (
    <div className="timeline-compact">
      {experiences.map((exp, index) => (
        <TimelineItem key={index} {...exp} index={index} />
      ))}
    </div>
  )
}
