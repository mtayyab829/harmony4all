"use client"

import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Calendar, Newspaper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample press and media features - replace with actual data
const mediaFeatures = [
  {
    title: "Harmony 4 All Featured in New York State Senate Recognition",
    description: "State Senator Joseph P. Addabbo, Jr. honored Harmony 4 All for outstanding contributions to music education in underserved communities across New York City.",
    date: "March 2024",
    source: "New York State Senate",
    link: "#",
    category: "Government Recognition"
  },
  {
    title: "United Nations Youth Delegate Program Highlights Bianca Quddus",
    description: "Co-Founder Bianca Quddus featured for her work as a Global Youth Ambassador and commitment to music education access for all children.",
    date: "February 2024",
    source: "United Nations",
    link: "#",
    category: "International Recognition"
  },
  {
    title: "Juilliard School Partnership Announcement",
    description: "Harmony 4 All announces expanded partnership with The Juilliard School to provide preparatory music education to talented underserved youth.",
    date: "January 2024",
    source: "Juilliard School",
    link: "#",
    category: "Education Partnership"
  },
  {
    title: "Community Impact: Free Instrument Distribution Program",
    description: "Local news coverage of Harmony 4 All's program providing over 500 free musical instruments to students in Title 1 schools across Queens.",
    date: "December 2023",
    source: "Local News Network",
    link: "#",
    category: "Community Impact"
  },
  {
    title: "Youth Leadership in Music Education",
    description: "Profile of co-founders Bianca and Joshua Quddus, highlighting youth-led approaches to addressing educational inequities through music.",
    date: "November 2023",
    source: "Education Today Magazine",
    link: "#",
    category: "Leadership Profile"
  },
  {
    title: "Carnegie Hall Link Up Program Success",
    description: "Harmony 4 All students perform alongside professional musicians at Carnegie Hall, showcasing the program's impact on musical development.",
    date: "October 2023",
    source: "Carnegie Hall",
    link: "#",
    category: "Performance Achievement"
  }
]

export default function MediaPage() {
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
            <span className="text-gray-600">Media & Press</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6">
              <Newspaper className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-semibold text-sm md:text-base">MEDIA & PRESS</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Press & Media Coverage
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Harmony 4 All is making an impact in music education through
              press features, community recognition, and media coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Media Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {mediaFeatures.map((feature, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-black text-white mb-2">{feature.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {feature.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </CardTitle>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Source: {feature.source}
                      </span>
                      <Link
                        href={feature.link}
                        className="inline-flex items-center text-black hover:text-gray-600 font-medium transition-colors"
                      >
                        Read Full Article
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Media Inquiries
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Interested in featuring Harmony 4 All's work? We'd love to share our story
            of youth-led impact in music education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full">
                Contact Us
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
