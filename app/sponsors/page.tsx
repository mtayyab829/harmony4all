"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Music,
    Gift,
    Phone,
    Mail,
    ExternalLink,
    Crown,
    DollarSign,
    Calendar,
    Megaphone,
} from "lucide-react"
import { imageUrlsData } from "@/lib/image-urls"

export default function SponsorsPage() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    // Helper function to get sponsor logo from JSON
    const getSponsorLogo = (name: string): string => {
        const sponsor = imageUrlsData.sponsors.sponsorLogos.find(
            (s: any) => s.name.toLowerCase().includes(name.toLowerCase()) || 
                       name.toLowerCase().includes(s.name.toLowerCase())
        )
        return sponsor?.cloudinaryUrl || ""
    }

    const currentSponsors = [
        {
            name: "THE NEWYORK INJURY LAW FIRM",
            logo: getSponsorLogo("THE NEWYORK INJURY LAW FIRM"),
            website: "https://thenewyorkinjurylawfirm.com/",
            tier: "Gold",
            category: "Legal Partner",
            impact: "Pro Bono Services & Sponsorship",
            description: "Supporting our mission through legal expertise and financial sponsorship."
        },
        {
            name: "New York State Senator Joseph P. Addabbo, Jr.",
            logo: getSponsorLogo("New York State Senator Joseph P. Addabbo"),
            website: "https://www.nysenate.gov/senators/joseph-p-addabbo-jr",
            tier: "Gold",
            category: "Government Partner",
            impact: "Legislative Support & Advocacy",
            description: "Supporting music education initiatives and community programs through legislative advocacy."
        },
        {
            name: "New York State Office of the Governor",
            logo: getSponsorLogo("New York State Office of the Governor"),
            website: "https://www.governor.ny.gov",
            tier: "Platinum",
            category: "Government Partner",
            impact: "State-Level Support",
            description: "Providing state-level support for arts education and community development initiatives."
        },
        {
            name: "New York State Legislature",
            logo: getSponsorLogo("New York State Legislature"),
            website: "https://www.nysenate.gov/issues/new-york-state-legislature",
            tier: "Platinum",
            category: "Government Partner",
            impact: "Legislative Framework",
            description: "Establishing legislative framework and support for arts education programs."
        },
        {
            name: "New York State Council on the Arts",
            logo: getSponsorLogo("New York State Council on the Arts"),
            website: "https://arts.ny.gov/our-mission",
            tier: "Gold",
            category: "Arts Council",
            impact: "Arts Funding & Support",
            description: "Providing essential funding and support for arts education and cultural programs."
        },
        {
            name: "New York City Department of Cultural Affairs",
            logo: getSponsorLogo("New York City Department of Cultural Affairs"),
            website: "https://www.nyc.gov/site/dcla/index.page",
            tier: "Gold",
            category: "City Government",
            impact: "Cultural Programming Support",
            description: "Supporting cultural programming and arts education initiatives across NYC."
        },
        {
            name: "New York Foundation for the Arts",
            logo: getSponsorLogo("New York Foundation for the Arts"),
            website: "https://www.nyfa.org",
            tier: "Silver",
            category: "Arts Foundation",
            impact: "Artist Support & Resources",
            description: "Providing resources and support for artists and arts education programs."
        },
        {
            name: "Citizens Committee for New York City",
            logo: getSponsorLogo("Citizens Committee for New York City"),
            website: "https://www.citizensnyc.org/",
            tier: "Silver",
            category: "Non-Profit Organization",
            impact: "Community Support & Resources",
            description: "CitizensNYC is a partner for New Yorkers who have bold ideas to improve their neighborhoods."
        },
        {
            name: "Villa Russo",
            logo: getSponsorLogo("Villa Russo"),
            website: "https://www.villarussocatering.com",
            tier: "Silver",
            category: "Catering Service",
            impact: "Make Memories In Our Castle", 
            description: "From unforgettable Weddings to royal Sweet Sixteens and Quinceañeras, perfectly choreographed corporate events to unique private occasions, Villa Russo is your dream castle in Queens."
        },

    ]

    const sponsorshipOpportunities = [
        {
            title: "Event Sponsorship",
            description: "Sponsor our community concerts, workshops, and special events",
            icon: Calendar,
            opportunities: [
                "Annual Gala & Concert",
                "Community Music Festivals",
                "Student Showcase Events",
                "Workshop Series",
                "Holiday Concerts"
            ]
        },
        {
            title: "Program Sponsorship",
            description: "Directly support specific music education programs",
            icon: Music,
            opportunities: [
                "Instrument Rental Program",
                "Instrument Repair Program",
                "Performance Training",
                "Digital Music Production",
                "Ensemble Programs"
            ]
        },
        {
            title: "Marketing & Branding",
            description: "Partner with us on marketing initiatives and brand visibility",
            icon: Megaphone,
            opportunities: [
                "Social Media Campaigns",
                "Print Materials",
                "Website Recognition",
                "Press Releases",
                "Video Content"
            ]
        },
        {
            title: "In-Kind Sponsorship",
            description: "Support through goods, services, or expertise",
            icon: Gift,
            opportunities: [
                "Professional Services",
                "Equipment & Supplies",
                "Venue Space",
                "Marketing Support",
                "Technical Expertise"
            ]
        }
    ]

    const impactMetrics = [
        {
            number: "300+",
            label: "Students Served",
            description: "Children receiving music education through our programs"
        },
        {
            number: "10+",
            label: "Schools Partnered",
            description: "Educational institutions across NYC"
        },
        {
            number: "100+",
            label: "Instruments Provided",
            description: "Musical instruments donated and maintained"
        },
        {
            number: "25+",
            label: "Events Hosted",
            description: "Community concerts and educational events"
        }
    ]

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
                        <span className="text-gray-600">Sponsors</span>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-12 md:py-16 lg:py-32 bg-cover bg-center bg-no-repeat" style={{
                backgroundImage: `url('${imageUrlsData.sponsors.heroBackground.cloudinaryUrl}')`
            }}>
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6 lg:mb-8">
                                <Crown className="h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-black" />
                                <span className="font-semibold text-gray-700 text-xs md:text-sm lg:text-base">Partnership Opportunities</span>
                            </div>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-3 md:mb-4 lg:mb-6 drop-shadow-lg">
                                Become a Sponsor
                            </h1>
                            <p className="text-sm md:text-base lg:text-xl xl:text-2xl text-white/90 mb-4 md:mb-6 lg:mb-8 leading-relaxed drop-shadow-md">
                                Partner with <span className="font-bold">Harmony 4 All</span> to create lasting impact in music education and build stronger communities together.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                                <Link href="/contact">
                                    <Button
                                        variant="outline"
                                        className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-3 md:px-4 lg:px-8 py-2 md:py-3 lg:py-4 text-xs md:text-sm lg:text-lg rounded-full bg-transparent"
                                    >
                                        <Mail className="mr-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Metrics */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-16">
                            <h2 className="text-xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-6">Our Impact</h2>
                            <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto">
                                See how our sponsors help us create meaningful change in music education
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {impactMetrics.map((metric, index) => (
                                <div
                                    key={index}
                                    className="text-center p-3 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="text-lg md:text-4xl font-bold text-black mb-1 md:mb-2">
                                        {metric.number}
                                    </div>
                                    <div className="text-xs md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                                        {metric.label}
                                    </div>
                                    <div className="text-xs text-gray-600 hidden md:block">
                                        {metric.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* Current Sponsors */}
            <section className="py-12 md:py-32 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-24">
                            <h2 className="text-2xl md:text-6xl font-bold text-black mb-3 md:mb-8">
                                Our Valued Partners
                            </h2>
                            <p className="text-sm md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-12">
                                Meet the organizations that are making a difference in music education through their generous sponsorship.
                            </p>
                            <div className="hidden md:block w-16 md:w-32 h-1 bg-black mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {currentSponsors.map((sponsor, index) => (
                                <Card
                                    key={index}
                                    className="bg-white shadow-xl border-0 rounded-xl md:rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="p-4 md:p-8">
                                        <div className="flex items-center justify-end mb-3 md:mb-4">
                                            <Badge className="bg-black text-white px-2 md:px-3 py-1 text-xs font-semibold">
                                                {sponsor.category}
                                            </Badge>
                                        </div>

                                        <div className="w-full h-16 md:h-24 flex items-center justify-center mb-3 md:mb-4 bg-gray-50 rounded-lg md:rounded-xl relative">
                                            <Image
                                                src={sponsor.logo}
                                                alt={`${sponsor.name} logo`}
                                                fill
                                                className="object-contain p-1 md:p-2"
                                            />
                                        </div>

                                        <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                                            {sponsor.name}
                                        </h3>

                                        <p className="text-xs md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">
                                            {sponsor.description}
                                        </p>

                                        <div className="mb-3 md:mb-4">
                                            <h4 className="font-semibold text-gray-900 mb-1 text-xs">Impact:</h4>
                                            <p className="text-xs md:text-sm text-black font-medium">{sponsor.impact}</p>
                                        </div>

                                        <Link href={sponsor.website} target="_blank" rel="noopener noreferrer">
                                            <Button 
                                                variant="outline" 
                                                className="w-full border-gray-200 text-black hover:bg-gray-50 transition-all duration-300 text-xs md:text-sm py-2 md:py-3"
                                            >
                                                Visit Website
                                                <ExternalLink className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsorship Opportunities */}
            <section className="py-12 md:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 md:mb-24">
                            <h2 className="text-2xl md:text-6xl font-bold text-gray-900 mb-3 md:mb-8">
                                Sponsorship Opportunities
                            </h2>
                            <p className="text-sm md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-12">
                                Discover the various ways your organization can partner with us to create meaningful impact.
                            </p>
                            <div className="hidden md:block w-16 md:w-32 h-1 bg-black mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            {sponsorshipOpportunities.map((opportunity, index) => (
                                <Card
                                    key={index}
                                    className="bg-white shadow-xl border-0 rounded-xl md:rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <CardHeader className="pb-3 md:pb-4">
                                        <CardTitle className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                                            {opportunity.title}
                                        </CardTitle>
                                        <CardDescription className="text-xs md:text-base text-gray-600">
                                            {opportunity.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="space-y-2 md:space-y-3">
                                            <h4 className="font-semibold text-gray-900 text-xs md:text-base">Available Opportunities:</h4>
                                            <ul className="space-y-1 md:space-y-2">
                                                {opportunity.opportunities.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-center space-x-2">
                                                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full"></div>
                                                        <span className="text-xs md:text-base text-gray-600">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                   
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Sponsor Section */}
            <section className="py-12 md:py-32 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                            <div className="text-center md:text-left">
                                <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-8">Why Sponsor <span className="font-bold">Harmony 4 All</span>?</h2>
                                
                                <div className="space-y-4 md:space-y-8">
                                    <div className="flex items-start space-x-3 md:space-x-4">
                                        <div>
                                            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Proven Impact</h3>
                                            <p className="text-xs md:text-base text-gray-600">
                                                Our programs have directly impacted over 500 students across 25+ schools, with measurable improvements in academic performance and social development.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 md:space-x-4">
                                        
                                        <div>
                                            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Community Engagement</h3>
                                            <p className="text-xs md:text-base text-gray-600">
                                                Connect with families, educators, and community leaders through our extensive network and events.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 md:space-x-4">
                                      
                                        <div>
                                            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Brand Visibility</h3>
                                            <p className="text-xs md:text-base text-gray-600">
                                                Gain exposure through our events, marketing materials, and media coverage reaching thousands of community members.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3 md:space-x-4">
                                      
                                        <div>
                                            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Social Responsibility</h3>
                                            <p className="text-xs md:text-base text-gray-600">
                                                Demonstrate your commitment to education, arts, and community development while making a real difference.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative text-center md:text-left">
                                <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
                                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Ready to Get Started?</h3>
                                    <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">
                                        Contact us to discuss sponsorship opportunities and find the perfect partnership for your organization.
                                    </p>
                                    
                                    <div className="space-y-3 md:space-y-4">
                                        <Link href="/contact">
                                            <Button className="w-full bg-black w-full hover:bg-gray-800 text-white py-2 md:py-4 text-sm md:text-lg rounded-xl">
                                                <Mail className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                                                Contact Our Team
                                            </Button>
                                        </Link>
                                        
                                        <Link href="/donate">
                                            <Button variant="outline" className="w-full border-gray-200 text-black hover:bg-gray-50 py-2 md:py-4 text-sm md:text-lg rounded-xl">
                                                <DollarSign className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                                                Make a Donation
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                                        <div className="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600">
                                            <Phone className="h-3 w-3 md:h-4 md:w-4" />
                                            <span><a href="tel:+13475547712" className="text-gray-600 hover:text-gray-800 font-medium">(737) HARMONY (427-6669)</a></span>
                                        </div>
                                        <div className="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 text-xs md:text-sm text-gray-600 mt-1 md:mt-2">
                                            <Mail className="h-3 w-3 md:h-4 md:w-4" />
                                            <span><a href="mailto:info@harmony4all.org" className="text-gray-600 hover:text-gray-800 font-medium">info@harmony4all.org</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-32 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-8">Join Us in Making Music Accessible to All</h2>
                        <p className="text-sm md:text-xl mb-6 md:mb-12 opacity-90 max-w-3xl mx-auto">
                            Your sponsorship will help us continue our mission of providing music education to underserved students and building stronger communities through the power of music.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="bg-white text-black w-full hover:bg-white/60 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full font-semibold">
                                    <Crown className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                                    Become a Sponsor
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white text-white w-full hover:bg-white hover:text-black px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full bg-transparent"
                                >
                                    Learn More About Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
