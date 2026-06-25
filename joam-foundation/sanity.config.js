import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import blogPost     from "./schemaTypes/blogPost";
import event        from "./schemaTypes/event";
import impactStory  from "./schemaTypes/impactStory";
import teamMember   from "./schemaTypes/teamMember";
import partner      from "./schemaTypes/partner";
import programme    from "./schemaTypes/programme";
import siteSettings from "./schemaTypes/siteSettings";

export default defineConfig({
  name:      "joam-foundation",
  title:     "JOAM Foundation CMS",
  projectId: "gc39nsml",
  dataset:   "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("JOAM Foundation")
          .items([
            S.listItem()
              .title("📝 Blog Posts")
              .child(S.documentTypeList("blogPost").title("Blog Posts")),
            S.listItem()
              .title("📅 Events")
              .child(S.documentTypeList("event").title("Events")),
            S.listItem()
              .title("❤️ Impact Stories")
              .child(S.documentTypeList("impactStory").title("Impact Stories")),
            S.listItem()
              .title("👥 Team Members")
              .child(S.documentTypeList("teamMember").title("Team Members")),
            S.listItem()
              .title("🤝 Partners")
              .child(S.documentTypeList("partner").title("Partners")),
            S.listItem()
              .title("🏛️ Programmes")
              .child(S.documentTypeList("programme").title("Programmes")),
            S.divider(),
            S.listItem()
              .title("⚙️ Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
  ],

  schema: {
    types: [
      blogPost,
      event,
      impactStory,
      teamMember,
      partner,
      programme,
      siteSettings,
    ],
  },
});