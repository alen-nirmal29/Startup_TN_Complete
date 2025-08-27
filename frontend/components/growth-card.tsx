"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, TrendingUp, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Milestone {
  id: string
  title: string
  completed: boolean
  description: string
}

export default function GrowthCard() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "1", title: "Company Registered", completed: true, description: "Legal entity established" },
    { id: "2", title: "Business Plan Created", completed: true, description: "Comprehensive business strategy" },
    { id: "3", title: "Mentor Onboarded", completed: false, description: "Industry expert guidance" },
    { id: "4", title: "MVP Developed", completed: true, description: "Minimum viable product ready" },
    { id: "5", title: "First Customer Acquired", completed: false, description: "Revenue generation started" },
    { id: "6", title: "Compliance Completed", completed: false, description: "Legal and regulatory requirements" },
  ])

  const completedCount = milestones.filter((m) => m.completed).length
  const growthScore = Math.round((completedCount / milestones.length) * 100)

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((milestone) => (milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone)),
    )
  }

  const getRecommendations = () => {
    if (!milestones.find((m) => m.id === "3")?.completed) {
      return {
        title: "Get Mentor Support",
        description:
          "We see you've registered your company and created a business plan. The next step is to get mentor guidance to accelerate your growth.",
        action: "Find a Mentor",
        icon: <Target className="h-5 w-5" />,
      }
    }
    if (!milestones.find((m) => m.id === "6")?.completed) {
      return {
        title: "Complete Compliance",
        description: "Your MVP is ready! Now ensure all legal and regulatory requirements are met before scaling.",
        action: "Find Compliance Help",
        icon: <Lightbulb className="h-5 w-5" />,
      }
    }
    return {
      title: "Scale Your Business",
      description: "Great progress! Focus on customer acquisition and prepare for your next funding round.",
      action: "Explore Growth Programs",
      icon: <TrendingUp className="h-5 w-5" />,
    }
  }

  const recommendation = getRecommendations()

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          Growth Card
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Growth Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Growth Score</h3>
            <span className="text-2xl font-bold text-purple-600">{growthScore}%</span>
          </div>
          <Progress value={growthScore} className="h-3" />
          <p className="text-sm text-gray-600">
            {growthScore >= 75
              ? "Ready for Seed Funding"
              : growthScore >= 50
                ? "Building Strong Foundation"
                : "Getting Started"}
          </p>
        </div>

        {/* Milestone Checklist */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Milestone Checklist</h3>
          <div className="space-y-2">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => toggleMilestone(milestone.id)}
              >
                {milestone.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${milestone.completed ? "text-green-700 line-through" : "text-gray-900"}`}>
                    {milestone.title}
                  </p>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Recommended Next Steps</h3>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-start gap-3">
              <div className="text-purple-600 mt-1">{recommendation.icon}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 mb-1">{recommendation.title}</h4>
                <p className="text-sm text-purple-700 mb-3">{recommendation.description}</p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  {recommendation.action}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
