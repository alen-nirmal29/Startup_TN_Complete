"use client"

import { Navigation } from "@/components/navigation"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  // Mock data for different categories
  const investors = [
    {
      name: "Tamil Nadu Startup Fund",
      sector: "Technology, Healthcare",
      stage: "Seed to Series A",
      source: "TANFUND",
      description: "Government-backed fund supporting early-stage startups",
    },
    {
      name: "Chennai Angels",
      sector: "Fintech, EdTech",
      stage: "Pre-seed to Seed",
      source: "TANFUND",
      description: "Angel investor network focused on Tamil Nadu startups",
    },
  ]

  const mentors = [
    {
      name: "Dr. Rajesh Kumar",
      expertise: "AI/ML, Product Strategy",
      experience: "15+ years",
      source: "MentorTN",
      description: "Former CTO at leading tech companies",
    },
    {
      name: "Priya Sharma",
      expertise: "Business Development, Sales",
      experience: "12+ years",
      source: "MentorTN",
      description: "Startup advisor and business growth expert",
    },
  ]

  const schemes = [
    {
      name: "Startup Tamil Nadu Seed Grant",
      amount: "₹10 Lakhs",
      eligibility: "Early-stage startups",
      source: "Government Portal",
      description: "Non-dilutive funding for product development",
    },
    {
      name: "Women Entrepreneur Scheme",
      amount: "₹25 Lakhs",
      eligibility: "Women-led startups",
      source: "Government Portal",
      description: "Special funding support for women entrepreneurs",
    },
  ]

  const serviceProviders = [
    {
      name: "LegalKart",
      service: "Legal & Compliance",
      speciality: "Startup Registration, IP",
      source: "Service Marketplace",
      description: "End-to-end legal services for startups",
    },
    {
      name: "CloudTech Solutions",
      service: "Cloud Infrastructure",
      speciality: "AWS, Azure Credits",
      source: "Service Marketplace",
      description: "Cloud setup and management services",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search Results for: "{query}"</h1>
          <p className="text-muted-foreground">
            Found {investors.length + mentors.length + schemes.length + serviceProviders.length} results across all
            categories
          </p>
        </div>

        <div className="space-y-12">
          {/* Investors Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-600 rounded"></span>
              Investors
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {investors.map((investor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{investor.name}</CardTitle>
                      <Badge variant="secondary">From: {investor.source}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{investor.description}</p>
                    <div className="space-y-1 text-sm mb-4">
                      <p>
                        <strong>Sectors:</strong> {investor.sector}
                      </p>
                      <p>
                        <strong>Stage:</strong> {investor.stage}
                      </p>
                    </div>
                    <Link href={`/details/investor/${index}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Mentors Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-600 rounded"></span>
              Mentors
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {mentors.map((mentor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <Badge variant="secondary">From: {mentor.source}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{mentor.description}</p>
                    <div className="space-y-1 text-sm mb-4">
                      <p>
                        <strong>Expertise:</strong> {mentor.expertise}
                      </p>
                      <p>
                        <strong>Experience:</strong> {mentor.experience}
                      </p>
                    </div>
                    <Link href={`/details/mentor/${index}`}>
                      <Button className="w-full">Request Connection</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Schemes & Grants Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-green-600 rounded"></span>
              Schemes & Grants
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {schemes.map((scheme, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{scheme.name}</CardTitle>
                      <Badge variant="secondary">From: {scheme.source}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                    <div className="space-y-1 text-sm mb-4">
                      <p>
                        <strong>Amount:</strong> {scheme.amount}
                      </p>
                      <p>
                        <strong>Eligibility:</strong> {scheme.eligibility}
                      </p>
                    </div>
                    <Link href={`/details/scheme/${index}`}>
                      <Button className="w-full">Apply Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Service Providers Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-orange-600 rounded"></span>
              Service Providers
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {serviceProviders.map((provider, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <Badge variant="secondary">From: {provider.source}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                    <div className="space-y-1 text-sm mb-4">
                      <p>
                        <strong>Service:</strong> {provider.service}
                      </p>
                      <p>
                        <strong>Speciality:</strong> {provider.speciality}
                      </p>
                    </div>
                    <Link href={`/details/service/${index}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
