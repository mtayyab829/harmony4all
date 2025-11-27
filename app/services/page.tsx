"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Clock, MapPin, Phone, CheckCircle, Calendar, ArrowRight, Gift, Music, Wrench, BookOpen, Award, Mic, Globe, HelpCircle } from "lucide-react"
import { imageUrlsData } from "@/lib/image-urls"

export default function ServicesPage() {
  const services = [
    {
      title: "Free Instrument Rentals",
      description: "Giving every eligible student the chance to explore their potential through music.",
      features: [
        "Quality instruments at no cost",
        "Easy access for schools and families",
        "Maintenance included",
        "Support for musical growth",
      ],
      ageGroups: ["Children", "Teens", "Adults"],
      duration: "Ongoing/Seasonal",
      image: imageUrlsData.services.serviceImages[0]?.cloudinaryUrl || "",
      icon: Music,
    },
    {
      title: "Free Instrument Repairs",
      description: "Ensuring every child's instrument stays in perfect condition to keep the music alive.",
      features: [
        "Skilled repair technicians",
        "Quick turnaround time",
        "Covers all common instruments",
        "No cost for eligible students",
      ],
      ageGroups: ["All Ages"],
      duration: "Ongoing/Seasonal",
      image: imageUrlsData.services.serviceImages[1]?.cloudinaryUrl || "",
      icon: Wrench,
    },
    {
      title: "Free Musical Curriculum",
      description: "Opening doors for every student to learn, grow, and shine through music.",
      features: [
        "Engaging digital and print resources",
        "Student-centered learning pathways",
        "Community concerts and workshops",
        "Performance opportunities",
      ],
      ageGroups: ["Children", "Teens", "Adults", "Seniors"],
      duration: "Ongoing/Seasonal",
      image: imageUrlsData.services.serviceImages[2]?.cloudinaryUrl || "",
      icon: BookOpen,
    },
    {
      title: "Instrument Donation",
      description: "Donate musical instruments to help make music education accessible to all students.",
      features: [
        "Accept all instruments",
        "Tax deductible",
        "Pickup service",
        "Quality inspection",
      ],
      ageGroups: ["All Ages"],
        duration: "Ongoing/Seasonal",
      image: imageUrlsData.services.serviceImages[3]?.cloudinaryUrl || "",
      icon: Gift,
    },
  ]

  const processSteps = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Schedule a free consultation to discuss your musical needs and goals",
      image: imageUrlsData.services.processSteps[0]?.cloudinaryUrl || "",
    },
    {
      step: "2",
      title: "Service Selection",
      description: "Choose from our range of services based on your requirements",
      image: imageUrlsData.services.processSteps[1]?.cloudinaryUrl || "",
    },
    {
      step: "3",
      title: "Service Setup",
      description: "We'll set up your chosen service and provide all necessary information",
      image: imageUrlsData.services.processSteps[2]?.cloudinaryUrl || "",
    },
    {
      step: "4",
      title: "Ongoing Support",
      description: "Receive continuous support and assistance throughout your musical journey",
      image: imageUrlsData.services.processSteps[3]?.cloudinaryUrl || "",
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-xs md:text-sm">
            <Link href="/" className="text-teal-600 hover:text-teal-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Services</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('${imageUrlsData.services.heroBackground.cloudinaryUrl}')`
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
         <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">Our Services</h1>
          <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-white/90 text-center max-w-3xl drop-shadow-lg">
          We make music possible for every child-through free rentals, reliable repairs, school curriculum support, and the gift of instrument donations.          </p>
         </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">Our Music Services</h2>
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From free rentals that open doors, to repairs that keep instruments alive, and curriculum that strengthens classrooms-every service helps students grow through music. And with the gift of instrument donations, we carry that harmony even further.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="group bg-white shadow-2xl border-0 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[102%]"
                >
                  <div className="relative">
                    <div className="w-full h-60 md:h-80 overflow-hidden relative">
                      <Image
                        src={service.image || imageUrlsData.media.placeholder.cloudinaryUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={85}
                      />
                    </div>
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center shadow-lg">
                      <service.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <div className="text-center mb-6 md:mb-8">
                      <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-lg mb-4 md:mb-6">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                      {/* Key Features */}
                      <div>
                        <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 mr-2 text-black" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-xs md:text-sm">
                                {typeof feature === 'string' ? feature : (feature as any).name}
                              </span>
                              {typeof feature === 'object' && (feature as any).tooltip && (
                                <div className="relative group/tooltip">
                                  <HelpCircle className="h-3 w-3 md:h-4 md:w-4 text-gray-400 cursor-help hover:text-gray-600 transition-colors" />
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-48 md:w-64">
                                      {(feature as any).tooltip}  
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Service Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-gray-50 p-3 md:p-4 rounded-xl">
                          <div className="flex items-center text-gray-700 mb-2">
                            <Users className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                            <span className="font-medium text-xs md:text-sm">Age Groups</span>
                          </div>
                          <div className="space-y-1">
                            {service.ageGroups.map((age, i) => (
                              <Badge key={i} variant="secondary" className="bg-white text-gray-700 border border-gray-200 text-xs">
                                {age}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 md:p-4 rounded-xl">
                          <div className="flex items-center text-gray-700 mb-2">
                            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                            <span className="font-medium text-xs md:text-sm">Schedule</span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 font-medium">{service.duration}</p>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Additional Services</h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond our core music services, we offer specialized programs and events that bring music education to life in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Community Concerts */}
            <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-36 md:h-48 overflow-hidden relative">
                <Image
                  src={imageUrlsData.services.additionalServices[0]?.cloudinaryUrl || ""}
                  alt="Community Concert"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-3 md:mr-4">
                    <Music className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Community Concerts</h3>
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  Regular community concerts featuring local musicians, students, and professional performers to showcase musical talent and bring communities together.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-gray-500">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    <span>Ongoing/Seasonal</span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-gray-500">
                    <Users className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                    <span>All Ages Welcome</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Youth Orchestra Programs */}
            <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={imageUrlsData.services.additionalServices[1]?.cloudinaryUrl || ""}
                  alt="Youth Orchestra"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Performance Pathways</h3>
                </div>
                <p className="text-gray-600 mb-4">
                Ensemble coaching and performance labs designed to prepare young musicians for the stage, offering opportunities to rehearse, record, and showcase their skills in community concerts.                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Ongoing/Seasonal</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="h-4 w-4 mr-2" />
                    <span>Professional Mentorship</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Educational Workshops */}
            <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={imageUrlsData.services.additionalServices[2]?.cloudinaryUrl || ""}
                  alt="Educational Workshop"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Educational Workshops</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Interactive workshops and masterclasses with professional musicians and educators, designed to inspire and educate students of all skill levels.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Ongoing/Seasonal</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Small Group Sessions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advocacy & Speaking */}
            <Card className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={imageUrlsData.services.additionalServices[3]?.cloudinaryUrl || ""}
                  alt="Advocacy Speaking"
                  fill
                  className="bg-bottom object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Mic className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Advocacy & Speaking</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Speaking engagements and advocacy work at prestigious venues including the United Nations, promoting music education accessibility worldwide.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Ongoing/Seasonal</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>Global Reach</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-8xl mx-auto">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">How We Work</h2>
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined process ensures you receive the right services quickly and efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 md:gap-8">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center shadow-lg border-0 rounded-2xl overflow-hidden">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                      quality={80}
                    />
                  </div>
                  <CardContent className="p-4 md:p-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <span className="text-xl md:text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
            Contact us today to learn more about our music services and how we can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full">
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Contact Us
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/60 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full"
              >
                <Gift className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Donate Instruments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
