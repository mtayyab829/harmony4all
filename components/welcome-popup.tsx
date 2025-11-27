"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { X, Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { welcomePopupAPI } from '../lib/api'
import { imageUrlsData } from "@/lib/image-urls"

interface WelcomePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function WelcomePopup({ isOpen, onClose }: WelcomePopupProps) {
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
    
    // Clear previous errors
    setError("")
    setFieldErrors({
      firstName: "",
      lastName: "",
      email: "",
      cellNumber: "",
      agreeToTerms: "",
    })
    
    // Individual field validation
    const newFieldErrors = {
      firstName: "",
      lastName: "",
      email: "",
      cellNumber: "",
      agreeToTerms: "",
    }
    
    let hasErrors = false
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newFieldErrors.firstName = "First name is required"
      hasErrors = true
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newFieldErrors.lastName = "Last name is required"
      hasErrors = true
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newFieldErrors.email = "Email is required"
      hasErrors = true
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newFieldErrors.email = "Please enter a valid email address"
        hasErrors = true
      }
    }
    
    // Cell Number validation
    if (!formData.cellNumber.trim()) {
      newFieldErrors.cellNumber = "Cell number is required"
      hasErrors = true
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newFieldErrors.agreeToTerms = "Please agree to the terms and conditions"
      hasErrors = true
    }
    
    if (hasErrors) {
      setFieldErrors(newFieldErrors)
      return
    }
    
    try {
      setIsLoading(true)
      setError("")
      
      const result = await welcomePopupAPI.submitForm(formData)
      
      setSuccess(result.message)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        cellNumber: "",
        promotionalUpdates: true,
        agreeToTerms: true,
      })
      setFieldErrors({
        firstName: "",
        lastName: "",
        email: "",
        cellNumber: "",
        agreeToTerms: "",
      })
      setTimeout(() => {
        onClose()
        setSuccess("")
      }, 2000)
    } catch (error: any) {
      console.error("Form submission error:", error)
      setError(error.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 lg:p-4"> 
      <Card className="w-full h-full lg:w-full lg:max-w-xl lg:h-auto bg-white rounded-none lg:rounded-2xl shadow-2xl relative overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-1 sm:right-1 lg:top-4 lg:right-4 p-1 sm:p-2 hover:bg-gray-100 rounded-full z-10"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 sm:h-4 sm:w-4 md:h-6 md:w-6 text-gray-600" />
        </button>

        <CardContent className="p-4 sm:p-6 md:p-6">
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-6">
            <div className="flex items-center justify-center mb-2 sm:mb-3 md:mb-2">
              <Image 
                src={imageUrlsData.components.welcomePopup.logo.cloudinaryUrl}
                alt="Harmony 4 All Logo"
                width={391}
                height={144}
                className="w-full max-w-[180px] sm:max-w-[220px] lg:max-w-xs h-auto"
                priority
              />
            </div>
            <hr className="border-gray-300" />
          </div>

          {/* Title */}
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-gray-900 mb-4 sm:mb-5 lg:mb-6 leading-tight">
            Thank you for joining our mission and get a free gift!
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`w-full border-gray-300 rounded-md h-10 sm:h-11 lg:h-11 text-sm sm:text-base ${
                  fieldErrors.firstName ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.firstName && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {fieldErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`w-full border-gray-300 rounded-md h-10 sm:h-11 lg:h-11 text-sm sm:text-base ${
                  fieldErrors.lastName ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.lastName && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {fieldErrors.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full border-gray-300 rounded-md h-10 sm:h-11 lg:h-11 text-sm sm:text-base ${
                  fieldErrors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Cell Number <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                value={formData.cellNumber}
                onChange={(e) => handleInputChange("cellNumber", e.target.value)}
                placeholder="+13245667890"
                className={`w-full border-gray-300 rounded-md h-10 sm:h-11 lg:h-11 text-sm sm:text-base ${
                  fieldErrors.cellNumber ? "border-red-500 focus:border-red-500" : ""
                }`}
              />
              {fieldErrors.cellNumber && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {fieldErrors.cellNumber}
                </p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-3 pt-2 sm:pt-3">
              <label className="flex items-start space-x-2 sm:space-x-3 md:space-x-3">
                <input
                  type="checkbox"
                  checked={formData.promotionalUpdates}
                  onChange={(e) => handleInputChange("promotionalUpdates", e.target.checked)}
                  className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
                />
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed">Want to receive promotional updates</span>
              </label>

              <div>
                <label className="flex items-start space-x-2 sm:space-x-3 lg:space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                    className={`mt-1 h-4 w-4 sm:h-5 sm:w-5 text-black border-gray-300 rounded focus:ring-black flex-shrink-0 ${
                      fieldErrors.agreeToTerms ? "border-red-500" : ""
                    }`}
                  />
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
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

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 lg:p-3 bg-red-50 border border-red-200 rounded-lg mt-3 sm:mt-4 lg:mt-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm sm:text-base">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 lg:p-3 bg-green-50 border border-green-200 rounded-lg mt-3 sm:mt-4 lg:mt-3">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-green-800 text-sm sm:text-base">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white py-3 sm:py-4 lg:py-4 rounded-full font-medium mt-4 sm:mt-5 lg:mt-6 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base lg:text-base"
              disabled={!formData.agreeToTerms || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
