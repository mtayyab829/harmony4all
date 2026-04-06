import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowLeft } from "lucide-react"
import type { Sponsor } from "@/lib/sponsors"

type SponsorDetailViewProps = {
  sponsor: Sponsor
  logoSrc: string
}

export function SponsorDetailView({ sponsor, logoSrc }: SponsorDetailViewProps) {
  const hasLogo = Boolean(logoSrc)
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
            <Link href="/" className="text-black hover:text-gray-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/sponsors" className="text-black hover:text-gray-800">
              Sponsors
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 line-clamp-2">{sponsor.name}</span>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
        <Link
          href="/sponsors"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sponsors
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className="bg-black text-white">{sponsor.category}</Badge>
          <Badge variant="outline" className="border-gray-300">
            {sponsor.tier}
          </Badge>
        </div>

        {hasLogo ? (
          <div className="w-full max-w-md h-28 md:h-36 relative mx-auto mb-8 bg-gray-50 rounded-2xl">
            <Image
              src={logoSrc}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain p-4"
              priority
            />
          </div>
        ) : (
          <div className="w-full max-w-md min-h-[7rem] flex items-center justify-center mx-auto mb-8 bg-gray-50 rounded-2xl px-4 text-center text-gray-500 text-sm">
            Logo unavailable
          </div>
        )}

        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center md:text-left">
          {sponsor.name}
        </h1>

        <p className="text-sm md:text-base text-gray-700 mb-2">
          <span className="font-semibold text-gray-900">Impact: </span>
          {sponsor.impact}
        </p>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10">
          {sponsor.description}
        </p>

        {sponsor.detailBlocks?.map((block) => (
          <section key={block.title} className="mb-10 last:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {block.title}
            </h2>
            {block.image ? (
              <div className="relative w-full max-w-xs h-24 md:h-28 mb-6 mx-auto md:mx-0">
                <Image
                  src={block.image.src}
                  alt={block.image.alt}
                  fill
                  className="object-contain object-left"
                />
              </div>
            ) : null}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {block.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

      </article>
    </div>
  )
}
