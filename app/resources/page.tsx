"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Download,
  ExternalLink,
  BookOpen,
  Users,
  Phone,
  Mail,
  Calendar,
  FileText,
  Video,
  Menu,
  X,
} from "lucide-react"
import NewsletterSection from "@/components/news-letter"



export default function ResourcesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState("")
  const [newsletterMessageType, setNewsletterMessageType] = useState<"success" | "error" | "">("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterMessage("Please enter a valid email address")
      setNewsletterMessageType("error")
      setTimeout(() => {
        setNewsletterMessage("")
        setNewsletterMessageType("")
      }, 3000)
      return
    }

    try {
      setIsNewsletterLoading(true)
      setNewsletterMessage("")
      
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail, source: "resources" }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setNewsletterMessage(data.message)
        setNewsletterMessageType("success")
        setNewsletterEmail("")
      } else {
        setNewsletterMessage(data.message)
        setNewsletterMessageType("error")
      }
    } catch (error) {
      setNewsletterMessage("Something went wrong. Please try again.")
      setNewsletterMessageType("error")
    } finally {
      setIsNewsletterLoading(false)
      setTimeout(() => {
        setNewsletterMessage("")
        setNewsletterMessageType("")
      }, 3000)
    }
  }

  const resourceCategories = [
    {
      title: "Getting Started Guides",
      description: "Essential information for families new to our services",
      resources: [
        { name: "Welcome Guide for New Families", type: "PDF", size: "2.3 MB" },
        { name: "Understanding Your Child's Assessment", type: "PDF", size: "1.8 MB" },
        { name: "Insurance and Billing Guide", type: "PDF", size: "1.2 MB" },
        { name: "What to Expect in Therapy", type: "Video", duration: "12 min" },
      ],
    },
    {
      title: "Educational Resources",
      description: "Learning materials and educational support tools",
      resources: [
        { name: "Home Learning Activities Guide", type: "PDF", size: "3.1 MB" },
        { name: "Adaptive Technology Resources", type: "PDF", size: "2.7 MB" },
        { name: "IEP Meeting Preparation Checklist", type: "PDF", size: "0.8 MB" },
        { name: "Educational Rights and Advocacy", type: "PDF", size: "2.2 MB" },
      ],
    },
    {
      title: "Therapy Support Materials",
      description: "Tools and exercises to support therapy goals at home",
      resources: [
        { name: "Fine Motor Skills Activities", type: "PDF", size: "4.2 MB" },
        { name: "Speech and Language Exercises", type: "PDF", size: "3.5 MB" },
        { name: "Sensory Integration Strategies", type: "PDF", size: "2.9 MB" },
        { name: "Physical Therapy Home Exercises", type: "Video", duration: "25 min" },
      ],
    },
    {
      title: "Community Resources",
      description: "Local services and community support information",
      resources: [
        { name: "Local Support Groups Directory", type: "PDF", size: "1.5 MB" },
        { name: "Community Recreation Programs", type: "PDF", size: "2.1 MB" },
        { name: "Transportation Resources", type: "PDF", size: "1.3 MB" },
        { name: "Emergency Contact Information", type: "PDF", size: "0.6 MB" },
      ],
    },
  ]

  const quickLinks = [
    { title: "Crisis Support Hotline", content: "24/7 Support: (555) 911-HELP", icon: Phone },
    { title: "Family Support Groups", content: "Every Tuesday 7:00 PM", icon: Users },
    { title: "Resource Library Hours", content: "Mon-Fri 9:00 AM - 5:00 PM", icon: Calendar },
    { title: "Email Support", content: "resources@harmony4all.org", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-xs md:text-sm">
            <Link href="/" className="text-black hover:text-gray-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Family Resources</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Family Resources</h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Comprehensive resources, guides, and support materials to help families navigate their journey with us.
              Everything you need to support your loved one's growth and development.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Quick Access
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {quickLinks.map((link, index) => (
                <Card
                  key={index}
                  className={`text-center shadow-lg border-0 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <link.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{link.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{link.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Resource Library</h2>
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Browse our comprehensive collection of guides, tools, and materials organized by category.
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {resourceCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${categoryIndex * 300}ms` }}
                >
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{category.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {category.resources.map((resource, resourceIndex) => (
                      <Card
                        key={resourceIndex}
                        className="shadow-lg border-0 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <CardContent className="p-4 md:p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                {resource.type === "Video" ? (
                                  <Video className="h-4 w-4 md:h-5 md:w-5 text-black mr-2" />
                                ) : (
                                  <FileText className="h-4 w-4 md:h-5 md:w-5 text-black mr-2" />
                                )}
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs md:text-sm">
                                  {resource.type}
                                </Badge>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{resource.name}</h4>
                              <p className="text-xs md:text-sm text-gray-600">{resource.size || resource.duration}</p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                                <Download className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                                <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Support */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Need Additional Support?
            </h2>
            <p
              className={`text-sm md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Our family support team is here to help you find the resources you need and answer any questions.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-black text-white w-full hover:bg-gray-800 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Contact Support Team
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black w-full hover:bg-black hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full bg-transparent transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  View Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />

    </div>
  )
}
