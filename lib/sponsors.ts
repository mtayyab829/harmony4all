import { imageUrlsData } from "@/lib/image-urls"

export type SponsorDetailBlock = {
  title: string
  paragraphs: string[]
  image?: { src: string; alt: string }
}

export type Sponsor = {
  slug: string
  name: string
  /** Match key for `imageUrlsData.sponsors.sponsorLogos` when not using `logoUrl` */
  logoLookupName: string
  /** External or explicit logo URL (takes precedence over Cloudinary lookup) */
  logoUrl?: string | null
  website?: string
  tier: string
  category: string
  impact: string
  description: string
  /** Extra sections on `/sponsors/[slug]`; if omitted, the detail page shows summary fields only */
  detailBlocks?: SponsorDetailBlock[]
}

export const SPONSORS: Sponsor[] = [
  {
    slug: "the-newyork-injury-law-firm",
    name: "The New York Injury Law Firm",
    logoLookupName: "THE NEWYORK INJURY LAW FIRM",
    website: "https://thenewyorkinjurylawfirm.com/",
    tier: "Gold",
    category: "Legal Partner",
    impact: "Pro Bono Services & Sponsorship",
    description:
      "The New York Injury Law Firm is a dedicated personal injury law firm committed to helping victims secure the compensation they deserve. With a client-first approach, the firm provides experienced legal representation in cases involving accidents, negligence, and wrongful injuries while supporting community initiatives through sponsorship and pro bono services.",
    detailBlocks: [
      {
        title: "About the Firm",
        paragraphs:
          ["The New York Injury Law Firm focuses exclusively on personal injury law, advocating for individuals who have been harmed due to the negligence of others. Their team is committed to delivering personalized legal strategies and achieving favorable outcomes for clients across New York."],
      },
      {
        title: "Practice Areas",
        paragraphs:
          ["The firm handles a wide range of personal injury cases including car accidents, slip and fall incidents, workplace injuries, medical malpractice, and wrongful death claims."],
      },
      {
        title: "Client Commitment",
        paragraphs:
          ["With a strong emphasis on client care, the firm offers dedicated support throughout the legal process, ensuring clear communication, transparency, and aggressive representation when it matters most."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Beyond legal services, the firm actively contributes to community initiatives by offering pro bono assistance and supporting organizations through sponsorships, reinforcing its commitment to making a positive impact."],
      }
    ]
  },
  {
    slug: "new-york-state-senator-joseph-p-addabbo-jr",
    name: "New York State Senator Joseph P. Addabbo, Jr.",
    logoLookupName: "New York State Senator Joseph P. Addabbo",
    website: "https://www.nysenate.gov/senators/joseph-p-addabbo-jr",
    tier: "Gold",
    category: "Government Partner",
    impact: "Legislative Support & Advocacy",
    description:
      "Senator Joseph P. Addabbo, Jr. is a dedicated public servant representing New York’s 15th Senate District, committed to improving the lives of residents through effective legislation, community engagement, and advocacy for families, small businesses, and vulnerable populations.",
    detailBlocks: [
      {
        title: "About the Senator",
        paragraphs:
          ["Joseph P. Addabbo, Jr. serves in the New York State Senate, where he focuses on addressing the needs of diverse communities across Queens. His work reflects a strong commitment to public service, transparency, and improving quality of life for constituents."],
      },
      {
        title: "Legislative Focus",
        paragraphs:
          ["His legislative efforts prioritize supporting families, seniors, veterans, and working individuals, while promoting economic growth, environmental protection, and government accountability."],
      },
      {
        title: "Leadership & Roles",
        paragraphs:
          ["Senator Addabbo serves as Chairman of the Senate Committee on Racing, Gaming and Wagering and plays an active role in shaping policies that impact economic development and public welfare across New York State."],
      },
      {
        title: "Community Engagement",
        paragraphs:
          ["With a strong focus on accessibility and responsiveness, he maintains close connections with his constituents, providing support, resources, and advocacy on issues affecting everyday New Yorkers."],
      },
      {
        title: "Public Service Background",
        paragraphs:
          ["Before serving in the State Senate, he was a member of the New York City Council and has built a long-standing career in public service, continuing a family legacy of civic leadership."],
      }
    ]
  },
  {
    slug: "new-york-state-office-of-the-governor",
    name: "New York State Office of the Governor",
    logoLookupName: "New York State Office of the Governor",
    website: "https://www.governor.ny.gov",
    tier: "Platinum",
    category: "Government Partner",
    impact: "State-Level Support",
    description:
      "The New York State Office of the Governor, led by Governor Kathy Hochul, is committed to advancing policies that strengthen communities, expand economic opportunity, and support education, public safety, and statewide development initiatives.",
    detailBlocks: [
      {
        title: "About the Office",
        paragraphs:
          ["The Office of the Governor oversees the executive branch of New York State, leading statewide initiatives and implementing policies designed to improve the quality of life for residents across diverse communities."],
      },
      {
        title: "Leadership",
        paragraphs:
          ["Governor Kathy Hochul serves as the 57th Governor of New York, focusing on building a stronger, safer, and more affordable state through inclusive leadership and strategic policymaking."],
      },
      {
        title: "Key Priorities",
        paragraphs:
          ["The administration prioritizes economic development, education, infrastructure, public safety, and support for working families, while also investing in community growth and cultural initiatives."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Through grants, programs, and partnerships, the Office supports local organizations, arts and education initiatives, and community-driven development projects that create long-term impact."],
      },
      {
        title: "Public Service Commitment",
        paragraphs:
          ["The Office emphasizes transparency, accessibility, and responsive governance, ensuring that residents have access to resources, services, and opportunities across the state."],
      }
    ]
  },
  {
    slug: "new-york-state-legislature",
    name: "New York State Legislature",
    logoLookupName: "New York State Legislature",
    website: "https://www.nysenate.gov/issues/new-york-state-legislature",
    tier: "Platinum",
    category: "Government Partner",
    impact: "Legislative Framework",
    description:
      "The New York State Legislature is the lawmaking body of the State of New York, responsible for developing and passing legislation that supports public services, education, economic growth, and community development initiatives.",
    detailBlocks: [
      {
        title: "About the Legislature",
        paragraphs:
          ["The New York State Legislature is a bicameral body composed of the State Senate and the State Assembly, working together to create, amend, and enact laws that serve the people of New York."],
      },
      {
        title: "Structure",
        paragraphs:
          ["The Legislature consists of two chambers: the Senate and the Assembly. Each chamber plays a critical role in reviewing proposed laws, approving budgets, and representing the interests of constituents across the state."],
      },
      {
        title: "Legislative Responsibilities",
        paragraphs:
          ["Its primary responsibilities include drafting legislation, approving the state budget, overseeing government operations, and ensuring that laws address the evolving needs of communities."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Through policymaking and funding decisions, the Legislature supports education, arts programs, infrastructure, and local initiatives that contribute to long-term community growth and cultural development."],
      },
      {
        title: "Public Engagement",
          paragraphs:
          ["The Legislature promotes transparency and civic participation by providing access to legislative sessions, public hearings, and resources that allow residents to stay informed and involved."],
      }
    ]
  },
  {
    slug: "new-york-state-council-on-the-arts",
    name: "New York State Council on the Arts",
    logoLookupName: "New York State Council on the Arts",
    website: "https://arts.ny.gov/our-mission",
    tier: "Gold",
    category: "Arts Council",
    impact: "Arts Funding & Support",
    description:
      "The New York State Council on the Arts (NYSCA) is dedicated to supporting and promoting arts, culture, and creativity across New York State by providing funding, resources, and leadership to artists and cultural organizations.",
    detailBlocks: [
      {
        title: "About NYSCA",
        paragraphs:
          ["The New York State Council on the Arts is a state agency that fosters cultural development by supporting nonprofit arts organizations, individual artists, and creative initiatives throughout New York."],
      },
      {
        title: "Mission",
        paragraphs:
          ["NYSCA’s mission is to strengthen the cultural vitality of New York State by investing in the arts, ensuring accessibility, and encouraging artistic excellence in communities of all sizes."],
      },
      {
        title: "Funding & Programs",
        paragraphs:
          ["The agency provides grants and funding opportunities to support a wide range of artistic disciplines, including visual arts, performing arts, literature, and community-based cultural programs."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Through its investments, NYSCA enhances education, preserves cultural heritage, and expands public access to the arts, contributing to economic growth and community well-being."],
      },
      {
        title: "Statewide Reach",
        paragraphs:
          ["NYSCA serves communities across the entire state, ensuring that arts and cultural opportunities are accessible to diverse populations and regions."],
      }
    ]
  },
  {
    slug: "new-york-city-department-of-cultural-affairs",
    name: "New York City Department of Cultural Affairs",
    logoLookupName: "New York City Department of Cultural Affairs",
    website: "https://www.nyc.gov/site/dcla/index.page",
    tier: "Gold",
    category: "City Government",
    impact: "Cultural Programming Support",
    description:
      "The New York City Department of Cultural Affairs (DCLA) supports and strengthens New York City’s vibrant cultural community by funding nonprofit arts organizations, providing resources, and promoting access to arts and culture for all residents.",
    detailBlocks: [
      {
        title: "About DCLA",
        paragraphs:
          ["The New York City Department of Cultural Affairs is the largest municipal funder of the arts in the United States, dedicated to sustaining and growing the city’s diverse cultural ecosystem."],
      },
      {
        title: "Mission",
        paragraphs:
          ["DCLA’s mission is to ensure that all New Yorkers have access to high-quality cultural experiences by supporting artists and cultural organizations across the five boroughs."],
      },
      {
        title: "Programs & Funding",
        paragraphs:
          ["The department provides grants, technical assistance, and resources to hundreds of nonprofit cultural organizations, supporting programming in visual arts, performing arts, museums, and community-based initiatives."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Through its investments, DCLA expands arts education, fosters cultural equity, and enhances the quality of life in neighborhoods by making arts and culture accessible to diverse communities."],
      },
      {
        title: "Citywide Reach",
        paragraphs:
          ["DCLA works across all five boroughs of New York City, ensuring equitable distribution of cultural resources and opportunities for residents and visitors alike."],
      }
    ]
  },
  {
    slug: "new-york-foundation-for-the-arts",
    name: "New York Foundation for the Arts",
    logoLookupName: "New York Foundation for the Arts",
    website: "https://www.nyfa.org",
    tier: "Silver",
    category: "Arts Foundation",
    impact: "Artist Support & Resources",
    description:
      "The New York Foundation for the Arts (NYFA) is a nonprofit organization dedicated to empowering artists and cultural workers by providing funding, professional development, and resources to support creative careers and artistic communities.",
    detailBlocks: [
      {
        title: "About NYFA",
        paragraphs:
          ["The New York Foundation for the Arts is a leading nonprofit that supports artists at all stages of their careers, offering services that foster creativity, professional growth, and sustainability in the arts."],
      },
      {
        title: "Mission",
        paragraphs:
          ["NYFA’s mission is to empower artists and cultural workers by providing critical support, resources, and opportunities that enable them to thrive in an evolving creative landscape."],
      },
      {
        title: "Programs & Services",
        paragraphs:
          ["The organization offers grants, fellowships, fiscal sponsorship, professional development programs, and online resources that help artists build and sustain their careers."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Through its initiatives, NYFA strengthens the creative economy, supports diverse artistic voices, and expands access to arts education and cultural opportunities."],
      },
      {
        title: "Global Reach",
        paragraphs:
          ["While rooted in New York, NYFA serves artists nationally and internationally through digital platforms, partnerships, and accessible programming."],
      }
    ]
  },
  {
    slug: "citizens-committee-for-new-york-city",
    name: "Citizens Committee for New York City",
    logoLookupName: "Citizens Committee for New York City",
    website: "https://www.citizensnyc.org/",
    tier: "Silver",
    category: "Non-Profit Organization",
    impact: "Community Support & Resources",
    description:
      "Citizens Committee for New York City (CitizensNYC) is a nonprofit organization dedicated to empowering residents to lead change in their communities by providing funding, resources, and support for grassroots initiatives.",
    detailBlocks: [
      {
        title: "About CitizensNYC",
        paragraphs:
          ["Founded in 1975, Citizens Committee for New York City works to strengthen neighborhoods by supporting local leaders and community groups with the tools and funding needed to create positive change."],
      },
      {
        title: "Mission",
        paragraphs:
          ["The organization’s mission is to empower New Yorkers to improve their communities by investing in grassroots solutions and fostering civic engagement."],
      },
      {
        title: "Programs & Support",
        paragraphs:
          ["CitizensNYC provides micro-grants, training, and ongoing support to community leaders working on projects related to education, environment, arts, public safety, and neighborhood revitalization."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Through its initiatives, the organization has supported thousands of community-led projects, helping residents address local challenges and strengthen social connections across neighborhoods."],
      },
      {
        title: "Legacy & Reach",
        paragraphs:
          ["With decades of impact, CitizensNYC continues to play a vital role in fostering civic participation and supporting diverse communities throughout New York City."],
      }
    ]
  },
  {
    slug: "villa-russo",
    name: "Villa Russo",
    logoLookupName: "Villa Russo",
    website: "https://www.villarussocatering.com",
    tier: "Silver",
    category: "Venue Partner",
    impact: "Youth Performance Venue",
    description:
      "Villa Russo is a family-owned catering and event venue known for hosting elegant celebrations and community events, providing a welcoming space that supports performances, cultural gatherings, and special occasions.",
    detailBlocks: [
      {
        title: "About Villa Russo",
        paragraphs:
          ["Villa Russo is a premier event venue with a long-standing reputation for excellence in hospitality, offering beautifully designed spaces for weddings, performances, and community events."],
      },
      {
        title: "History",
        paragraphs:
          ["Founded as a family-owned business, Villa Russo has grown over decades into a well-established venue in Queens, maintaining its commitment to quality service, tradition, and community engagement."],
      },
      {
        title: "Venue & Services",
        paragraphs:
          ["The venue offers full-service event planning, catering, and customizable spaces suitable for performances, banquets, and large-scale gatherings."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Villa Russo plays an important role in supporting local organizations and cultural initiatives by providing a space for events that bring communities together."],
      },
      {
        title: "Legacy",
        paragraphs:
          ["With its combination of tradition, hospitality, and modern amenities, Villa Russo continues to be a trusted destination for memorable events and community celebrations."],
      }
    ]
  },
  {
    slug: "ahhaa",
    name: "Ahhaa",
    logoLookupName: "Ahhaa",
    logoUrl: "https://www.ahhaa.com/_assets/v11/401d2ea6986c1aa247a8ec5e3e20eed9337125d3.png",
    website: "https://www.ahhaa.com/",
    tier: "Silver",
    category: "Wellness & Technology Partner",
    impact: "Mental Wellness & Personal Development",
    description:
      "Ahhaa is a mental wellness and personal growth platform that helps individuals build emotional awareness, develop positive habits, and improve overall well-being through science-backed tools and guided experiences.",
    detailBlocks: [
      {
        title: "About Ahhaa",
        paragraphs:
          ["Ahhaa is a digital wellness platform focused on helping individuals understand their emotions, build healthier habits, and achieve personal growth through structured, science-based practices."],
      },
      {
        title: "Core Approach",
        paragraphs:
          ["The platform combines behavioral science, psychology, and habit-building techniques to create meaningful 'Aha' moments—helping users gain clarity, shift mindset, and drive lasting change. :contentReference[oaicite:0]{index=0}"],
      },
      {
        title: "Platform & Features",
        paragraphs:
          ["Ahhaa offers guided emotional check-ins, habit tracking, and micro-practices such as breathwork, reflection, and visualization to support mental well-being and self-awareness. :contentReference[oaicite:1]{index=1}"],
      },
      {
        title: "Programs & Use Cases",
        paragraphs:
          ["The platform is used by individuals, organizations, schools, and corporates to improve emotional intelligence, resilience, and performance through structured wellness programs. :contentReference[oaicite:2]{index=2}"],
      },
      {
        title: "Impact",
        paragraphs:
          ["By focusing on emotional awareness and behavioral change, Ahhaa helps users reduce stress, improve focus, and build sustainable personal growth habits across different areas of life. :contentReference[oaicite:3]{index=3}"],
      }
    ]
  },
  {
    slug: "little-guyana-pharmacy-cafe",
    name: "Little Guyana Pharmacy & Cafe",
    logoLookupName: "Little Guyana Pharmacy & Cafe",
    logoUrl: "https://static.wixstatic.com/media/d717d4_953d7f5ff40247cdaefa2602cb818730~mv2.png",
    website: "https://littleguyanapharmacy.com/",
    tier: "Silver",
    category: "Healthcare & Community Partner",
    impact: "Community Health & Cultural Engagement",
    description:
      "Little Guyana Pharmacy & Cafe is a community-focused healthcare provider and cultural space in Queens, New York, offering affordable medications, personalized care, and a unique café experience that brings people together.",
    detailBlocks: [
      {
        title: "About the Business",
        paragraphs:
          ["Little Guyana Pharmacy & Cafe is a locally owned pharmacy based in South Richmond Hill, Queens, dedicated to providing accessible healthcare services with a strong focus on personalized patient care. :contentReference[oaicite:0]{index=0}"],
      },
      {
        title: "Unique Concept",
        paragraphs:
          ["The business combines a full-service pharmacy with a café environment, creating a welcoming space where patients can receive care while enjoying a relaxed, community-oriented atmosphere. :contentReference[oaicite:1]{index=1}"],
      },
      {
        title: "Services",
        paragraphs:
          ["Services include prescription filling, medication counseling, free delivery, insurance support, immunizations, and access to affordable medications, ensuring comprehensive care for patients. :contentReference[oaicite:2]{index=2}"],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["Rooted in the Indo-Caribbean community of Queens, the business focuses on culturally relevant care, offering familiar products and a supportive environment that builds trust and connection among residents. :contentReference[oaicite:3]{index=3}"],
      },
      {
        title: "Mission & Vision",
        paragraphs:
          ["The pharmacy aims to transform the traditional healthcare experience by making it more personal, accessible, and community-driven—ensuring every patient feels valued and supported."],
      }
    ]
  },
  {
    slug: "resorts-world-new-york-city",
    name: "Resorts World New York City",
    logoLookupName: "Resorts World New York City",
    logoUrl: "https://rwnewyork.com/wp-content/uploads/2021/05/logo_resorts-world-nyc.png",
    website: "https://rwnewyork.com/",
    tier: "Gold",
    category: "Casino & Entertainment Partner",
    impact: "Community Partnership & Sponsorship",
    description:
      "Resorts World New York City is a premier entertainment destination offering gaming, dining, and live events, while playing a significant role in supporting education and community development initiatives across New York.",
    detailBlocks: [
      {
        title: "About Resorts World NYC",
        paragraphs:
          ["Resorts World New York City is the city’s only casino, located in Queens, providing a full-scale entertainment experience that includes gaming, dining, and live performances."],
      },
      {
        title: "Entertainment & Amenities",
        paragraphs:
          ["The venue features a wide range of slot machines, electronic table games, diverse dining options, and event spaces designed to host concerts, shows, and large-scale gatherings."],
      },
      {
        title: "Community Impact",
        paragraphs:
          ["A significant portion of the casino’s revenue supports public education in New York State, making it a key contributor to statewide educational funding and community initiatives."],
      },
      {
        title: "Economic Contribution",
        paragraphs:
          ["As a major employer and economic driver in the region, Resorts World NYC contributes to job creation and local economic growth while attracting millions of visitors each year."],
      },
      {
        title: "Partnership & Sponsorship",
        paragraphs:
          ["Through sponsorships and partnerships, the organization supports cultural events, nonprofit initiatives, and community programs that enhance quality of life in New York City."],
      }
    ]
  }
]

export function resolveSponsorLogo(logoLookupName: string): string {
  const sponsor = imageUrlsData.sponsors.sponsorLogos.find(
    (s: { name: string; cloudinaryUrl?: string }) =>
      s.name.toLowerCase().includes(logoLookupName.toLowerCase()) ||
      logoLookupName.toLowerCase().includes(s.name.toLowerCase())
  )
  return sponsor?.cloudinaryUrl ?? ""
}

export function getSponsorLogoUrl(sponsor: Sponsor): string {
  if (sponsor.logoUrl) return sponsor.logoUrl
  return resolveSponsorLogo(sponsor.logoLookupName)
}

export function getAllSponsors(): Sponsor[] {
  const priorityOrder = [
    "resorts-world-new-york-city",
    "the-newyork-injury-law-firm",
  ]

  const priorityMap = new Map(priorityOrder.map((slug, index) => [slug, index]))

  return [...SPONSORS].sort((a, b) => {
    const aRank = priorityMap.has(a.slug) ? (priorityMap.get(a.slug) as number) : Number.MAX_SAFE_INTEGER
    const bRank = priorityMap.has(b.slug) ? (priorityMap.get(b.slug) as number) : Number.MAX_SAFE_INTEGER
    return aRank - bRank
  })
}

export function getSponsorBySlug(slug: string): Sponsor | undefined {
  return SPONSORS.find((s) => s.slug === slug)
}
