"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, Star, MapPin, DollarSign } from "lucide-react"

interface SearchResultsProps {
  query: string
  onClose: () => void
}

export function InlineSearchResults({ query, onClose }: SearchResultsProps) {
  const generateActionPlan = (query: string) => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("seed") || lowerQuery.includes("funding")) {
      return {
        title: "Your Seed Funding Action Plan",
        description: "Based on your search for seed funding, here's your personalized roadmap:",
        steps: [
          {
            title: "Prepare Your Pitch Deck",
            description:
              "Create a compelling 10-12 slide presentation covering problem, solution, market, and traction",
            timeframe: "1-2 weeks",
            priority: "high",
          },
          {
            title: "Research Tennessee Seed Funds",
            description: "Identify 5-10 local seed funds that match your industry and stage",
            timeframe: "3-5 days",
            priority: "high",
          },
          {
            title: "Build Financial Projections",
            description: "Develop 3-year financial forecasts with realistic assumptions",
            timeframe: "1 week",
            priority: "medium",
          },
          {
            title: "Network with Local Investors",
            description: "Attend Nashville Entrepreneur Center events and startup meetups",
            timeframe: "Ongoing",
            priority: "medium",
          },
        ],
        resources: [
          { name: "Tennessee Angel Network", type: "Investor Group", location: "Nashville, TN", amount: "$25K-$100K" },
          { name: "Solidus Labs Seed Fund", type: "Seed Fund", location: "Memphis, TN", amount: "$50K-$250K" },
          { name: "Nashville Capital Network", type: "Angel Group", location: "Nashville, TN", amount: "$10K-$50K" },
        ],
      }
    }

    if (lowerQuery.includes("incubat") || lowerQuery.includes("accelerat")) {
      return {
        title: "Your Incubator/Accelerator Action Plan",
        description: "Here's your step-by-step guide to joining the right program:",
        steps: [
          {
            title: "Assess Your Startup Stage",
            description: "Determine if you're pre-seed, seed, or growth stage to find matching programs",
            timeframe: "1 day",
            priority: "high",
          },
          {
            title: "Research Program Requirements",
            description: "Review application criteria for top Tennessee programs",
            timeframe: "1 week",
            priority: "high",
          },
          {
            title: "Prepare Application Materials",
            description: "Gather pitch deck, business plan, and team bios",
            timeframe: "2-3 weeks",
            priority: "medium",
          },
          {
            title: "Submit Applications",
            description: "Apply to 3-5 programs with rolling deadlines",
            timeframe: "1 week",
            priority: "medium",
          },
        ],
        resources: [
          {
            name: "Nashville Entrepreneur Center",
            type: "Incubator",
            location: "Nashville, TN",
            amount: "Equity-based",
          },
          {
            name: "Knoxville Entrepreneur Center",
            type: "Accelerator",
            location: "Knoxville, TN",
            amount: "Up to $50K",
          },
          { name: "Memphis Bioworks", type: "Life Sciences Incubator", location: "Memphis, TN", amount: "Varies" },
        ],
      }
    }

    if (lowerQuery.includes("mentor")) {
      return {
        title: "Your Mentorship Action Plan",
        description: "Connect with the right mentors to accelerate your startup growth:",
        steps: [
          {
            title: "Define Your Mentorship Needs",
            description: "Identify specific areas where you need guidance (marketing, tech, fundraising)",
            timeframe: "2-3 days",
            priority: "high",
          },
          {
            title: "Join SCORE Program",
            description: "Sign up for free mentorship through SCORE's experienced business mentors",
            timeframe: "1 week",
            priority: "high",
          },
          {
            title: "Attend Industry Events",
            description: "Network at startup events to meet potential mentors organically",
            timeframe: "Ongoing",
            priority: "medium",
          },
          {
            title: "Leverage Alumni Networks",
            description: "Reach out to successful alumni from your university or previous companies",
            timeframe: "1-2 weeks",
            priority: "medium",
          },
        ],
        resources: [
          { name: "SCORE Nashville", type: "Free Mentorship", location: "Nashville, TN", amount: "Free" },
          { name: "TN APEX Accelerator", type: "Government Contracting", location: "Statewide", amount: "Free" },
          { name: "Women's Business Center", type: "Women Entrepreneurs", location: "Multiple Cities", amount: "Free" },
        ],
      }
    }

    // Default action plan
    return {
      title: "Your Startup Action Plan",
      description: "Based on your search, here's a general roadmap to move forward:",
      steps: [
        {
          title: "Clarify Your Needs",
          description: "Define exactly what type of support or resources you're looking for",
          timeframe: "1-2 days",
          priority: "high",
        },
        {
          title: "Research Available Options",
          description: "Explore Tennessee's startup ecosystem for relevant opportunities",
          timeframe: "1 week",
          priority: "high",
        },
        {
          title: "Connect with Local Community",
          description: "Join Nashville or Memphis startup communities for networking",
          timeframe: "Ongoing",
          priority: "medium",
        },
        {
          title: "Take Action",
          description: "Apply to programs, reach out to contacts, or schedule meetings",
          timeframe: "2-3 weeks",
          priority: "medium",
        },
      ],
      resources: [
        { name: "Nashville Entrepreneur Center", type: "Startup Hub", location: "Nashville, TN", amount: "Varies" },
        { name: "LaunchTN", type: "State Initiative", location: "Statewide", amount: "Varies" },
        {
          name: "Tennessee Small Business Dev Center",
          type: "Business Support",
          location: "Statewide",
          amount: "Free",
        },
      ],
    }
  }

  const actionPlan = generateActionPlan(query)

  return (
    <div className="mt-8 space-y-8 max-w-[1400px] w-[95%] mx-auto flex flex-col items-center">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-bold text-gray-900">Search Results for "{query}"</h2>
        <Button variant="outline" onClick={onClose}>
          Close Results
        </Button>
      </div>

      {/* Action Plan */}
      <Card className="border-blue-200 bg-blue-50 shadow-lg w-full overflow-hidden rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Star className="h-5 w-5" />
            <span>{actionPlan.title}</span>
          </CardTitle>
          <p className="text-blue-700">{actionPlan.description}</p>
        </CardHeader>
        <CardContent className={actionPlan.steps.length > 1 ? "space-y-5 p-8" : "p-8 flex justify-center"}>
          {actionPlan.steps.map((step, index) => (
            <div key={index} className={`flex items-start space-x-4 p-5 bg-white rounded-lg border shadow-sm ${actionPlan.steps.length === 1 ? 'w-2/3' : 'w-full'}`}>
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <Badge variant={step.priority === "high" ? "destructive" : "secondary"}>{step.priority}</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{step.timeframe}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="shadow-lg w-full overflow-hidden rounded-xl">
        <CardHeader>
          <CardTitle>Recommended Resources</CardTitle>
          <p className="text-gray-600">Organizations and programs that can help you achieve your goals</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className={actionPlan.resources.length > 1 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex justify-center"}>
            {actionPlan.resources.map((resource, index) => (
              <div key={index} className={`p-5 border rounded-lg hover:shadow-md transition-shadow bg-white ${actionPlan.resources.length === 1 ? 'w-2/3' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{resource.name}</h4>
                  <Badge variant="outline">{resource.type}</Badge>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{resource.amount}</span>
                  </div>
                </div>
                <Button size="sm" className="mt-3 w-full bg-transparent" variant="outline">
                  Learn More <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
