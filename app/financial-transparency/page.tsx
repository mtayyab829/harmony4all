"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  PieChart,
  FileText,
  Download,
  Calendar,
  ArrowRight,
  Eye,
  Award,
  Music,
  Users
} from "lucide-react"

export default function FinancialTransparencyPage() {

  const financialHighlights = [
    {
      title: "Community Partnerships",
      amount: "10+",
      period: "since 2025",
      description: "Schools and community centers served",
      icon: Users
    },
    {
      title: "Community Members Reached",
      amount: "1000+",
      period: "since 2021",
      description: "Underserved youth receiving music education",
      icon: Award
    },
    {
      title: "Instruments Repaired",
      amount: "80+",
      period: "since 2021",
      description: "Free instrument repair services provided",
      icon: Music
    },
    {
        title: "Community Events",
      amount: "12+",
      period: "since 2021",
      description: "Music performances and educational workshops",
      icon: Calendar
    }
  ]

  const revenueSources = [
    { category: "Individual Donations", percentage: 45, amount: "$67,500" },
    { category: "Foundation Grants", percentage: 30, amount: "$45,000" },
    { category: "Corporate Sponsorships", percentage: 15, amount: "$22,500" },
    { category: "Program Fees", percentage: 7, amount: "$10,500" },
    { category: "Other Revenue", percentage: 3, amount: "$4,500" }
  ]

  const expenseBreakdown = [
    { category: "Program Services", percentage: 75, amount: "$112,500", description: "Instruments, curriculum, and direct program delivery" },
    { category: "Instrument Maintenance", percentage: 17, amount: "$25,500", description: "Repairs, maintenance, and equipment replacement" },
    { category: "Administration", percentage: 6, amount: "$9,000", description: "Management, accounting, and compliance" },
    { category: "Fundraising", percentage: 2, amount: "$3,000", description: "Development and donor relations" }
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
            <span className="text-gray-600">Financial Transparency</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6">
              <Eye className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-semibold text-sm md:text-base">FINANCIAL TRANSPARENCY</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Accountability Through Transparency
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in complete financial transparency. Every dollar donated to Harmony 4 All
              is accounted for and directly supports our mission of making music education accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Financial Overview
              </h2>
              <p className="text-lg text-gray-600">
                Key financial metrics demonstrating our commitment to efficient, effective operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialHighlights.map((highlight, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
                      <highlight.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{highlight.amount}</div>
                    <div className="text-sm text-gray-600 mb-2">{highlight.period}</div>
                    <div className="text-sm font-medium text-gray-900 mb-2">{highlight.title}</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revenue & Expenses Breakdown */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Revenue Sources */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="h-7 w-7 mr-3 text-black" />
                  Revenue Sources
                </h2>
                <div className="space-y-4">
                  {revenueSources.map((source, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{source.category}</span>
                        <span className="text-sm text-gray-600">{source.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600">{source.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Breakdown */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <PieChart className="h-7 w-7 mr-3 text-black" />
                  Expense Breakdown
                </h2>
                <div className="space-y-4">
                  {expenseBreakdown.map((expense, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{expense.category}</span>
                        <span className="text-sm text-gray-600">{expense.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${expense.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{expense.amount}</div>
                      <div className="text-xs text-gray-500">{expense.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IRS 990 Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              IRS Form 990
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our most recent IRS Form 990 is available for review, demonstrating our commitment to transparency and accountability.
            </p>

            <Card className="bg-gray-50 border-2 border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">IRS Form 990 - FY 2023</h3>
                <p className="text-gray-600 mb-6">
                  Complete financial disclosure as filed with the IRS
                </p>
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Form 990
                </Button>
                <p className="text-xs text-gray-500 mt-4">
                  Available upon request. Contact info@harmony4all.org for access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our Commitment to Donors
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Every dollar entrusted to Harmony 4 All is stewarded with the utmost care and accountability.
            We are committed to transparency, efficiency, and maximum impact in our mission to make music education accessible to all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full">
                <DollarSign className="mr-2 h-4 w-4" />
                Support Our Mission
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
