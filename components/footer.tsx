"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, LinkedinIcon, LucideLinkedin } from "lucide-react"
import { usePathname } from "next/navigation"
import { imageUrlsData } from "@/lib/image-urls"

export const Footer = () => {
  const pathname = usePathname()

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const socialLinks = [
    { 
      icon: Facebook, 
      label: "Follow us on Facebook", 
      href: "https://www.facebook.com/JoinHarmony4All",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    { 
      icon: Instagram, 
      label: "Follow us on Instagram", 
      href: "https://www.instagram.com/joinharmony4all/",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      icon: Linkedin, 
      label: "Follow us on LinkedIn", 
      href: "https://www.linkedin.com/company/joinharmony4all/?viewAsMember=true",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <rect width="24" height="24" fill="white"/>
          <text x="12" y="17" textAnchor="middle" fill="black" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="bold">in</text>
        </svg>
      )
    },
    { 
      icon: Youtube, 
      label: "Follow us on Youtube", 
      href: "https://youtu.be/CQXnJpY_zR8",
      customIcon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
   
  ]

  const quickLinks = [
    { text: "About Us", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Blog", href: "/blog" },
    { text: "Media", href: "/media" },
    { text: "Get Involved", href: "/get-involved" },
    { text: "Contact", href: "/contact" },
    { text: "Privacy Policy", href: "/privacy" },
  ]

  const contactInfo = [
    { icon: Mail, text: "info@harmony4all.org", href: "mailto:info@harmony4all.org" },
    { icon: Phone, text: " (737) HARMONY (427-6669)", href: "tel:+13475547712" },
    { icon: MapPin, text: "New York City, United States", href: "https://maps.app.goo.gl/1234567890" },
  ]

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-4 sm:pt-8 pb-6" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-1">
              <div className="relative">
                <Link href="/">
                  <Image
                    src={imageUrlsData.components.footer.logo.cloudinaryUrl}
                    alt="Harmony 4 All Logo"
                    width={128}
                    height={128}
                    sizes="128px"
                    quality={85}
                    className="rounded-full object-contain shadow-0"
                  />
                </Link>
              </div>

            </div>
            <p className="text-white/70 mb-6 leading-relaxed text-base max-w-2xl mx-auto lg:mx-0">
              Shaping future generations through the power of music. Where every child's voice find its song.
            </p>
            
            {/* Legal Status - Prominently Displayed */}
            <div className="bg-white/10 border border-white/20 w-full sm:w-1/2 mx-auto lg:mx-0 rounded-lg p-4 mb-6">
              <div className="grid md:grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-white font-semibold mb-1">
                    IRS 501(c)(3) Nonprofit Organization
                  </p>
                  <p className="text-white/80">
                    EIN: 93-2460195
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">
                    NYS Charities Bureau Registered
                  </p>
                  <p className="text-white/80">
                    Registration No: 50-22-90
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="mb-6 space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start text-white/70 hover:text-white transition-colors duration-200">
                  <div className="p-1.5 bg-white/10 rounded-lg mr-3">
                    <contact.icon className="h-4 w-4 text-white/80" />
                  </div>
                  {contact.href !== "#" ? (
                    <Link href={contact.href} className="text-base">
                      {contact.text}
                    </Link>
                  ) : (
                    <span className="text-base">{contact.text}</span>
                  )}
                </div>
              ))}
            </div>
            
           
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="quick-links-heading" className="lg:col-span-1 text-center lg:text-left">
            <h4 id="quick-links-heading" className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-2 text-white/70" role="list">
              {quickLinks.map((link, index) => {
                const active = isActiveLink(link.href)
                return (
                  <li key={index} role="listitem">
                    <Link 
                      href={link.href} 
                      className={`relative inline-flex items-center transition-colors duration-200 px-1 py-1 rounded focus:outline-none focus-visible:outline-none ${
                        active ? "text-white font-semibold" : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className={`inline-block ${active ? 'border-b-2 border-white pb-0.5' : ''}`}>{link.text}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
                      {/* Candid Platinum Transparency Badge */}
            <div className="flex flex-col items-center lg:items-start mt-8">
              <Link 
                href="https://www.guidestar.org/profile/shared/612fc49e-8913-45bf-b8f8-cc6d46762abb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-105 mb-6"
                aria-label="View our Candid Platinum Transparency profile"
              >
                <Image 
                  src={imageUrlsData.components.footer.candidBadge.cloudinaryUrl}
                  alt="Candid Platinum Transparency 2025"
                  width={160}
                  height={160}
                  sizes="160px"
                  quality={85}
                  className="object-contain"
                />
              </Link>

              {/* Social Media */}
              <div className="text-center lg:text-left">
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-3 justify-center lg:justify-start" role="list" aria-label="Social media links">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-1 bg-white border-2 border-white rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:outline-none"
                      aria-label={social.label}
                      role="listitem"
                    >
                      <div className="h-6 w-6 text-black">
                        {social.customIcon}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-sm">
                © 2025 Harmony 4 All. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>With</span>
              <Heart className="h-4 w-4 text-red-500" aria-label="love" />
              <span>and innovation — from <Link href="https://rtnglobal.site" target="_blank" rel="noopener noreferrer" className="text-white/80 underline hover:text-white transition-colors">RTN GLOBAL</Link></span>
            </div>
           
          </div>
          
          
        </div>
      </div>
    </footer>
  )
}
