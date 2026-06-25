// src/lib/sanityClient.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01",
  useCdn:    true, // fast reads for public content
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}