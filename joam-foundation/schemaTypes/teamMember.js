// schemas/teamMember.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "teamMember",
  title: "Team Member",
  type:  "document",
  icon:  () => "👤",

  fields: [
    defineField({
      name:       "name",
      title:      "Full Name",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:       "title",
      title:      "Title / Role",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:  "order",
      title: "Display Order",
      type:  "number",
      description: "Lower number = shown first. Jacob = 1, Abubakar = 2.",
    }),
    defineField({
      name:  "photo",
      title: "Photo",
      type:  "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name:       "bio",
      title:      "Bio",
      type:       "text",
      rows:       4,
      validation: R => R.required(),
    }),
    defineField({
      name:  "responsibility",
      title: "Area of Responsibility",
      type:  "text",
      rows:  2,
      description: "Short statement about what they oversee — shown on Contact page.",
    }),
    defineField({
      name:  "email",
      title: "Email Address",
      type:  "email",
    }),
    defineField({
      name:  "whatsapp",
      title: "WhatsApp Number",
      type:  "string",
      description: "Include country code — e.g. +2348095900357",
    }),
    defineField({
      name:  "responseCommitment",
      title: "Response Commitment",
      type:  "string",
      description: "e.g. 'Responds to donor enquiries within 48 hours.'",
    }),
    defineField({
      name:  "showOnAboutPage",
      title: "Show on About Page",
      type:  "boolean",
      initialValue: true,
    }),
    defineField({
      name:  "showOnContactPage",
      title: "Show on Contact Page",
      type:  "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title:    "name",
      subtitle: "title",
      media:    "photo",
    },
  },

  orderings: [
    {
      title: "Display Order",
      name:  "orderAsc",
      by:    [{ field: "order", direction: "asc" }],
    },
  ],
});