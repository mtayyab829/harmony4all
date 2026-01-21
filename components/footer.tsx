"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, Phone, MapPin } from "lucide-react"
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
      label: "Follow us on Facebook",
      href: "https://www.facebook.com/JoinHarmony4All",
      iconSrc: "/sm/facebook_white.png",  
      alt: "Facebook"
    },
    {
      label: "Follow us on Instagram",
      href: "https://www.instagram.com/joinharmony4all/",
      iconSrc: "/sm/instagram_white.png",
      alt: "Instagram"
    },
    {
      label: "Follow us on LinkedIn",
      href: "https://www.linkedin.com/company/joinharmony4all/?viewAsMember=true",
      iconSrc: "/sm/linkedin_white.png",
      alt: "LinkedIn"
    },
    {
      label: "Follow us on Youtube",
      href: "https://youtu.be/CQXnJpY_zR8",
      iconSrc: "/sm/youtube_white.png",
      alt: "YouTube"
    }
  ]

  const quickLinks = [
    { text: "About Us", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Blog", href: "/blog" },
    { text: "Media", href: "/media" },
    { text: "Get Involved", href: "/get-involved" },
    { text: "Contact", href: "/contact" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Terms & Conditions", href: "/terms" },
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
                      className="relative p-1.5 bg-white border-2 border-white rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:outline-none"
                      aria-label={social.label}
                      role="listitem"
                    >
                      <Image
                        src={social.iconSrc}
                        alt={social.alt}
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
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
