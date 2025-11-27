"use client"

import Image from "next/image"
import { useMemo } from "react"

type MediaMarqueeItem = {
  id: number
  title: string
  thumbnail: string
}

const ROW_COUNT = 3

const MediaMarquee = ({ items }: { items: MediaMarqueeItem[] }) => {
  const rows = useMemo(() => {
    const bucket = Array.from({ length: ROW_COUNT }, () => [] as MediaMarqueeItem[])
    items.forEach((item, index) => {
      bucket[index % ROW_COUNT].push(item)
    })
    return bucket
  }, [items])

  if (!items.length) {
    return null
  }

  return (
    <section className="relative bg-black py-10 sm:py-14 lg:py-16 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 lg:w-56 z-10 bg-gradient-to-r from-black via-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 lg:w-56 z-10 bg-gradient-to-l from-black via-black/60 to-transparent" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">All Media Highlights</h2>
          <p className="text-sm sm:text-base text-white/70">
            Explore a continuous stream of performances, milestones, and community moments from the Harmony 4 All archive.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {rows.map((rowItems, rowIndex) => {
            const duplicated = [...rowItems, ...rowItems]
            const baseDuration = 48
            const duration = baseDuration + rowIndex * 6

            return (
              <div key={rowIndex} className="relative h-[110px] sm:h-[150px] lg:h-[180px] overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-r from-white/5 via-white/0 to-white/5">
                <div
                  className={`marquee-track group/marquee ${rowIndex === 1 ? "marquee-track-reverse" : ""}`}
                  style={{ animationDuration: `${duration}s` }}
                >
                  {duplicated.map((item, index) => (
                    <figure
                      key={`${item.id}-${index}`}
                      className="relative h-[110px] w-[180px] sm:h-[150px] sm:w-[240px] lg:h-[180px] lg:w-[280px] overflow-hidden rounded-2xl flex-shrink-0 bg-black/30"
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 280px"
                        quality={75}
                        className="object-cover"
                        priority={index === 0}
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3 py-2 text-[10px] sm:text-xs text-white/90 line-clamp-2">
                        {item.title}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation-name: media-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .group\/marquee:hover {
          animation-play-state: paused;
        }

        .marquee-track-reverse {
          animation-direction: reverse;
        }

        @keyframes media-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}

export default MediaMarquee

