"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { imageUrlsData } from "@/lib/image-urls"

import mediaData from "../harmony4all_media_images.json"

const PLACEHOLDER = imageUrlsData.media.placeholder.cloudinaryUrl

type MediaItem = {
  id: number
  title: string
  description: string
  thumbnail: string
  date: string
  category: string
}

const getCategoryFromTitle = (title: string): string => {
  const lowerTitle = title.toLowerCase()

  if (lowerTitle.includes("concert") || lowerTitle.includes("performance") || lowerTitle.includes("recital")) {
    return "Programs"
  }
  if (
    lowerTitle.includes("donation") ||
    lowerTitle.includes("drive") ||
    lowerTitle.includes("senator") ||
    lowerTitle.includes("united nations")
  ) {
    return "Events"
  }
  if (lowerTitle.includes("volunteer") || lowerTitle.includes("community")) {
    return "Volunteers"
  }
  if (lowerTitle.includes("juilliard") || lowerTitle.includes("faculty") || lowerTitle.includes("teacher")) {
    return "Programs"
  }
  if (lowerTitle.includes("award") || lowerTitle.includes("commencement")) {
    return "Events"
  }

  return "Events"
}

const buildMediaItems = (): MediaItem[] =>
  mediaData.map((item, index) => ({
    id: index,
    title: item.title,
    description: item.text,
    thumbnail: item.image_url || PLACEHOLDER,
    date: item.text,
    category: getCategoryFromTitle(item.title),
  }))

const MediaGrid = ({ items }: { items: MediaItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item) => (
        <Card key={item.id} className="border-0 shadow-lg overflow-hidden group flex flex-col h-full">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
            />
            <Badge className="absolute top-3 left-3 bg-black/70 text-white border border-white/10">{item.category}</Badge>
          </div>

          <div className="flex flex-1 flex-col space-y-3 px-4 py-5">
            <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
            <p className="mt-auto text-xs text-gray-400">{item.date}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default function MediaAllPage() {
  const mediaItems = useMemo(() => buildMediaItems(), [])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return mediaItems
    }

    return mediaItems.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.category} ${item.date}`.toLowerCase()
      return haystack.includes(term)
    })
  }, [mediaItems, searchTerm])

  return (
    <div className="min-h-screen bg-white">

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-3xl text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Media</h1>
            <p className="text-sm md:text-base text-gray-600">
              Search every Harmony 4 All highlight, from performances to community spotlights.
            </p>
            <div className="mx-auto max-w-xl">
              <Input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search"
                aria-label="Search all media"
                className="rounded-full border-gray-200 px-6 py-5 text-sm md:text-base shadow focus-visible:ring-black"
              />
              {searchTerm.trim().length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  Showing {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"} for “{searchTerm}”.
                </p>
              )}
            </div>
          </div>

          {filteredItems.length ? (
            <MediaGrid items={filteredItems} />
          ) : (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
              <p className="text-base font-semibold text-gray-900">No media found</p>
              <p className="mt-2 text-sm text-gray-600">
                Try a different search term to uncover more Harmony 4 All memories.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

