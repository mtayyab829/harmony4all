"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { imageUrlsData } from "@/lib/image-urls"

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobileMenuOpen])



  const navLinks = [
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Blog", href: "/blog" },
    { text: "Media", href: "/media" },
    { text: "Get Involved", href: "/get-involved" },
    { text: "Contact", href: "/contact" },
  ]

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Legal Status Banner - Non-sticky */}
      <div className="bg-black text-white p-2 sm:p-4 hidden md:block">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="font-semibold">Harmony 4 All is an IRS approved, tax exempt 501(c)(3), nonprofit organization.
            </span>
            <span>EIN: 93-2460195</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <span className="font-semibold">NYS Attorney General&apos;s Charities Bureau Registered
            </span>
            <span>Registration No: 50-22-90</span>
          </div>
        </div>
      </div>

 

      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm transition-all duration-300">
      <div className="flex items-center justify-center py-2 md:hidden border-b border-gray-200 text-center">
        <Link
          href="https://www.guidestar.org/profile/shared/612fc49e-8913-45bf-b8f8-cc6d46762abb"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our Candid Platinum Transparency profile"
        >
          <Image
            src={imageUrlsData.components.header.candidBadge.cloudinaryUrl}
            alt="Candid Platinum Transparency 2025"
            width={80}
            height={80}
            sizes="80px"
            quality={85}
            className="object-contain transition-all duration-300"
            priority
          />
        </Link>
      </div>
        <div className="flex items-center justify-between w-full">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full bg-white py-2 px-4">

            <Link href="/">
              <Image
                src={imageUrlsData.components.header.logo.cloudinaryUrl}
                alt="Harmony 4 All Logo"
                width={isScrolled ? 60 : 120}
                height={isScrolled ? 60 : 120}
                sizes="(max-width: 768px) 100px, 120px"
                quality={90}
                className={`rounded-full object-contain transition-all duration-300`}
                priority
              />
            </Link>

            <div className="flex gap-10">
              {/* Desktop Menu */}
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href)
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`font-bold transition-all duration-300 focus:outline-none rounded-lg px-0 py-2 ${isActive
                      ? "text-black font-semibold"
                      : "text-black hover:text-black hover:bg-gray-50"
                      }`}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.text}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="https://www.guidestar.org/profile/shared/612fc49e-8913-45bf-b8f8-cc6d46762abb"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105"
                aria-label="View our Candid Platinum Transparency profile"
              >
                <Image
                  src={imageUrlsData.components.header.candidBadge.cloudinaryUrl}
                  alt="Candid Platinum Transparency 2025"
                  width={isScrolled ? 60 : 120}
                  height={isScrolled ? 60 : 120}
                  sizes="(max-width: 768px) 60px, 120px"
                  quality={85}
                  className={`object-contain transition-all duration-300`}
                  priority
                />
              </Link>
            </div>

            <Link href="/donate">
              <Button
                className="relative overflow-hidden bg-gradient-to-r from-black-600 to-black-700 hover:from-black-700 hover:to-blak-800 text-white rounded-full px-8 py-4 transition-all duration-500 hover:scale-110 focus:outline-none shadow-xl hover:shadow-2xl font-bold text-lg group transform hover:-translate-y-1"
                aria-label="Donate to Harmony 4 All"
              >
                <Heart className="mr-3 h-5 w-5 animate-pulse" />
                <span>Donate Now</span>
                <div className="absolute inset-0 bg-white/20 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between w-full px-2">
            {/* Mobile Menu Button - Left */}
            <button
              ref={menuButtonRef}
              className="focus:outline-none hover:bg-gray-100 p-2 w-12 h-12 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8 text-gray-900" aria-hidden="true" />
              ) : (
                <Menu className="h-8 w-8 text-gray-900" aria-hidden="true" />
              )}
            </button>

            <Link href="/" className="ml-5">
              <Image
                src={imageUrlsData.components.header.logo.cloudinaryUrl}
                alt="Harmony 4 All Logo"
                width={100}
                height={100}
                sizes="100px"
                quality={90}
                className="rounded-full object-contain"
                priority
              />
            </Link>

            {/* Mobile Donate Button - Right */}
            <Link href="/donate">
              <Button
                className="overflow-hidden bg-black text-white rounded-full"
                aria-label="Donate to Harmony 4 All"
              >
                <span>Donate</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden bg-white border-t shadow-lg animate-in slide-in-from-top-2 duration-300 z-[60] relative"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => {
                const isActive = isActiveLink(link.href)
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`block font-medium transition-all duration-300 focus:outline-none rounded-lg px-3 py-2 ${isActive
                      ? "text-black bg-gray-50 font-semibold border-l-4 border-black"
                      : "text-gray-700 hover:text-black hover:bg-gray-50"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.text}
                  </Link>
                )
              })}
              <Link href="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  className="w-full relative overflow-hidden bg-black text-white rounded-full px-6 py-4 mt-4 focus:outline-none shadow-xl hover:shadow-2xl transition-all duration-500 font-bold text-lg group transform hover:-translate-y-1"
                  aria-label="Donate to Harmony 4 All"
                >
                  <Heart className="mr-3 h-5 w-5 animate-pulse" />
                  <span>Donate Now</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
} 