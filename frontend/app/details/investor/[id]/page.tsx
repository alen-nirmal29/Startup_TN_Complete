"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function InvestorDetails({ params }: { params: { id: string } }) {
  const [showSuccess, setShowSuccess] = useState(false)

  const investors = [
    {
      name: "Tamil Nadu Startup Fund",
      sector: "Technology, Healthcare",
      stage: "Seed to Series A",
      source: "TANFUND",
      description: "Government-backed fund supporting early-stage startups",
      email: "contact@tanfund.gov.in",
      phone: "+91 44 2345 6789",
      location: "Chennai, Tamil Nadu",
      founded: "2018",
      portfolio: "150+ startups",
      totalInvestment: "₹500 Crores",
      avgTicket: "₹50 Lakhs - ₹2 Crores",
      recentInvestments: ["HealthTech Solutions", "EduLearn Platform", "AgriTech Innovations"],
    },
    {
      name: "Chennai Angels",
      sector: "Fintech, EdTech",
      stage: "Pre-seed to Seed",
      source: "TANFUND",
      description: "Angel investor network focused on Tamil Nadu startups",
      email: "hello@chennaiangels.com",
      phone: "+91 44 3456 7890",
      location: "Chennai, Tamil Nadu",
      founded: "2015",
      portfolio: "80+ startups",
      totalInvestment: "₹200 Crores",
      avgTicket: "₹10 Lakhs - ₹1 Crore",
      recentInvestments: ["PayEasy", "SkillUp Academy", "RetailTech Pro"],
    },
  ]

  const investor = investors[Number.parseInt(params.id)] || investors[0]

  const handleConnect = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Search Results
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{investor.name}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      From: {investor.source}
                    </Badge>
                    <p className="text-muted-foreground">{investor.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Investment Stage:</strong> {investor.stage}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Portfolio:</strong> {investor.portfolio}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Founded:</strong> {investor.founded}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Location:</strong> {investor.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Focus Sectors</h4>
                    <p className="text-sm text-muted-foreground">{investor.sector}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Average Ticket Size</h4>
                    <p className="text-sm text-muted-foreground">{investor.avgTicket}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Total Investment</h4>
                    <p className="text-sm text-muted-foreground">{investor.totalInvestment}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {investor.recentInvestments.map((investment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm">{investment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{investor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{investor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{investor.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect with {investor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {showSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-600 font-medium">Your request has been sent!</p>
                    <p className="text-sm text-muted-foreground mt-1">We'll connect you with the investor soon.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Send a connection request to start the conversation.
                    </p>
                    <Button onClick={handleConnect} className="w-full">
                      Send Connection Request
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
