// schemas/siteSettings.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "siteSettings",
  title: "Site Settings",
  type:  "document",
  icon:  () => "⚙️",
  __experimental_actions: ["update", "publish"],

  fields: [
    defineField({
      name:  "heroHeadline",
      title: "Homepage Hero Headline",
      type:  "string",
    }),
    defineField({
      name:  "heroSubheadline",
      title: "Homepage Hero Subheadline",
      type:  "text",
      rows:  2,
    }),
    defineField({
      name:  "missionStatement",
      title: "Mission Statement Quote",
      type:  "text",
      rows:  2,
    }),
    defineField({
      name:  "missionBody",
      title: "Mission Body Copy",
      type:  "text",
      rows:  3,
    }),
    defineField({
      name:  "contactEmail",
      title: "General Contact Email",
      type:  "email",
    }),
    defineField({
      name:  "contactPhone",
      title: "General Contact Phone",
      type:  "string",
    }),
    defineField({
      name:  "address",
      title: "Office Address",
      type:  "text",
      rows:  3,
    }),
    defineField({
      name:  "socialLinks",
      title: "Social Media Links",
      type:  "object",
      fields: [
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "facebook",  type: "url", title: "Facebook"  },
        { name: "twitter",   type: "url", title: "Twitter/X" },
        { name: "linkedin",  type: "url", title: "LinkedIn"  },
      ],
    }),
  ],
});