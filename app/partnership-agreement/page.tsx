"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  Music,
  ArrowLeft,
  ArrowRight,
  Home,
} from "lucide-react"
import { partnershipAPI } from "@/lib/api"

// ---------- Option lists (mirrors the printed "Community Performance Partnership" PDF) ----------

const SERVICE_OPTIONS = [
  "Background music",
  "Featured live performance",
  "Youth musician performance",
  "Community music activation",
  "Tabling with live music",
  "Opening / closing or ceremonial music",
  "Outreach table with live music",
]

const AUDIENCE_OPTIONS = [
  "Children / elementary students",
  "Middle school students",
  "Teens / high school students",
  "College students / young adults",
  "Families",
  "Parents / caregivers",
  "Senior citizens / older adults",
  "Veterans",
  "People with disabilities",
  "Immigrant communities",
  "Low-income / under-resourced neighbors",
  "Faith-based community",
  "Cultural community group",
  "Local residents / general public",
  "Elected officials / government reps",
  "Community leaders / nonprofit partners",
  "Private / invited guests only",
]

const PREVIEW_OPTIONS = [
  "Photo(s) of the performance area",
  "Photo(s) of where the outreach table would go",
  "Photo(s) of possible camera spots",
  "A simple floor plan or layout",
  "A quick walkthrough by phone or video",
  "An in-person walkthrough, if helpful",
  "Written confirmation of the exact spots once known",
]

const SETTING_NOTE_OPTIONS = [
  "Alcohol will be served",
  "Smoking or vaping may be present",
  "Food / drinks near the performance area",
  "Food / drinks near our outreach table",
  "Food / drinks near camera or media gear",
  "Loud amplified sound from others",
  "Dancing may happen near musicians",
  "The space may get crowded",
  "Ceremonial or speaking program",
  "Security concerns are possible",
  "None of the above",
]

type ContactInfo = { name: string; title: string; phone: string; email: string }
type DateChoice = { date: string; eventRunsFrom: string; eventRunsTo: string; playAround: string }
type Signature = { name: string; title: string; date: string }

const emptyContact = (): ContactInfo => ({ name: "", title: "", phone: "", email: "" })
const emptyChoice = (): DateChoice => ({ date: "", eventRunsFrom: "", eventRunsTo: "", playAround: "" })

const todayISO = () => new Date().toISOString().slice(0, 10)

const initialFormData = {
  eventName: "",
  location: "",
  expectedAttendance: "",
  setting: "",
  audiencePhrase: "",
  backupDate2: "",
  backupDate3: "",

  organizerIsVenue: "",
  organizer: emptyContact(),
  venueHost: emptyContact(),

  servicesRequested: [] as string[],
  otherService: "",
  purposeOfEvent: "",

  firstChoice: emptyChoice(),
  secondChoice: emptyChoice(),
  thirdChoice: emptyChoice(),

  arriveSetupBy: "",
  wePlay: "",
  weFinish: "",
  packedOutBy: "",

  audienceTypes: [] as string[],
  otherAudienceType: "",
  ageRange: "",
  audienceFlow: "",
  communityNotes: "",

  previewItems: [] as string[],

  chairsForMusicians: "",
  chairsForMusiciansCount: "",
  chairsForVolunteers: "",
  chairsForVolunteersCount: "",
  outreachTableProvider: "",
  powerOutlet: "",
  powerOutletLocation: "",
  amplifiedSound: "",
  bannerFloorSpace: "",
  backdropRoom: "",
  outreachTableLocation: "",
  outreachTableLocationOther: "",

  parkingLoadingNotes: "",
  entryInstructions: "",
  dayOfContactName: "",
  dayOfContactPhone: "",

  breakNotesFood: "",

  eventCompensationType: "",
  otherCompensationType: "",
  compensationAmount: "",
  compensationDueBy: "",
  compensationHowPaid: "",

  permitsConfirmed: false,

  photoVideoSensitivities: "",

  goNoGoTime: "",
  weatherBackupPlan: "",

  settingNotes: [] as string[],
  otherSettingNote: "",

  accessibilityNotes: "",

  organizerSignature: { name: "", title: "", date: todayISO() } as Signature,
  venueHostSignature: { name: "", title: "", date: "" } as Signature,
  agreeToTerms: false,
}

type FormData = typeof initialFormData

// ---------- Multi-step wizard config ----------

const STEPS = [
  { title: "Event Basics", short: "Basics" },
  { title: "The Performance", short: "Performance" },
  { title: "Your Audience", short: "Audience" },
  { title: "On-Site Logistics", short: "Logistics" },
  { title: "Agreement Details", short: "Agreement" },
  { title: "Sign & Submit", short: "Sign" },
]

