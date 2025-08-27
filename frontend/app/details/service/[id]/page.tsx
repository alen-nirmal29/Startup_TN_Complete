"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MapPin, Star, Users, Award, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ServiceDetails({ params }: { params: { id: string } }) {
  const [showSuccess, setShowSuccess] = useState(false)

  const serviceProviders = [
    {
      name: "LegalKart",
      service: "Legal & Compliance",
      speciality: "Startup Registration, IP",
      source: "Service Marketplace",
      description: "End-to-end legal services for startups",
      email: "contact@legalkart.com",
      phone: "+91 80 1234 5678",
      location: "Bangalore, Karnataka",
      rating: 4.8,
      clients: "500+ startups served",
      experience: "8+ years",
      responseTime: "Within 24 hours",
      services: [
        "Company Registration",
        "Trademark & IP Protection",
        "Legal Compliance",
        "Contract Drafting",
        "Employment Law",
        "Data Privacy Compliance",
      ],
      pricing: [
        "Company Registration: ₹15,000",
        "Trademark Filing: ₹8,000",
        "Legal Consultation: ₹2,000/hour",
        "Contract Review: ₹5,000",
      ],
      testimonials: [
        {
          client: "TechStart Solutions",
          feedback: "Excellent service for our startup registration and IP protection.",
        },
        {
          client: "HealthCare Innovations",
          feedback: "Professional team that handled all our compliance needs efficiently.",
        },
      ],
    },
    {
      name: "CloudTech Solutions",
      service: "Cloud Infrastructure",
      speciality: "AWS, Azure Credits",
      source: "Service Marketplace",
      description: "Cloud setup and management services",
      email: "hello@cloudtechsolutions.com",
      phone: "+91 44 9876 5432",
      location: "Chennai, Tamil Nadu",
      rating: 4.9,
      clients: "300+ startups served",
      experience: "6+ years",
      responseTime: "Within 12 hours",
      services: [
        "Cloud Architecture Design",
        "AWS/Azure Setup",
        "DevOps Implementation",
        "Security Configuration",
        "Cost Optimization",
        "24/7 Monitoring",
      ],
      pricing: [
        "Cloud Setup: ₹25,000",
        "Monthly Management: ₹15,000",
        "DevOps Setup: ₹40,000",
        "Consultation: ₹3,000/hour",
      ],
      testimonials: [
        {
          client: "EduTech Platform",
          feedback: "Helped us scale from 1K to 100K users seamlessly.",
        },
        {
          client: "FinTech Startup",
          feedback: "Excellent cloud architecture and cost optimization.",
        },
      ],
    },
  ]

  const provider = serviceProviders[Number.parseInt(params.id)] || serviceProviders[0]

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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{provider.name}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      From: {provider.source}
                    </Badge>
                    <p className="text-muted-foreground mb-4">{provider.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{provider.clients}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{provider.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Location:</strong> {provider.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Response Time:</strong> {provider.responseTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {provider.pricing.map((price, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-border last:border-0"
                    >
                      <span className="text-sm">{price.split(":")[0]}</span>
                      <span className="text-sm font-medium">{price.split(":")[1]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provider.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-orange-600 pl-4">
                      <p className="text-sm text-muted-foreground mb-2">"{testimonial.feedback}"</p>
                      <p className="text-sm font-medium">- {testimonial.client}</p>
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
                  <span className="text-sm">{provider.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{provider.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{provider.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Service Quote</CardTitle>
              </CardHeader>
              <CardContent>
                {showSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-600 font-medium">Quote request sent!</p>
                    <p className="text-sm text-muted-foreground mt-1">The service provider will contact you soon.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Get a personalized quote for your requirements.</p>
                    <Button onClick={handleConnect} className="w-full">
                      Request Quote
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
