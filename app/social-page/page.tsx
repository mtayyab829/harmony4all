"use client"

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { imageUrlsData } from "@/lib/image-urls"

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Logo and Brand Section */}
      <div className="text-center mb-4">
        {/* Logo - Musical instrument with notes */}
        {/* Musical instrument (saxophone/clarinet style) */}
        <Image src={imageUrlsData.socialPage.logo.cloudinaryUrl} alt="Harmony 4 All Logo" width={144} height={144} className="rounded-full object-contain" />

      </div>

      {/* Separator Line */}
      <div className="w-full max-w-md h-px bg-black mb-4"></div>

      {/* Social Media Section */}
      <div className="text-center">
        {/* Call to Action */}
        <h2 className="text-3xl font-serif font-bold text-black mb-8">
          Follow @JoinHarmony4All
        </h2>

        {/* Social Media Buttons */}
        <div className="space-y-4 max-w-md w-full">
          {/* Facebook Button */}
          <Link
            href="https://www.facebook.com/JoinHarmony4All"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-lg transition-colors duration-300"
          >
            <Facebook className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Facebook</span>
          </Link>

          {/* Instagram Button */}
          <Link
            href="https://www.instagram.com/joinharmony4all/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-lg transition-colors duration-300"
          >
            <Instagram className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Instagram</span>
          </Link>

          {/* LinkedIn Button */}
          <Link
            href="https://www.linkedin.com/company/joinharmony4all/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-lg transition-colors duration-300"
          >
            <Linkedin className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">LinkedIn</span>
          </Link>

          {/* YouTube Button */}
          <Link
            href="https://youtu.be/CQXnJpY_zR8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-lg transition-colors duration-300"
          >
            <Youtube className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Youtube</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
