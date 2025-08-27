"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ST</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">StartupTN</span>
                <span className="text-xs text-gray-500 -mt-1">Intelligent Search</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                href="/admin"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 text-sm font-medium bg-transparent"
              >
                Login
              </Button>
            </Link>
            <Link href="/get-started">
              <Button className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 text-sm font-medium">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 block px-4 py-3 text-base font-medium flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 block px-4 py-3 text-base font-medium"
              >
                Dashboard
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 block px-4 py-3 text-base font-medium">
                Admin
              </Link>
              <div className="px-4 py-3 space-y-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 mb-2 bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
