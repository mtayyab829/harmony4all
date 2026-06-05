"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  getLearningPartners,
  LEARNING_PARTNER_HASH_IDS,
  resolveLearningPartnerHash,
} from "@/lib/learning-partners"

function scrollToLearningPartnerHash() {
  const targetId = resolveLearningPartnerHash(window.location.hash)
  if (!targetId) return

  const el = document.getElementById(targetId)
  if (!el) return

  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function LearningPartnersSection({
  compact = false,
  embedded = false,
}: {
  compact?: boolean
  embedded?: boolean
}) {
  const partners = getLearningPartners()

  useEffect(() => {
    const runScroll = () => {
      requestAnimationFrame(() => {
        scrollToLearningPartnerHash()
      })
    }

    runScroll()
    window.addEventListener("hashchange", runScroll)
    return () => window.removeEventListener("hashchange", runScroll)
  }, [])

  return (
    <section
      id="learning-partners-section"
      className={`scroll-mt-28 ${
        embedded
          ? "py-0 bg-transparent"
          : compact
            ? "py-8 sm:py-10 bg-white border-y border-gray-100"
            : "py-10 sm:py-14 md:py-16 bg-white border-y border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`text-center ${compact ? "mb-6 sm:mb-8" : "mb-8 sm:mb-12"}`}>
          <Badge className="bg-black text-white mb-3 md:mb-4">Creative Pathways Partners</Badge>
          <h2
            className={`font-bold text-gray-900 mb-4 sm:mb-6 ${
              compact
                ? "text-xl sm:text-2xl md:text-3xl"
                : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            }`}
          >
            Making Music Accessible. Expanding Opportunity.
          </h2>
          <div
            className={`text-gray-600 max-w-3xl mx-auto leading-relaxed space-y-4 text-left sm:text-center ${
              compact ? "text-sm sm:text-base" : "text-sm sm:text-base md:text-lg"
            }`}
          >
            <p>
              Harmony 4 All&apos;s mission begins with music access — removing financial and systemic
              barriers so underserved students and communities can experience the confidence, belonging,
              and possibility that music creates.
            </p>
            <p>
              Through our learning and career-readiness partners, we are strengthening that mission by
              helping young musicians, youth volunteers, interns, and community learners build practical
              skills for the future.
            </p>
            <p>
              These opportunities support digital confidence, AI awareness, career readiness, personal
              growth, and creative pathways — not as a replacement for music education, but as an
              extension of what music already teaches: discipline, creativity, confidence,
              collaboration, and purpose.
            </p>
            <p className="font-medium text-gray-800">
              Our goal is simple: to help underserved students and community members turn access to
              music into access to opportunity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {partners.map((partner) => (
            <Card
              key={partner.slug}
              id={LEARNING_PARTNER_HASH_IDS[partner.slug as keyof typeof LEARNING_PARTNER_HASH_IDS]}
              className="scroll-mt-28 overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl md:rounded-3xl"
            >
              <div className="p-5 md:p-6 flex flex-col">
                  <div className="w-full h-32 md:h-40 relative mb-4 bg-white rounded-lg border border-gray-100">
                    {partner.logoSrc ? (
                      <Image
                        src={partner.logoSrc}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain p-2 md:p-3"
                        sizes="400px"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xs text-gray-500 px-2 text-center">
                        {partner.name}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-xs md:text-sm text-black font-medium mb-2">{partner.impact}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-4 sm:line-clamp-none">
                    {partner.bio}
                  </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
