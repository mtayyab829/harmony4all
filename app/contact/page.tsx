"use client"

import Link from "next/link"
import Image from "next/image"
  import { Button } from "@/components/ui/button"
  import { Card } from "@/components/ui/card"
import { Phone, Mail,ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { useState } from "react"
import ContactSection from "@/components/contact"
import { imageUrlsData } from "@/lib/image-urls"




export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);



  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-900 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Contact</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('${imageUrlsData.contact.heroBackground.cloudinaryUrl}')`
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">Contact Us</h1>
            <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed drop-shadow-md">
              We're here to help and answer any questions you may have. Reach out to us and we'll respond as soon as we
              can.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      {/* FAQ Section */}
      <section className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Frequently Asked Questions</h2>
            <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3 md:space-y-4 mb-8 md:mb-12">
            {[
              {
                question: "What is Harmony 4 All?",
                answer: "Harmony 4 All is a 501(c)(3) nonprofit organization based in New York City, dedicated to providing free access to high-quality music education and resources to underserved K-12 students. We offer free musical instrument rentals, repairs, and access to musical curriculums.",
                image: imageUrlsData.contact.faqImages[0]?.cloudinaryUrl || "",
              },
              {
                question: "How can I donate musical instruments?",
                answer: "We gladly accept instrument donations, especially smaller items due to logistical constraints. If you'd like to donate, please reach out to us at info@harmony4all.org. For larger donations, like pianos, we work to find suitable homes within the community.",
                image: imageUrlsData.contact.faqImages[1]?.cloudinaryUrl || "",
              },
              {
                question: "How does the musical instrument rental process work?",
                answer: "Students, parents, or teachers can contact us directly via email to request an instrument. If the student qualifies, we arrange for our vendor to deliver the instrument to their school or home. If they don't qualify for a free rental, they can still rent through Harmony 4 All at a competitive rate.",
                image: imageUrlsData.contact.faqImages[2]?.cloudinaryUrl || "",
              },
              {
                question: "How can I volunteer or get involved?",
                answer: "There are several ways to support our mission: Partner with us as a school, business, or community leader, make a donation (monetary or instruments), or volunteer in event planning, instrument repair, teaching, or outreach.",
                image: imageUrlsData.contact.faqImages[3]?.cloudinaryUrl || "",
              },
            ].map((faq, index) => (
              <Card key={index} className="shadow-lg border-0 rounded-2xl overflow-hidden">
                <div 
                  className="flex items-center p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {/* Small Image on the Left */}
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 mr-3 md:mr-4 relative">
                    <Image
                      src={faq.image}
                      alt={faq.question}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Question and Toggle */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">{faq.question}</h4>
                  </div>
                  
                  {/* Chevron Icon */}
                  <div className="flex-shrink-0">
                    {openFaq === index ? (
                      <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                    )}
                  </div>
                </div>
                
                {/* Collapsible Answer */}
                {openFaq === index && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100">
                    <p className="text-gray-600 pt-3 md:pt-4 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* View All FAQs Button */}
          <div className="text-center">
            <Link href="/faqs">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-6 md:py-8 lg:py-10 bg-black text-white">  
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Still Have Questions?</h2>
          <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
            We're here to help! Don't hesitate to reach out with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/60 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full"
              onClick={() => window.open('tel:+17374276669', '_self')}
            >
              <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Call Us Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full bg-transparent"
              onClick={() => window.open('mailto:info@harmony4all.org', '_self')}
            >
              <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Send Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
