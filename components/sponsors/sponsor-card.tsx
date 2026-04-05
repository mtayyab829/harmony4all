"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import type { Sponsor } from "@/lib/sponsors"

type SponsorCardProps = {
  sponsor: Sponsor
  logoSrc: string
}

export function SponsorCard({ sponsor, logoSrc }: SponsorCardProps) {
  const hasLogo = Boolean(logoSrc)

  return (
    <Card className="bg-white shadow-xl border-0 rounded-xl md:rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-end mb-3 md:mb-4">
          <Badge className="bg-black text-white px-2 md:px-3 py-1 text-xs font-semibold">
            {sponsor.category}
          </Badge>
        </div>

        <div className="w-full h-16 md:h-24 flex items-center justify-center mb-3 md:mb-4 bg-gray-50 rounded-lg md:rounded-xl relative">
          {hasLogo ? (
            <Image
              src={logoSrc}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain p-1 md:p-2"
            />
          ) : (
            <span className="text-xs text-gray-400 px-2 text-center">{sponsor.name}</span>
          )}
        </div>

        <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
          {sponsor.name}
        </h3>

        <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
          {sponsor.description}
        </p>

        <div className="mb-3 md:mb-4">
          <h4 className="font-semibold text-gray-900 mb-1 text-xs">Impact:</h4>
          <p className="text-xs md:text-sm text-black font-medium">{sponsor.impact}</p>
        </div>

        <Link href={`/sponsors/${sponsor.slug}`}>
          <Button
            variant="outline"
            className="w-full border-gray-200 text-black hover:bg-gray-50 transition-all duration-300 text-xs md:text-sm py-2 md:py-3"
          >
            Read More
            <ChevronRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
