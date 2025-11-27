"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, HandHeart, CheckCircle, Phone, Loader2, AlertCircle } from "lucide-react"
import { volunteerAPI } from "../../lib/api"
import { imageUrlsData } from "@/lib/image-urls"

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    dateOfBirth: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    availability: '',
    interests: [] as string[],
    experience: '',
    motivation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const requirements = [
    "Must be 18 years or older",
    "Complete background check",
    "Attend orientation session",
    "Commit to minimum 3-month period",
    "Reliable transportation",
    "Professional references",
  ]

  const benefits = [
    "Make a meaningful difference",
    "Gain valuable experience",
    "Build professional network",
    "Flexible scheduling",
    "Training and support provided",
    "Recognition and appreciation events",
  ]

  const interestOptions = [
    { value: 'music-education', label: 'Music Education' },
    { value: 'instrument-repair', label: 'Instrument Repair' },
    { value: 'donation-pickup', label: 'Donation Pickup' },
    { value: 'events', label: 'Events & Performances' },
    { value: 'administration', label: 'Administration' },
    { value: 'other', label: 'Other' }
  ]

  const availabilityOptions = [
    { value: 'weekdays', label: 'Weekdays' },
    { value: 'weekends', label: 'Weekends' },
    { value: 'both', label: 'Both Weekdays & Weekends' },
    { value: 'flexible', label: 'Flexible' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleEmergencyContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }))
  }

  const handleInterestChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(interest => interest !== value)
        : [...prev.interests, value]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || 
        !formData.phone.trim() || !formData.dateOfBirth || !formData.availability || 
        !formData.experience.trim() || !formData.motivation.trim()) {
      setErrorMessage('Please fill in all required fields')
      setSubmitStatus('error')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const result = await volunteerAPI.submitApplication(formData)
      
      if (result.success) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: { street: '', city: '', state: '', zipCode: '' },
          dateOfBirth: '',
          emergencyContact: { name: '', relationship: '', phone: '' },
          availability: '',
          interests: [],
          experience: '',
          motivation: ''
        })
        
        // Reset success status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.message || 'Failed to submit application')
      }
    } catch (error: any) {
      setSubmitStatus('error')
      setErrorMessage(error.response?.data?.message || 'Network error. Please try again.')
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
            <Link href="/" className="text-teal-600 hover:text-teal-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/get-involved" className="text-teal-600 hover:text-teal-700">
              Get Involved
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Volunteer</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('${imageUrlsData.volunteer.heroBackground.cloudinaryUrl}')`
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
         <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg leading-tight">Volunteer With Us</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 text-center max-w-3xl drop-shadow-lg leading-relaxed px-2">
            Join our dedicated team of volunteers and make a direct impact in the lives of students through music education. Your time and skills can help create lasting change.
          </p>
         </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-black text-white text-center py-4 sm:py-6 md:py-8">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Volunteer Application</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm md:text-lg">
                  Start your journey as a <span className="font-bold">Harmony 4 All</span> volunteer
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 md:p-8">
                {submitStatus === 'success' && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                      <p className="text-green-800 font-medium text-sm sm:text-base">Thank you! Your volunteer application has been submitted successfully. We'll contact you soon.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                      <p className="text-red-800 font-medium text-sm sm:text-base">{errorMessage}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">First Name <span className="text-red-500">*</span></label>
                        <Input
                          placeholder="Your first name"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Last Name <span className="text-red-500">*</span></label>
                        <Input
                          placeholder="Your last name"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email <span className="text-red-500">*</span></label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone <span className="text-red-500">*</span></label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Address</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <Input
                        placeholder="Street Address"
                        className="rounded-lg text-sm sm:text-base"
                        value={formData.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        <Input
                          placeholder="City"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                        />
                        <Input
                          placeholder="State"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.address.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                        />
                        <Input
                          placeholder="ZIP Code"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.address.zipCode}
                          onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Date of Birth <span className="text-red-500">*</span></label>
                    <Input
                      type="date"
                      className="rounded-lg text-sm sm:text-base"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Name</label>
                        <Input
                          placeholder="Emergency contact name"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.emergencyContact.name}
                          onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Relationship</label>
                        <Input
                          placeholder="Relationship to you"
                          className="rounded-lg text-sm sm:text-base"
                          value={formData.emergencyContact.relationship}
                          onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone</label>
                      <Input
                        type="tel"
                        placeholder="Emergency contact phone"
                        className="rounded-lg text-sm sm:text-base"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Availability <span className="text-red-500">*</span></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {availabilityOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="availability"
                            value={option.value}
                            checked={formData.availability === option.value}
                            onChange={(e) => handleInputChange('availability', e.target.value)}
                            className="text-black focus:ring-black"
                            required
                          />
                          <span className="text-gray-700 text-sm sm:text-base">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Areas of Interest</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {interestOptions.map((option) => (
                        <label key={option.value} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            value={option.value}
                            checked={formData.interests.includes(option.value)}
                            onChange={(e) => handleInterestChange(e.target.value)}
                            className="text-black focus:ring-black"
                          />
                          <span className="text-gray-700 text-sm sm:text-base">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Relevant Experience <span className="text-red-500">*</span></h3>
                    <Textarea
                      placeholder="Tell us about any relevant experience, skills, or qualifications you have..."
                      className="rounded-lg min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      required
                    />
                  </div>

                  {/* Motivation */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">Why do you want to volunteer with us? <span className="text-red-500">*</span></h3>
                    <Textarea
                      placeholder="Share what motivates you to volunteer with Harmony 4 All..."
                      className="rounded-lg min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black hover:bg-gray-800 text-white py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <HandHeart className="mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements & Benefits */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                  <CheckCircle className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 md:space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-black rounded-full mt-1 sm:mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs sm:text-sm md:text-base">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center">
                  <Heart className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 md:space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-black rounded-full mt-1 sm:mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-xs sm:text-sm md:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8 opacity-90 px-2">
            Questions about volunteering? We're here to help you find the perfect opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-black w-full hover:bg-gray-100 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full">
                <Phone className="mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                Contact Us
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white w-full hover:bg-white hover:text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full bg-transparent"
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
