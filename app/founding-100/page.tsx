"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Star } from "lucide-react"
import { imageUrlsData } from "@/lib/image-urls"
import { donationAPI } from "@/lib/api"

export default function Founding100Page() {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Join the Founding 100 Circle
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-2 opacity-95">
              Be Among the First 100 Founding Members
            </p>
            <p className="text-base md:text-lg opacity-90">
              Now Through December 31, 2024
            </p>
            <Link href="/donate?from=founding100&scroll=levels">
            <Button variant="outline" className="mt-10 text-black rounded-full">
              Join the Founding 100 Circle
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Progress
              </h2>
              <div className="relative">
                {loading ? (
                  <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4">
                    Loading...
                  </div>
                ) : (
                  <>
                    <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4">
                      {progress} / 100
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 md:h-6 mb-8">
                      <div 
                        className="bg-black h-4 md:h-6 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((progress / 100) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-lg md:text-xl text-gray-600">
                      Founding Members Joined
                    </p>
                  </>
                )}
              </div>
              <Link href="/donate?from=founding100&scroll=levels">
              <Button
                  className="w-full sm:w-64 relative overflow-hidden bg-black text-white rounded-full px-6 py-4 mt-4 focus:outline-none shadow-xl hover:shadow-2xl transition-all duration-500 font-bold text-lg group transform hover:-translate-y-1"
                  aria-label="Donate to Harmony 4 All"
                >
                  <Heart className="mr-3 h-5 w-5 animate-pulse" />
                  <span>Donate Now</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Button>
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
              Building Community Through Music
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Youth Photo */}
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64 md:h-80">
                  <Image
                    src={youthImage}
                    alt="Youth musicians participating in Harmony 4 All programs"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
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
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-purple-600" />
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
  )
}

