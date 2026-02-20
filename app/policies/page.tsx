"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  Eye,
  DollarSign,
  Heart,
  Award,
  ArrowRight,
  FileText,
  Lock,
  Scale
} from "lucide-react"

export default function PoliciesPage() {

  const policies = [
    {
      icon: Users,
      title: "Diversity, Equity & Inclusion Policy",
      description: "Our commitment to fostering an inclusive environment where all voices are heard and valued.",
      content: "Harmony 4 All is committed to promoting diversity, equity, and inclusion in all aspects of our work. We believe that music education should be accessible to all students regardless of background, identity, or circumstance. Our programs are designed to serve underserved communities and create opportunities for underrepresented groups in music education.",
      highlights: [
        "Inclusive program design",
        "Cultural competency training",
        "Barrier-free access to services",
        "Community engagement focus"
      ]
    },
    {
      icon: Shield,
      title: "Child Protection & Safeguarding Policy",
      description: "Ensuring the safety and well-being of all children and youth in our programs.",
      content: "The safety and protection of children and youth is our highest priority. We maintain comprehensive safeguarding policies that protect all participants in our music education programs. This includes background checks for all staff and volunteers, safe program environments, and clear reporting procedures.",
      highlights: [
        "Mandatory background checks",
        "Safe program environments",
        "Clear reporting procedures",
        "Staff training requirements"
      ]
    },
    {
      icon: Eye,
      title: "Financial Oversight & Transparency",
      description: "Maintaining accountability and transparency in all financial operations.",
      content: "We adhere to the highest standards of financial accountability and transparency. Our financial policies ensure that all donations and grants are used effectively to support our mission of providing music education to underserved youth. Regular audits and transparent reporting keep our community informed.",
      highlights: [
        "Regular financial audits",
        "Transparent budget reporting",
        "Ethical fundraising practices",
        "Accountability to donors"
      ]
    },
    {
      icon: Scale,
      title: "Conflict of Interest Policy",
      description: "Maintaining integrity and avoiding conflicts in decision-making processes.",
      content: "Our conflict of interest policy ensures that all decisions are made in the best interest of our mission and the children we serve. Board members, staff, and volunteers must disclose any potential conflicts and recuse themselves from related decisions. This policy protects our organization's integrity and maintains public trust.",
      highlights: [
        "Mandatory conflict disclosure",
        "Recusal procedures",
        "Independent oversight",
        "Ethical decision-making"
      ]
    },
    {
      icon: Lock,
      title: "Privacy & Confidentiality Policy",
      description: "Protecting personal information and maintaining confidentiality.",
      content: "We respect and protect the privacy of all individuals who interact with Harmony 4 All. Personal information collected for program participation, donations, or communications is handled with the utmost care and in compliance with applicable privacy laws. We never share personal information without explicit consent.",
      highlights: [
        "Secure data handling",
        "Privacy law compliance",
        "Consent-based sharing",
        "Information security measures"
      ]
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
            <span className="text-gray-600">Policies & Governance</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-6">
              <Shield className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-semibold text-sm md:text-base">POLICIES & GOVERNANCE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Commitment to Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Transparency, accountability, and ethical practices guide everything we do at Harmony 4 All.
              These policies ensure we maintain the highest standards in serving our community.
            </p>
          </div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {policies.map((policy, index) => (
                <Card key={index} className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">{policy.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {policy.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {policy.content}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">Key Elements:</h4>
                      <ul className="space-y-1">
                        {policy.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center text-xs text-gray-600">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Governance Structure
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our governance ensures accountability and effective stewardship of our mission.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Users className="h-12 w-12 text-black mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Board of Directors</h3>
                <p className="text-gray-600 text-sm">
                  Dedicated volunteers providing strategic oversight and ensuring mission alignment.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Award className="h-12 w-12 text-black mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Executive Leadership</h3>
                <p className="text-gray-600 text-sm">
                  Co-Founders Bianca and Joshua Quddus provide operational leadership and vision.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <Heart className="h-12 w-12 text-black mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Advisory Council</h3>
                <p className="text-gray-600 text-sm">
                  Music education experts and community leaders providing guidance and support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            We're committed to transparency. Contact us if you have questions about our policies or governance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
