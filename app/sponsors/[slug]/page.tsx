import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SponsorDetailView } from "@/components/sponsors/sponsor-detail-view"
import { getAllSponsors, getSponsorBySlug, getSponsorLogoUrl } from "@/lib/sponsors"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSponsors().map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sponsor = getSponsorBySlug(slug)
  if (!sponsor) {
    return { title: "Sponsor" }
  }
  return {
    title: `${sponsor.name} | Harmony 4 All`,
    description: sponsor.description,
  }
}

export default async function SponsorDetailPage({ params }: Props) {
  const { slug } = await params
  const sponsor = getSponsorBySlug(slug)
  if (!sponsor) {
    notFound()
  }

  const logoSrc = getSponsorLogoUrl(sponsor)

  return <SponsorDetailView sponsor={sponsor} logoSrc={logoSrc} />
}
