// schemas/programme.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "programme",
  title: "Programme",
  type:  "document",
  icon:  () => "🏛️",

  fields: [
    defineField({
      name:  "name",
      title: "Programme Name",
      type:  "string",
      options: {
        list: [
          { title: "Maternal Healthcare",  value: "Maternal Healthcare"  },
          { title: "Student Scholarships", value: "Student Scholarships" },
          { title: "Elderly Care",         value: "Elderly Care"         },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({
      name:  "pillar",
      title: "Pillar Number",
      type:  "string",
      options: {
        list: [
          { title: "Pillar One",   value: "Pillar One"   },
          { title: "Pillar Two",   value: "Pillar Two"   },
          { title: "Pillar Three", value: "Pillar Three" },
        ],
      },
    }),
    defineField({
      name:       "headline",
      title:      "Headline",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:       "headlineItalic",
      title:      "Headline Italic Portion",
      type:       "string",
      description: "The italic green part of the headline.",
    }),
    defineField({
      name:       "subheadline",
      title:      "Subheadline",
      type:       "text",
      rows:       2,
      validation: R => R.required(),
    }),
    defineField({
      name:  "whatWeDo",
      title: "What We Do",
      type:  "text",
      rows:  4,
    }),
    defineField({
      name:  "whoWeServe",
      title: "Who We Serve",
      type:  "text",
      rows:  3,
    }),
    defineField({
      name:  "donations",
      title: "Donation Impact Levels",
      type:  "array",
      of: [
        {
          type:  "object",
          name:  "donationLevel",
          title: "Donation Level",
          fields: [
            { name: "amount", type: "string", title: "Amount (e.g. ₦5,000)" },
            { name: "covers", type: "string", title: "What It Covers"       },
          ],
        },
      ],
    }),
    defineField({
      name:  "coverImage",
      title: "Programme Image",
      type:  "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name:  "impactStats",
      title: "Impact Statistics",
      type:  "object",
      fields: [
        { name: "value", type: "string", title: "Value (e.g. 3,200+)" },
        { name: "label", type: "string", title: "Label (e.g. Mothers Supported)" },
      ],
    }),
  ],

  preview: {
    select: {
      title:  "name",
      pillar: "pillar",
      media:  "coverImage",
    },
    prepare({ title, pillar, media }) {
      return { title, subtitle: pillar, media };
    },
  },
});