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
  const [isDownloadingAuditedStatement, setIsDownloadingAuditedStatement] = useState(false)
  const [isDownloadingForm990, setIsDownloadingForm990] = useState(false)

  const handleDownloadAnnualReport = async () => {
    console.log('Starting Annual Report download...')
    try {
      setIsDownloadingReport(true)
      console.log('Calling adminAPI.downloadAnnualReport()...')
      await adminAPI.downloadAnnualReport()
      console.log('Annual Report download completed successfully')
    } catch (error) {
      console.error('Error downloading Annual Report:', error)
    } finally {
      setIsDownloadingReport(false)
      console.log('Annual Report download state reset')
    }
  }

  const handleDownloadAuditedStatement = async () => {
    console.log('Starting Audited Financial Statement download...')
    try {
      setIsDownloadingAuditedStatement(true)
      console.log('Calling adminAPI.downloadAuditedFinancialStatement()...')
      await adminAPI.downloadAuditedFinancialStatement()
      console.log('Audited Financial Statement download completed successfully')
    } catch (error) {
      console.error('Error downloading Audited Financial Statement:', error)
    } finally {
      setIsDownloadingAuditedStatement(false)
      console.log('Audited Financial Statement download state reset')
    }
  }

  const handleDownloadForm990 = async () => {
    console.log('Starting IRS Form 990 download...')
    try {
      setIsDownloadingForm990(true)
      console.log('Calling adminAPI.downloadIRSForm990()...')
      await adminAPI.downloadIRSForm990()
      console.log('IRS Form 990 download completed successfully')
    } catch (error) {
      console.error('Error downloading IRS Form 990:', error)
    } finally {
      setIsDownloadingForm990(false)
      console.log('IRS Form 990 download state reset')
    }
  }

  const reportHighlights = [
    {
      year: "Latest",
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
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              {/* Annual Report Card */}
              <Card className="bg-black text-white border-0 shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <Badge className="bg-white/20 text-white mb-4 w-fit mx-auto">
                    Latest Report
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                    Annual Report: Harmony in Action
                  </CardTitle>
                  <CardDescription className="text-white/80 text-base">
                    Our latest annual report showcasing the impact of our community programs
                    and partnerships across New York City.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
                    {isDownloadingReport ? 'Downloading...' : 'Download Annual Report (PDF)'}
                  </Button>
                  <p className="text-xs text-white/60 mt-3">
                    PDF - Latest Report
                  </p>
                </CardContent>
              </Card>

              {/* Financial Documents Row */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Audited Financial Statement Card */}
                <Card className="bg-black text-white border-0 shadow-2xl">
                  <CardHeader className="text-center pb-6">
                    <Badge className="bg-white/20 text-white mb-4 w-fit mx-auto">
                      Financial Transparency
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                      Audited Financial Statement
                    </CardTitle>
                    <CardDescription className="text-white/80 text-base">
                      Complete audited financial statements for the period ending December 31, 2025,
                      prepared in accordance with generally accepted accounting principles.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <Button
                      onClick={handleDownloadAuditedStatement}
                      disabled={isDownloadingAuditedStatement}
                      className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloadingAuditedStatement ? 'Downloading...' : 'Download Financial Statement'}
                    </Button>
                    <p className="text-xs text-white/60 mt-3">
                      PDF - Audited Statement
                    </p>
                  </CardContent>
                </Card>

                {/* IRS Form 990 Card */}
                <Card className="bg-black text-white border-0 shadow-2xl">
                  <CardHeader className="text-center pb-6">
                    <Badge className="bg-white/20 text-white mb-4 w-fit mx-auto">
                      Tax Filing
                    </Badge>
                    <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                      IRS Form 990
                    </CardTitle>
                    <CardDescription className="text-white/80 text-base">
                      Official IRS Form 990 filing for tax year 2025, demonstrating our tax-exempt
                      status and commitment to transparency.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <Button
                      onClick={handleDownloadForm990}
                      disabled={isDownloadingForm990}
                      className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isDownloadingForm990 ? 'Downloading...' : 'Download Form 990'}
                    </Button>
                    <p className="text-xs text-white/60 mt-3">
                      PDF - IRS Filing
                    </p>
                  </CardContent>
                </Card>
              </div>
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
