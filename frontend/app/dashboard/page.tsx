"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")

    if (userRole === "founder") {
      router.push("/dashboard/founder")
    } else if (userRole === "admin") {
      router.push("/admin")
    } else {
      // If no role is set, redirect to get started page
      router.push("/get-started")
    }
  }, [router])

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}
