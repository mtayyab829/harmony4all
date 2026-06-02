import { imageUrlsData } from "@/lib/image-urls"
import {
  getSponsorBySlug,
  getSponsorLogoUrl,
  type Sponsor,
} from "@/lib/sponsors"

export type LearningPartnerDisplay = {
  slug: string
  name: string
  bio: string
  impact: string
  logoSrc: string
  featuredImageSrc: string
  website: string
  sponsorSlug: string
}

const LEARNING_PARTNER_SLUGS = ["grow-with-google", "coursera"] as const

type LearningPartnerImageEntry = {
  slug: string
  featuredImage?: { cloudinaryUrl?: string }
}

function getFeaturedImage(slug: string): string {
  const entries =
    (imageUrlsData as { learningPartners?: LearningPartnerImageEntry[] })
      .learningPartners ?? []
  const match = entries.find((e) => e.slug === slug)
  return match?.featuredImage?.cloudinaryUrl ?? ""
}

export function getLearningPartners(): LearningPartnerDisplay[] {
  return LEARNING_PARTNER_SLUGS.flatMap((slug) => {
    const sponsor = getSponsorBySlug(slug)
    if (!sponsor) return []

    const featured =
      getFeaturedImage(slug) ||
      imageUrlsData.home?.programsImages?.[2]?.cloudinaryUrl ||
      ""

    return [
      {
        slug,
        name: sponsor.name,
        bio: sponsor.description,
        impact: sponsor.impact,
        logoSrc: getSponsorLogoUrl(sponsor),
        featuredImageSrc: featured,
        website: sponsor.website ?? "",
        sponsorSlug: slug,
      },
    ]
  })
}

export function getLearningPartnerSponsor(slug: string): Sponsor | undefined {
  return getSponsorBySlug(slug)
}
