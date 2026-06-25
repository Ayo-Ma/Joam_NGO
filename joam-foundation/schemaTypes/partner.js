// schemas/partner.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "partner",
  title: "Partner",
  type:  "document",
  icon:  () => "🤝",

  fields: [
    defineField({
      name:       "name",
      title:      "Organisation Name",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:  "logo",
      title: "Logo",
      type:  "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
      validation: R => R.required(),
    }),
    defineField({
      name:  "website",
      title: "Website URL",
      type:  "url",
    }),
    defineField({
      name:  "tier",
      title: "Partnership Tier",
      type:  "string",
      options: {
        list: [
          { title: "Foundation Partner", value: "foundation" },
          { title: "Programme Partner",  value: "programme"  },
          { title: "Community Partner",  value: "community"  },
          { title: "Supporter",          value: "supporter"  },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name:  "order",
      title: "Display Order",
      type:  "number",
      description: "Lower number = shown first in the partners strip.",
    }),
    defineField({
      name:  "active",
      title: "Active Partnership",
      type:  "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title:    "name",
      subtitle: "tier",
      media:    "logo",
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