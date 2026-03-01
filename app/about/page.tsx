"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Eye, Users, Music, Award, Star, Calendar, MapPin, Phone, Mail, ArrowRight, Wrench, Mic, Gift } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { imageUrlsData } from "@/lib/image-urls"

export default function AboutPage() {

  const teamMembers = [
    {
      name: "Bianca Quddus",
      role: "Co-Founder",
      bio: "Bianca Quddus is a Global Youth Ambassador to the Foundation of Support for the United Nations, a student at the New York City Specialized High School, The Bronx High School of Science, and a clarinet student in the Juilliard School's Preparatory Division.",
      image: imageUrlsData.about.teamMembers[0]?.cloudinaryUrl || "",
      achievements: ["Global Youth Ambassador", "Bronx High School of Science", "Juilliard Preparatory Division"]
    },
    {
      name: "Joshua Quddus",
      role: "Co-Founder",
      bio: "Joshua Quddus is a Global Youth Ambassador to the Foundation of Support for the United Nations, a sophomore at the prestigious Hunter College High School, and a saxophone student at the Juilliard School's Preparatory Division. In addition, he is also an educator, programmer, and a mathematics enthusiast.",
      image: imageUrlsData.about.teamMembers[1]?.cloudinaryUrl || "",
      achievements: ["Global Youth Ambassador", "Hunter College High School", "Juilliard Preparatory Division"]
    }
  ]

  const storyMilestones = [
    {
      year: "Elementary School",
      event: "Began musical journey at PS100Q in South Ozone Park, Queens",
      details: "Introduced to music through recorder by inspiring teacher April Rachmuth",
      image: imageUrlsData.about.storyMilestones[0]?.cloudinaryUrl || ""
    },
    {
      year: "Carnegie Hall",
      event: "Performed on-stage in Carnegie Hall's prestigious Link-Up program",
      details: "Played alongside a professional orchestra, solidifying their commitment to music",
      image: imageUrlsData.about.storyMilestones[1]?.cloudinaryUrl || ""
    },
    {
      year: "Instrument Access",
      event: "Faced limitations with only clarinets and saxophones available",
      details: "Teacher taught <strong>Bianca</strong> clarinet and <strong>Joshua</strong> saxophone to continue musical education",
      image: imageUrlsData.about.storyMilestones[2]?.cloudinaryUrl || ""
    },
    {
      year: "Juilliard MAP",
      event: "Enrolled in the Juilliard Music Advancement Program",
      details: "Deepened understanding of barriers within the music community and education",
      image: imageUrlsData.about.storyMilestones[3]?.cloudinaryUrl || ""
    },
    {
      year: "Foundation",
      event: "Founded Harmony 4 All to break down barriers in music education",
      details: "Committed to making music education accessible to all aspiring young musicians",
      image: imageUrlsData.about.storyMilestones[4]?.cloudinaryUrl || ""
    }
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-black hover:text-gray-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrlsData.about.heroBackground.cloudinaryUrl}
            alt=""
            fill
            sizes="100vw"
            quality={75}
            className="object-cover"
            priority
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-3 md:mb-6 drop-shadow-lg text-center">About Us</h1>

          </div>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-12 lg:mb-16">
              <div className="inline-flex items-center space-x-2 bg-black text-white px-3 md:px-6 py-2 md:py-3 rounded-full mb-3 md:mb-6">
                <Music className="h-3 w-3 md:h-5 md:w-5" />
                <span className="font-semibold text-xs md:text-base">ABOUT US</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">Empowering Through Music</h2>
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                A New York City based, 501(c)(3) nonprofit organization committed to making music education accessible to underserved students.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <div className="space-y-4 md:space-y-6 lg:space-y-8">


                <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-3 md:mb-4 lg:mb-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black rounded-xl flex items-center justify-center mr-2 md:mr-3 lg:mr-4">
                      <Users className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Our Services</h3>
                  </div>
                  <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed mb-2 md:mb-3 lg:mb-4">
                    We offer free instrument rentals and repairs to students, ensuring that all students have the tools
                    they need to explore and develop their musical talents.
                  </p>
                  <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                    We provide musical curriculum to teachers, ensuring that all students have access to quality
                    music education regardless of their school's resources.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center mb-3 md:mb-4 lg:mb-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black rounded-xl flex items-center justify-center mr-2 md:mr-3 lg:mr-4">
                      <Award className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Our Impact</h3>
                  </div>
                  <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed">
                    Every gift to <span className="font-bold">Harmony 4 All</span> places music in a child's hands and hope in their heart.
                    Together, we're opening doors for underserved students across New York City-giving them confidence, community, and a voice that will resonate far beyond the classroom.
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative">
                <div className="w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl mb-4 md:mb-6 lg:mb-8 mx-auto relative">
                  <Image
                    src={imageUrlsData.about.mainImage.cloudinaryUrl}
                    alt="Young musicians playing clarinet and saxophone"
                    fill
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 320px, 384px"
                    quality={85}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 lg:mb-8">Our Mission</h2>
            <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto px-4">
              At <span className="font-bold">Harmony 4 All</span>, our mission is to ensure that music is not a privilege, but a pathway open to every child. As a youth-led nonprofit, we provide underserved K-12 students across New York City with free instruments, educational resources, and community programs. Through music, we spark creativity, strengthen confidence, and weave connections that uplift families and communities. Our vision is a world where every child can discover their voice and shape a brighter future in harmony with others.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-8 md:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 md:mb-12 lg:mb-16">
              <div className="inline-flex items-center space-x-2 bg-black text-white px-3 md:px-6 py-2 md:py-3 rounded-full mb-3 md:mb-6">
                <Eye className="h-3 w-3 md:h-5 md:w-5" />
                <span className="font-semibold text-xs md:text-base">OUR VISION</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-6">A World of Musical Opportunity</h2>
              <p className="text-sm md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                We envision a world where every aspiring musician, regardless of their background or circumstances,
                has equal access to quality music education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {/* Vision Card 1 */}
              <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-8 shadow-xl border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 mx-auto">
                  <Users className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 text-center">Unlocking Potential</h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed text-center">
                  We envision a future where every child, no matter their circumstance, can discover their voice and unlock their potential through the power of music.
                </p>
              </div>

              {/* Vision Card 2 */}
              <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-8 shadow-xl border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 mx-auto">
                  <Music className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 text-center">Opening Doors</h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed text-center">
                  Removing barriers so every young person has the chance to explore, learn, and dream through music.
                </p>
              </div>

              {/* Vision Card 3 */}
              <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-8 shadow-xl border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 mx-auto">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 text-center">Creative Expression</h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed text-center">
                  Inspiring imagination and artistry through meaningful programs that nurture the next generation of musicians.
                </p>
              </div>
              {/* Community Impact 4 */}
              <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-8 shadow-xl border border-gray-100">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-black rounded-2xl flex items-center justify-center mb-3 md:mb-4 lg:mb-6 mx-auto">
                  <Music className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 lg:mb-4 text-center">Community Impact</h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed text-center">
                  Strengthening confidence and connection across neighborhoods by sharing the universal language of music.
                </p>
              </div>
            </div>

            {/* Main Vision Statement */}
            <div className="mt-8 md:mt-16 bg-black rounded-3xl p-6 md:p-12 text-white text-center shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Building a Harmonious Future</h3>
                <p className="text-sm md:text-base lg:text-xl leading-relaxed opacity-90 ">
                  At <span className="font-bold">Harmony 4 All</span>, we believe music has the power to change lives. By placing instruments in the hands of children and opening doors to music education, we spark creativity, confidence, and connection that ripple far beyond the classroom. Together, we are creating a future where music knows no boundaries-and every child's voice can rise, be heard, and inspire the work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Core Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-black mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Excellence in Access</h3>
                <p className="text-sm text-gray-600">Ensuring music education is accessible to all</p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 text-black mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Harmony in Community</h3>
                <p className="text-sm text-gray-600">Removing barriers to participation</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-black mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Creativity with Purpose</h3>
                <p className="text-sm text-gray-600">Building confidence through music</p>
              </div>
              <div className="text-center">
                <Music className="h-12 w-12 text-black mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Generations in Resonance</h3>
                <p className="text-sm text-gray-600">Fostering artistic expression</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Story */}
      <section className="py-12 md:py-20 bg-gray-200">
        <div className="container mx-auto px-4 ">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-1 md:mb-16">
              Get to Know Us
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-16 text-center sm:text-left">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Our Story</h3>
                <div className="space-y-3 md:space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                  <p>
                    <span className="font-bold">Harmony 4 All</span> was founded by <strong>Bianca</strong> and <strong>Joshua Quddus</strong>, who began their musical journey at PS100Q,
                    a public elementary school in South Ozone Park, Queens, New York. Their inspiring music teacher,
                    April Rachmuth, introduced them to the joy of music through the recorder, igniting a passion for
                    music that shaped their future.
                  </p>
                  <p>
                    Their dedication and love for music earned them a unique opportunity to perform on-stage in Carnegie
                    Hall's prestigious Link-Up program, where they played alongside a professional orchestra. This
                    unforgettable experience solidified their commitment to music.
                  </p>
                  <p>
                    As they progressed through elementary school, <strong>Bianca</strong> and <strong>Joshua</strong> faced limitations in access to
                    advanced musical instruments. Despite the availability of only clarinets and saxophones, their
                    music teacher taught Bianca the clarinet and Joshua the saxophone, allowing them to continue
                    their musical education.
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-gray-700 rounded-2xl p-4 md:p-8">
                  <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">The Turning Point</h4>
                  <p className="text-white leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                    Witnessing many of their friends abandon their musical pursuits due to a lack of resources
                    deeply affected <strong>Bianca</strong> and <strong>Joshua</strong>. This fueled their determination to make a difference.
                  </p>
                  <p className="text-white leading-relaxed text-sm md:text-base">
                    Enrolling in the Juilliard Music Advancement Program further deepened their understanding
                    of the barriers within the music community and music education. Grateful for their opportunities,
                    <strong>Bianca</strong> and <strong>Joshua</strong> realized that not everyone had the same access to music education.
                  </p>
                </div>
              </div>
            </div>

            {/* Story Timeline */}
            <div className="space-y-6 md:space-y-8">
              {storyMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 md:space-x-6"
                >
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg flex-1">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={milestone.image}
                          alt={milestone.year}
                          fill
                          sizes="(max-width: 768px) 64px, 80px"
                          quality={80}
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg md:text-xl font-bold text-black mb-1 md:mb-2">{milestone.year}</div>
                        <div className="text-base md:text-lg font-semibold text-gray-800 mb-1 md:mb-2">{milestone.event}</div>
                        <p className="text-gray-600 text-sm md:text-base">{milestone.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 md:mt-12">
              <div className="bg-white text-gray-900 rounded-2xl p-6 md:p-12 shadow-lg border border-gray-200">
                <div className="mb-6 md:mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                    Our Commitment
                  </h3>
                </div>

                <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
                  <p className="text-gray-700 text-sm md:text-base">
                    Driven by their passion and belief in the transformative power of education, they founded <span className="font-bold">Harmony 4 All</span>. Their mission is to break down the barriers
                    hindering access to music education for aspiring young musicians from all backgrounds.
                  </p>

                  <p className="text-gray-700 text-sm md:text-base">
                    Through fundraising and resource distribution, <span className="font-bold">Harmony 4 All</span> provides essential support to underserved communities,
                    ensuring every child has the opportunity to discover and develop their musical talents. <span className="font-semibold"><strong>Bianca</strong> and <strong>Joshua</strong></span> are committed to enriching lives,
                    instilling discipline, and fostering creativity through the power of music.
                  </p>
                </div>

                <div className="mt-8 md:mt-10">
                  <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gray-100 rounded-full px-4 md:px-8 py-3 md:py-4 border border-gray-300">
                    <Music className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                    <span className="text-base md:text-xl font-semibold text-gray-800">
                      Join us in our mission to create a positive impact, one note at a time.
                    </span>
                    <Music className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">Our Team</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              <span className="font-bold">Harmony 4 All</span> is driven by a passionate youth-led team of musicians and advocates working to ensure every child has the chance to discover their voice, grow in confidence, and inspire their community through music.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white shadow-xl border-0 rounded-3xl overflow-hidden"
              >
                <div className="relative">
                  <div className="w-full h-64 md:h-96 overflow-hidden relative">
                    <Image
                      src={member.image || imageUrlsData.media.placeholder.cloudinaryUrl}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={85}
                      className="object-contain"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center shadow-lg">
                    <Music className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                </div>

                <CardContent className="p-4 md:p-8">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{member.name}</h3>
                    <Badge className="bg-black text-white text-sm md:text-lg px-4 md:px-6 py-1 md:py-2 mb-3 md:mb-4">
                      {member.role}
                    </Badge>
                    <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                      {member.bio}
                    </p>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 flex items-center">
                        <Award className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {member.achievements.slice(0, 4).map((achievement, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                            <span className="text-gray-800 text-xs md:text-sm font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notable Venues */}
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 flex items-center">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Notable Venues
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "Carnegie Hall",
                          "Lincoln Center",
                          "The Juilliard School",
                          "United Nations"
                        ].map((venue, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <Music className="h-3 w-3 text-gray-600" />
                            <span className="text-gray-800 text-xs md:text-sm font-medium">{venue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link href={`/co-founders/${index === 0 ? 'bianca' : 'joshua'}`}>
                      <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-full">
                        Learn More About {member.name.split(' ')[0]}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "2", label: "Co-Founders", icon: Users },
              { number: "100%", label: "Music Focused", icon: Music },
              { number: "NYC", label: "Based", icon: MapPin },
              { number: "501(c)(3)", label: "Nonprofit", icon: Award },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Information Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Organization Information</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn more about our nonprofit status, legal information, and how we operate to serve our community.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* Map Section */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-full relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25436351647!2d-74.11976404999999!3d40.69766374999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Harmony 4 All Location - New York City"
                  ></iframe>
                  <div className="absolute top-4 left-4 bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-gray-800">Harmony 4 All</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">New York City, NY</p>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Organization Details</h3>
                  <p className="text-gray-600">Complete transparency in our operations and governance</p>
                </div>

                <div className="p-4 space-y-8">
                  {/* Legal Status */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="h-5 w-5 text-gray-600 mr-2" />
                      Legal Status
                    </h4>
                    <div className="space-y-3 text-gray-700 text-sm md:text-base">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Nonprofit Classification:</span>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-300">501(c)(3) Tax-Exempt</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">EIN Number:</span>
                        <span className="font-mono text-sm">93-2460195</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Incorporation:</span>
                        <span>New York State</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Mail className="h-5 w-5 text-gray-600 mr-2" />
                      Contact Information
                    </h4>
                    <div className="space-y-3 text-gray-700 text-sm md:text-base">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Address:</span>
                        <span>104-44 116th Street<br />Richmond Hill, NY 11419</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Email:</span>
                        <a href="mailto:media@harmony4all.org" className="text-gray-600 hover:text-gray-800 font-medium">info@harmony4all.org</a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Website:</span>
                        <a href="https://www.harmony4all.org" className="text-gray-600 hover:text-gray-800 font-medium">www.harmony4all.org</a>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Phone:</span>
                        <span><a href="tel:+13475547712"> (737) HARMONY (427-6669)</a></span>
                      </div>
                    </div>
                  </div>

                  {/* Financial Transparency */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Eye className="h-5 w-5 text-gray-600 mr-2" />
                      Financial Transparency
                    </h4>
                    <div className="space-y-3 text-gray-700 text-sm md:text-base">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tax Returns:</span>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-300">Available upon request</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Annual Reports:</span>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-300">Published annually</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Donations:</span>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-300">Tax-deductible</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Governance */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 text-gray-600 mr-2" />
                      Governance
                    </h4>
                    <div className="space-y-3 text-gray-700 text-sm md:text-base">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">Board of Directors:</span>
                        <span className="text-right">Diane Bacchus (President)<br />Nahaz Quddus (Secretary)<br />Joshua Quddus (Treasurer)<br />Bianca Quddus (Co-Founder)</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium">Executive Leadership:</span>
                        <span className="text-right">Diane Bacchus (President)<br />All officers serve as volunteers</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="font-medium">IRS Form 990 Officers:</span>
                        <span className="text-right">All officers report $0 compensation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Turn silence into song. One gift, one child, one future forever changed by music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-white w-full hover:bg-white/60 text-black px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
              >
                <Heart className="mr-2 h-5 w-5" />
                <span>Donate Now</span>
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 w-full border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full bg-transparent transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

