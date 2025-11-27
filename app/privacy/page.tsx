"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Eye, Lock, Users, Mail, Phone, Menu, X } from "lucide-react"



export default function PrivacyPolicyPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect personal information that you voluntarily provide when you make donations, volunteer, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, address, and payment information.",
        },
        {
          subtitle: "Student Information",
          text: "For students receiving our music education services, we collect information necessary to provide appropriate instrument rentals, repairs, and educational support. This information is collected with your explicit consent.",
        },
        {
          subtitle: "Website Usage Data",
          text: "We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and time spent on our site. This helps us improve our website and services.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your personal information to provide music education services, instrument rentals, repairs, and support services tailored to your needs.",
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you important updates about our services, appointment reminders, newsletters, and fundraising communications (with your consent).",
        },
        {
          subtitle: "Legal and Safety Requirements",
          text: "We may use or disclose your information when required by law, to protect the safety of individuals, or to comply with legal proceedings.",
        },
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      icon: Shield,
      content: [
        {
          subtitle: "Educational Partners",
          text: "We may share student information with educational institutions and music teachers involved in providing music education services, with your written consent or as permitted by law.",
        },
        {
          subtitle: "Service Providers",
          text: "We may share information with trusted third-party service providers who help us operate our website, process payments, or provide services, under strict confidentiality agreements.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or to protect the rights, property, or safety of our organization, clients, or others.",
        },
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          subtitle: "Data Encryption",
          text: "Sensitive information transmitted through our website is encrypted using industry-standard SSL/TLS protocols.",
        },
        {
          subtitle: "Access Controls",
          text: "Access to personal information is restricted to authorized personnel who need the information to perform their job functions.",
        },
      ],
    },
  ]

  const rights = [
    "Access: Request a copy of the personal information we hold about you",
    "Correction: Request correction of inaccurate or incomplete information",
    "Deletion: Request deletion of your personal information (subject to legal requirements)",
    "Portability: Request transfer of your information to another organization",
    "Restriction: Request limitation of how we process your information",
    "Objection: Object to certain types of processing of your information",
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
            <span className="text-gray-600">Privacy Policy</span>
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Privacy Policy</h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information when you use our services or visit our website.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardHeader className="bg-black text-white text-center py-6 md:py-8">
                <CardTitle className="text-2xl md:text-3xl font-bold">Our Privacy Commitment</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                  At Harmony 4 All, we are committed to protecting your privacy and maintaining the confidentiality of
                  your personal information. This Privacy Policy describes our practices regarding the collection, use,
                  and disclosure of information we receive from users of our music education services and website.
                </p>
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                  This policy applies to all information collected through our website, mobile applications, and in
                  connection with our music education services. By using our services or website, you consent to the practices described
                  in this policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              {sections.map((section, index) => (
                <Card
                  key={index}
                  className={`shadow-xl border-0 rounded-2xl overflow-hidden transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="bg-gray-100">
                    <CardTitle className="flex items-center text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-xl flex items-center justify-center mr-3 md:mr-4">
                        <section.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-4 md:space-y-6">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">{item.subtitle}</h4>
                          <p className="text-gray-700 leading-relaxed text-sm md:text-base">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Your Privacy Rights
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6">
                  You have certain rights regarding your personal information. These rights may vary depending on your
                  location and applicable laws:
                </p>
                <div className="space-y-3 md:space-y-4">
                  {rights.map((right, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full mr-3 md:mr-4 mt-2 md:mt-3 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm md:text-base">{right}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50 rounded-2xl">
                  <p className="text-gray-700 text-sm md:text-base">
                    <strong>To exercise these rights,</strong> please contact our Privacy Officer using the contact
                    information provided below. We will respond to your request within the timeframe required by
                    applicable law.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Cookies and Tracking Technologies
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">What Are Cookies?</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      Cookies are small text files stored on your device when you visit our website. They help us
                      provide you with a better browsing experience and allow certain features to function properly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Types of Cookies We Use</h4>
                    <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                      <li>
                        • <strong>Essential Cookies:</strong> Necessary for the website to function properly
                      </li>
                      <li>
                        • <strong>Analytics Cookies:</strong> Help us understand how visitors use our website
                      </li>
                      <li>
                        • <strong>Functional Cookies:</strong> Remember your preferences and settings
                      </li>
                      <li>
                        • <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with consent)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Managing Cookies</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      You can control and manage cookies through your browser settings. However, disabling certain
                      cookies may affect the functionality of our website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Contact Our Privacy Officer
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Privacy Questions</h3>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                    If you have questions about this privacy policy or how we handle your personal information, please
                    contact us:
                  </p>
                  <div className="space-y-2 md:space-y-3">
                                      <div className="flex items-center">
                    <Mail className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-3" />
                    <span className="text-gray-700 text-sm md:text-base">media@harmony4all.org</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-3" />
                    <span className="text-gray-700 text-sm md:text-base">Contact us for inquiries</span>
                  </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Mailing Address</h3>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">You can also reach us by mail for privacy-related inquiries:</p>
                  <div className="text-gray-700 text-sm md:text-base">
                    <p>Harmony 4 All</p>
                    <p>Attn: Privacy Officer</p>
                    <p>New York City, NY</p>
                    <p>United States</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Updates */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Policy Updates
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                  legal requirements, or other factors. We will notify you of any material changes by posting the
                  updated policy on our website and updating the "Last Updated" date.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  <strong>Last Updated:</strong> December 2024
                </p>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  <strong>Effective Date:</strong> December 1, 2024
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Questions About Your Privacy?
          </h2>
          <p
            className={`text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We're here to help. Contact our Privacy Officer with any questions or concerns about how we handle your
            personal information.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Contact Privacy Officer
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white w-full text-white hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full bg-transparent transition-all duration-300 hover:scale-105"
              >
                General Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
