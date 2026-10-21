"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EmailInput } from '@/components/ui/email-input'
import { PhoneInput } from "@/components/ui/phone-input"
import { Loader2, AlertCircle } from "lucide-react"
import { rsvpAPI, type RsvpConfirmation, type RsvpEvent } from "@/lib/api"
import RSVPConfirmation from "@/components/rsvp-confirmation"
import RSVPEventAddress from "@/components/rsvp-event-address"
import { formatEventWhen } from "@/lib/rsvp-event"
import { getUSPhoneValidationError, formatUSPhoneForStorage } from "@/lib/us-phone"
import { getEmailValidationError } from "@/lib/email"

const MAX_GUESTS = 20

type RSVPFormProps = {
  // null when no event is open; the RSVP is then saved without an event
  event: RsvpEvent | null
}

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  cellNumber: "",
  guests: 1,
  promotionalUpdates: true,
  agreeToTerms: true,
}

const emptyErrors = {
  firstName: "",
  lastName: "",
  email: "",
  cellNumber: "",
  agreeToTerms: "",
}

function EventDetails({ event }: { event: RsvpEvent }) {
  const when = formatEventWhen(event)

  // Hidden on mobile/tablet so the RSVP form is the first thing visitors see
  return (
    <div className="hidden lg:block space-y-5">
      {event.flyer && !event.flyer.isPdf && (
        <a href={event.flyer.url} target="_blank" rel="noopener noreferrer" className="block">
          <img
            src={event.flyer.url}
            alt={`${event.title} flyer`}
            className="w-full rounded-2xl shadow-lg object-contain bg-white"
          />
        </a>
      )}
    </div>
  )
}

// Invitation shown above the form fields. Title, date, time and location come from the event in the admin;
// the rest of the copy is written for the 2026 Holiday Concert and should be updated for the next event.
function EventInvitation({ event }: { event: RsvpEvent }) {
  const when = formatEventWhen(event)

  return (
    <div className="text-center mb-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">{event.title}</h2>
      <p className="text-gray-600 leading-relaxed">
        Celebrate the season with <strong className="font-bold text-gray-900">Harmony 4 All</strong> through live
        music, warm company, and community connection. Stay afterward for refreshments and wine, with wine available
        to guests ages 21 and over.
      </p>

      {(when || event.location) && (
        <div className="space-y-4">
          {when && <p className="font-semibold text-gray-900">{when}</p>}
          {event.location && <RSVPEventAddress location={event.location} />}
        </div>
      )}

      <p className="text-sm text-gray-700">Free admission · Free parking · Wheelchair accessible</p>
      <p className="text-sm font-bold text-gray-900">The first 100 registered guests receive a gift bag.</p>
      <p className="text-gray-600">We'd love to welcome you! Please RSVP below and include everyone attending with you.</p>
    </div>
  )
}

export default function RSVPForm({ event }: RSVPFormProps) {
  const [formData, setFormData] = useState(emptyForm)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<(RsvpConfirmation & { message: string; guests: number; email: string }) | null>(null)
  const [fieldErrors, setFieldErrors] = useState(emptyErrors)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setFieldErrors(emptyErrors)

    const nextFieldErrors = { ...emptyErrors }
    let hasErrors = false

    if (!formData.firstName.trim()) {
      nextFieldErrors.firstName = "First name is required"
      hasErrors = true
    }

    if (!formData.lastName.trim()) {
      nextFieldErrors.lastName = "Last name is required"
      hasErrors = true
    }

    const emailError = getEmailValidationError(formData.email)
    if (emailError) {
      nextFieldErrors.email = emailError
      hasErrors = true
    }

    const cellNumberError = getUSPhoneValidationError(formData.cellNumber, { required: true })
    if (cellNumberError) {
      nextFieldErrors.cellNumber = cellNumberError
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
      const result = await rsvpAPI.submitForm({
        ...formData,
        eventId: event?._id,
        cellNumber: formatUSPhoneForStorage(formData.cellNumber),
      })
      setSuccess({
        message: result.message || "Thank you for your RSVP!",
        guests: result.guests || formData.guests,
        email: formData.email.trim(),
        rsvp: result.rsvp || null,
        eventLinks: result.eventLinks || null,
      })
      setFormData(emptyForm)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (submitError: any) {
      setError(submitError.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={`mx-auto grid gap-8 lg:items-start ${event ? "max-w-5xl lg:grid-cols-2" : "max-w-xl"}`}>
            {event && <EventDetails event={event} />}

            <Card className="w-full bg-white rounded-2xl shadow-2xl lg:sticky lg:top-24">
              <CardContent className="p-6">
                {success ? (
                  <RSVPConfirmation
                    {...success}
                    event={event}
                    onReset={() => setSuccess(null)}
                  />
                ) : (
                  <>
                    {event ? (
                      <EventInvitation event={event} />
                    ) : (
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">RSVP</h2>
                        <p className="text-gray-600">Let us know you're coming and how many people you're bringing.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            autoComplete="given-name"
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
                            autoComplete="family-name"
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
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <EmailInput
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
                        <PhoneInput
                          value={formData.cellNumber}
                          onValueChange={(value) => handleInputChange("cellNumber", value)}
                          className={fieldErrors.cellNumber ? "border-red-500 focus:border-red-500" : ""}
                        />
                        {fieldErrors.cellNumber && (
                          <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {fieldErrors.cellNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="rsvp-guests" className="block text-sm font-medium text-gray-700 mb-2">
                          How many people are coming (including you)? <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="rsvp-guests"
                          value={formData.guests}
                          onChange={(e) => handleInputChange("guests", Number(e.target.value))}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
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
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
