"use client"

import { Navigation } from "@/components/navigation"

const sectorData = [
  { name: "FinTech", searches: 245, percentage: 100 },
  { name: "HealthTech", searches: 189, percentage: 77 },
  { name: "EdTech", searches: 156, percentage: 64 },
  { name: "AgriTech", searches: 134, percentage: 55 },
  { name: "CleanTech", searches: 98, percentage: 40 },
  { name: "E-commerce", searches: 87, percentage: 35 },
]

const userNeedsData = [
  { name: "Funding", value: 45, color: "#8b5cf6" },
  { name: "Mentorship", value: 28, color: "#f59e0b" },
  { name: "Services", value: 18, color: "#10b981" },
  { name: "Schemes", value: 9, color: "#ef4444" },
]

const topServices = [
  { name: "Legal Compliance Services", utilization: 89, provider: "LegalTech Partners" },
  { name: "Cloud Credits Program", utilization: 76, provider: "AWS Activate" },
  { name: "Accounting & Tax Services", utilization: 68, provider: "FinanceHub" },
  { name: "IP Registration Support", utilization: 54, provider: "IP India" },
  { name: "Marketing Consultation", utilization: 43, provider: "GrowthExperts" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Observation Dashboard</h1>
            <p className="text-gray-600 mt-2">Policy insights and ecosystem analytics</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Searches</h3>
              <div className="text-2xl font-bold text-purple-600">12,847</div>
              <p className="text-xs text-green-600">+23% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Users</h3>
              <div className="text-2xl font-bold text-purple-600">3,456</div>
              <p className="text-xs text-green-600">+18% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Service Connections</h3>
              <div className="text-2xl font-bold text-purple-600">1,289</div>
              <p className="text-xs text-green-600">+31% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Success Rate</h3>
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <p className="text-xs text-green-600">+5% from last month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Top Searched Sectors</h2>
              <p className="text-sm text-gray-600 mb-6">Most popular startup sectors by search volume</p>
              <div className="space-y-4">
                {sectorData.map((sector, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium text-gray-700">{sector.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                      <div
                        className="bg-purple-600 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${sector.percentage}%` }}
                      >
                        <span className="text-white text-xs font-medium">{sector.searches}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">User Needs Distribution</h2>
              <p className="text-sm text-gray-600 mb-6">What users are primarily searching for</p>
              <div className="space-y-4">
                {userNeedsData.map((need, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: need.color }}></div>
                      <span className="text-sm font-medium text-gray-700">{need.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${need.value * 2}%`,
                            backgroundColor: need.color,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{need.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Most Utilized Services */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Most Utilized Services</h2>
            <p className="text-sm text-gray-600 mb-6">Top performing services by user engagement</p>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <p className="text-sm text-gray-600">Provider: {service.provider}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${service.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">{service.utilization}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
