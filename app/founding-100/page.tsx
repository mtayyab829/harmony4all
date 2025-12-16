"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Star, Share2, Facebook, MessageCircle, Mail, Shield, Award as AwardIcon, Youtube, Instagram, Linkedin } from "lucide-react"
import { imageUrlsData } from "@/lib/image-urls"
import { donationAPI } from "@/lib/api"

export default function Founding100Page() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  // Meta tags for social sharing
  const metaTags = (
    <Head>
      <title>Help Us Reach 100 Founding Supporters | Harmony 4 All</title>
      <meta name="description" content="Help us reach 100 Founding Supporters by December 31! Your gift helps children, families, and seniors across NYC experience the joy of music." />
      <meta property="og:title" content="Help Us Reach 100 Founding Supporters | Harmony 4 All" />
      <meta property="og:description" content="Your gift helps children, families, and seniors across NYC experience the joy of music. Join our Founding 100 Circle!" />
      <meta property="og:image" content="https://res.cloudinary.com/dcrieatns/image/upload/v1764191295/harmony4all/assets/harmony4all/assets/young-musicians-smiling-together.jpg" />
      <meta property="og:url" content="https://harmony4all.org/founding-100" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Help Us Reach 100 Founding Supporters | Harmony 4 All" />
      <meta name="twitter:description" content="Your gift helps children, families, and seniors across NYC experience the joy of music. Join our Founding 100 Circle!" />
      <meta name="twitter:image" content="https://res.cloudinary.com/dcrieatns/image/upload/v1764191295/harmony4all/assets/harmony4all/assets/young-musicians-smiling-together.jpg" />
    </Head>
  )

  
  const socialLinks = [
    { 
      icon: Facebook, 
      label: "Follow us on Facebook", 
      href: "https://www.facebook.com/JoinHarmony4All",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      icon: Instagram, 
      label: "Follow us on Instagram", 
      href: "https://www.instagram.com/joinharmony4all/",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      icon: Linkedin, 
      label: "Follow us on LinkedIn", 
      href: "https://www.linkedin.com/company/joinharmony4all/?viewAsMember=true",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <rect width="24" height="24" fill="white"/>
          <text x="12" y="17" textAnchor="middle" fill="black" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="bold">in</text>
        </svg>
      )
    },
    { 
      icon: Youtube, 
      label: "Follow us on Youtube", 
      href: "https://youtu.be/CQXnJpY_zR8",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
   
  ] 

  // Using images from the existing image URLs - you can replace these with specific youth/senior photos
  const youthImage = imageUrlsData.about?.secondaryImage?.cloudinaryUrl || 
    imageUrlsData.about?.mainImage?.cloudinaryUrl || 
    "https://res.cloudinary.com/dcrieatns/image/upload/v1764191295/harmony4all/assets/harmony4all/assets/young-musicians-smiling-together.jpg"
  
  const seniorImage = imageUrlsData.media?.galleryImages?.[0]?.cloudinaryUrl || 
    imageUrlsData.about?.storyMilestones?.[0]?.cloudinaryUrl ||
    "https://res.cloudinary.com/dcrieatns/image/upload/v1764191131/harmony4all/assets/harmony4all/assets/elementary-school-with-teacher.jpg"

  // Fetch progress from API
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true)
        const response = await donationAPI.getFounding100Progress()
        if (response.success) {
          setProgress(response.progress || 0)
        }
      } catch (error) {
        console.error('Error fetching founding 100 progress:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
    // Refresh progress every 30 seconds
    const interval = setInterval(fetchProgress, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {metaTags}
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Hero Image (Mobile) */}
              <div className="lg:hidden mb-8">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={imageUrlsData.about?.mainImage?.cloudinaryUrl ||
                          "https://res.cloudinary.com/dcrieatns/image/upload/v1764191295/harmony4all/assets/harmony4all/assets/young-musicians-smiling-together.jpg"}
                    alt="Children, families, and seniors experiencing the joy of music together"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in">
                Help Us Reach 100 Founding Supporters by December 31
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-95 leading-relaxed">
                Your gift helps children, families, and seniors across NYC experience the joy of music.
              </p>

              {/* Donate Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Link href="/donate?from=founding100&scroll=levels">
                  <Button className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-once">
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>
                </Link>
              </div>

              {/* Social Sharing Buttons */}
              <div className="flex justify-center lg:justify-start gap-3 md:gap-4 mb-8">
              {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-3 bg-white border-2 border-white rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:outline-none"
                      aria-label={social.label}
                      role="listitem"
                    >
                      <div className="h-6 w-6 text-black">
                        {social.customIcon}
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6 mb-8">
                <div className="flex items-center gap-2 text-white/90">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Secure Donation</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <AwardIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">501(c)(3) Nonprofit</span>
                </div>
                <div className="text-white/90">
                  <span className="text-sm font-medium">EIN: 93-2460195</span>
                </div>
              </div>

              {/* Progress Counter - Integrated into Hero */}
              <div className="mb-6">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white/70 mb-4">
                      ...
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                      <div className="bg-white/40 h-4 rounded-full w-1/4 animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in">
                      {progress} / 100
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-4 mb-4 shadow-inner">
                      <div
                        className="bg-white h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
                        style={{ width: `${Math.min((progress / 100) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-base md:text-lg text-white/90 font-medium mb-2">
                      Founding Members Joined
                    </p>
                    <p className="text-sm md:text-base text-white/80">
                      Help us reach the next milestone: {Math.min(progress + 1, 100)} members
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Hero Image (Desktop) */}
            <div className="hidden lg:block order-1 lg:order-2">
              <div className="relative h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={imageUrlsData.about?.mainImage?.cloudinaryUrl ||
                        "https://res.cloudinary.com/dcrieatns/image/upload/v1764191295/harmony4all/assets/harmony4all/assets/young-musicians-smiling-together.jpg"}
                  alt="Children, families, and seniors experiencing the joy of music together"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Suggested Giving Amounts */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Impact
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Every contribution brings music to those who need it most. Click any amount to get started.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
              {/* $50 Music Supplies */}
              <Link href="/donate?from=founding100&amount=50">
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      $50
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                      Music supplies for one student
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* $100 Instrument Rental */}
              <Link href="/donate?from=founding100&amount=100">
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      $100
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                      One month of instrument rental
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* $200 Full Music Education */}
              <Link href="/donate?from=founding100&amount=200">
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      $200
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                      Complete music education for one month
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* $500 Classroom Support */}
              <Link href="/donate?from=founding100&amount=500">
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      $500
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                      Equips an entire classroom
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* $750 School Band Support */}
              <Link href="/donate?from=founding100&amount=750">
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      $750
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                      Funds instrument repairs and resources
                    </p>
                  </CardContent>
                </Card>
              </Link>

              {/* $1000 Community Impact */}
              <Link href="/donate?from=founding100&amount=1000">
                <Card className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-gray-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      $1000
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-tight">
                      Sustains community programs
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Supporters Recognition Strip */}
      <section className="py-8 bg-gray-50 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 font-medium">Recent Founding Members</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left">
              {/* Duplicate the list for seamless scrolling */}
              {Array.from({ length: 2 }).map((_, duplicateIndex) => (
                <div key={duplicateIndex} className="flex gap-8 whitespace-nowrap">
                  {[
                    "Sarah M.", "Michael R.", "Jennifer L.", "David K.", "Lisa P.",
                    "Robert T.", "Emma S.", "James W.", "Maria G.", "John B.",
                    "Anna C.", "Peter H.", "Rachel N.", "Thomas D.", "Sophie V.",
                    "Alex M.", "Olivia P.", "Daniel R.", "Isabella L.", "William K."
                  ].map((name, index) => (
                    <span
                      key={`${duplicateIndex}-${index}`}
                      className="text-gray-700 font-medium text-sm px-3 py-1 bg-white rounded-full shadow-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Building Community Through Music */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Emotional Introduction */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Building Community Through Music
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 leading-relaxed max-w-4xl mx-auto">
                Music has the power to heal, connect, and transform lives. Your support helps us create moments of joy and connection for children, families, and seniors across NYC.
              </p>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Every note played, every song shared, builds stronger communities and brighter futures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Youth Photo */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={youthImage}
                    alt="Youth musicians participating in Harmony 4 All programs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-gray-900" />
                    <h3 className="text-xl font-semibold text-gray-900">Youth Programs</h3>
                  </div>
                  <p className="text-gray-600">
                    Empowering the next generation of musicians through accessible music education and mentorship.
                  </p>
                </CardContent>
              </Card>

              {/* Senior Photo */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={seniorImage}
                    alt="Seniors and community members enjoying music together"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-gray-900" />
                    <h3 className="text-xl font-semibold text-gray-900">Community Impact</h3>
                  </div>
                  <p className="text-gray-600">
                    Bringing together generations through the universal language of music and shared experiences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

