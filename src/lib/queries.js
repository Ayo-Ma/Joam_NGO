// src/lib/queries.js
// All GROQ queries in one place

// ── Blog ──────────────────────────────────────────────────────
export const BLOG_LIST_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    publishedAt,
    readTime,
    excerpt,
    featured,
    coverImage {
      asset ->{ _id, url },
      alt
    },
    author ->{ name, photo { asset ->{ url }, alt } }
  }
`;

export const BLOG_FEATURED_QUERY = `
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    readTime,
    excerpt,
    coverImage { asset ->{ _id, url }, alt },
    author ->{ name }
  }
`;

export const BLOG_DETAIL_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    publishedAt,
    readTime,
    excerpt,
    coverImage { asset ->{ _id, url }, alt, caption },
    author ->{ name, title, photo { asset ->{ url } } },
    body,
    relatedPosts[] ->{
      _id, title, slug, category, publishedAt, readTime, excerpt,
      coverImage { asset ->{ _id, url }, alt }
    }
  }
`;

// ── Events ────────────────────────────────────────────────────
export const EVENTS_UPCOMING_QUERY = `
  *[_type == "event" && status == "upcoming"] | order(startDate asc) {
    _id,
    title,
    slug,
    type,
    startDate,
    endDate,
    location,
    description,
    coverImage { asset ->{ _id, url }, alt },
    capacity,
    capacityNote,
    rsvpLink,
    rsvpButtonText,
    needsVolunteers,
    volunteerNote,
    featured,
    status
  }
`;

export const EVENTS_PAST_QUERY = `
  *[_type == "event" && status == "completed"] | order(startDate desc) {
    _id,
    title,
    slug,
    type,
    startDate,
    location,
    recap,
    gallery[0..0] { asset ->{ _id, url }, alt },
    status
  }
`;

export const EVENT_DETAIL_QUERY = `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    type,
    startDate,
    endDate,
    location,
    description,
    body,
    coverImage { asset ->{ _id, url }, alt },
    capacity,
    capacityNote,
    rsvpLink,
    rsvpButtonText,
    needsVolunteers,
    volunteerNote,
    status,
    gallery[] { asset ->{ _id, url }, alt, caption },
    recap
  }
`;

// All events for calendar view
export const EVENTS_CALENDAR_QUERY = `
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    type,
    startDate,
    endDate,
    status,
    location { city, state }
  }
`;

// ── Impact Stories ────────────────────────────────────────────
export const IMPACT_STORIES_QUERY = `
  *[_type == "impactStory" && consentObtained == true] | order(_createdAt desc) {
    _id,
    firstName,
    slug,
    programme,
    location,
    headline,
    excerpt,
    pullQuote,
    photo { asset ->{ _id, url }, alt },
    date,
    featuredOnHomepage
  }
`;

export const IMPACT_STORY_HOMEPAGE_QUERY = `
  *[_type == "impactStory" && consentObtained == true && featuredOnHomepage == true][0] {
    _id,
    firstName,
    slug,
    programme,
    location,
    headline,
    excerpt,
    pullQuote,
    photo { asset ->{ _id, url }, alt }
  }
`;

export const IMPACT_STORY_DETAIL_QUERY = `
  *[_type == "impactStory" && slug.current == $slug][0] {
    _id,
    firstName,
    programme,
    location,
    headline,
    excerpt,
    body,
    pullQuote,
    photo { asset ->{ _id, url }, alt },
    date,
    consentObtained
  }
`;

// ── Team ──────────────────────────────────────────────────────
export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    title,
    order,
    photo { asset ->{ _id, url }, alt },
    bio,
    responsibility,
    email,
    whatsapp,
    responseCommitment,
    showOnAboutPage,
    showOnContactPage
  }
`;

// ── Partners ──────────────────────────────────────────────────
export const PARTNERS_QUERY = `
  *[_type == "partner" && active == true] | order(order asc) {
    _id,
    name,
    logo { asset ->{ _id, url }, alt },
    website,
    tier
  }
`;

// ── Programmes ────────────────────────────────────────────────
export const PROGRAMMES_QUERY = `
  *[_type == "programme"] {
    _id,
    name,
    pillar,
    headline,
    headlineItalic,
    subheadline,
    whatWeDo,
    whoWeServe,
    donations,
    coverImage { asset ->{ _id, url }, alt },
    impactStats
  }
`;

// ── Site Settings ─────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    heroHeadline,
    heroSubheadline,
    missionStatement,
    missionBody,
    contactEmail,
    contactPhone,
    address,
    socialLinks
  }
`;

// ── Homepage — all dynamic sections in one query ──────────────
export const HOMEPAGE_QUERY = `
  {
    "featuredPost": *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0] {
      _id, title, slug, category, publishedAt, readTime, excerpt,
      coverImage { asset ->{ _id, url }, alt }
    },
    "latestPosts": *[_type == "blogPost"] | order(publishedAt desc)[0..2] {
      _id, title, slug, category, publishedAt, readTime, excerpt,
      coverImage { asset ->{ _id, url }, alt }
    },
    "upcomingEvents": *[_type == "event" && status == "upcoming"] | order(startDate asc)[0..2] {
      _id, title, slug, type, startDate, location, description, featured
    },
    "impactStory": *[_type == "impactStory" && consentObtained == true && featuredOnHomepage == true][0] {
      _id, firstName, slug, programme, location, headline, excerpt, pullQuote,
      photo { asset ->{ _id, url }, alt }
    },
    "partners": *[_type == "partner" && active == true] | order(order asc) {
      _id, name, logo { asset ->{ _id, url }, alt }, website
    },
    "settings": *[_type == "siteSettings"][0] {
      heroHeadline, heroSubheadline, missionStatement, missionBody,
      contactEmail, contactPhone, address, socialLinks
    }
  }
`;