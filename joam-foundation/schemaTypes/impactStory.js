// schemas/impactStory.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "impactStory",
  title: "Impact Story",
  type:  "document",
  icon:  () => "❤️",

  fields: [
    defineField({
      name:       "firstName",
      title:      "First Name",
      type:       "string",
      description: "First name only — for beneficiary privacy.",
      validation: R => R.required(),
    }),
    defineField({
      name:  "slug",
      title: "Slug",
      type:  "slug",
      options: { source: "firstName", maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name:  "programme",
      title: "Programme",
      type:  "string",
      options: {
        list: [
          { title: "Maternal Healthcare", value: "Maternal Healthcare" },
          { title: "Student Scholarships", value: "Student Scholarships" },
          { title: "Elderly Care",         value: "Elderly Care"         },
        ],
        layout: "radio",
      },
      validation: R => R.required(),
    }),
    defineField({
      name:       "location",
      title:      "Location",
      type:       "string",
      description: "City, State — e.g. Ado-Ekiti, Ekiti State",
      validation: R => R.required(),
    }),
    defineField({
      name:       "headline",
      title:      "Story Headline",
      type:       "string",
      description: "The bold impact statement — e.g. 'She arrived alone. She left a mother.'",
      validation: R => R.required(),
    }),
    defineField({
      name:       "excerpt",
      title:      "Short Excerpt",
      type:       "text",
      rows:       3,
      description: "Shown on homepage and programme pages. Max 250 characters.",
      validation: R => R.required().max(250),
    }),
    defineField({
      name:  "body",
      title: "Full Story",
      type:  "array",
      of:    [{ type: "block" }],
    }),
    defineField({
      name:       "pullQuote",
      title:      "Pull Quote",
      type:       "text",
      rows:       2,
      description: "Direct quote from the beneficiary.",
    }),
    defineField({
      name:  "photo",
      title: "Beneficiary Photo",
      type:  "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
      description: "Only add with explicit written consent from the beneficiary.",
    }),
    defineField({
      name:  "date",
      title: "Date of Story",
      type:  "date",
    }),
    defineField({
      name:  "featuredOnHomepage",
      title: "Show on Homepage",
      type:  "boolean",
      description: "Display this story in the homepage impact story section.",
      initialValue: false,
    }),
    defineField({
      name:  "consentObtained",
      title: "Beneficiary Consent Obtained",
      type:  "boolean",
      description: "Confirm written consent has been obtained before publishing.",
      initialValue: false,
      validation: R => R.required(),
    }),
  ],

  preview: {
    select: {
      title:     "firstName",
      programme: "programme",
      location:  "location",
      media:     "photo",
    },
    prepare({ title, programme, location, media }) {
      return {
        title,
        subtitle: `${programme} · ${location}`,
        media,
      };
    },
  },
});