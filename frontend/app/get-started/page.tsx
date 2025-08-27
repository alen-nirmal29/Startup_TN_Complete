"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Building2, TrendingUp } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation"

export default function GetStarted() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role)
    // Store role in localStorage for dashboard routing
    localStorage.setItem("userRole", role)
  }

  const handleGetStarted = () => {
    if (selectedRole === "founder") {
      router.push("/dashboard/founder")
    } else if (selectedRole === "admin") {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex items-center justify-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Started with StartupTN</h1>
            <p className="text-gray-600">Choose your role to access personalized features and get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Startup Founder */}
            <Card
              className={`hover:shadow-lg transition-all cursor-pointer ${
                selectedRole === "founder" ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => handleRoleSelection("founder")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Startup Founder</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">
                  Access your Growth Card, track milestones, and get personalized recommendations
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Growth Score Tracking</li>
                  <li>• Milestone Checklist</li>
                  <li>• AI Recommendations</li>
                  <li>• Funding Applications</li>
                </ul>
              </CardContent>
            </Card>

            {/* Investor/Mentor */}
            <Card className="hover:shadow-lg transition-shadow cursor-not-allowed opacity-60">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Investor/Mentor</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">Discover startups, manage portfolio, and provide mentorship</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Startup Discovery</li>
                  <li>• Portfolio Management</li>
                  <li>• Mentorship Tools</li>
                  <li>• Investment Tracking</li>
                </ul>
                <div className="text-sm text-gray-400 font-medium">Coming Soon</div>
              </CardContent>
            </Card>

            {/* Admin */}
            <Card
              className={`hover:shadow-lg transition-all cursor-pointer ${
                selectedRole === "admin" ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => handleRoleSelection("admin")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Admin</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-gray-600">Monitor ecosystem health, analyze trends, and manage policies</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Observation Dashboard</li>
                  <li>• Data Analytics</li>
                  <li>• Policy Insights</li>
                  <li>• System Management</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Get Started Button */}
          <div className="text-center">
            <Button
              onClick={handleGetStarted}
              disabled={!selectedRole}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {selectedRole ? "Access My Dashboard" : "Select a Role to Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
