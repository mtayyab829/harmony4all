"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  Music,
  ArrowRight,
  Eye
} from "lucide-react"
import { adminAPI } from "@/lib/api"

export default function AnnualReportPage() {
  const [isDownloadingReport, setIsDownloadingReport] = useState(false)

  const handleDownloadAnnualReport = async () => {
    try {
      setIsDownloadingReport(true)
      await adminAPI.downloadAuditedFinancialStatement()
    } catch (error) {
      console.error('Error downloading Annual Report:', error)
      alert('Failed to download Annual Report. Please try again.')
    } finally {
      setIsDownloadingReport(false)
    }
  }

  const reportHighlights = [
    {
      year: "2025",
      title: "Harmony in Action",
      description: "Our latest annual report showcasing the impact of our community programs and partnerships.",
      downloads: 0,
      pages: 24,
      highlights: [
        "1000+ community members reached across NYC",
        "80+ instruments repaired",
        "10+ community partnerships established",
        "12+ community events hosted"
      ]
    }
  ]

  const impactMetrics = [
    {
      icon: Users,
      value: "1000+",
      label: "Community Members Reached",
      description: "Underserved youth receiving music education"
    },
    {
      icon: Music,
      value: "80+",
      label: "Instruments Repaired",
      description: "Free instrument repair services provided"
    },
    {
      icon: TrendingUp,
      value: "10+",
      label: "Community Partnerships",
      description: "Schools and community centers served"
    },
    {
      icon: Calendar,
      value: "12+",
      label: "Community Events",
      description: "Music performances and educational workshops"
    }
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-black hover:text-gray-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Annual Report</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6">
              <FileText className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-semibold text-sm md:text-base">ANNUAL REPORTS</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Impact in Numbers
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Download our comprehensive annual reports to see the measurable outcomes of our work,
              transparent financials, and the real impact we're making in communities across New York City.
            </p>
          </div>
        </div>
      </section>

      {/* Current Year Highlight */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-black to-gray-800 text-white border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <Badge className="bg-white/20 text-white mb-4 w-fit mx-auto">
                  Latest Report
                </Badge>
                <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                  2025 Annual Report: Harmony in Action
                </CardTitle>
                <CardDescription className="text-white/80 text-base">
                  Our latest annual report showcasing the impact of our community programs
                  and partnerships across New York City.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {impactMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <metric.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm font-medium mb-1">{metric.label}</div>
                      <div className="text-xs text-white/70">{metric.description}</div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleDownloadAnnualReport}
                  disabled={isDownloadingReport}
                  className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isDownloadingReport ? 'Downloading...' : 'Download 2025 Report (PDF)'}
                </Button>
                <p className="text-xs text-white/60 mt-3">
                  PDF • 24 pages • 1.8 MB • Last updated: December 2025
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Previous Reports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Previous Years
              </h2>
              <p className="text-lg text-gray-600">
                Access our complete archive of annual reports to track our growth and impact over time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {reportHighlights.map((report, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-black text-white">{report.year}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        {report.downloads} downloads
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {report.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {report.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {report.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-black rounded-full mr-2 flex-shrink-0"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {report.pages} pages • PDF
                      </span>
                      <Button
                        onClick={() => handleDownloadAnnualReport()}
                        disabled={isDownloadingReport}
                        className="border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {isDownloadingReport ? 'Downloading...' : 'Download'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Include */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What's Inside Our Reports
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Each annual report provides comprehensive insights into our work and impact.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Program Impact",
                  description: "Detailed outcomes, student success stories, and measurable results from our music education programs.",
                  icon: TrendingUp
                },
                {
                  title: "Financial Overview",
                  description: "Transparent breakdown of revenue sources, expenses, and program efficiency metrics.",
                  icon: FileText
                },
                {
                  title: "Community Partnerships",
                  description: "Highlights of our collaborations with schools, community organizations, and local partners.",
                  icon: Users
                },
                {
                  title: "Leadership & Staff",
                  description: "Updates on our team, board members, and organizational development.",
                  icon: Music
                },
                {
                  title: "Future Goals",
                  description: "Strategic plans, upcoming initiatives, and vision for expanding our impact.",
                  icon: Calendar
                },
                {
                  title: "Donor Impact",
                  description: "How contributions have made a difference and opportunities for continued support.",
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Support Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Your support enables us to continue providing life-changing music education to underserved youth.
            See the impact of your contributions in our annual reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full">
                Donate Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/financial-transparency">
              <Button className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full">
                View Financials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
