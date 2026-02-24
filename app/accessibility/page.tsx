"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Eye, Ear, MousePointer, Keyboard, Phone, Mail, CheckCircle, Menu, X } from "lucide-react"



export default function AccessibilityPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const accessibilityFeatures = [
    {
      icon: Eye,
      title: "Visual Accessibility",
      features: [
        "High contrast color schemes throughout the website",
        "Scalable text that can be enlarged up to 200% without loss of functionality",
        "Alternative text descriptions for all images and graphics",
        "Clear visual focus indicators for keyboard navigation",
        "Consistent navigation and layout structure",
      ],
    },
    {
      icon: Ear,
      title: "Auditory Accessibility",
      features: [
        "Captions and transcripts for all video content",
        "Audio descriptions available for visual content",
        "No auto-playing audio that cannot be controlled",
        "Visual alerts and notifications in addition to audio cues",
        "Compatible with hearing aid and cochlear implant technologies",
      ],
    },
    {
      icon: Keyboard,
      title: "Motor Accessibility",
      features: [
        "Full keyboard navigation support for all interactive elements",
        "Generous click targets (minimum 44x44 pixels)",
        "No time limits on form completion",
        "Drag and drop alternatives provided where applicable",
        "Compatible with switch navigation and other assistive devices",
      ],
    },
    {
      icon: MousePointer,
      title: "Cognitive Accessibility",
      features: [
        "Clear, simple language and consistent terminology",
        "Logical page structure with proper heading hierarchy",
        "Error messages that clearly explain how to fix issues",
        "Breadcrumb navigation to help users understand their location",
        "Search functionality with predictive text and suggestions",
        "Consistent design patterns and familiar interface elements",
      ],
    },
  ]

  const standards = [
    {
      name: "WCAG 2.1 AA",
      description: "Web Content Accessibility Guidelines Level AA compliance",
      status: "Compliant",
    },
    {
      name: "Section 508",
      description: "U.S. Federal accessibility standards for electronic content",
      status: "Compliant",
    },
    {
      name: "ADA",
      description: "Americans with Disabilities Act digital accessibility requirements",
      status: "Compliant",
    },
  ]

  const assistiveTechnologies = [
    "Screen readers (JAWS, NVDA, VoiceOver, TalkBack)",
    "Voice recognition software (Dragon NaturallySpeaking)",
    "Switch navigation devices",
    "Eye-tracking systems",
    "Magnification software",
    "Alternative keyboards and pointing devices",
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
            <span className="text-gray-600">Accessibility Statement</span>
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
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Accessibility Statement</h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              <span className="font-bold">Harmony 4 All</span> is committed to ensuring digital accessibility for people with disabilities. We continually
              improve the user experience for everyone and apply relevant accessibility standards.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Our Commitment
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-4 md:p-6 lg:p-8">
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                  At <span className="font-bold">Harmony 4 All</span>, accessibility is not just a compliance requirement—it's a core value that reflects
                  our mission to serve individuals with disabilities. We believe that everyone deserves equal access to
                  information and functionality, and we are dedicated to providing an inclusive digital experience.
                </p>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                  Our website is designed and developed with accessibility in mind, following established guidelines and
                  best practices. We regularly test our site with assistive technologies and gather feedback from users
                  with disabilities to ensure we meet their needs effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Accessibility Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {accessibilityFeatures.map((category, index) => (
                <Card
                  key={index}
                  className={`shadow-lg border-0 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center text-base md:text-lg lg:text-xl font-bold text-gray-900">
                      <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black rounded-xl flex items-center justify-center mr-2 md:mr-3 lg:mr-4">
                        <category.icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <ul className="space-y-2 md:space-y-3">
                      {category.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm lg:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Standards Compliance
            </h2>
            <div className="space-y-4 md:space-y-6">
              {standards.map((standard, index) => (
                <Card
                  key={index}
                  className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-3 md:mb-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{standard.name}</h3>
                        <p className="text-sm md:text-base text-gray-600">{standard.description}</p>
                      </div>
                      <div className="md:ml-4">
                        <span className="inline-flex items-center px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          {standard.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assistive Technologies */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Supported Assistive Technologies
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-4 md:p-6 lg:p-8">
                <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4 md:mb-6">
                  Our website is designed to be compatible with a wide range of assistive technologies, including:
                </p>
                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  {assistiveTechnologies.map((tech, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-3 flex-shrink-0" />
                      <span className="text-xs md:text-sm lg:text-base text-gray-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Feedback and Contact */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Feedback and Support
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-4 md:p-6 lg:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Report Accessibility Issues</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4 md:mb-6">
                    If you encounter any accessibility barriers on our website, please let us know. We take all feedback
                    seriously and will work to address issues promptly.
                  </p>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-3" />
                      <span className="text-xs md:text-sm lg:text-base text-gray-700"><a href="tel:+13475547712"> (737) HARMONY (427-6669)</a></span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-3" />
                      <span className="text-xs md:text-sm lg:text-base text-gray-700"><a href="mailto:info@harmony4all.org">info@harmony4all.org</a></span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-4 md:p-6 lg:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Alternative Formats</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-4 md:mb-6">
                    If you need information from our website in an alternative format, such as large print, Braille, or
                    audio format, please contact us and we will provide it within a reasonable timeframe.
                  </p>
                  <Button className="bg-black hover:bg-gray-800 text-white rounded-full px-4 md:px-6 py-2 md:py-3 text-sm md:text-base transition-all duration-300 hover:scale-105">
                    Request Alternative Format
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Efforts */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Ongoing Efforts
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-4 md:p-6 lg:p-8">
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                  Accessibility is an ongoing effort, not a one-time achievement. We continuously monitor and improve
                  our website's accessibility through:
                </p>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Regular Testing</h4>
                    <p className="text-xs md:text-sm lg:text-base text-gray-700">
                      Automated and manual testing with various assistive technologies and accessibility tools.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">User Feedback</h4>
                    <p className="text-xs md:text-sm lg:text-base text-gray-700">
                      Actively seeking and incorporating feedback from users with disabilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Staff Training</h4>
                    <p className="text-xs md:text-sm lg:text-base text-gray-700">
                      Regular training for our development and content teams on accessibility best practices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Standards Updates</h4>
                    <p className="text-xs md:text-sm lg:text-base text-gray-700">
                      Staying current with evolving accessibility standards and implementing improvements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm lg:text-base text-gray-600">
              <strong>Last Updated:</strong> December 2025
            </p>
            <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-2">
              This accessibility statement is reviewed and updated regularly to reflect our current accessibility
              efforts and compliance status.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
