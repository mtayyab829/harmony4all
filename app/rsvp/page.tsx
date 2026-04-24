"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { rsvpAPI } from "@/lib/api"

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellNumber: "",
    promotionalUpdates: true,
    agreeToTerms: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellNumber: "",
    agreeToTerms: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setSuccess("")
    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      cellNumber: "",
      agreeToTerms: "",
    })

    const nextFieldErrors = {
      firstName: "",
      lastName: "",
      email: "",
      cellNumber: "",
      agreeToTerms: "",
    }

    let hasErrors = false

    if (!formData.firstName.trim()) {
      nextFieldErrors.firstName = "First name is required"
      hasErrors = true
    }

    if (!formData.lastName.trim()) {
      nextFieldErrors.lastName = "Last name is required"
      hasErrors = true
    }

    if (!formData.email.trim()) {
      nextFieldErrors.email = "Email is required"
      hasErrors = true
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        nextFieldErrors.email = "Please enter a valid email address"
        hasErrors = true
      }
    }

    if (!formData.cellNumber.trim()) {
      nextFieldErrors.cellNumber = "Cell number is required"
      hasErrors = true
    }

    if (!formData.agreeToTerms) {
      nextFieldErrors.agreeToTerms = "Please agree to the terms and conditions"
      hasErrors = true
    }

    if (hasErrors) {
      setFieldErrors(nextFieldErrors)
      return
    }

    try {
      setIsLoading(true)
      const result = await rsvpAPI.submitForm(formData)
      setSuccess(result.message || "Thank you for your RSVP!")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        cellNumber: "",
        promotionalUpdates: true,
        agreeToTerms: true,
      })

      setTimeout(() => {
        window.location.href = "/"
      }, 2000)

    } catch (submitError: any) {
      setError(submitError.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-900 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">RSVP</span>
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">RSVP Form</h1>
                <p className="text-gray-600">Submit your details and we will follow up with you soon.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={fieldErrors.firstName ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {fieldErrors.firstName && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={fieldErrors.lastName ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {fieldErrors.lastName && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {fieldErrors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cell Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    value={formData.cellNumber}
                    onChange={(e) => handleInputChange("cellNumber", e.target.value)}
                    placeholder="+13245667890"
                    className={fieldErrors.cellNumber ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {fieldErrors.cellNumber && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {fieldErrors.cellNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.promotionalUpdates}
                      onChange={(e) => handleInputChange("promotionalUpdates", e.target.checked)}
                      className="mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 leading-relaxed">
                      Want to receive promotional updates
                    </span>
                  </label>

                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                        className={`mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0 ${
                          fieldErrors.agreeToTerms ? "border-red-500" : ""
                        }`}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        By checking the box, you indicate that you've read our{" "}
                        <Link href="/privacy" className="text-black underline hover:text-gray-700">
                          Privacy Policy
                        </Link>{" "}
                        and agree to our{" "}
                        <Link href="/terms" className="text-black underline hover:text-gray-700">
                          Terms and Use
                        </Link>
                      </span>
                    </label>
                    {fieldErrors.agreeToTerms && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {fieldErrors.agreeToTerms}
                      </p>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-green-800 text-sm">{success}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.agreeToTerms || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit RSVP"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
