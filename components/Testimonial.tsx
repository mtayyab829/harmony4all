import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"
import Image from "next/image"
import { imageUrlsData } from "@/lib/image-urls"

// Testimonials Section Component
export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [expandedTestimonials, setExpandedTestimonials] = useState<{ [key: number]: boolean }>({})

  // Helper function to get testimonial image from JSON
  const getTestimonialImage = (name: string): string => {
    const testimonial = imageUrlsData.components.testimonials.find(
      (t: any) => t.name.toLowerCase().includes(name.toLowerCase()) || 
                 name.toLowerCase().includes(t.name.toLowerCase())
    )
    return testimonial?.cloudinaryUrl || ""
  }

  const testimonials = [
    {
      name: "Joseph P. Addabbo, Jr.",
      role: "New York State Senator, District 15",
      category: "Supporter • Funder • Elected Official",
      website: "https://www.nysenate.gov/senators/joseph-p-addabbo-jr",
      content:
        `"I am pleased to express my strong support for <strong>Harmony 4 All, Inc.</strong> and its mission to provide free, high-quality music education to underserved K-12 students across New York City.<br>

Your dedication to breaking barriers in arts education through instrument rentals, repair services, digital curriculums, and community concerts is truly commendable.<br>

By ensuring that children in marginalized communities have access to the transformative power of music, you are not only fostering creativity but also strengthening our communities. The work you do aligns with my commitment to expanding opportunities for young people and supporting arts education in our city.<br>

It has been a pleasure sponsoring <strong>Harmony 4 All</strong> musical events in my district to entertain and inform my constituents of its mission. I look forward to seeing <strong>Harmony 4 All</strong> continue to grow and positively impact even more students.<br>

Please do not hesitate to reach out if my office can be of further assistance."`,
      rating: 5,
      image: getTestimonialImage("Joseph P. Addabbo"),
    },
    {
      name: "Harvey Epstein",
      role: "New York State Assembly Member, District 74",
      category: "Supporter • Elected Official",
      website: "https://nyassembly.gov/mem/Harvey-Epstein",
      content:
        `"I am pleased to write this letter in support of <strong>Harmony 4 All</strong>, a remarkable nonprofit organization dedicated to providing free access to high-quality music education and resources for underserved K-12 students across New York City.<br>

<strong>Harmony 4 All</strong> is a 501(c)(3) nonprofit that has been instrumental in creating meaningful musical opportunities for students who would otherwise lack access to music education, instrument rentals, and essential repairs.<br>

In 2024, my office had the privilege of partnering with <strong>Harmony 4 All</strong> to bring music to our community through engaging performances and initiatives that uplifted constituents of all ages. This partnership exemplifies our shared commitment to equity in music education, ensuring that every child, regardless of their socioeconomic background, has access to enriching learning experiences.<br>

I fully support <strong>Harmony 4 All</strong>'s efforts to expand its programming and impact, as they not only provide free access to music education but also strengthen communities by fostering creativity, cultural engagement, and youth empowerment. With additional financial support, <strong>Harmony 4 All</strong> can reach even more students, ensuring that music remains a vital and accessible part of education in our city.<br>

I look forward to <strong>Harmony 4 All</strong> continuing to serve our constituents and the greater NYC community. Please do not hesitate to contact my office for any additional information."`,
      rating: 5,
      image: getTestimonialImage("Harvey Epstein"),
    },
    {
      name: "Education Through Music",
      role: "Strategic Partner",
      category: "Strategic Partner",
      website: "https://etmonline.org",
      content:
        `"<strong>Education Through Music (ETM)</strong> is happy to partner with <strong>Harmony 4 All</strong>, a youth-led nonprofit dedicated to advancing educational equity through access to quality music education for underserved New York City students.<br>

Earlier this year, <strong>Harmony 4 All</strong> provided critical funding that enabled ETM to repair twelve school-owned band instruments at PS 154 in Queens—an ETM partner school serving a predominantly low-income, Title I student population.<br>

These repairs supported our joint goal of expanding the school's band program from 35 to 50 students, creating more opportunities for children to engage with music, giving students at PS 154 access to functional, high-quality instruments for years to come.<br>

We share in <strong>Harmony 4 All</strong>'s mission to ensure no child is excluded from the joy and growth of music because of financial hardship, which aligns with ETM's own commitment to educational equity.<br>

ETM looks forward to continuing our partnership with <strong>Harmony 4 All</strong> and working together again in the future to ensure that every child has access to the power of music."`,
      rating: 5,
      image: getTestimonialImage("Education Through Music"),
    },
    {
      name: "Friends of Maple Grove Cemetery",
      role: "Strategic Partner",
      category: "Strategic Partner",
      website: "https://www.friendsofmaplegrove.org",
      content:
        `"On behalf of the Friends of Maple Grove Cemetery, it is with great enthusiasm that I offer this letter of support for <strong>Harmony 4 All</strong>, a remarkable nonprofit dedicated to making music education accessible to underserved students in New York City. Their mission to bridge the gap in musical education resonates deeply with our values of education, preservation, and community engagement.<br>

<strong>Harmony 4 All</strong> has already left a profound impact on our own community, having brought their extraordinary talents to Maple Grove Cemetery in a concert that not only showcased their musicianship but also uplifted and inspired all who attended. Their commitment to ensuring that students, regardless of financial barriers, have access to quality instruments, instruction, and opportunities is nothing short of commendable.<br>

Through free instrument rentals, curriculum support for teachers, and partnerships with underfunded schools, <strong>Harmony 4 All</strong> fosters an environment where young musicians can flourish. The dedication of co-founders <strong>Bianca</strong> and <strong>Joshua Quddus</strong>, both extraordinary young leaders and musicians, reflects the organization's passion for not only music but also equity and empowerment. Their efforts extend beyond performance—they are shaping the future of arts education, ensuring that the universal language of music is accessible to all.<br>

At Maple Grove, we understand the power of music to transcend generations and bring people together. The work of <strong>Harmony 4 All</strong> aligns with this philosophy, creating meaningful experiences that enrich the lives of young artists and the communities they touch. It is our sincere hope that this outstanding organization receives the funding and support necessary to continue its mission and expand its reach.<br>

We wholeheartedly endorse <strong>Harmony 4 All</strong> and encourage any institution or funding body to invest in their invaluable work. Their impact is not only measurable. It is transformative."`,
      rating: 5,
      image: getTestimonialImage("Friends of Maple Grove Cemetery"),
    },
    {
      name: "Public School 154, Queens",
      role: "Pamela Gathers-Bullard, Principal",
      category: "Strategic Partner",
      website: "http://www.ps154queensny.org",
      content:
        `"P.S. 154 Queens would like to acknowledge <strong>Harmony 4 All</strong> for their generous support of our Education Through Music (ETM) band program. Working with ETM, <strong>Harmony 4 All</strong> provided a grant that allowed 12 of our band instruments to be repaired, which have now been returned to the school and made ready to create additional opportunities for students to join our 2025-26 band program!<br>

By providing the funds to repair these 12 school-owned instruments at P.S. 154 Queens, the work of <strong>Harmony 4 All</strong> will have an impact on our students for years into the future."`,
      rating: 5,
      image: getTestimonialImage("Public School 154"),
    },
    {
      name: "The New York Injury Law Firm",
      role: "Sponsor • Strategic Partner",
      category: "Sponsor • Strategic Partner",
      website: "https://thenewyorkinjurylawfirm.com",
      content:
        `"On behalf of <strong>The New York Injury Law Firm</strong>, I want to extend our admiration for the meaningful work your organization continues to do in our community. Your mission to promote inclusion, healing, and opportunity through arts, education, and outreach deeply resonates with our values.<br>

We are proud to make a charitable contribution in support of your ongoing efforts. It is organizations like yours that remind us of the power of compassion, creativity, and advocacy.<br>

Thank you for all you do. We look forward to seeing <strong>Harmony 4 All</strong> continue to grow and inspire."`,
      rating: 5,
      image: getTestimonialImage("The New York Injury Law Firm"),
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleExpanded = (index: number) => {
    setExpandedTestimonials(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const truncateContent = (content: string, maxLength: number = 500) => {
    // Remove HTML tags for length calculation
    const textContent = content.replace(/<[^>]*>/g, '')
    if (textContent.length <= maxLength) return content
    
    // Find a good breaking point (end of sentence or word)
    const truncated = textContent.substring(0, maxLength)
    const lastPeriod = truncated.lastIndexOf('.')
    const lastSpace = truncated.lastIndexOf(' ')
    
    const breakPoint = lastPeriod > maxLength * 0.7 ? lastPeriod : lastSpace
    const finalText = textContent.substring(0, breakPoint) + '... <span class="font-bold text-black text-[16px] cursor-pointer hover:underline">Read More</span>'
    
    // Reconstruct with basic HTML formatting
    return finalText.replace(/\n/g, '<br>')
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null

    if (isPlaying) {
      timer = setInterval(nextTestimonial, 10000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isPlaying])

  // Determine if current slide should have image on left or right
  const isImageOnLeft = currentTestimonial % 2 === 0
  
  // Check if current testimonial content is long enough to need truncation
  const currentContent = testimonials[currentTestimonial].content
  const textContent = currentContent.replace(/<[^>]*>/g, '')
  const isLongContent = textContent.length > 300
  const isExpanded = expandedTestimonials[currentTestimonial] || false
  const displayContent = isExpanded ? 
    currentContent + ' <span class="font-bold text-black text-[16px] cursor-pointer hover:underline">Read Less</span>' : 
    truncateContent(currentContent)

  return (
    <section id="testimonials-section" className="py-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Voices of support. What our community says.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Card className="bg-white border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className={`order-1 ${isImageOnLeft ? 'lg:order-1' : 'lg:order-2'} relative`}>
                <div className="h-auto min-h-[200px] sm:min-h-[300px] md:aspect-[3/4] overflow-hidden relative flex items-center justify-center">
                  {/* Check if it's a logo (contains 'logo' in URL, is from Cloudinary with logo/partner names, or is from specific domains) */}
                  {testimonials[currentTestimonial].image.includes('logo') ||
                    testimonials[currentTestimonial].image.includes('etmonline.org') ||
                    testimonials[currentTestimonial].image.includes('thenewyorkinjurylawfirm.com') ||
                    testimonials[currentTestimonial].image.includes('friendsofmaplegrove.org') ||
                    testimonials[currentTestimonial].image.includes('education-through-music') ||
                    testimonials[currentTestimonial].image.includes('the-newyork-injury-law-firm') ||
                    testimonials[currentTestimonial].image.includes('friends-of-maple-grove-cemetery') ||
                    testimonials[currentTestimonial].image.includes('maspeth-elementary-school') ||
                    testimonials[currentTestimonial].name.toLowerCase().includes('education through music') ||
                    testimonials[currentTestimonial].name.toLowerCase().includes('new york injury law firm') ||
                    testimonials[currentTestimonial].name.toLowerCase().includes('friends of maple grove') ||
                    testimonials[currentTestimonial].name.toLowerCase().includes('public school 154') ||
                    testimonials[currentTestimonial].image === '/image.png' ||
                    testimonials[currentTestimonial].image === '/emt153.png' ? (
                    // Logo styling - centered with actual size
                    <div className="p-0 sm:p-6 md:p-8 flex items-center justify-center h-full w-full">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        width={300}
                        height={300}
                        sizes="(max-width: 768px) 90vw, 300px"
                        quality={85}
                        className="max-w-[90%] max-h-[90%] object-contain"
                      />
                    </div>
                  ) : (
                    // Media image styling - cover on mobile, contain on desktop
                    <>
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={85}
                        className="object-cover sm:object-contain object-center"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className={`order-2 ${isImageOnLeft ? 'lg:order-2' : 'lg:order-1'} flex items-center bg-white`}>
                <CardContent className="px-6 lg:px-8 w-full relative">

                  <div className="text-left lg:text-left">


                    {/* Quote */}
                    <blockquote 
                      className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed font-light relative"
                      onClick={() => isLongContent && toggleExpanded(currentTestimonial)}
                    >
                      <div 
                        className="text-[16px]"
                        dangerouslySetInnerHTML={{ __html: displayContent }}
                      />
                    </blockquote>
                    {/* Decorative element */}

                    {/* Author Info */}
                    <div className="border-t border-gray-100 pt-8">
                      <div className="font-bold text-xl text-gray-900 mb-2">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-600 font-medium text-lg mb-2">
                        {testimonials[currentTestimonial].role}
                      </div>
                      {testimonials[currentTestimonial].category && (
                        <div className="text-gray-500 text-sm mb-3">
                          {testimonials[currentTestimonial].category}
                        </div>
                      )}
                      {testimonials[currentTestimonial].website && (
                        <a
                          href={testimonials[currentTestimonial].website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                        >
                          Visit Website
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>



          {/* Controls and Progress Indicator */}
          <div className="flex flex-col items-center mt-8 space-y-4">
            {/* Play/Pause Button */}
            <Button
              onClick={togglePlayPause}
              variant="outline"
              size="sm"
              className="rounded-full w-12 h-12 p-0 border-2 border-gray-300 hover:border-black hover:bg-gray-50"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-gray-700" />
              ) : (
                <Play className="h-5 w-5 text-gray-700" />
              )}
            </Button>

            {/* Progress Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentTestimonial
                    ? "bg-black"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}