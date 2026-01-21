"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, AlertTriangle, Mail, Phone, Menu, X } from "lucide-react"



export default function TermsConditionsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: Shield,
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing and using the Harmony 4 All website, mobile applications, or services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
        },
        {
          subtitle: "Service Availability",
          text: "We reserve the right to withdraw or amend our service and any service or material we provide on our website in our sole discretion without notice. We will not be liable if for any reason all or any part of the service is unavailable at any time or for any period.",
        },
      ],
    },
    {
      title: "Use of Our Services",
      icon: Users,
      content: [
        {
          subtitle: "Eligibility",
          text: "Our services are available to individuals and organizations who can form legally binding contracts under applicable law. If you are under 18, you may use our services only with the involvement and consent of a parent or guardian.",
        },
        {
          subtitle: "Permitted Use",
          text: "You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable federal, state, local, or international law or regulation.",
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use our services to transmit, or procure the sending of, any advertising or promotional material, including any 'junk mail', 'chain letter,' 'spam,' or any other similar solicitation.",
        },
      ],
    },
    {
      title: "Music Education Services",
      icon: Heart,
      content: [
        {
          subtitle: "Service Description",
          text: "Harmony 4 All provides music education services including instrument rentals, repairs, lessons, and community programs. These services are provided on an as-available basis and may be subject to additional terms and conditions.",
        },
        {
          subtitle: "Instrument Care",
          text: "When renting instruments from Harmony 4 All, you agree to use reasonable care in handling and maintaining the instrument. You are responsible for any damage caused by misuse, neglect, or normal wear and tear beyond what is covered by our maintenance policies.",
        },
        {
          subtitle: "Program Participation",
          text: "Participation in our music education programs requires adherence to program guidelines, respectful behavior toward instructors and other participants, and compliance with all safety protocols.",
        },
      ],
    },
    {
      title: "Donations and Payments",
      icon: Shield,
      content: [
        {
          subtitle: "Donation Processing",
          text: "All donations are processed through secure third-party payment processors. We do not store your payment information on our servers. Donations are tax-deductible to the extent allowed by law.",
        },
        {
          subtitle: "Refund Policy",
          text: "Donations are generally non-refundable. In exceptional circumstances, refunds may be considered at the discretion of Harmony 4 All management. Service fees and instrument deposits may be subject to different refund terms.",
        },
        {
          subtitle: "Billing Information",
          text: "You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates.",
        },
      ],
    },
  ]

  const responsibilities = [
    "Provide accurate and complete information when registering or making donations",
    "Maintain the confidentiality of your account information",
    "Notify us immediately of any unauthorized use of your account",
    "Use our services in compliance with applicable laws and regulations",
    "Respect the rights and dignity of other users and participants",
    "Follow all safety guidelines when participating in our programs",
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
            <span className="text-gray-600">Terms & Conditions</span>
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Terms & Conditions</h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Please read these terms and conditions carefully before using our services. These terms govern your use of
              Harmony 4 All's website, programs, and services.
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
                <CardTitle className="text-2xl md:text-3xl font-bold">Terms of Service</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                  Welcome to Harmony 4 All! These Terms and Conditions outline the rules and regulations for the use of our
                  website and services. By accessing this website or using our services, you accept these terms and conditions
                  in full. Do not continue to use Harmony 4 All's website or services if you do not accept all of the terms and
                  conditions stated on this page.
                </p>
                <p className="text-sm md:text-lg text-gray-700 leading-relaxed">
                  The following terminology applies to these Terms and Conditions: "Client", "You" and "Your" refers to you,
                  the person accessing this website and accepting the Company's terms and conditions. "The Company",
                  "Ourselves", "We", "Our" and "Us", refers to Harmony 4 All. "Party", "Parties", or "Us", refers to both
                  the Client and ourselves.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* User Responsibilities */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Your Responsibilities
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-6 md:p-8">
                <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-6">
                  As a user of our services, you agree to:
                </p>
                <div className="space-y-3 md:space-y-4">
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full mr-3 md:mr-4 mt-2 md:mt-3 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm md:text-base">{responsibility}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Intellectual Property
            </h2>
            <Card
              className={`shadow-xl border-0 rounded-2xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Content Ownership</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      Unless otherwise stated, Harmony 4 All and/or its licensors own the intellectual property rights
                      for all material on this website. All intellectual property rights are reserved. You may access
                      this from Harmony 4 All for your own personal use subjected to restrictions set in these terms and conditions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">License to Use</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      You are granted a limited license to access and use this website and our services for personal,
                      non-commercial purposes. This license does not include any resale or commercial use of this website
                      or its contents; any derivative use of this website or its contents; or any use of data mining,
                      robots, or similar data gathering and extraction tools.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">User-Generated Content</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      If you submit content to our website or services, you grant Harmony 4 All a non-exclusive,
                      royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify,
                      adapt, publish, translate, create derivative works from, distribute, and display such content
                      throughout the world in any media.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Disclaimer and Limitation */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Disclaimer & Limitation of Liability
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl font-bold text-gray-900">
                    <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-orange-500 mr-3" />
                    Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 text-sm md:text-base">
                    The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law,
                    Harmony 4 All excludes all representations, warranties, conditions and terms whether express or implied,
                    statutory or otherwise, including without limitation warranties of merchantability, fitness for a
                    particular purpose, and non-infringement.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-lg md:text-xl font-bold text-gray-900">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 text-red-500 mr-3" />
                    Liability Limits
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 text-sm md:text-base">
                    Harmony 4 All will not be liable for any indirect, special, incidental, consequential or punitive
                    damages arising out of your use of our services. Our total liability to you for all claims arising
                    from your use of our services shall not exceed the amount you paid us in the 12 months preceding
                    the claim.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Questions About These Terms?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <Card
                className={`shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Contact Us</h3>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                    If you have questions about these Terms and Conditions, please contact us:
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
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Updates to Terms</h3>
                  <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                    We may update these terms from time to time. We will notify you of any changes by posting the new
                    terms on this page and updating the "Last Updated" date below.
                  </p>
                  <div className="text-gray-700 text-sm md:text-base">
                    <p><strong>Last Updated:</strong> December 2024</p>
                    <p className="mt-2"><strong>Effective Date:</strong> December 1, 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            Ready to Make a Difference?
          </h2>
          <p
            className={`text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Join Harmony 4 All in our mission to provide music education to those who need it most. Your participation
            helps create harmony in communities around the world.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full transition-all duration-300 hover:scale-105"
              >
                <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Make a Donation
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white w-full text-white hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full bg-transparent transition-all duration-300 hover:scale-105"
              >
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
