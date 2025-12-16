"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign, CreditCard, Gift, Users, Building, Calendar, CheckCircle, Star, Shield } from "lucide-react"
import { donationAPI } from "@/lib/api"
import { imageUrlsData } from "@/lib/image-urls"

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    phone: '',
    paymentMethod: 'credit-card',
    designation: 'general',
    isAnonymous: false,
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [donationId, setDonationId] = useState<string | null>(null)

  // Add ref for donation form section
  const donationFormRef = useRef<HTMLDivElement>(null)
  // Add ref for donation levels section
  const donationLevelsRef = useRef<HTMLDivElement>(null)
  // Add ref for donor information section
  const donorInfoRef = useRef<HTMLDivElement>(null)

  const donationLevels = [
    {
      amount: 50,
      title: "Music Supplies",
      description: "A month of music supplies for one student",
      impact: "Your gift provides a month of music supplies so a student can keep learning without barriers.",
      image: imageUrlsData.donate.donationLevels[0]?.cloudinaryUrl || ""
    },
    {
      amount: 100,
      title: "Instrument Rental",
      description: "One month of instrument rental",
      impact: "Your support covers one month of instrument rental, giving a child the chance to practice every day.",
      image: imageUrlsData.donate.donationLevels[1]?.cloudinaryUrl || ""
    },
    {
      amount: 200,
      title: "Full Music Education",
      description: "Complete music education for one month",
      impact: "Your generosity sponsors a student's full music education for a month, including lessons and performance opportunities.",
      image: imageUrlsData.donate.donationLevels[2]?.cloudinaryUrl || ""
    },
    {
      amount: 500,
      title: "Classroom Support",
      description: "Equips an entire classroom",
      impact: "Your contribution equips an entire classroom with instruments, resources, and mentorship for a month.",
      image: imageUrlsData.donate.donationLevels[3]?.cloudinaryUrl || ""
    },
    {
      amount: 750,
      title: "School Band Support",
      description: "Funds instrument repairs and resources",
      impact: "Your generosity funds instrument repairs and resources for an entire school band, restoring the sound of music for dozens of students.",
      image: imageUrlsData.donate.donationLevels[4]?.cloudinaryUrl || ""
    },
    {
      amount: 1000,
      title: "Community Impact",
      description: "Sustains community programs",
      impact: "Your investment sustains community concerts and education programs, bringing the power of music to hundreds of students and families.",
      image: imageUrlsData.donate.donationLevels[5]?.cloudinaryUrl || ""
    }
  ]
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDonationLevelClick = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")

    // Smooth scroll to donor information section
    setTimeout(() => {
      if (donorInfoRef.current) {
        const elementPosition = donorInfoRef.current.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 100 // Add some offset from top

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  // Check for cancelled payment and amount parameter on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cancelled') === 'true') {
      setSubmitStatus('error');
      setErrorMessage('Payment was cancelled. Please try again.');
    }
    
    // Check if coming from founding-100 page - scroll to donor info
    const fromParam = urlParams.get('from');
    if (fromParam === 'founding100') {
      // Scroll to donor information section after a short delay
      setTimeout(() => {
        if (donorInfoRef.current) {
          const elementPosition = donorInfoRef.current.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - 100 // Add some offset from top

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 500);
      // Clean up URL params
      window.history.replaceState({}, '', '/donate');
    }
    
    // Check for amount parameter from other pages
    const amountParam = urlParams.get('amount');
    if (amountParam) {
      const amount = parseInt(amountParam);
      if (amount && donationLevels.some(level => level.amount === amount)) {
        setSelectedAmount(amount);
        setCustomAmount("");
        
        // Smooth scroll to donor information section after a short delay
        setTimeout(() => {
          if (donorInfoRef.current) {
            const elementPosition = donorInfoRef.current.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - 100 // Add some offset from top

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 500);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const amount = customAmount ? parseFloat(customAmount) : selectedAmount
    if (!amount || amount <= 0) {
      setSubmitStatus('error')
      setErrorMessage('Please enter a valid donation amount')
      setIsSubmitting(false)
      return
    }

    if (!formData.donorName || !formData.email) {
      setSubmitStatus('error')
      setErrorMessage('Please fill in all required fields')
      setIsSubmitting(false)
      return
    }

    try {
      const donationData = {
        donorName: formData.donorName,
        email: formData.email,
        phone: formData.phone,
        amount,
        donationType,
        paymentMethod: formData.paymentMethod,
        designation: formData.designation,
        isAnonymous: formData.isAnonymous,
        message: formData.message
      }

      const response = await donationAPI.createCheckoutSession(donationData)

      if (response.success && response.url) {
        // Store donation ID for potential status checking
        setDonationId(response.donationId)

        // Redirect to Stripe Checkout
        window.location.href = response.url
      } else {
        setSubmitStatus('error')
        setErrorMessage(response.message || 'Failed to create checkout session')
      }
    } catch (error) {
      console.error('Checkout session creation error:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-xs md:text-sm">
            <Link href="/" className="text-gray-900 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Donate</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Make a Difference</h1>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
              Your donation directly supports music education programs, instrument repairs, and community events that transform lives and build stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 text-xs md:text-sm text-gray-600">
              <div className="flex items-center">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-gray-900 mr-1 md:mr-2" />
                Secure Donation
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-gray-900 mr-1 md:mr-2" />
                Tax Deductible
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 md:h-5 md:w-5 text-gray-900 mr-1 md:mr-2" />
                100% Goes to Programs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Levels Section */}
      <section ref={donationLevelsRef} className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Choose Your Impact Level</h2>
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Click on any donation level below to instantly select that amount and proceed to donate. Each level represents a different impact on music education.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
              {donationLevels.map((level) => (
                <div
                  key={level.amount}
                  onClick={() => handleDonationLevelClick(level.amount)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-gray-900 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <Image
                        src={level.image}
                        alt={level.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <span className="text-2xl md:text-3xl font-bold text-gray-900">${level.amount}</span>
                        <Badge className="bg-gray-900 text-white group-hover:bg-gray-700 transition-colors text-xs md:text-sm">
                          {donationType === "monthly" ? "/month" : "one-time"}
                        </Badge>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-gray-700 transition-colors">
                        {level.title}
                      </h3>
                      <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm leading-relaxed">
                        {level.description}
                      </p>
                      <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                        {level.impact}
                      </p>
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-xs md:text-sm text-gray-500">Click to select</span>
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gray-900 group-hover:bg-gray-700 transition-colors flex items-center justify-center">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section ref={donationFormRef} className="py-2 md:py-4 lg:py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-6 md:py-8">
                <CardTitle className="text-2xl md:text-3xl font-bold mb-2">Complete Your Donation</CardTitle>
                <CardDescription className="text-gray-100 text-sm md:text-lg">
                  Your selected amount: <span className="font-bold text-white">${selectedAmount || customAmount}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 md:p-8">
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium text-sm md:text-base">Thank you for your donation! Your contribution will help make music education accessible to all. You'll receive a confirmation email shortly.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium text-sm md:text-base">Error: {errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Donation Type Toggle */}
                  <div className="flex justify-center mb-6 md:mb-8">
                    <div className="bg-gray-100 rounded-full p-1 flex">
                      <button
                        type="button"
                        onClick={() => setDonationType("one-time")}
                        className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base ${donationType === "one-time"
                          ? "bg-gray-900 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                          }`}
                      >
                        One-time
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("monthly")}
                        className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base ${donationType === "monthly"
                          ? "bg-gray-900 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                          }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4 text-center">
                      Selected {donationType === "monthly" ? "Monthly" : ""} Donation Level
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                      {donationLevels.map((level) => (
                        <button
                          key={level.amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(level.amount)
                            setCustomAmount("")
                          }}
                          className={`p-4 md:p-6 rounded-xl border-2 font-semibold transition-all text-left ${selectedAmount === level.amount && !customAmount
                            ? "border-gray-900 bg-gray-50 text-gray-700 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md"
                            }`}
                        >
                          <div className="flex items-center justify-between mb-1 md:mb-2">
                            <span className="text-xl md:text-2xl font-bold">${level.amount}</span>
                            {donationType === "monthly" && <span className="text-xs md:text-sm text-gray-500">/month</span>}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{level.title}</h4>
                          <p className="text-xs md:text-sm text-gray-600">{level.description}</p>
                        </button>
                      ))}
                    </div>

                    <div className="text-center">
                      <p className="text-gray-600 mb-2 md:mb-3 text-sm md:text-base">Or enter a custom amount:</p>
                      <div className="max-w-xs mx-auto relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value)
                            setSelectedAmount(0)
                          }}
                          className="pl-10 text-center text-base md:text-lg font-semibold rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Impact Display */}
                  <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl">
                    {(() => {
                      const amount = customAmount ? Number.parseInt(customAmount) : selectedAmount
                      const selectedLevel = donationLevels.find((level) => level.amount === amount)

                      if (selectedLevel && amount > 0) {
                        return (
                          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-lg flex-shrink-0 relative">
                              <Image
                                src={selectedLevel.image}
                                alt={`Impact for ${selectedLevel.title}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center md:text-left flex-1">
                              <h5 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{selectedLevel.title}</h5>
                              <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
                                {selectedLevel.impact}
                              </p>
                            </div>
                          </div>
                        )
                      } else if (amount > 0) {
                        // For custom amounts, find the closest level
                        const closestLevel = donationLevels.reduce((prev, curr) =>
                          Math.abs(curr.amount - amount) < Math.abs(prev.amount - amount) ? curr : prev
                        )
                        return (
                          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
                            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden shadow-lg flex-shrink-0 relative">
                              <Image
                                src={closestLevel.image}
                                alt={`Impact for $${amount}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-center md:text-left flex-1">
                              <h5 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Custom Impact</h5>
                              <p className="text-gray-700 leading-relaxed text-sm md:text-base lg:text-lg">
                                Your generous donation of <strong>${amount}</strong> will help provide music education resources and opportunities for students in need.
                              </p>
                            </div>
                          </div>
                        )
                      }
                      return <p className="text-center text-gray-600 text-sm md:text-base">Select a donation level or enter a custom amount to see your impact</p>
                    })()}
                  </div>

                  {/* Donor Information Form */}
                  <div ref={donorInfoRef} className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">Donor Information</h4>
                    <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Full Name <span className="text-red-500">*</span></label>
                        <Input
                          placeholder="Your full name"
                          className="rounded-lg text-sm md:text-base"
                          value={formData.donorName}
                          onChange={(e) => handleInputChange('donorName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Email Address <span className="text-red-500">*</span></label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className="rounded-lg text-sm md:text-base"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="rounded-lg text-sm md:text-base"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Message (Optional)</label>
                      <Input
                        placeholder="Share why you're donating or any special instructions"
                        className="rounded-lg text-sm md:text-base"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onChange={(e) => handleInputChange('isAnonymous', e.target.checked.toString())}
                        className="text-gray-900 focus:ring-gray-900"
                      />
                      <label htmlFor="anonymous" className="text-xs md:text-sm text-gray-700">
                        Make this donation anonymous
                      </label>
                    </div>
                  </div>

                  {/* Donation Summary */}
                  <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-6 md:mb-8">
                    <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Donation Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm md:text-base">
                        <span>Donation Type:</span>
                        <span className="font-medium capitalize">{donationType}</span>
                      </div>
                      <div className="flex justify-between text-sm md:text-base">
                        <span>Amount:</span>
                        <span className="font-medium">
                          ${customAmount || selectedAmount}
                          {donationType === "monthly" && "/month"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs md:text-sm text-gray-600">
                        <span>Processing Fee:</span>
                        <span>4% (covered by Harmony 4 All)</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold text-base md:text-lg">
                        <span>Total:</span>
                        <span className="text-gray-900">
                          ${customAmount || selectedAmount}
                          {donationType === "monthly" && "/month"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full relative overflow-hidden bg-black text-white py-3 md:py-4 text-sm md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group"
                    disabled={isSubmitting || (!selectedAmount && !customAmount)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {isSubmitting ? (
                      <span className="relative z-10">Processing...</span>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:animate-pulse" />
                        <span className="relative z-10">Complete {donationType === "monthly" ? "Monthly" : ""} Donation</span>
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-3 md:mt-4">
                    Your donation is secure and tax-deductible. EIN: 93-2460195
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Other Ways to Give</h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            There are many ways to support our mission and make a lasting impact in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="text-center shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-4 md:p-6">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                  <Gift className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900">Sponsor</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  Support our music education programs with a donation.
                </p>
                <Link href="/sponsors">
                  <Button variant="outline" className="rounded-full bg-transparent text-sm md:text-base">
                  Become a Sponsor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-4 md:p-6">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900">Volunteer</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  Share your time and skills to support our music education programs.
                </p>
                <Link href="/volunteer">
                  <Button variant="outline" className="rounded-full bg-transparent text-sm md:text-base">
                    Become a Volunteer
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 rounded-2xl hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-4 md:p-6">
                <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-3 md:mb-4">
                  <Calendar className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900">Planned Giving</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                  Create a lasting legacy through bequests, trusts, and other planned giving options.
                </p>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full bg-transparent text-sm md:text-base">
                    Plan Your Gift
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Every Gift Creates Futures That Sing</h2>
          <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
            Your gift turns possibility into music, sparking a lifetime of harmony-and together, we create futures that sing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-white/60 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              <span>Donate Today</span>
            </Button>
            <Link href="/get-involved">
              <Button
                size="lg"
                variant="outline"
                className="border-2 w-full border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full bg-transparent"
              >
                Other Ways to Help
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
