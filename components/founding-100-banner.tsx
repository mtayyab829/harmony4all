"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export const Founding100Banner = () => {
  const [isVisible, setIsVisible] = useState(true)

  // Check if banner was dismissed in session storage
  useEffect(() => {
    const dismissed = sessionStorage.getItem('founding100-banner-dismissed')
    if (dismissed === 'true') {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('founding100-banner-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="bg-black text-white py-3 px-4 fixed bottom-0 z-[60] border-b border-gray-200 shadow-sm w-full">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <Link 
            href="/founding-100"
            className="hover:underline font-semibold text-sm sm:text-base md:text-lg"
          >
            Join the Founding 100 Circle — Now Through December 31.
          </Link>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8 flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

