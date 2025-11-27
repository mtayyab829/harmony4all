"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import MediaHero from "./components/media-hero"
import MediaMarquee from "./components/media-marquee"
import { imageUrlsData } from "@/lib/image-urls"

const PLACEHOLDER = imageUrlsData.media.placeholder.cloudinaryUrl

// Import the media data
import mediaData from "./harmony4all_media_images.json"

const getCategoryFromTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase()

  if (lowerTitle.includes("concert") || lowerTitle.includes("performance") || lowerTitle.includes("recital")) {
    return "programs"
  }
  if (
    lowerTitle.includes("donation") ||
    lowerTitle.includes("drive") ||
    lowerTitle.includes("senator") ||
    lowerTitle.includes("united nations")
  ) {
    return "events"
  }
  if (lowerTitle.includes("volunteer") || lowerTitle.includes("community")) {
    return "volunteers"
  }
  if (lowerTitle.includes("juilliard") || lowerTitle.includes("faculty") || lowerTitle.includes("teacher")) {
    return "programs"
  }
  if (lowerTitle.includes("award") || lowerTitle.includes("commencement")) {
    return "events"
  }

  return "events"
}

const buildMediaItems = () =>
  mediaData.map((item, index) => ({
    id: index,
    type: "photo",
    title: item.title,
    description: item.text,
    thumbnail: item.image_url || PLACEHOLDER,
    date: item.text,
    category: getCategoryFromTitle(item.title),
    featured: index < 4,
  }))

export default function MediaPage() {
  const mediaItems = useMemo(() => buildMediaItems(), [])

  const featuredItems = mediaItems.filter((item) => item.featured)
  

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative mt-3 py-16 md:py-24 lg:py-32 bg-cover bg-top bg-no-repeat md:hidden h-[50vh]"
        style={{
          backgroundImage: `url('${imageUrlsData.media.mobileHeroBackground.cloudinaryUrl}')`,
          objectFit: "cover",
        }}
      >
      </section>

      <div className="hidden md:block">
        <MediaHero items={mediaItems} />
      </div>

      {/* Featured Video Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 lg:mb-8">Featured Video</h2>
            <p className="text-sm md:text-lg text-gray-600 mb-8 md:mb-10 lg:mb-12">Watch our latest video showcasing the impact of our music education programs</p>
            <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/9] bg-gray-200">
                <iframe
                  src="https://www.youtube.com/embed/CQXnJpY_zR8"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full h-full object-cover"
                ></iframe>
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
                  <Badge className="bg-black/70 text-white text-xs md:text-sm">2:58</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Media Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="w-full px-2">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Event Highlights</h2>
            <p className="text-sm md:text-lg text-gray-600">Highlights from our most impactful programs and success stories</p>
            </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-1 md:gap-2">
            {featuredItems.map((item, index) => (
              <Card
                key={index}
                className="shadow-lg border-0 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    priority={index === 0}
                  />
                  {/* Always Visible Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white">
                      <h4 className="text-xs font-semibold mb-1 line-clamp-2 leading-tight">{item.title}</h4>
                      <div className="flex items-center justify-between">
                        <p className="text-xs opacity-90">{item.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              ))}
            </div>
          </div>
        </section>

        <MediaMarquee items={mediaItems} />

      <div className="py-8 md:py-10 bg-black text-white text-center">
        <Link href="/media/all" aria-label="View all media items">
          <Button
            variant="outline"
            className="mx-auto bg-black rounded-full border-white text-white hover:bg-white hover:text-black px-8 py-3 text-base md:text-lg"
          >
            View All Media
          </Button>
        </Link>
      </div>
        
      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Share Your Story</h2>
          <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">Have a success story or memorable moment to share? We'd love to feature your experience in our media gallery.</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white w-full text-gray-900 hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full">Share Your Story</Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="border-2 w-full border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full bg-transparent">Read Our Blog</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
