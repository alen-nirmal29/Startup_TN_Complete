"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, DollarSign, FileText, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SchemeDetails({ params }: { params: { id: string } }) {
  const [showSuccess, setShowSuccess] = useState(false)

  const schemes = [
    {
      name: "Startup Tamil Nadu Seed Grant",
      amount: "₹10 Lakhs",
      eligibility: "Early-stage startups",
      source: "Government Portal",
      description: "Non-dilutive funding for product development",
      applicationDeadline: "March 31, 2024",
      processingTime: "45-60 days",
      fundingType: "Grant (Non-repayable)",
      sectors: ["Technology", "Healthcare", "Agriculture", "Education"],
      requirements: [
        "Company incorporated in Tamil Nadu",
        "Less than 2 years old",
        "Annual turnover under ₹25 lakhs",
        "Innovative product or service",
      ],
      documents: [
        "Company incorporation certificate",
        "Business plan (max 10 pages)",
        "Financial projections",
        "Founder resumes",
      ],
      benefits: ["₹10 lakhs seed funding", "Mentorship support", "Office space assistance", "Networking opportunities"],
    },
    {
      name: "Women Entrepreneur Scheme",
      amount: "₹25 Lakhs",
      eligibility: "Women-led startups",
      source: "Government Portal",
      description: "Special funding support for women entrepreneurs",
      applicationDeadline: "June 30, 2024",
      processingTime: "60-90 days",
      fundingType: "Loan + Grant Combination",
      sectors: ["All sectors welcome"],
      requirements: [
        "At least 51% women ownership",
        "Company registered in Tamil Nadu",
        "Scalable business model",
        "Job creation potential",
      ],
      documents: [
        "Women ownership proof",
        "Business registration documents",
        "Detailed project report",
        "Market analysis",
      ],
      benefits: [
        "₹25 lakhs funding support",
        "Business development training",
        "Market linkage support",
        "Priority in government tenders",
      ],
    },
  ]

  const scheme = schemes[Number.parseInt(params.id)] || schemes[0]

  const handleApply = () => {
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
                    <CardTitle className="text-2xl mb-2">{scheme.name}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      From: {scheme.source}
                    </Badge>
                    <p className="text-muted-foreground">{scheme.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Funding Amount:</strong> {scheme.amount}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Deadline:</strong> {scheme.applicationDeadline}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <strong>Processing:</strong> {scheme.processingTime}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheme.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheme.documents.map((document, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheme.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Funding Type</h4>
                  <p className="text-sm text-muted-foreground">{scheme.fundingType}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Target Sectors</h4>
                  <div className="flex flex-wrap gap-1">
                    {scheme.sectors.map((sector, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Apply for {scheme.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {showSuccess ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-600 font-medium">Application submitted!</p>
                    <p className="text-sm text-muted-foreground mt-1">You'll receive confirmation via email.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Ready to apply? Make sure you have all required documents.
                    </p>
                    <Button onClick={handleApply} className="w-full">
                      Submit Application
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
