"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { InlineSearchResults } from "./inline-search-results"

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Only run on client-side to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    
    // Load saved search state from localStorage only on client
    const savedQuery = localStorage.getItem("startuptn-search-query")
    const savedShowResults = localStorage.getItem("startuptn-show-results")

    if (savedQuery && savedShowResults === "true") {
      setSearchQuery(savedQuery)
      setCurrentQuery(savedQuery)
      setShowResults(true)
    }
  }, [])

  // Update localStorage when search state changes
  useEffect(() => {
    if (!isMounted) return
    
    if (showResults && currentQuery) {
      localStorage.setItem("startuptn-search-query", currentQuery)
      localStorage.setItem("startuptn-show-results", "true")
    } else {
      localStorage.removeItem("startuptn-search-query")
      localStorage.removeItem("startuptn-show-results")
    }
  }, [showResults, currentQuery, isMounted])

  useEffect(() => {
    if (showResults && currentQuery) {
      localStorage.setItem("startuptn-search-query", currentQuery)
      localStorage.setItem("startuptn-show-results", "true")
    } else {
      localStorage.removeItem("startuptn-search-query")
      localStorage.removeItem("startuptn-show-results")
    }
  }, [showResults, currentQuery])

  const handleSearch = async () => {
    const query = searchQuery.trim()
    if (!query) return

    setCurrentQuery(query)
    setIsLoading(true)
    setShowResults(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({
        error: 'Failed to get response. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      await handleSearch()
    }
  }

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentQuery(query)
    setShowResults(true)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setCurrentQuery("")
    setSearchQuery("")
    localStorage.removeItem("startuptn-search-query")
    localStorage.removeItem("startuptn-show-results")
  }

  return (
    <section className="relative bg-white min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 pt-16">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${showResults ? "mt-8" : ""}`}>
            StartupTN
          </h1>
          <p className="text-lg text-gray-600 mb-8">Find funding, mentors, and resources for your startup journey</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-6 bg-white border border-gray-200 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search for funding, programs, mentors, or resources..."
                  className="h-12 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>

            {!showResults && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-500">Try:</span>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => handlePopularSearch("Seed Funding")}
                >
                  Seed Funding
                </button>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => handlePopularSearch("Find a mentor in tech")}
                >
                  Tech Mentors
                </button>
                <button
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => handlePopularSearch("Business registration process")}
                >
                  Business Registration
                </button>
              </div>
            )}
          </Card>
        </div>

        {showResults && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <p className="mt-2 text-gray-600">Searching for answers...</p>
              </div>
            ) : searchResults?.error ? (
              <div className="text-center py-8">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-600 font-medium">Error: {searchResults.error}</p>
                </div>
                <Button variant="outline" className="mt-4" onClick={handleCloseResults}>
                  Close
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Results Grid */}
                {searchResults?.results?.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {searchResults.results.map((result: any, index: number) => (
                      <Card key={index} className="p-5 hover:shadow-md transition-shadow">
                        {typeof result === 'object' ? (
                          <div className="space-y-3">
                            {Object.entries(result).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="font-medium text-gray-700">
                                  {key.replace(/_/g, ' ')}:
                                </span>{' '}
                                <span className="text-gray-800">
                                  {String(value || 'N/A').split('\n').map((line, i, arr) => (
                                    <span key={i}>
                                      {line}
                                      {i < arr.length - 1 && <br />}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="whitespace-pre-line">{String(result)}</div>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 text-center text-gray-500">
                    No results found. Please try a different search term.
                  </Card>
                )}

                {/* Explanation Section removed as requested */}

                <div className="flex justify-center pt-4">
                  <Button variant="outline" onClick={handleCloseResults}>
                    Close Results
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
