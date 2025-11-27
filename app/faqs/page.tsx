"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Search, 
  Music, 
  Heart, 
  Users, 
  Calendar,
  Mail,
  Phone,
  Globe,
  BookOpen,
  Award,
  Gift,
  HandHeart,
  Target,
  Star,
  MapPin
} from "lucide-react"

export default function FAQsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Questions", icon: Star, count: 29 },
    { id: "story", name: "Our Story & Vision", icon: Heart, count: 5 },
    { id: "programs", name: "Programs & Services", icon: Music, count: 4 },
    { id: "involvement", name: "Getting Involved", icon: Users, count: 9 },
    { id: "events", name: "Events & Engagement", icon: Calendar, count: 4 },
    { id: "info", name: "Additional Info", icon: BookOpen, count: 7 }
  ]

  const allFaqs = [
    // Our Story and Vision
    {
      id: 1,
      category: "story",
      question: "What is Harmony 4 All?",
      answer: "Harmony 4 All is a 501(c)(3) nonprofit organization based in New York City, dedicated to providing free access to high-quality music education and resources to underserved K-12 students. Our mission is to help students from low-income families, underfunded schools, and marginalized communities discover their musical potential. We offer free musical instrument rentals, repairs, and access to musical curriculums."
    },
    {
      id: 2,
      category: "story",
      question: "When was Harmony 4 All founded?",
      answer: "Harmony 4 All was officially approved as a nonprofit organization by the IRS in September 2023. Since then, we've been working tirelessly to bring the joy of music to communities that need it most."
    },
    {
      id: 3,
      category: "story",
      question: "What is Harmony 4 All's long-term vision?",
      answer: "By 2030, we envision Harmony 4 All becoming a household name in New York City, recognized as a pillar of support for students from marginalized backgrounds who seek opportunities in music. We want every K-12 student, no matter their circumstances, to have access to the instruments, education, and resources they need to pursue their musical dreams."
    },

    // Our Programs and Services
    {
      id: 4,
      category: "programs",
      question: "What types of programs does Harmony 4 All offer?",
      answer: "• Free musical instrument rentals and repairs for eligible students<br><br>• Music education resources, including a digital curriculum<br>• Concerts, workshops, and community events that promote music education<br>• Collaborations with schools and local leaders to bring music into underserved communities"
    },
    {
      id: 5,
      category: "programs",
      question: "Who can benefit from Harmony 4 All's services?",
      answer: "We serve K-12 students in NYC, focusing on those from low-income families, underfunded schools, and marginalized communities. We also work closely with educators, schools, and community organizations to expand our impact."
    },
    {
      id: 6,
      category: "programs",
      question: "How does the musical instrument rental process work?",
      answer: "Students, parents, or teachers can contact us directly via email to request an instrument. If the student qualifies, we arrange for our vendor to deliver the instrument to their school or home. If they don't qualify for a free rental, they can still rent through Harmony 4 All at a competitive rate."
    },
    {
      id: 7,
      category: "programs",
      question: "How can I donate an instrument to Harmony 4 All?",
      answer: "We gladly accept instrument donations, especially smaller items due to logistical constraints. If you'd like to donate, please reach out to us at <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a>. For larger donations, like pianos, we work to find suitable homes within the community. You can also visit our <a href='/donate' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>donate page</a> for more information."
    },

    // Getting Involved
    {
      id: 8,
      category: "involvement",
      question: "How can I get involved with Harmony 4 All?",
      answer: "There are several ways to support our mission: • Partner with us as a school, business, or community leader. • Make a donation (monetary or instruments). • Volunteer in event planning, instrument repair, teaching, or outreach. Visit our <a href='/get-involved' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>get involved page</a> to learn more about opportunities."
    },
    {
      id: 9,
      category: "involvement",
      question: "How can I make a donation?",
      answer: "Donations can be made through our <a href='/donate' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>donate page</a> at <a href='https://harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>harmony4all.org</a>, or you can contact us directly for other ways to give. Every dollar and instrument donated directly supports students in need."
    },
    {
      id: 10,
      category: "involvement",
      question: "Can I make a recurring donation?",
      answer: "Yes! Setting up a recurring donation helps us sustain and grow our programs, ensuring continuous support for NYC students. Visit our <a href='/donate' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>donate page</a> to set up your recurring donation."
    },
    {
     id: 11,
      category: "involvement",
      question: "How is my donation used?",
      answer: "100% of donations go directly toward:<br>• Providing free instrument rentals and repairs<br>• Expanding our music education curriculum<br>• Funding concerts, workshops, and outreach programs"
    },
    {
      id: 12,
      category: "involvement",
      question: "Can businesses support Harmony 4 All?",
      answer: "Absolutely! Businesses can sponsor events, donate funds or instruments, or partner with us on community initiatives. Email us at <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a> to explore ways to collaborate. Visit our <a href='/get-involved' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>get involved page</a> to learn more about business partnership opportunities."
    },
    {
      id: 13,
      category: "involvement",
      question: "Can I host a fundraiser for Harmony 4 All?",
      answer: "Yes! If you're interested in hosting a fundraiser, we'd love to work with you. Contact us for guidance and resources at <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a>.<br><br> Visit our <a href='/get-involved' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>get involved page</a> to learn more about hosting fundraisers."
    },
    {
      id: 14,
      category: "involvement",
      question: "How can I volunteer with Harmony 4 All?",
      answer: "• Event planning that brings music to life in our communities<br>• Instrument repair and care, keeping the music alive for students<br>• Mentoring young musicians, guiding them to find their own voice<br>• Community outreach that extends the gift of music to every corner<br><br>Visit our <a href='/get-involved' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>get involved page</a> to learn more about volunteer opportunities."
    },
    {
    id: 15,
      category: "involvement",
      question: "Are there age restrictions for volunteering?",
      answer: "Generally, volunteers must be 14 years or older, but opportunities vary by role."
    },
    {
      id: 16,
      category: "involvement",
      question: "Can I volunteer remotely?",
      answer: "Yes! Some roles, such as event planning, outreach, and curriculum development, can be done remotely."
    },

    // Events and Engagement
    {
      id: 17,
      category: "events",
      question: "How can I participate in a Harmony 4 All event?",
      answer: "We host concerts, community events, and workshops throughout the year. Follow us on social media or check our website for upcoming events."
    },
    {
      id: 18,
      category: "events",
      question: "What can I expect from a Harmony 4 All concert?",
      answer: "Each concert features:<br><br>• A 10-15 minute introduction by our co-founders to share our mission<br>• 45-50 minutes of live classical and jazz performances by our talented musicians, mentors, and faculty from Juilliard, the NY Youth Symphony, and Jazz at Lincoln Center"
    },
    {
      id: 19,
      category: "events",
      question: "How can I register for an event or workshop?",
      answer: "Visit harmony4all.org or check our social media pages for registration details."
    },
    {
      id: 20,
      category: "events",
      question: "Can I collaborate with Harmony 4 All on a project?",
      answer: "We welcome collaborations with schools, community organizations, and businesses. If you'd like to co-host a workshop, festival, or educational program, reach out to <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a>."
    },

    // Additional Information
    {
      id: 21,
      category: "info",
      question: "Does Harmony 4 All provide educational content for schools?",
      answer: "Yes! We offer digital music curriculums and classroom resources to support schools. Educators interested in using our materials can contact us at <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a>."
    },
    {
      id: 22,
      category: "info",
      question: "Does Harmony 4 All offer internships?",
      answer: "Yes, we have internship opportunities in music education, nonprofit management, and event planning. Contact us at <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a> or visit our <a href='/contact' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>contact page</a> to learn more."
    },
    {
      id: 23,
      category: "info",
      question: "How can I stay updated on Harmony 4 All's activities?",
      answer: "Follow us on social media and visit <a href='https://harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>harmony4all.org</a> for updates.<br><br><div style='display: flex; gap: 12px; justify-content: center; margin-top: 16px;'><a href='https://www.facebook.com/harmony4all.org?mibextid=kFxxJD' style='display: inline-block; width: 40px; height: 40px; background-color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;'><svg style='width: 20px; height: 20px; fill: white;' viewBox='0 0 24 24'><path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/></svg></a><a href='https://www.instagram.com/_harmony4all_/' style='display: inline-block; width: 40px; height: 40px; background-color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;'><svg style='width: 20px; height: 20px; fill: white;' viewBox='0 0 24 24'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/></svg></a><a href='https://www.linkedin.com/company/harmony4all/?viewAsMember=true' style='display: inline-block; width: 40px; height: 40px; background-color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;'><svg style='width: 20px; height: 20px; fill: white;' viewBox='0 0 24 24'><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg></a><a href='https://www.youtube.com/watch?v=CQXnJpY_zR8&ab_channel=Harmony4All' style='display: inline-block; width: 40px; height: 40px; background-color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;'><svg style='width: 20px; height: 20px; fill: white;' viewBox='0 0 24 24'><path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/></svg></a></div>"
    },
    {
      id: 24,
      category: "info",
      question: "How can I report an issue with the website?",
      answer: "If you experience any issues, please email <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a>."
    },
    {
      id: 25,
      category: "info",
      question: "How does Harmony 4 All ensure the privacy of its users?",
      answer: "We take privacy seriously and follow strict data protection policies. Visit our <a href='/privacy' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>privacy page</a> to view our Privacy Policy."
    },
    {
      id: 26,
      category: "info",
      question: "How do I get in touch with Harmony 4 All?",
      answer: "You can reach us at: <a href='mailto:info@harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>info@harmony4all.org</a>, <a href='tel: +13475547712' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'> (737) HARMONY (427-6669)</a>, or visit <a href='https://harmony4all.org' style='font-weight: bold; color: black; ' onmouseover='this.style.color=\"#374151\"' onmouseout='this.style.color=\"black\"'>harmony4all.org</a>"
    }
  ]

  const filteredFaqs = allFaqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : Star
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-xs md:text-sm">
            <Link href="/" className="text-black hover:text-gray-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">FAQs</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8">
              <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              <span className="font-semibold text-gray-700 text-sm md:text-base">FAQ</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Frequently Asked Questions</h1>
            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
              Everything you need to know about Harmony 4 All. Can't find what you're looking for? Contact us directly.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:pl-12 pr-4 py-3 md:py-4 text-sm md:text-lg border-2 border-gray-200 focus:border-blue-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base ${
                  activeCategory === category.id
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <category.icon className="h-3 w-3 md:h-4 md:w-4" />
                <span className="font-medium">{category.name}</span>
                <span className="text-xs md:text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <Search className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 text-sm md:text-base">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {filteredFaqs.map((faq, index) => (
                  <Card key={faq.id} className="shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div 
                      className="flex items-center p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    >
                      {/* Category Icon */}
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mr-3 md:mr-4">
                        {(() => {
                          const IconComponent = getCategoryIcon(faq.category)
                          return <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                        })()}
                      </div>
                      
                      {/* Question and Toggle */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-1">
                          <span className="text-xs md:text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            #{faq.id}
                          </span>
                          <span className="text-xs md:text-sm text-gray-500">
                            {categories.find(cat => cat.id === faq.category)?.name}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm md:text-lg">{faq.question}</h4>
                      </div>
                      
                      {/* Chevron Icon */}
                      <div className="flex-shrink-0">
                        {openFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                        ) : (
                          <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                        )}
                      </div>
                    </div>
                    
                                         {/* Collapsible Answer */}
                     {openFaq === faq.id && (
                       <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100">
                         <p 
                           className="text-gray-600 pt-3 md:pt-4 leading-relaxed text-sm md:text-base"
                           dangerouslySetInnerHTML={{ __html: faq.answer }}
                         />
                       </div>
                     )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Still Have Questions?</h2>
              <p className="text-sm md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed">
                We're here to help! Don't hesitate to reach out with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-black border-2 border-white w-full text-white hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full">
                    <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Contact Us
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-black text-black hover:bg-black hover:text-white hover:border-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full"
                >
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Call  (737) HARMONY (427-6669)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) 
}
