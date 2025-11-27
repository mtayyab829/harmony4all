"use client"

import type { CSSProperties } from "react"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"

type MediaHeroItem = {
  id: number
  title: string
  thumbnail: string
  date?: string
}

type SlotLayout = {
  col: number
  row: number
  colSpan: number
  rowSpan: number
}

const MAX_TILES = 10
const TOTAL_COLS = 12
const TOTAL_ROWS = 12
const GAP_PERCENT = 1.1

const LAYOUT_POSITIONS: SlotLayout[] = [
  { col: 0, row: 0, colSpan: 5, rowSpan: 6 },
  { col: 5, row: 0, colSpan: 3, rowSpan: 4 },
  { col: 8, row: 0, colSpan: 4, rowSpan: 4 },
  { col: 0, row: 6, colSpan: 3, rowSpan: 6 },
  { col: 3, row: 5, colSpan: 3, rowSpan: 4 },
  { col: 6, row: 4, colSpan: 3, rowSpan: 5 },
  { col: 9, row: 4, colSpan: 3, rowSpan: 5 },
  { col: 3, row: 9, colSpan: 3, rowSpan: 3 },
  { col: 6, row: 9, colSpan: 3, rowSpan: 3 },
  { col: 9, row: 9, colSpan: 3, rowSpan: 3 },
]

const shuffle = <T,>(input: T[]): T[] => {
  const array = [...input]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const MediaTile = ({ item, style }: { item: MediaHeroItem; style: CSSProperties }) => {
  return (
      <div
        style={style}
        className="absolute overflow-hidden rounded-3xl bg-gray-900 shadow-[0_15px_40px_-25px_rgba(0,0,0,0.7)] transition-[top,left] duration-[25000ms] ease-[cubic-bezier(0.7,0,0.3,1)]"
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1280px) 20vw, 16vw"
            quality={80}
            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]">
            <p className="text-[10px] sm:text-xs lg:text-sm font-medium leading-snug line-clamp-2">{item.title}</p>
            {item.date && <p className="mt-1 text-[9px] sm:text-[10px] lg:text-xs text-white/65">{item.date}</p>}
          </div>
        </div>
      </div>
  )
}

const MediaHero = ({ items }: { items: MediaHeroItem[] }) => {
  const tileItems = useMemo(() => shuffle(items).slice(0, Math.min(MAX_TILES, items.length)), [items])
  const positions = useMemo(() => LAYOUT_POSITIONS.slice(0, tileItems.length), [tileItems.length])

  const [assignments, setAssignments] = useState<number[]>(() => shuffle([...positions.keys()]))

  useEffect(() => {
    setAssignments(shuffle([...positions.keys()]))
  }, [positions.length])

  useEffect(() => {
    if (!positions.length) return

    const interval = setInterval(() => {
      setAssignments((current) => {
        const next = [...current]
        const a = Math.floor(Math.random() * next.length)
        let b = Math.floor(Math.random() * next.length)
        while (b === a) {
          b = Math.floor(Math.random() * next.length)
        }
        ;[next[a], next[b]] = [next[b], next[a]]
        return next
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [positions.length])

  if (!tileItems.length) {
    return (
      <section className="relative min-h-[360px] bg-gray-900 flex items-center justify-center">
        <p className="text-white/70 text-sm">Loading gallery...</p>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-black py-12 sm:py-16 lg:pt-28 min-h-[110vh]">
      <div className="absolute inset-0">
        <div className="relative mx-auto h-screen w-full">
          <div className="absolute inset-0">
            {tileItems.map((item, index) => {
              const layout = positions[assignments[index] ?? index]
              const widthPercent = (layout.colSpan / TOTAL_COLS) * 100
              const heightPercent = (layout.rowSpan / TOTAL_ROWS) * 100
              const leftPercent = (layout.col / TOTAL_COLS) * 100
              const topPercent = (layout.row / TOTAL_ROWS) * 100

              const style: CSSProperties = {
                width: `calc(${widthPercent}% - ${GAP_PERCENT}%)`,
                height: `calc(${heightPercent}% - ${GAP_PERCENT}%)`,
                left: `calc(${leftPercent}% + ${GAP_PERCENT / 2}%)`,
                top: `calc(${topPercent}% + ${GAP_PERCENT / 2}%)`,
              }

              return <MediaTile key={item.id} item={item} style={style} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaHero

