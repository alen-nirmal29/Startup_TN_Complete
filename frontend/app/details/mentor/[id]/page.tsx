"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Users, Award } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function MentorDetails({ params }: { params: { id: string } }) {
  const [showSuccess, setShowSuccess] = useState(false)

  const mentors = [
    {
      name: "Dr. Rajesh Kumar",
      expertise: "AI/ML, Product Strategy",
      experience: "15+ years",
      source: "MentorTN",
      description: "Former CTO at leading tech companies",
      email: "rajesh.kumar@mentortn.com",
      phone: "+91 98765 43210",
      location: "Bangalore, Karnataka",
      currentRole: "Chief Technology Officer at TechCorp",
      education: "PhD in Computer Science, IIT Madras",
      mentees: "50+ startups mentored",
      successStories: ["AI startup acquired by Google", "Fintech unicorn IPO", "Healthcare platform Series B"],
      availability: "Weekends, 2 hours/week",
      languages: ["English", "Tamil", "Hindi"],
    },
    {
      name: "Priya Sharma",
      expertise: "Business Development, Sales",
      experience: "12+ years",
      source: "MentorTN",
      description: "Startup advisor and business growth expert",
      email: "priya.sharma@mentortn.com",
      phone: "+91 87654 32109",
      location: "Chennai, Tamil Nadu",
      currentRole: "VP Sales at GrowthTech Solutions",
      education: "MBA from IIM Ahmedabad",
      mentees: "35+ startups mentored",
      successStories: ["SaaS startup 10x revenue growth", "B2B platform market expansion", "E-commerce 5x user growth"],
      availability: "Weekdays evening, 3 hours/week",
      languages: ["English", "Tamil"],
    },
  ]

  const mentor = mentors[Number.parseInt(params.id)] || mentors[0]

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
                    <CardTitle className="text-2xl mb-2">{mentor.name}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      From: {mentor.source}
                    </Badge>
                    <p className="text-muted-foreground mb-4">{mentor.description}</p>
                    <p className="text-sm">
                      <strong>Current Role:</strong> {mentor.currentRole}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Experience:</strong> {mentor.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Mentees:</strong> {mentor.mentees}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Availability:</strong> {mentor.availability}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Location:</strong> {mentor.location}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expertise & Background</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Areas of Expertise</h4>
                    <p className="text-sm text-muted-foreground">{mentor.expertise}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p className="text-sm text-muted-foreground">{mentor.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <p className="text-sm text-muted-foreground">{mentor.languages.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mentor.successStories.map((story, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{story}</span>
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
                  <span className="text-sm">{mentor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mentor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{mentor.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Mentorship</CardTitle>
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
                    <p className="text-sm text-muted-foreground mt-1">The mentor will review and respond soon.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Send a mentorship request to get guidance from {mentor.name}.
                    </p>
                    <Button onClick={handleConnect} className="w-full">
                      Request Mentorship
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
