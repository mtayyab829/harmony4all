"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, HandHeart, Building, Clock, Phone, DollarSign, Gift, Music } from "lucide-react"
import { imageUrlsData } from "@/lib/image-urls"



export default function GetInvolvedPage() {
  const volunteerOpportunities = [
    {
      title: "Music Education Assistant",
      description: "Support our music education programs and help students learn instruments",
      timeCommitment: "4-6 hours/week",
      requirements: ["Background check", "Training provided", "Reliable schedule"],
      image: imageUrlsData.getInvolved.volunteerOpportunities[0]?.cloudinaryUrl || "",
    },
    {
      title: "Event Coordinator",
      description: "Help organize and run our music events and fundraisers",
      timeCommitment: "2-4 hours/week",
      requirements: ["Event planning experience preferred", "Creative mindset", "Team player"],
      image: imageUrlsData.getInvolved.volunteerOpportunities[1]?.cloudinaryUrl || "",
    },
    {
      title: "Administrative Support",
      description: "Assist with office tasks, data entry, and communication",
      timeCommitment: "3-5 hours/week",
      requirements: ["Computer skills", "Attention to detail", "Professional communication"],
      image: imageUrlsData.getInvolved.volunteerOpportunities[2]?.cloudinaryUrl || "",
    },
    {
      title: "Instrument Pickup Helper",
      description: "Help with instrument donation pickups and deliveries",
      timeCommitment: "Flexible",
      requirements: ["Valid driver's license", "Clean driving record", "Own vehicle"],
      image: imageUrlsData.getInvolved.volunteerOpportunities[3]?.cloudinaryUrl || "",
    },
  ]

  const donationLevels = [
    {
      amount: 50,
      impact: "Your gift provides a month of music supplies so a student can keep learning without barriers.",
      icon: Gift,
      image: imageUrlsData.getInvolved.donationLevels[0]?.cloudinaryUrl || "",
    },
    {
      amount: 100,
      impact: "Your support covers one month of instrument rental, giving a child the chance to practice every day.",
      icon: Heart,
      image: imageUrlsData.getInvolved.donationLevels[1]?.cloudinaryUrl || "",
    },
    {
      amount: 200,
      impact: "Your generosity sponsors a student's full music education for a month, including lessons and performance opportunities.",
      icon: Users,
      image: imageUrlsData.getInvolved.donationLevels[2]?.cloudinaryUrl || "",
    },
    {
      amount: 500,
      impact: "Your contribution equips an entire classroom with instruments, resources, and mentorship for a month.",
      icon: Building,
      image: imageUrlsData.getInvolved.donationLevels[3]?.cloudinaryUrl || "",
    },
    {
      amount: 750,
      impact: "Your generosity funds instrument repairs and resources for an entire school band, restoring the sound of music for dozens of students.",
      icon: Music,
      image: imageUrlsData.getInvolved.donationLevels[4]?.cloudinaryUrl || "",
    },
    {
      amount: 1000,
      impact: "Your investment sustains community concerts and education programs, bringing the power of music to hundreds of students and families.",
      icon: Building,
      image: imageUrlsData.getInvolved.donationLevels[5]?.cloudinaryUrl || "",
    },
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
            <span className="text-gray-600">Get Involved</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('${imageUrlsData.getInvolved.heroBackground.cloudinaryUrl}')`
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
         <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">Get Involved</h1>
          <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-white/90 text-center max-w-3xl drop-shadow-lg">
          Join the chorus of change. Every hand, every gift, every partnership helps turn silence into song for children who need it most.
          </p>
         </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Ways to Make a Difference</h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the way that works best for you to support our community and mission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-3 md:pb-4 bg-gray-50">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Donate</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 md:p-6">
                <CardDescription className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                Give the gift of music. Your support puts instruments and hope into children who need them most.
                </CardDescription>
                <Link href="/donate">
                  <Button className="bg-black text-white hover:shadow-lg transition-all duration-300 rounded-full px-4 md:px-6 py-2 w-full text-sm md:text-base">
                    Become a Donor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-3 md:pb-4 bg-gray-50">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HandHeart className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Sponsor</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 md:p-6">
                <CardDescription className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                Support our mission by becoming a sponsor. Your generosity helps us provide instruments, resources, and opportunities for students who need it most.
                </CardDescription>
                <Link href="/sponsors">
                  <Button className="bg-black text-white hover:shadow-lg transition-all duration-300 rounded-full px-4 md:px-6 py-2 w-full text-sm md:text-base">
                    Become a Sponsor
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center pb-3 md:pb-4 bg-gray-50">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HandHeart className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Volunteer</CardTitle>
              </CardHeader>
              <CardContent className="text-center p-4 md:p-6">
                <CardDescription className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                Be the heartbeat of change. Share your time and bring music to life for students who deserve it most.
                </CardDescription>
                <Link href="/volunteer">
                  <Button className="bg-black text-white hover:shadow-lg transition-all duration-300 rounded-full px-4 md:px-6 py-2 w-full text-sm md:text-base">
                    Become a Volunteer
                  </Button>
                </Link>
              </CardContent>
            </Card>



          </div>
        </div>
      </section >

      {/* Donation Impact */}
      < section className="py-12 md:py-16 lg:py-20 bg-gray-50" >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Your Donation Impact</h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              See how your contribution directly supports our programs and the individuals we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {donationLevels.map((level, index) => (
              <Link 
                key={index} 
                href={`/donate?amount=${level.amount}`}
                className="block"
              >
                <Card className="text-center shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group hover:scale-105">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={level.image}
                      alt={`Donation level ${level.amount}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <level.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-black group-hover:text-gray-700 transition-colors">${level.amount}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-xs md:text-sm">{level.impact}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/donate">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span>Donate Today</span>
              </Button>
            </Link>
          </div>
        </div>
      </section >

      {/* Volunteer Opportunities */}
      < section className="py-12 md:py-16 lg:py-20" >
        <div className=" container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Volunteer Opportunities</h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect volunteer role that matches your skills, interests, and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {volunteerOpportunities.map((opportunity, index) => (
              <Card key={index} className="shadow-lg border-0 rounded-2xl overflow-hidden">
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={opportunity.image}
                    alt={opportunity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-bold text-gray-900">{opportunity.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm md:text-base">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center text-xs md:text-sm text-gray-600">
                      <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2 text-black" />
                      Time Commitment: {opportunity.timeCommitment}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Requirements:</h4>
                      <ul className="space-y-1">
                        {opportunity.requirements.map((req, i) => (
                          <li key={i} className="text-xs md:text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full mr-2"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/volunteer">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full">
                <HandHeart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Apply to Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section >

      {/* Call to Action */}
      < section className="py-12 md:py-16 lg:py-20 bg-black text-white" >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Ready to Make a Difference?</h2>
          <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
            Every contribution, big or small, helps us create a more inclusive and supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-transparent border-2 border-white w-full text-white hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full">
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Contact Us
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-white w-full text-black hover:bg-white/60 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span>Donate Today</span>
              </Button>
            </Link>
          </div>
        </div>
      </section >
    </div >
  )
}