const LAST_STEP = STEPS.length - 1

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Which step a given required-field error key lives on, so we can jump straight to it.
const STEP_FOR_FIELD: Record<string, number> = {
  eventName: 0,
  location: 0,
  "organizer.name": 0,
  "organizer.phone": 0,
  "organizer.email": 0,
  "organizerSignature.name": LAST_STEP,
  "organizerSignature.date": LAST_STEP,
  agreeToTerms: LAST_STEP,
}

// Only steps with required fields need to block "Continue" — everything else is optional detail.
const STEP_VALIDATORS: Record<number, (d: FormData) => Record<string, string>> = {
  0: (d) => {
    const errs: Record<string, string> = {}
    if (!d.eventName.trim()) errs.eventName = "Event name is required"
    if (!d.location.trim()) errs.location = "Location / address is required"
    if (!d.organizer.name.trim()) errs["organizer.name"] = "Contact name is required"
    if (!d.organizer.phone.trim()) errs["organizer.phone"] = "Phone is required"
    if (!d.organizer.email.trim()) {
      errs["organizer.email"] = "Email is required"
    } else if (!EMAIL_REGEX.test(d.organizer.email)) {
      errs["organizer.email"] = "Please enter a valid email address"
    }
    return errs
  },
}

// ---------- Draft autosave (localStorage) ----------

const DRAFT_KEY = "h4a-partnership-agreement-draft-v1"
const DRAFT_TTL_MS = 1000 * 60 * 60 * 24 * 14 // 14 days

type Draft = { savedAt: number; formData: FormData; step: number; furthestStep: number }

function loadDraft(): Draft | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Draft
    if (!parsed?.formData || typeof parsed.savedAt !== "number") return null
    if (Date.now() - parsed.savedAt > DRAFT_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function saveDraft(draft: Omit<Draft, "savedAt">) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...draft, savedAt: Date.now() }))
  } catch {
    // ignore storage errors (private browsing, quota, etc.)
  }
}

function clearDraft() {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(DRAFT_KEY)
  } catch {
    // ignore
  }
}

// ---------- small presentational helpers ----------

function SectionCard({
  number,
  title,
  description,
  children,
}: {
  number?: string
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm border">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {number ? <span className="text-gray-400 mr-2">{number}</span> : null}
            {title}
          </h2>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        <div className="space-y-4">{children}</div>
      </CardContent>
    </Card>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  )
}

