"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  HandHeart,
  Gift,
  Music,
  Wrench,
  Mic,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { WelcomePopup } from "@/components/welcome-popup"
import ContactSection from "@/components/contact"
import NewsletterSection from "@/components/news-letter"
import { TestimonialsSection } from "@/components/Testimonial"
import api from "../api/api"
import { imageUrlsData } from "@/lib/image-urls"

// Hero Carousel Component
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const slides = [
    {
      title: "Building a World of Harmony Through Music",
      subtitle:
        "Inspiring the next generation to discover their voices, unite communities, and transform lives through the power of music.",
      image: imageUrlsData.home.heroCarousel[1]?.cloudinaryUrl || "",
    },
    {
      title: "Did you Know?",
      subtitle:
        "Schools with music programs have an estimated 90.2 percent graduation rate compared to 72.9 percent for schools without music education.",
      image: imageUrlsData.home.heroCarousel[2]?.cloudinaryUrl || "",
    },
    {
      title: "Building Communities Through Music",
      subtitle: "Together, we are opening doors for the next generation to discover their voices, expand their potential, and strengthen the bonds of community.",
      image: imageUrlsData.home.heroCarousel[3]?.cloudinaryUrl || "",
    },
    {
      title: "Educational Excellence Through Music",
      subtitle:
        "Cultivating creativity, confidence, and possibility by giving every child access to the transformative power of music.",
      image: imageUrlsData.home.heroCarousel[4]?.cloudinaryUrl || "",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 6000)
      return () => clearInterval(timer)
    }
  }, [isPaused])


  return (
    <section
      className="relative min-h-[500px] sm:min-h-screen flex flex-col sm:flex-row items-center justify-center overflow-hidden"
      role="region"
      aria-label="Hero carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          aria-hidden={index !== currentSlide}
        >
          {/* Background Image */}
          {slide.image && (
            <>
              {/* Mobile: Fixed height image container */}
              <div className="sm:hidden w-full h-[180px] relative mt-10">
               <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  quality={85}
                  priority={index === 0}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Desktop: Full background image */}
              <div className="hidden sm:block absolute inset-0 bg-cover bg-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  quality={85}
                  priority={index === 0}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          )}

          {/* Mobile: Content below image */}
          {slide.image && (
            <div className="sm:hidden relative z-10 container mx-auto px-4 text-center py-8">
              <div className="max-w-4xl mx-auto text-gray-900">
                <h1
                  className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-1000 delay-300 px-2 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                  {slide.title}
                </h1>
                {slide.title === "THE IMPACT" ? (
                  <div
                    className={`text-center max-w-4xl mx-auto transition-all duration-1000 delay-500 px-2 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                    dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                  />
                ) : (
                  <p
                    className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 leading-relaxed transition-all duration-1000 delay-500 px-2 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                  >
                    {slide.subtitle}
                  </p>
                )}
                <div
                  className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >

                </div>
              </div>
            </div>
          )}

          {/* Desktop: Content overlaid on image */}
          {slide.image && (
            <div className="hidden sm:flex relative z-10 container mx-auto px-4 text-center h-full items-center">
            <div className="max-w-4xl mx-auto text-white">
              <h1
                className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 ${index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                {slide.title}
              </h1>
              {slide.title === "THE IMPACT" ? (
                <div
                  className={`text-center max-w-4xl mx-auto px-2 ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                />
              ) : (
                <p
                  className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 leading-relaxed px-2 ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {slide.subtitle}
                </p>
              )}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center ${index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
              >

              </div>
            </div>
          </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-transparent border-0 focus:outline-none focus:ring-0 text-black"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-0 focus:outline-none focus:ring-0 text-black"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />
      </Button>

      {/* Slide Indicators */}
      <div
        className="absolute bottom-8 sm:bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-20"
        role="tablist"
        aria-label="Carousel slide indicators"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${index === currentSlide ? "bg-black sm:bg-white" : "bg-black/50 hover:bg-black/75 sm:bg-white/50 sm:hover:bg-white/75"
              }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>


    </section>
  )
}

// Impact Statistics Section Component
const ImpactStatisticsSection = () => {
  const stats = [
    {
      number: "1000+",
      label: "Community Members Reached",
      description: "Underserved youth receiving music education since 2021"
    },
    {
      number: "80+",
      label: "Instruments Repaired",
      description: "Free instrument repair services provided"
    },
    {
      number: "10+",
      label: "Community Partnerships",
      description: "Title 1 schools and community centers served"
    },
    {
      number: "12+",
      label: "Community Events",
      description: "Music performances and educational workshops"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Measurable outcomes that demonstrate our commitment to transforming lives through music education.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Mission & Values Section Component
const MissionValuesSection = () => {
  return (
    <section id="mission-values-section" className="py-4 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
            {/* Left Column - Mission and Core Values */}
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Our Mission</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                At <span className="font-bold">Harmony 4 All</span>, our mission is to ensure that music is not a privilege, but a pathway open to every child. As a youth-led nonprofit, we provide underserved K-12 students across New York City with free instruments, educational resources, and community programs. Through music, we spark creativity, strengthen confidence, and weave connections that uplift families and communities. Our vision is a world where every child can discover their voice and shape a brighter future in harmony with others.
              </p>

              <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Our Core Values</h4>
              <div className="space-y-4 sm:space-y-6 text-left">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base md:text-lg text-left">Excellence in Access</strong>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">We believe every child deserves the highest quality opportunities to learn, grow, and shine through music.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base md:text-lg text-left">Harmony in Community</strong>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">We use music as a bridge to bring students, families, and neighborhoods together.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base md:text-lg text-left">Creativity with Purpose</strong>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">We nurture imagination and artistry while fostering resilience, confidence, and leadership.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-black rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900 text-sm sm:text-base md:text-lg text-left">Generations in Resonance</strong>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">We honor the voices of the past, uplift the students of today, and inspire the leaders of tomorrow through the timeless power of music.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Large Image */}
            <div className="relative">
              <div className="relative">
                <Image
                  src={imageUrlsData.home.missionValuesImage.cloudinaryUrl}
                  alt="Orchestra performing music"
                  width={1046}
                  height={850}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  quality={85}
                  className="w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[850px] object-cover rounded-2xl sm:rounded-3xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Programs Section Component
const ProgramsSection = () => {

  const programs = [
    {
      icon: Music,
      title: "Free Instrument Rentals",
      description: "Giving every eligible student the chance to explore their potential through music.",
      features: ["Quality instruments at no cost", "Easy access for schools and families", "Maintenance included", "Support for musical growth"],
      image: imageUrlsData.home.programsImages[0]?.cloudinaryUrl || "",
    },
    {
      icon: Wrench,
      title: "Free Instrument Repairs",
      description: "Ensuring every child's instrument stays in perfect condition to keep the music alive.",
      features: ["Skilled repair technicians", "Quick turnaround time", "Covers all common instruments", "No cost for eligible students"],
      image: imageUrlsData.home.programsImages[1]?.cloudinaryUrl || "",
    },
    {
      icon: Mic,
      title: "Free Musical Curriculum",
      description: "Opening doors for every student to learn, grow, and shine through music.",
      features: ["Engaging digital and print resources", "Student-centered learning pathways", "Community concerts and workshops", "Performance opportunities"],
      image: imageUrlsData.home.programsImages[2]?.cloudinaryUrl || "",
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Bringing music to underserved neighborhoods through concerts, workshops, and wellness programs.",
      features: ["Live music for underserved neighborhoods", "Music for wellness in senior homes", "Hands-on learning workshops", "School partnerships"],
      image: imageUrlsData.home.programsImages[3]?.cloudinaryUrl || "",
    },
    {
      icon: Gift,
      title: "Instrument Donation",
      description: "Donate musical instruments to help make music education accessible to all students.",
      features: ["Accept all instruments", "Tax deductible", "Pickup service", "Quality inspection"],
      image: imageUrlsData.home.programsImages[4]?.cloudinaryUrl || "",
    },
  ]

  return (
    <section id="programs-section" className="py-4 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-6">Our Services</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-6xl mx-auto px-2">
            Discover how <span className="font-bold">Harmony 4 All</span> opens doors of opportunity through music. Our programs provide the tools, resources, and support that help underserved students explore their creativity, strengthen their confidence, and grow with their communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl border-0 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video overflow-hidden relative">
                {program.image ? (
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
                    quality={80}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <program.icon className="h-16 w-16 text-gray-500" />
                  </div>
                )}
              </div>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 text-center text-sm sm:text-base">{program.description}</CardDescription>
                <ul className="space-y-2">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mr-2 sm:mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Get Involved Section Component
const GetInvolvedSection = () => {

  const ways = [
    {
      icon: Heart,
      title: "Donate",
      description: "Give the gift of music and change a child's future.",
      cta: "Change a Life",
      image: imageUrlsData.home.getInvolvedImages[0]?.cloudinaryUrl || "",
    },
    {
      icon: Gift,
      title: "Sponsor",
      description:
        "Stand with us to expand music access and strengthen communities.",
      cta: "Fuel the Future",
      image: imageUrlsData.home.getInvolvedImages[1]?.cloudinaryUrl || "",
    },
    {
      icon: HandHeart,
      title: "Volunteer",
      description:
        "Share your time and talents to uplift students and communities.",
      cta: "Lift a Voice",
      image: imageUrlsData.home.getInvolvedImages[2]?.cloudinaryUrl || "",
    },
  ]

  return (
    <section id="get-involved-section" className="py-4 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-6">Get Involved</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Help every child find their voice through music. Your support puts instruments in their hands, opportunities in their path, and harmony in our communities.          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {ways.map((way, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl border-0 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={way.image}
                  alt={way.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                  <way.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">{way.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
                  {way.description}
                </CardDescription>
                <Link href={way.title === "Donate" ? "/donate" : way.title === "Volunteer" ? "/volunteer" : "/sponsors"}>
                  <Button className="bg-black text-white hover:bg-gray-800 hover:shadow-lg rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base">
                    {way.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Donors Marquee Section
const DonorsMarqueeSection = () => {
  const donors = [
    "Alex Singh",
    "Anne Allauzen",
    "Mark Garret Ours",
    "Carla Rose",
    "Stavros Theoharis",
    "Allison Davis",
    "Frances kweller",
    "Evie Joselow",
    "Karen Mazza",
    "Christopher Foltz",
    "Tahmina Sultan",
    "Wayne DeLisser",
    "Dave",
    "NEW YORK INJURY LAW FIRM PLLC",
    "New York State Senator Joseph P. Addabbo, Jr.",
    "New York State Office of the Governor",
    "New York State Legislature",
    "New York State Council on the Arts",
    "New York City Department of Cultural Affairs",
    "New York Foundation for the Arts",
    "Citizens Committee for New York City",
    "Villa Russo",
  ]
  const extendedDonors = [...donors, ...donors, ...donors, ...donors, ...donors, ...donors,...donors, ...donors, ...donors, ...donors, ...donors, ...donors]

  return (
    <section className="py-12 bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Generous Supporters</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-4"></div>
          <p className="text-lg opacity-90">Thank you for believing in our mission</p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth fade effect - hidden on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 hidden md:block"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 hidden md:block"></div>

          <div className="flex animate-marquee hover:pause-marquee whitespace-nowrap py-4">
            {/* Extended donors for seamless continuous scrolling */}
            <div className="flex items-center">
              {extendedDonors.map((donor, index) => (
                <span key={`donor-${index}`} className="flex items-center mr-8 md:mr-12">
                  <span className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white/90 hover:text-white transition-all duration-300 px-2 md:px-4">
                    {donor}
                  </span>
                  {index < extendedDonors.length - 1 && (
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white/60 rounded-full mx-1 md:mx-2 flex-shrink-0"></div>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// Home Blog Teaser
const HomeBlogSection = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/blogs')
        // Handle the response structure: { blogs: [...], pagination: {...} }
        const blogsData = response.data?.blogs || response.data || []
        setPosts(Array.isArray(blogsData) ? blogsData.slice(0, 3) : [])
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])


  return (
    <section id="blog-section" className="py-4 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-6">Latest from Our Blog</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Discover inspiring stories, educational insights, and updates from our music education community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isLoading ? (
              // Loading state
              Array.from({ length: 3 }).map((_, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden"
                >
                  <div className="aspect-video bg-gray-200"></div>
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-8 bg-gray-200 rounded w-20"></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : posts.length > 0 ? (
              // Posts content
              posts.map((post: any, index) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden hover:shadow-2xl">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        {post.url ? (
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              src={post.image || imageUrlsData.media.placeholder.cloudinaryUrl}
                              alt={post.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              quality={80}
                              className="object-cover cursor-pointer"
                            />
                          </a>
                        ) : (
                          <Image
                            src={post.image || imageUrlsData.media.placeholder.cloudinaryUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={80}
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/80 text-white backdrop-blur-sm border-0">
                          Blog Post
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-500 font-medium">
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 line-clamp-2">
                        {post.title}
                      </h3>

                      {post.description && (
                        <p className="text-gray-600 mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base">
                          {post.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">Harmony 4 All</span>
                        </div>

                        <div className="flex items-center text-black">
                          <span className="text-xs sm:text-sm font-medium mr-1 sm:mr-2">Read More</span>
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              // Empty state
              <div className="lg:col-span-3 text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">No Blog Posts Yet</h3>
                <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-2">
                  We're working on creating amazing content for our community. Check back soon for inspiring stories and educational insights!
                </p>
                <Link href="/blog">
                  <Button className="bg-black text-white hover:bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
                    Visit Our Blog
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {!isLoading && posts.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <Link href="/blog">
                <Button className="bg-black text-white hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-full shadow-lg">
                  View All Blog Posts
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}



// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <HeroCarousel />
      <DonorsMarqueeSection />
      <ImpactStatisticsSection />
      <MissionValuesSection />
      <ProgramsSection />
      <GetInvolvedSection />
      <TestimonialsSection />
      <ContactSection />
      <NewsletterSection />
    </div>
  )
}



