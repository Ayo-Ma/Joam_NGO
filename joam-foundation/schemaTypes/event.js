// schemas/event.js
import { defineField, defineType } from "sanity";

export default defineType({
  name:  "event",
  title: "Event",
  type:  "document",
  icon:  () => "📅",

  fields: [
    defineField({
      name:       "title",
      title:      "Event Title",
      type:       "string",
      validation: R => R.required(),
    }),
    defineField({
      name:  "slug",
      title: "Slug",
      type:  "slug",
      options: { source: "title", maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name:  "type",
      title: "Event Type",
      type:  "string",
      options: {
        list: [
          { title: "Fundraising Dinner", value: "Fundraising Dinner" },
          { title: "Community Outreach", value: "Community Outreach" },
          { title: "Scholarship Ceremony", value: "Scholarship Ceremony" },
          { title: "Elderly Care Drive", value: "Elderly Care Drive" },
          { title: "Awareness Day", value: "Awareness Day" },
          { title: "Partner Event", value: "Partner Event" },
          { title: "Other", value: "Other" },
        ],
        layout: "radio",
      },
      validation: R => R.required(),
    }),
    defineField({
      name:       "startDate",
      title:      "Start Date & Time",
      type:       "datetime",
      validation: R => R.required(),
    }),
    defineField({
      name:  "endDate",
      title: "End Date & Time",
      type:  "datetime",
    }),
    defineField({
      name:  "location",
      title: "Location",
      type:  "object",
      fields: [
        { name: "venue",   type: "string", title: "Venue Name"   },
        { name: "address", type: "string", title: "Street Address" },
        { name: "city",    type: "string", title: "City"         },
        { name: "state",   type: "string", title: "State"        },
        { name: "virtual", type: "boolean", title: "Virtual / Online Event" },
        { name: "virtualLink", type: "url", title: "Virtual Event Link" },
      ],
    }),
    defineField({
      name:       "description",
      title:      "Description",
      type:       "text",
      rows:       4,
      validation: R => R.required(),
    }),
    defineField({
      name:  "body",
      title: "Full Event Details",
      type:  "array",
      of:    [{ type: "block" }],
    }),
    defineField({
      name:  "coverImage",
      title: "Cover Image",
      type:  "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name:  "capacity",
      title: "Capacity",
      type:  "number",
      description: "Leave blank if unlimited.",
    }),
    defineField({
      name:  "capacityNote",
      title: "Capacity Note",
      type:  "string",
      description: "e.g. 'Seats are limited. Reserve yours early.'",
    }),
    defineField({
      name:  "rsvpLink",
      title: "RSVP Link",
      type:  "url",
      description: "External registration or booking link.",
    }),
    defineField({
      name:  "rsvpButtonText",
      title: "RSVP Button Text",
      type:  "string",
      initialValue: "Reserve My Seat",
    }),
    defineField({
      name:  "needsVolunteers",
      title: "Needs Volunteers",
      type:  "boolean",
      initialValue: false,
    }),
    defineField({
      name:  "volunteerNote",
      title: "Volunteer Note",
      type:  "string",
      description: "e.g. 'We need 15 volunteers for this event.'",
    }),
    defineField({
      name:  "status",
      title: "Status",
      type:  "string",
      options: {
        list: [
          { title: "Upcoming",   value: "upcoming"   },
          { title: "Ongoing",    value: "ongoing"    },
          { title: "Completed",  value: "completed"  },
          { title: "Cancelled",  value: "cancelled"  },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: R => R.required(),
    }),
    defineField({
      name:  "featured",
      title: "Featured Event",
      type:  "boolean",
      description: "Show as the large featured card on the events page.",
      initialValue: false,
    }),
    defineField({
      name:  "gallery",
      title: "Event Gallery",
      type:  "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt",     type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption"  },
          ],
        },
      ],
      description: "Add photos after the event for the Past Events section.",
    }),
    defineField({
      name:  "recap",
      title: "Event Recap",
      type:  "text",
      rows:  3,
      description: "Short summary shown in Past Events list.",
    }),
  ],

  preview: {
    select: {
      title:  "title",
      type:   "type",
      date:   "startDate",
      status: "status",
      media:  "coverImage",
    },
    prepare({ title, type, date, status, media }) {
      const d = date ? new Date(date).toLocaleDateString("en-GB") : "No date";
      return {
        title,
        subtitle: `${type} · ${d} · ${status}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Date (Soonest First)",
      name:  "startDateAsc",
      by:    [{ field: "startDate", direction: "asc" }],
    },
    {
      title: "Date (Latest First)",
      name:  "startDateDesc",
      by:    [{ field: "startDate", direction: "desc" }],
    },
  ],
});