/**
 * JOAM Foundation — Real Content
 * Source: JOAM_Foundation_1.docx + Jacob Adesina direct message
 * Use this to replace all placeholder brackets across the site
 */

export const SITE_CONTENT = {

  // ── Contact ──────────────────────────────────────────────
  contact: {
    email:        "joamfoundation1@gmail.com",
    phone:        "+234 809 590 0357", // Jacob's WhatsApp — to be updated with general line
    address:      "[Full address — to be confirmed by Jacob]",
    city:         "Nigeria",
  },

  // ── Foundation meta ──────────────────────────────────────
  foundation: {
    fullName:     "Janet Oluwaremilekun Adesina Memorial Foundation",
    shortName:    "JOAM Foundation",
    established:  "2024", // new foundation — confirm exact year with Jacob
    anniversary:  "30 years since Janet's passing (1996–2026)",
  },

  // ── Janet's Story — REAL CONTENT ────────────────────────
  janet: {
    fullName:     "Mrs. Janet Oluwaremilekun Adesina",
    dateOfPassing:"September 24, 1996",
    causeOfDeath: "postnatal complications",
    relationship: "mother of Jacob Olaoluwa Adesina, the Founder",
    legacy:       `Mrs. Janet Oluwaremilekun Adesina devoted her life to supporting underserved communities. Her efforts were particularly focused on women facing maternal health challenges, economically disadvantaged students, and elderly individuals in need of care and assistance. Her dedication reflected a deep sense of responsibility toward improving the well-being of others and fostering dignity within vulnerable populations.`,
    character:    "She was widely recognised for her generosity, empathy, and unwavering commitment to uplifting those around her.",
    pullQuote:    "We did not build this foundation to remember her. We built it to continue her.",
    context:      "As the Foundation marks 30 years since her passing, it serves as a platform to institutionalise her values through structured programmes and initiatives.",
  },

  // ── Official Programme Names ─────────────────────────────
  programmes: [
    {
      id:           "maternal",
      officialName: "Comprehensive Maternal Health Support Program",
      shortName:    "Maternal Healthcare",
      pillar:       "Pillar One",
    },
    {
      id:           "scholarships",
      officialName: "Educational Access and Scholarship Program",
      shortName:    "Student Scholarships",
      pillar:       "Pillar Two",
    },
    {
      id:           "elderly",
      officialName: "Senior Care and Support Service Program",
      shortName:    "Elderly Care",
      pillar:       "Pillar Three",
    },
  ],

  // ── Team ─────────────────────────────────────────────────
  team: [
    {
      name:     "Jacob Olaoluwa Adesina",
      title:    "Founder & Executive Director",
      email:    "jacobgreat1@gmail.com",
      whatsapp: "+234 809 590 0357",
      bio:      `Jacob Olaoluwa Adesina is the Founder and Executive Director of the JOAM Foundation. As the only surviving child of the late Mrs. Janet Oluwaremilekun Adesina, he has long been committed to preserving and advancing her lifelong dedication to helping vulnerable populations. A trained historian who has led organisations in different capacities, Jacob brings a thoughtful and disciplined perspective to his leadership — guided by a deep sense of responsibility and service. The establishment of the Foundation reflects both a personal calling and a purposeful step toward institutionalising his mother's impact.`,
      responsibility: "Overall foundation strategy, donor relationships, partnerships, and programme oversight.",
      responseCommitment: "Responds to donor and partnership enquiries within 48 hours.",
      photo: null, // to be uploaded to Sanity CMS when available
    },
    {
      name:     "Abubakar Abdulbasit",
      title:    "Programme Director",
      email:    null,
      whatsapp: "+234 816 816 6347",
      bio:      "[Abubakar's details to follow — he will send separately.]",
      responsibility: "Day-to-day programme delivery across maternal care, scholarships, and elderly support.",
      responseCommitment: "Responds to programme and beneficiary enquiries within 48 hours.",
      photo: null, // to be uploaded to Sanity CMS when available
    },
  ],

  // ── Impact Numbers — placeholder until real data exists ──
  impactNumbers: [
    { value: "Coming Soon", label: "Mothers Supported"  },
    { value: "Coming Soon", label: "Students Funded"    },
    { value: "Coming Soon", label: "Elders Served"      },
    { value: "30",          label: "Years of Legacy"    },
  ],

  // ── Notes for the developer ──────────────────────────────
  notes: {
    photos:    "No team photos available yet. Jacob confirms photos will follow. Use initials placeholder until then.",
    events:    "No formal events have taken place yet. Foundation is new — events section should reflect this.",
    programmes:"Foundation sprang from informal initiatives over 5+ consecutive years before formal establishment.",
    email:     "General foundation email is joamfoundation1@gmail.com — update all placeholder emails site-wide.",
  },
};