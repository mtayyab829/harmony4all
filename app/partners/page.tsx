"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Heart,
    Users,
    Music,
    Award,
    Star,
    Gift,
    HandHeart,
    Target,
    ArrowRight,
    CheckCircle,
    Phone,
    Mail,
    MapPin,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Play,
    Globe,
    BookOpen,
    Shield,
    Lightbulb
} from "lucide-react"
import { imageUrlsData } from "@/lib/image-urls"

export default function PartnersPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentSpotlight, setCurrentSpotlight] = useState(0)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSpotlight((prev) => (prev + 1) % spotlightStories.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])



    // Helper function to get partner logo from JSON
    const getPartnerLogo = (name: string): string => {
        const partner = imageUrlsData.partners.partnerLogos.find(
            (p: any) => p.name.toLowerCase().includes(name.toLowerCase()) || 
                       name.toLowerCase().includes(p.name.toLowerCase())
        )
        return partner?.cloudinaryUrl || ""
    }

    const partners = {
        major: [
            { name: "Education Through Music", logo: getPartnerLogo("Education Through Music"), website: "https://etmonline.org/" },
            { name: "The NewYork Injury Law Firm", logo: getPartnerLogo("The NewYork Injury Law Firm"), website: "https://thenewyorkinjurylawfirm.com/" },
            { name: "Friends of Maple Grove Cemetery", logo: getPartnerLogo("Friends of Maple Grove Cemetery"), website: "https://www.friendsofmaplegrove.org/" },
        ],
        community: [
            { name: "Education Through Music", logo: getPartnerLogo("Education Through Music"), website: "https://etmonline.org/" },
            { name: "Maspeth Elementary School", logo: getPartnerLogo("Maspeth Elementary School"), website: "https://www.psl53online.org/" },
            { name: "Maple Grove Cemetery", logo: getPartnerLogo("Friends of Maple Grove Cemetery"), website: "https://www.friendsofmaplegrove.org/" },
            { name: "The NewYork Injury Law Firm", logo: getPartnerLogo("The NewYork Injury Law Firm"), website: "https://thenewyorkinjurylawfirm.com/" },
            { name: "The Assembly State of New York Albany ", logo: getPartnerLogo("The Assembly State of New York Albany"), website: "https://www.assembly.state.ny.us/members/assemblymember-jose-p.serrano" },
        ]
    }

    const spotlightStories = [
        {
            name: "The Harmony Foundation",
            logo: imageUrlsData.media.placeholder.cloudinaryUrl,
            description: "Their generous $50,000 grant enabled us to provide instruments to 200 students across five schools, creating lasting opportunities for musical growth.",
            impact: "200+ instruments donated",
            website: "https://example.com"
        },
        {
            name: "Community Arts Initiative",
            logo: imageUrlsData.media.placeholder.cloudinaryUrl,
            description: "Through their partnership, we've been able to expand our curriculum to include digital music production, reaching students who prefer modern music technology.",
            impact: "Digital music program launched",
            website: "https://example.com"
        }
    ]
    const services = [
        {
            number: "01",
            title: "Free Community Concerts",
            description: "Live music for underserved neighborhoods, fostering unity and cultural appreciation.",
            icon: Music
        },
        {
            number: "02",
            title: "Free Music Workshops",
            description: "Hands-on learning and mentorship to help students unlock their musical potential.",
            icon: Users
        },
        {
            number: "03",
            title: "School Partnerships",
            description: "Bringing free music programs to underfunded NYC public schools for consistent education.",
            icon: Shield
        },
        {
            number: "04",
            title: "Music for Wellness",
            description: "Music education in community centers, hospitals, and senior homes to promote emotional well-being.",
            icon: Heart
        },
        {
            number: "05",
            title: "Collaborative Performances",
            description: "Partnering with local artists and ensembles to give students confidence-building stage experience.",
            icon: Star
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
                        <span className="text-gray-600">Partners</span>
                    </div>
                </div>
            </div>

            {/* Hero Section - Inspired by charity demo */}
            <section className="relative py-16 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat" style={{
                backgroundImage: `url('${imageUrlsData.partners.heroBackground.cloudinaryUrl}')`
            }}>
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        >
                            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8">
                                <Heart className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                                <span className="font-semibold text-gray-700 text-sm md:text-base">Because Only Together We Can</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                                Powering the Future through Music
                            </h1>
                            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed drop-shadow-md">
                                With the support of our partners, we bring music and joy to underserved students across New York City.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section - Inspired by charity demo */}
            <section className="py-12 md:py-16 lg:py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-center md:text-left">Who We Are</h2>
                                <p className="text-sm md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                                    Partnering to build a world where all children have access to music education, regardless of their circumstances.
                                </p>
                                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                                    <span className="font-bold">Harmony 4 All</span> is a 501(c)(3) nonprofit organization dedicated to providing free access to high-quality music education and resources to underserved K-12 students. Our mission is to help students from low-income families, underfunded schools, and marginalized communities discover their musical potential.
                                </p>
                                <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                                    We offer free musical instrument rentals, repairs, and access to musical curriculums, ensuring that every child has the opportunity to experience the transformative power of music.
                                </p>
                                <div className="flex justify-center md:justify-start">
                                    <Link href="/about">
                                        <Button className="bg-black text-white hover:bg-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base">
                                            Read More
                                            <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="space-y-3 md:space-y-4">
                                    <div className="relative w-full h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden">
                                        <Image
                                            src={imageUrlsData.partners.whoWeAreImages[0]?.cloudinaryUrl || ""}
                                            alt="Students with instruments"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative w-full h-36 md:h-48 rounded-xl md:rounded-2xl overflow-hidden">
                                        <Image
                                            src={imageUrlsData.partners.whoWeAreImages[1]?.cloudinaryUrl || ""}
                                            alt="Music education"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 md:space-y-4 pt-6 md:pt-8">
                                    <div className="relative w-full h-36 md:h-48 rounded-xl md:rounded-2xl overflow-hidden">
                                        <Image
                                            src={imageUrlsData.partners.whoWeAreImages[2]?.cloudinaryUrl || ""}
                                            alt="Community music"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="relative w-full h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden">
                                        <Image
                                            src={imageUrlsData.partners.whoWeAreImages[3]?.cloudinaryUrl || ""}
                                            alt="Youth music program"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section - Redesigned */}
            <section className="py-6 md:py-8 lg:py-10 bg-white relative overflow-hidden">

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-16 md:mb-20 lg:mb-24">
                            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-black to-gray-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-full mb-6 md:mb-8 shadow-2xl">
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <Music className="h-3 w-3 md:h-4 md:w-4" />
                                </div>
                                <span className="font-bold text-sm md:text-lg">Our Mission</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 md:mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                                What We Do
                            </h2>
                            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12">
                                Our comprehensive approach to making music education accessible to all students,
                                creating opportunities that transform lives through the power of music.
                            </p>
                            <div className="w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-black to-gray-600 mx-auto rounded-full"></div>
                        </div>

                        {/* Services Grid - Dynamic Layout */}
                        <div className="relative mb-12 md:mb-16 lg:mb-20">
                            {/* Background decorative elements */}

                            <div className="relative z-10">
                                {/* Alternating Layout */}
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className={`mb-8 md:mb-12 last:mb-0 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                                        style={{ transitionDelay: `${index * 300}ms` }}
                                    >
                                        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 md:gap-12 transition-all duration-700 hover:scale-105 group`}>

                                            {/* Content Side */}
                                            <div className="flex-1 text-center lg:text-left">
                                                <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-black to-gray-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6 shadow-lg">
                                                    <div className="w-5 h-5 md:w-6 md:h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                        <service.icon className="h-2 w-2 md:h-3 md:w-3" />
                                                    </div>
                                                    <span className="font-bold text-xs md:text-sm">{service.number}</span>
                                                </div>

                                                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 group-hover:text-black transition-colors duration-300 leading-tight">
                                                    {service.title}
                                                </h3>

                                                <p className="text-sm md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8 group-hover:text-gray-700 transition-colors duration-300 max-w-2xl mx-auto lg:mx-0">
                                                    {service.description}
                                                </p>

                                                <div className="flex items-center justify-center lg:justify-start space-x-3 md:space-x-4">
                                                    <div className="flex items-center text-xs md:text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2 md:mr-3 animate-pulse"></div>
                                                        <span className="font-semibold">Active Program</span>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* Visual Side */}
                                            <div className="flex-1 relative">
                                                <div className="relative">
                                                    {/* Main Card */}
                                                    <div className="bg-white/90 backdrop-blur-sm shadow-2xl border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 transform group-hover:rotate-2 group-hover:scale-105 transition-all duration-700">
                                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-black via-gray-800 to-black rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                                                            <service.icon className="h-12 w-12 md:h-16 md:w-16 text-white" />
                                                        </div>
                                                        <div className="text-center">
                                                            <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3">{service.title}</h4>
                                                            <p className="text-sm md:text-base text-gray-600 leading-relaxed">{service.description}</p>
                                                        </div>
                                                    </div>

                                                    {/* Floating Elements */}
                                                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-white-400 to-black-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
                                                        <Music className="h-6 w-6 md:h-8 md:w-8 text-black" />
                                                    </div>
                                                    <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-white-400 to-black-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                                        <Star className="h-5 w-5 md:h-6 md:w-6 text-black" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Divider */}
                                        {index < services.length - 1 && (
                                            <div className="flex justify-center mt-8 md:mt-12">
                                                <div className="w-1 h-12 md:h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA Section */}
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Make a Difference?</h3>
                                    <p className="text-sm md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                                        Discover how our comprehensive services are transforming music education
                                        and creating opportunities for students across New York City.
                                    </p>
                                    <Link href="/services">
                                        <Button className="bg-white text-black hover:bg-gray-100 px-8 md:px-12 py-4 md:py-6 text-sm md:text-lg lg:text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group font-bold">
                                            Explore Our Services
                                            <ArrowRight className="ml-2 md:ml-4 h-4 w-4 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-300" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom CSS for animations */}
                <style jsx>{`
                    @keyframes blob {
                        0% { transform: translate(0px, 0px) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                        100% { transform: translate(0px, 0px) scale(1); }
                    }
                    .animate-blob {
                        animation: blob 7s infinite;
                    }
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                    .animation-delay-4000 {
                        animation-delay: 4s;
                    }
                `}</style>
            </section>

            {/* Partners Section - Black & White Theme */}
            <section className="py-6 md:py-8 lg:py-10 bg-gray-100 relative overflow-hidden">
                {/* Minimal background pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%23f3f4f6%22 fill-opacity=%220.5%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%222%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Header Section */}
                        <div className="text-center mb-8 md:mb-12 lg:mb-24">
                            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-black text-white px-3 md:px-4 lg:px-8 py-2 md:py-4 rounded-full mb-3 md:mb-4 lg:mb-8 shadow-lg">
                                <div className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <HandHeart className="h-2 w-2 md:h-3 md:w-3 lg:h-4 lg:w-4" />
                                </div>
                                <span className="font-bold text-xs md:text-sm lg:text-lg">Partnership</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-black mb-3 md:mb-4 lg:mb-8">
                                Our Valued Partners
                            </h2>
                            <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 lg:mb-12">
                                Together with our partners, we're building a world where every child has access to music education,
                                creating a symphony of opportunities that resonate across communities.
                            </p>
                            <div className="w-12 md:w-16 lg:w-32 h-1 bg-black mx-auto rounded-full"></div>
                        </div>

                        {/* Major Partners - Timeline Style */}
                        <div className="mb-16 md:mb-32">
                            <div className="text-center mb-8 md:mb-16">
                                <h3 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-6">Major Partners</h3>
                                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Strategic partnerships that drive our mission forward
                                </p>
                            </div>

                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-black"></div>

                                <div className="space-y-12 md:space-y-20">
                                    {partners.major.map((partner, index) => (
                                        <div
                                            key={index}
                                            className={`relative ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700`}
                                            style={{ transitionDelay: `${index * 300}ms` }}
                                        >
                                            {/* Timeline Dot */}
                                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-black rounded-full border-2 md:border-4 border-white shadow-lg z-10"></div>

                                            {/* Content Container */}
                                            <div className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-16`}>
                                                {/* Logo Side */}
                                                <div className="flex-1">
                                                    <div className="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-gray-200 transform hover:scale-105 transition-all duration-500 group">
                                                        <div className={`w-32 h-32 md:w-48 md:h-48 mx-auto rounded-xl md:rounded-2xl shadow-md flex items-center justify-center group-hover:shadow-lg transition-all duration-500 ${partner.name === "Maple Grove Cemetery" ? "bg-[rgb(53,77,3)]" : "bg-white border border-gray-200"} relative`}>
                                                            <Image
                                                                src={partner.logo}
                                                                alt={`${partner.name} logo`}
                                                                fill
                                                                className="p-3 md:p-6 object-contain transition-all duration-500 group-hover:scale-110"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content Side */}
                                                <div className="flex-1 text-center">
                                                    <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg border border-gray-200">
                                                        <div className="inline-flex items-center space-x-2 bg-black text-white px-3 md:px-4 py-1 md:py-2 rounded-full mb-3 md:mb-4">
                                                            <Star className="h-3 w-3 md:h-4 md:w-4" />
                                                            <span className="font-semibold text-xs md:text-sm">Strategic Partner</span>
                                                        </div>

                                                        <h4 className="text-xl md:text-3xl font-bold text-black mb-3 md:mb-4">
                                                            {partner.name}
                                                        </h4>

                                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 md:mb-6">
                                                            A key partner in our mission to bring music education to underserved communities.
                                                        </p>

                                                        <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                                                            <Button
                                                                className="bg-black text-white hover:bg-gray-800 px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-sm md:text-base"
                                                            >
                                                                Visit Website
                                                                <ExternalLink className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Supporting Partners - Grid Layout */}
                        <div className="mb-12 md:mb-20">
                            <div className="text-center mb-8 md:mb-16">
                                <h3 className="text-2xl md:text-4xl font-bold text-black mb-3 md:mb-6">Supporting Partners</h3>
                                <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                                    Community organizations that amplify our impact
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                                {partners.community.map((partner, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group hover:-translate-y-2 border border-gray-100 overflow-hidden"
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <div className="w-full h-16 md:h-20 flex items-center justify-center mb-3 md:mb-4">
                                            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-500 group-hover:scale-110 ${partner.name === "Maple Grove Cemetery" ? "bg-[rgb(53,77,3)]" : "bg-gray-50 border border-gray-200"} relative`}>
                                                <Image
                                                    src={partner.logo}
                                                    alt={`${partner.name} logo`}
                                                    fill
                                                    className="p-1 md:p-2 object-contain transition-all duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>

                                        <h4 className="text-xs md:text-sm font-semibold text-black text-center mb-2 md:mb-3 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                                            {partner.name}
                                        </h4>

                                        <div className="text-center">
                                            <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-600 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium text-xs md:text-sm"
                                                >
                                                    Learn More
                                                    <ArrowRight className="ml-1 h-2 w-2 md:h-3 md:w-3 group-hover:translate-x-1 transition-transform duration-300" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Partnership CTA - Clean Design */}
                        <div className="text-center">
                            <div className="bg-black rounded-2xl md:rounded-3xl p-6 md:p-12 text-white shadow-2xl">
                                <div className="w-12 h-12 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                    <HandHeart className="h-6 w-6 md:h-10 md:w-10 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Become a Partner</h3>
                                <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto">
                                    Join us in making music education accessible to every child. Together, we can create lasting change.
                                </p>
                                <Link href="/contact">
                                    <Button className="bg-white text-black hover:bg-gray-100 px-6 md:px-10 py-3 md:py-4 text-sm md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group font-bold">
                                        Partner With Us
                                        <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Donate Section - Inspired by charity demo */}
            <section className="py-6 md:py-8 bg-black text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Support Us and Change the Course of a Child's Life Today!</h2>
                        <p className="text-base md:text-xl opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto">
                            Your donation directly supports students in need, providing them with instruments, education, and opportunities to discover their musical potential.
                        </p>
                        <Link href="/donate">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg rounded-full">
                                Donate
                                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

