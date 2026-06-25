// schemas/blogPost.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "blogPost",
  title: "Blog Post",
  type:  "document",
  icon:  () => "📝",

  fields: [
    defineField({
      name:        "title",
      title:       "Title",
      type:        "string",
      validation:  R => R.required().max(100),
    }),
    defineField({
      name:  "slug",
      title: "Slug",
      type:  "slug",
      options: { source: "title", maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name:  "author",
      title: "Author",
      type:  "reference",
      to:    [{ type: "teamMember" }],
    }),
    defineField({
      name:  "category",
      title: "Category",
      type:  "string",
      options: {
        list: [
          { title: "Foundation News",  value: "Foundation News"  },
          { title: "Maternal Health",  value: "Maternal Health"  },
          { title: "Scholarships",     value: "Scholarships"     },
          { title: "Elderly Care",     value: "Elderly Care"     },
          { title: "Impact Story",     value: "Impact Story"     },
          { title: "Field Report",     value: "Field Report"     },
        ],
        layout: "radio",
      },
      validation: R => R.required(),
    }),
    defineField({
      name:  "publishedAt",
      title: "Published At",
      type:  "datetime",
      validation: R => R.required(),
    }),
    defineField({
      name:  "readTime",
      title: "Read Time (minutes)",
      type:  "number",
      validation: R => R.min(1).max(60),
    }),
    defineField({
      name:        "excerpt",
      title:       "Excerpt",
      type:        "text",
      rows:        3,
      description: "Short summary shown on blog listing page. Max 200 characters.",
      validation:  R => R.required().max(200),
    }),
    defineField({
      name:  "coverImage",
      title: "Cover Image",
      type:  "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name:  "alt",
          title: "Alt Text",
          type:  "string",
          validation: R => R.required(),
        }),
        defineField({
          name:  "caption",
          title: "Caption",
          type:  "string",
        }),
      ],
    }),
    defineField({
      name:  "body",
      title: "Body Content",
      type:  "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal",     value: "normal"     },
            { title: "Heading 2",  value: "h2"         },
            { title: "Heading 3",  value: "h3"         },
            { title: "Quote",      value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold",   value: "strong" },
              { title: "Italic", value: "em"     },
            ],
            annotations: [
              {
                name:   "link",
                type:   "object",
                title:  "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab" },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt",     type: "string", title: "Alt Text"  },
            { name: "caption", type: "string", title: "Caption"   },
          ],
        },
        {
          name:   "pullQuote",
          title:  "Pull Quote",
          type:   "object",
          fields: [
            { name: "quote",       type: "text",   title: "Quote"       },
            { name: "attribution", type: "string", title: "Attribution" },
          ],
        },
        {
          name:   "callout",
          title:  "Callout Box",
          type:   "object",
          fields: [
            { name: "text", type: "text", title: "Text" },
          ],
        },
      ],
    }),
    defineField({
      name:  "relatedPosts",
      title: "Related Posts",
      type:  "array",
      of:    [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: R => R.max(3),
    }),
    defineField({
      name:  "featured",
      title: "Featured Post",
      type:  "boolean",
      description: "Show this post in the featured slot on the blog page.",
      initialValue: false,
    }),
    defineField({
      name:  "seo",
      title: "SEO",
      type:  "object",
      fields: [
        { name: "metaTitle",       type: "string", title: "Meta Title"       },
        { name: "metaDescription", type: "text",   title: "Meta Description" },
      ],
    }),
  ],

  preview: {
    select: {
      title:    "title",
      category: "category",
      media:    "coverImage",
      date:     "publishedAt",
    },
    prepare({ title, category, media, date }) {
      return {
        title,
        subtitle: `${category} · ${date ? new Date(date).toLocaleDateString("en-GB") : "No date"}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Newest First",
      name:  "publishedAtDesc",
      by:    [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});