function CheckboxGrid({
  options,
  selected,
  onToggle,
  columns = 2,
}: {
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  columns?: 1 | 2
}) {
  return (
    <div className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {options.map((option) => (
        <label key={option} className="flex items-start gap-2.5 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
            className="mt-0.5 h-4 w-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

function RadioPills({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-3.5 py-2 rounded-full text-sm border transition-colors ${
              active
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function Stepper({
  steps,
  currentStep,
  furthestStep,
  onStepClick,
}: {
  steps: { title: string; short: string }[]
  currentStep: number
  furthestStep: number
  onStepClick: (index: number) => void
}) {
  const progressPct = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 100
  return (
    <nav aria-label="Form progress">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-semibold text-gray-900" aria-live="polite">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
        </span>
        <span className="text-xs text-gray-400">{Math.round(progressPct)}% complete</span>
      </div>
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-black rounded-full transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="hidden sm:flex justify-between mt-2.5">
        {steps.map((s, i) => {
          const reachable = i <= furthestStep
          const isCurrent = i === currentStep
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => reachable && onStepClick(i)}
              disabled={!reachable}
              aria-current={isCurrent ? "step" : undefined}
              className={`text-xs px-1 py-0.5 rounded ${
                isCurrent
                  ? "text-black font-semibold"
                  : reachable
                    ? "text-gray-500 hover:text-gray-800 cursor-pointer hover:underline underline-offset-2"
                    : "text-gray-300 cursor-not-allowed"
              }`}
            >
              {s.short}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default function PartnershipAgreementPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [step, setStep] = useState(0)
  const [furthestStep, setFurthestStep] = useState(0)
  const [draftRestored, setDraftRestored] = useState(false)
  const hasCheckedDraft = useRef(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  // Restore a saved draft once, right after mount (client-only, so it never fights hydration).
  useEffect(() => {
    if (hasCheckedDraft.current) return
    hasCheckedDraft.current = true
    const draft = loadDraft()
    if (draft) {
      setFormData(draft.formData)
      setStep(draft.step)
      setFurthestStep(draft.furthestStep)
      setDraftRestored(true)
    }
  }, [])

  // Autosave the draft as the user works, skipping the untouched initial state.
  useEffect(() => {
    if (success) return
    const isUntouched = step === 0 && furthestStep === 0 && JSON.stringify(formData) === JSON.stringify(initialFormData)
    if (isUntouched) return
    const timeout = setTimeout(() => saveDraft({ formData, step, furthestStep }), 400)
    return () => clearTimeout(timeout)
  }, [formData, step, furthestStep, success])

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field as string]) {
      setFieldErrors((prev) => ({ ...prev, [field as string]: "" }))
    }
  }

  const updateNested = <G extends "organizer" | "venueHost" | "firstChoice" | "secondChoice" | "thirdChoice" | "organizerSignature" | "venueHostSignature">(
    group: G,
    field: keyof FormData[G],
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [group]: { ...(prev[group] as any), [field]: value } }))
    const key = `${group}.${String(field)}`
    if (fieldErrors[key]) setFieldErrors((prev) => ({ ...prev, [key]: "" }))
  }

  const toggleArrayValue = (field: "servicesRequested" | "audienceTypes" | "previewItems" | "settingNotes", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}

    if (!formData.eventName.trim()) errs.eventName = "Event name is required"
    if (!formData.location.trim()) errs.location = "Location / address is required"
    if (!formData.organizer.name.trim()) errs["organizer.name"] = "Contact name is required"
    if (!formData.organizer.phone.trim()) errs["organizer.phone"] = "Phone is required"
    if (!formData.organizer.email.trim()) {
      errs["organizer.email"] = "Email is required"
    } else if (!EMAIL_REGEX.test(formData.organizer.email)) {
      errs["organizer.email"] = "Please enter a valid email address"
    }
    if (!formData.organizerSignature.name.trim()) errs["organizerSignature.name"] = "Please type your full name as your signature"
    if (!formData.organizerSignature.date.trim()) errs["organizerSignature.date"] = "Date is required"
    if (!formData.agreeToTerms) errs.agreeToTerms = "Please confirm you've read and agree to this partnership agreement"

    setFieldErrors(errs)
    return errs
  }

  const scrollToFirstError = () => {
    requestAnimationFrame(() => {
      const el = document.querySelector("[data-error='true']")
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }

  const goToStep = (target: number) => {
    setStep(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNext = () => {
    const errs = STEP_VALIDATORS[step]?.(formData) ?? {}
    if (Object.keys(errs).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...errs }))
      setError("Please fill in the required fields highlighted below.")
      scrollToFirstError()
      return
    }
    setError("")
    const nextStep = Math.min(step + 1, LAST_STEP)
    setFurthestStep((f) => Math.max(f, nextStep))
    goToStep(nextStep)
  }

  const handleBack = () => {
    setError("")
    goToStep(Math.max(step - 1, 0))
  }

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    const target = e.target as HTMLElement
    if (target.tagName === "TEXTAREA") return
    if (step < LAST_STEP) {
      e.preventDefault()
      handleNext()
    }
  }

  const dismissDraftBanner = () => setDraftRestored(false)

  const startOver = () => {
    setFormData(initialFormData)
    setFieldErrors({})
    setError("")
    setFurthestStep(0)
    setStep(0)
    setDraftRestored(false)
    clearDraft()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setError("Please fill in the required fields highlighted below.")
      const targetStep = STEP_FOR_FIELD[Object.keys(errs)[0]] ?? 0
      if (targetStep !== step) {
        setFurthestStep((f) => Math.max(f, targetStep))
        goToStep(targetStep)
      }
      scrollToFirstError()
      return
    }

    try {
      setIsLoading(true)
      await partnershipAPI.submitForm(formData)
      clearDraft()
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (submitError: any) {
      setError(
        submitError?.response?.data?.message ||
          "Something went wrong submitting your form. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">You're all set!</h1>
                <p className="text-gray-600 mb-6">
                  Thank you! Your Community Performance Partnership form has been submitted successfully.
                </p>
                <Button asChild className="rounded-full bg-black hover:bg-gray-800 text-white">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go to Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Music className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">Harmony 4 All</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Community Performance Partnership</h1>
            <p className="text-gray-600">
              We're so glad you've invited Harmony 4 All to be part of your event. Fill out this friendly agreement
              online and we'll take care of the rest &mdash; it goes straight to our team and you'll get a
              copy for your own records too. Nothing is locked in until we send written confirmation.
            </p>
          </div>

          {draftRestored && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-blue-300 bg-blue-50 px-4 py-3">
                <p className="text-sm text-blue-800">We picked up where you left off on a saved draft.</p>
                <div className="flex gap-2 flex-shrink-0">
                  <Button type="button" variant="ghost" size="sm" className="text-blue-800 hover:bg-blue-100" onClick={dismissDraftBanner}>
                    Got it
                  </Button>
                  <Button type="button" variant="outline" size="sm" className="border-blue-300 text-blue-800 hover:bg-blue-100" onClick={startOver}>
                    Start over
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto mb-6">
            <Stepper steps={STEPS} currentStep={step} furthestStep={furthestStep} onStepClick={goToStep} />
          </div>

          <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="max-w-3xl mx-auto space-y-6">
            {step === 0 && (
              <>
                <SectionCard number="&#9733;" title="At a Glance">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Event name</FieldLabel>
                      <Input
                        value={formData.eventName}
                        onChange={(e) => update("eventName", e.target.value)}
                        data-error={!!fieldErrors.eventName}
                        className={fieldErrors.eventName ? "border-red-500" : ""}
                      />
                      {fieldErrors.eventName && <FieldError message={fieldErrors.eventName} />}
                    </div>
                    <div>
                      <FieldLabel>Expected attendance</FieldLabel>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={formData.expectedAttendance}
                        onChange={(e) => update("expectedAttendance", e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel required>Location / address</FieldLabel>
                      <Input
                        autoComplete="street-address"
                        value={formData.location}
                        onChange={(e) => update("location", e.target.value)}
                        data-error={!!fieldErrors.location}
                        className={fieldErrors.location ? "border-red-500" : ""}
                      />
                      {fieldErrors.location && <FieldError message={fieldErrors.location} />}
                    </div>
                    <div>
                      <FieldLabel>Who's coming (audience in a phrase)</FieldLabel>
                      <Input
                        value={formData.audiencePhrase}
                        onChange={(e) => update("audiencePhrase", e.target.value)}
                        placeholder="e.g. families with young kids"
                      />
                    </div>
                    <div>
                      <FieldLabel>Setting</FieldLabel>
                      <RadioPills
                        name="setting"
                        value={formData.setting}
                        onChange={(v) => update("setting", v)}
                        options={[
                          { value: "indoor", label: "Indoor" },
                          { value: "outdoor", label: "Outdoor" },
                          { value: "both", label: "Both" },
                        ]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Backup date &mdash; 2nd choice</FieldLabel>
                      <Input type="date" value={formData.backupDate2} onChange={(e) => update("backupDate2", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Backup date &mdash; 3rd choice</FieldLabel>
                      <Input type="date" value={formData.backupDate3} onChange={(e) => update("backupDate3", e.target.value)} />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard number="1" title="Who's Part of This">
                  <div>
                    <FieldLabel>Is the Event Organizer also the venue?</FieldLabel>
                    <RadioPills
                      name="organizerIsVenue"
                      value={formData.organizerIsVenue}
                      onChange={(v) => update("organizerIsVenue", v)}
                      options={[
                        { value: "yes", label: "Yes — hosting in our own space" },
                        { value: "no", label: "No — a separate Venue Host runs the space" },
                      ]}
                    />
                  </div>

                  <div className="pt-2">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Event Organizer &mdash; the office, group, or person hosting the event</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>Contact name</FieldLabel>
                        <Input
                          autoComplete="name"
                          value={formData.organizer.name}
                          onChange={(e) => updateNested("organizer", "name", e.target.value)}
                          data-error={!!fieldErrors["organizer.name"]}
                          className={fieldErrors["organizer.name"] ? "border-red-500" : ""}
                        />
                        {fieldErrors["organizer.name"] && <FieldError message={fieldErrors["organizer.name"]} />}
                      </div>
                      <div>
                        <FieldLabel>Title</FieldLabel>
                        <Input
                          autoComplete="organization-title"
                          value={formData.organizer.title}
                          onChange={(e) => updateNested("organizer", "title", e.target.value)}
                        />
                      </div>
                      <div>
                        <FieldLabel required>Phone</FieldLabel>
                        <Input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={formData.organizer.phone}
                          onChange={(e) => updateNested("organizer", "phone", e.target.value)}
                          data-error={!!fieldErrors["organizer.phone"]}
                          className={fieldErrors["organizer.phone"] ? "border-red-500" : ""}
                        />
                        {fieldErrors["organizer.phone"] && <FieldError message={fieldErrors["organizer.phone"]} />}
                      </div>
                      <div>
                        <FieldLabel required>Email</FieldLabel>
                        <Input
                          type="email"
                          autoComplete="email"
                          value={formData.organizer.email}
                          onChange={(e) => updateNested("organizer", "email", e.target.value)}
                          data-error={!!fieldErrors["organizer.email"]}
                          className={fieldErrors["organizer.email"] ? "border-red-500" : ""}
                        />
                        {fieldErrors["organizer.email"] && <FieldError message={fieldErrors["organizer.email"]} />}
                      </div>
                    </div>
                  </div>

                  {formData.organizerIsVenue !== "yes" && (
                    <div className="pt-2">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Venue Host &mdash; whoever's responsible for the physical space (only if different from the Organizer)</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel>Contact name</FieldLabel>
                          <Input autoComplete="name" value={formData.venueHost.name} onChange={(e) => updateNested("venueHost", "name", e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Title</FieldLabel>
                          <Input autoComplete="organization-title" value={formData.venueHost.title} onChange={(e) => updateNested("venueHost", "title", e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Phone</FieldLabel>
                          <Input type="tel" inputMode="tel" autoComplete="tel" value={formData.venueHost.phone} onChange={(e) => updateNested("venueHost", "phone", e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Email</FieldLabel>
                          <Input type="email" autoComplete="email" value={formData.venueHost.email} onChange={(e) => updateNested("venueHost", "email", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}
                </SectionCard>
              </>
            )}

            {step === 1 && (
              <>
                <SectionCard number="3" title="What We'll Do Together" description="You've invited us to provide (check all that apply)">
                  <CheckboxGrid
                    options={SERVICE_OPTIONS}
                    selected={formData.servicesRequested}
                    onToggle={(v) => toggleArrayValue("servicesRequested", v)}
                  />
                  <div>
                    <FieldLabel>Other</FieldLabel>
                    <Input value={formData.otherService} onChange={(e) => update("otherService", e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Purpose of the event</FieldLabel>
                    <Textarea value={formData.purposeOfEvent} onChange={(e) => update("purposeOfEvent", e.target.value)} rows={3} />
                  </div>
                </SectionCard>

                <SectionCard number="4" title="Picking the Day" description="Share up to three date options in order of preference">
                  {(["firstChoice", "secondChoice", "thirdChoice"] as const).map((choiceKey, idx) => (
                    <div key={choiceKey} className="border rounded-xl p-4">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">{["First", "Second", "Third"][idx]} choice</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <FieldLabel>Date</FieldLabel>
                          <Input
                            type="date"
                            value={formData[choiceKey].date}
                            onChange={(e) => updateNested(choiceKey, "date", e.target.value)}
                          />
                        </div>
                        <div>
                          <FieldLabel>We'd play around</FieldLabel>
                          <Input
                            type="time"
                            value={formData[choiceKey].playAround}
                            onChange={(e) => updateNested(choiceKey, "playAround", e.target.value)}
                          />
                        </div>
                        <div>
                          <FieldLabel>Event runs from</FieldLabel>
                          <Input
                            type="time"
                            value={formData[choiceKey].eventRunsFrom}
                            onChange={(e) => updateNested(choiceKey, "eventRunsFrom", e.target.value)}
                          />
                        </div>
                        <div>
                          <FieldLabel>Event runs to</FieldLabel>
                          <Input
                            type="time"
                            value={formData[choiceKey].eventRunsTo}
                            onChange={(e) => updateNested(choiceKey, "eventRunsTo", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500">
                    We ask that this agreement be completed at least 30 days before the event whenever possible. Closer than
                    that? Reach out anyway &mdash; we'll do our best.
                  </p>
                </SectionCard>

                <SectionCard number="5" title="Getting In & Getting Out" description="We ask for about 90 minutes before we play to set up, and 45 minutes after to break down">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>We arrive / set up by</FieldLabel>
                      <Input type="time" value={formData.arriveSetupBy} onChange={(e) => update("arriveSetupBy", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>We play</FieldLabel>
                      <Input type="time" value={formData.wePlay} onChange={(e) => update("wePlay", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>We finish</FieldLabel>
                      <Input type="time" value={formData.weFinish} onChange={(e) => update("weFinish", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Packed up & out by</FieldLabel>
                      <Input type="time" value={formData.packedOutBy} onChange={(e) => update("packedOutBy", e.target.value)} />
                    </div>
                  </div>
                </SectionCard>
              </>
            )}

            {step === 2 && (
              <>
                <SectionCard number="6" title="Who We'll Be Playing For" description="This helps us choose the right music, tone, setup, and outreach">
                  <CheckboxGrid
                    options={AUDIENCE_OPTIONS}
                    selected={formData.audienceTypes}
                    onToggle={(v) => toggleArrayValue("audienceTypes", v)}
                  />
                  <div>
                    <FieldLabel>Other</FieldLabel>
                    <Input value={formData.otherAudienceType} onChange={(e) => update("otherAudienceType", e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Estimated age range</FieldLabel>
                    <Input value={formData.ageRange} onChange={(e) => update("ageRange", e.target.value)} placeholder="e.g. 5–12 years old" />
                  </div>
                  <div>
                    <FieldLabel>How will folks move through the space?</FieldLabel>
                    <RadioPills
                      name="audienceFlow"
                      value={formData.audienceFlow}
                      onChange={(v) => update("audienceFlow", v)}
                      options={[
                        { value: "mostly-seated", label: "Mostly seated" },
                        { value: "mostly-standing", label: "Mostly standing" },
                        { value: "walking-around", label: "Walking around / tabling-style" },
                        { value: "mixed", label: "Mixed" },
                        { value: "not-sure-yet", label: "Not sure yet" },
                      ]}
                    />
                  </div>
                  <div>
                    <FieldLabel>Anything about your community we should know to prepare respectfully?</FieldLabel>
                    <Textarea value={formData.communityNotes} onChange={(e) => update("communityNotes", e.target.value)} rows={3} />
                  </div>
                </SectionCard>

                <SectionCard number="8" title="A Peek at the Space Beforehand" description="Before the day, could you share any of these? (check what you'll send)">
                  <CheckboxGrid
                    options={PREVIEW_OPTIONS}
                    selected={formData.previewItems}
                    onToggle={(v) => toggleArrayValue("previewItems", v)}
                    columns={1}
                  />
                </SectionCard>
              </>
            )}

            {step === 3 && (
              <>
                <SectionCard number="9" title="What We Bring & What We'll Need" description="Here's the quick who-brings-what">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Chairs for musicians</FieldLabel>
                      <RadioPills
                        name="chairsForMusicians"
                        value={formData.chairsForMusicians}
                        onChange={(v) => update("chairsForMusicians", v)}
                        options={[
                          { value: "you", label: "You" },
                          { value: "us", label: "Us" },
                          { value: "not-needed", label: "Not needed" },
                        ]}
                      />
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        className="mt-2"
                        placeholder="How many?"
                        value={formData.chairsForMusiciansCount}
                        onChange={(e) => update("chairsForMusiciansCount", e.target.value)}
                      />
                    </div>
                    <div>
                      <FieldLabel>Chairs for our table volunteers</FieldLabel>
                      <RadioPills
                        name="chairsForVolunteers"
                        value={formData.chairsForVolunteers}
                        onChange={(v) => update("chairsForVolunteers", v)}
                        options={[
                          { value: "you", label: "You" },
                          { value: "us", label: "Us" },
                          { value: "not-needed", label: "Not needed" },
                        ]}
                      />
                      <Input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        className="mt-2"
                        placeholder="How many?"
                        value={formData.chairsForVolunteersCount}
                        onChange={(e) => update("chairsForVolunteersCount", e.target.value)}
                      />
                    </div>
                    <div>
                      <FieldLabel>One 6-ft outreach table</FieldLabel>
                      <RadioPills
                        name="outreachTableProvider"
                        value={formData.outreachTableProvider}
                        onChange={(v) => update("outreachTableProvider", v)}
                        options={[
                          { value: "you", label: "You" },
                          { value: "us", label: "Us" },
                          { value: "not-needed", label: "Not needed" },
                        ]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Power outlet near us</FieldLabel>
                      <RadioPills
                        name="powerOutlet"
                        value={formData.powerOutlet}
                        onChange={(v) => update("powerOutlet", v)}
                        options={[
                          { value: "available", label: "Available" },
                          { value: "not-available", label: "Not available" },
                          { value: "not-needed", label: "Not needed" },
                        ]}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <FieldLabel>If there's a power outlet, where is it?</FieldLabel>
                      <Input value={formData.powerOutletLocation} onChange={(e) => update("powerOutletLocation", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Amplified sound</FieldLabel>
                      <RadioPills
                        name="amplifiedSound"
                        value={formData.amplifiedSound}
                        onChange={(v) => update("amplifiedSound", v)}
                        options={[
                          { value: "fine", label: "Fine" },
                          { value: "keep-acoustic", label: "Please keep acoustic" },
                          { value: "lets-discuss", label: "Let's discuss" },
                        ]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Floor space for our banner by the table</FieldLabel>
                      <RadioPills
                        name="bannerFloorSpace"
                        value={formData.bannerFloorSpace}
                        onChange={(v) => update("bannerFloorSpace", v)}
                        options={[
                          { value: "fine", label: "Fine" },
                          { value: "limited", label: "Limited" },
                          { value: "lets-discuss", label: "Let's discuss" },
                        ]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Room for our branded backdrop</FieldLabel>
                      <RadioPills
                        name="backdropRoom"
                        value={formData.backdropRoom}
                        onChange={(v) => update("backdropRoom", v)}
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "limited", label: "Limited" },
                          { value: "not-possible", label: "Not possible this time" },
                        ]}
                      />
                    </div>
                    <div>
                      <FieldLabel>Where would you like our outreach table?</FieldLabel>
                      <RadioPills
                        name="outreachTableLocation"
                        value={formData.outreachTableLocation}
                        onChange={(v) => update("outreachTableLocation", v)}
                        options={[
                          { value: "near-performance", label: "Near our performance" },
                          { value: "near-entrance", label: "Near the entrance" },
                          { value: "by-other-tables", label: "By the other resource tables" },
                          { value: "other", label: "Other" },
                        ]}
                      />
                      {formData.outreachTableLocation === "other" && (
                        <Input
                          className="mt-2"
                          value={formData.outreachTableLocationOther}
                          onChange={(e) => update("outreachTableLocationOther", e.target.value)}
                          placeholder="Please specify"
                        />
                      )}
                    </div>
                  </div>
                </SectionCard>

                <SectionCard number="10" title="Getting There" description="Please share about 48 hours ahead of the event">
                  <div>
                    <FieldLabel>Parking & loading notes</FieldLabel>
                    <Textarea value={formData.parkingLoadingNotes} onChange={(e) => update("parkingLoadingNotes", e.target.value)} rows={2} />
                  </div>
                  <div>
                    <FieldLabel>Entry instructions</FieldLabel>
                    <Textarea value={formData.entryInstructions} onChange={(e) => update("entryInstructions", e.target.value)} rows={2} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Day-of contact who can let us in</FieldLabel>
                      <Input autoComplete="name" value={formData.dayOfContactName} onChange={(e) => update("dayOfContactName", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Their phone</FieldLabel>
                      <Input type="tel" inputMode="tel" autoComplete="tel" value={formData.dayOfContactPhone} onChange={(e) => update("dayOfContactPhone", e.target.value)} />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard number="11" title="A Few Comforts">
                  <div>
                    <FieldLabel>Break notes / food availability, if any</FieldLabel>
                    <Textarea value={formData.breakNotesFood} onChange={(e) => update("breakNotesFood", e.target.value)} rows={2} />
                  </div>
                </SectionCard>
              </>
            )}

            {step === 4 && (
              <>
                <SectionCard number="12" title="How This Event Works" description="Paid, donated, or in-kind — let's just name which this one is">
                  <RadioPills
                    name="eventCompensationType"
                    value={formData.eventCompensationType}
                    onChange={(v) => update("eventCompensationType", v)}
                    options={[
                      { value: "paid", label: "Paid engagement" },
                      { value: "honorarium", label: "Honorarium" },
                      { value: "donation-based", label: "Donation-based" },
                      { value: "in-kind", label: "In-kind community service" },
                      { value: "reimbursement", label: "Reimbursement of costs only" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                  {formData.eventCompensationType === "other" && (
                    <Input
                      value={formData.otherCompensationType}
                      onChange={(e) => update("otherCompensationType", e.target.value)}
                      placeholder="Please specify"
                    />
                  )}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <FieldLabel>Amount, if any</FieldLabel>
                      <Input value={formData.compensationAmount} onChange={(e) => update("compensationAmount", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Due by</FieldLabel>
                      <Input value={formData.compensationDueBy} onChange={(e) => update("compensationDueBy", e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>How it's paid</FieldLabel>
                      <Input value={formData.compensationHowPaid} onChange={(e) => update("compensationHowPaid", e.target.value)} />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard number="13" title="Permits & Permission to Be There">
                  <label className="flex items-start gap-2.5 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.permitsConfirmed}
                      onChange={(e) => update("permitsConfirmed", e.target.checked)}
                      className="mt-0.5 h-4 w-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
                    />
                    <span>
                      I confirm any permits, approvals, or permissions the event itself needs (venue booking, public-space
                      or sound approvals, tabling or filming permission) are handled on our side, and that Harmony 4 All
                      has permission to be there to perform, table, document its own participation, and connect with
                      neighbors.
                    </span>
                  </label>
                </SectionCard>

                <SectionCard number="19" title="Photos & Video">
                  <div>
                    <FieldLabel>Any photo / video sensitivities on your side?</FieldLabel>
                    <Textarea value={formData.photoVideoSensitivities} onChange={(e) => update("photoVideoSensitivities", e.target.value)} rows={2} />
                  </div>
                </SectionCard>

                {(formData.setting === "outdoor" || formData.setting === "both") && (
                  <SectionCard number="23" title="Weather & Outdoor Events">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>"Go / no-go" check-in time, morning of</FieldLabel>
                        <Input type="time" value={formData.goNoGoTime} onChange={(e) => update("goNoGoTime", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Weather backup plan</FieldLabel>
                      <Textarea value={formData.weatherBackupPlan} onChange={(e) => update("weatherBackupPlan", e.target.value)} rows={2} />
                    </div>
                  </SectionCard>
                )}

                <SectionCard number="25" title="Good to Know About the Setting" description="A quick heads-up on any of these helps us protect instruments, gear, and our young performers">
                  <CheckboxGrid
                    options={SETTING_NOTE_OPTIONS}
                    selected={formData.settingNotes}
                    onToggle={(v) => toggleArrayValue("settingNotes", v)}
                  />
                  <div>
                    <FieldLabel>Other</FieldLabel>
                    <Input value={formData.otherSettingNote} onChange={(e) => update("otherSettingNote", e.target.value)} />
                  </div>
                </SectionCard>

                <SectionCard number="27" title="Accessibility & Inclusion">
                  <div>
                    <FieldLabel>Accessibility notes or accommodations to share</FieldLabel>
                    <Textarea value={formData.accessibilityNotes} onChange={(e) => update("accessibilityNotes", e.target.value)} rows={2} />
                  </div>
                </SectionCard>
              </>
            )}

            {step === 5 && (
              <SectionCard number="31" title="Let's Make It Official" description="By signing, you confirm you've read and understood this agreement and are excited to work together">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <FieldLabel required>Event Organizer &mdash; type your full name to sign</FieldLabel>
                    <Input
                      autoComplete="name"
                      value={formData.organizerSignature.name}
                      onChange={(e) => updateNested("organizerSignature", "name", e.target.value)}
                      data-error={!!fieldErrors["organizerSignature.name"]}
                      className={fieldErrors["organizerSignature.name"] ? "border-red-500" : ""}
                      placeholder="Full name"
                    />
                    {fieldErrors["organizerSignature.name"] && <FieldError message={fieldErrors["organizerSignature.name"]} />}
                  </div>
                  <div>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      autoComplete="organization-title"
                      value={formData.organizerSignature.title}
                      onChange={(e) => updateNested("organizerSignature", "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel required>Date</FieldLabel>
                    <Input
                      type="date"
                      value={formData.organizerSignature.date}
                      onChange={(e) => updateNested("organizerSignature", "date", e.target.value)}
                      data-error={!!fieldErrors["organizerSignature.date"]}
                      className={fieldErrors["organizerSignature.date"] ? "border-red-500" : ""}
                    />
                    {fieldErrors["organizerSignature.date"] && <FieldError message={fieldErrors["organizerSignature.date"]} />}
                  </div>
                </div>

                {formData.organizerIsVenue !== "yes" && (
                  <div className="grid sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <FieldLabel>Venue Host &mdash; type your full name to sign (if different from Organizer)</FieldLabel>
                      <Input
                        autoComplete="name"
                        value={formData.venueHostSignature.name}
                        onChange={(e) => updateNested("venueHostSignature", "name", e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <FieldLabel>Title</FieldLabel>
                      <Input
                        autoComplete="organization-title"
                        value={formData.venueHostSignature.title}
                        onChange={(e) => updateNested("venueHostSignature", "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <FieldLabel>Date</FieldLabel>
                      <Input
                        type="date"
                        value={formData.venueHostSignature.date}
                        onChange={(e) => updateNested("venueHostSignature", "date", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 pt-2">
                  This becomes official once everyone's signed and Harmony 4 All sends a short written confirmation.
                  Harmony 4 All's own signature is added internally once we countersign.
                </p>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-sm text-gray-700" data-error={!!fieldErrors.agreeToTerms}>
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => update("agreeToTerms", e.target.checked)}
                      className="mt-0.5 h-4 w-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
                    />
                    <span>
                      I've read and understood this Community Performance Partnership agreement, will communicate
                      clearly and treat everyone with respect, and I'm genuinely excited to work together to create a
                      wonderful event. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {fieldErrors.agreeToTerms && <FieldError message={fieldErrors.agreeToTerms} />}
                </div>
              </SectionCard>
            )}

            {error && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={handleBack} className="rounded-full px-5">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <span />
              )}

              {step < LAST_STEP ? (
                <Button type="button" onClick={handleNext} className="rounded-full px-6 bg-black hover:bg-gray-800 text-white">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-full px-6 bg-black hover:bg-gray-800 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit to Harmony 4 All"
                  )}
                </Button>
              )}
            </div>

          </form>
        </div>
      </section>
    </div>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      {message}
    </p>
  )
}
