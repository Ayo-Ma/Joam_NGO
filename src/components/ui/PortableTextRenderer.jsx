// src/components/ui/PortableTextRenderer.jsx
import { PortableText } from "@portabletext/react";
import { urlFor } from "../../lib/sanityClient";

/**
 * JOAM Foundation — PortableText Renderer
 * Renders Sanity rich text body with JOAM design system styles
 * Install: npm install @portabletext/react
 */

const components = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-[16px] leading-[1.85] text-ink-secondary mb-5">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-bold text-ink text-[28px] leading-[1.2]
        tracking-[-0.01em] mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-bold text-ink text-[22px] leading-[1.3]
        tracking-[-0.01em] mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-[2px] border-accent pl-6 my-8
        font-display italic text-[20px] leading-[1.5] text-ink">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel={value?.blank ? "noreferrer noopener" : undefined}
        className="text-primary border-b border-primary/30 hover:border-primary
          no-underline transition-colors duration-200"
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(900).auto("format").url()}
          alt={value.alt || ""}
          className="w-full rounded-[2px] border border-border"
          loading="lazy"
        />
        {value.caption && (
          <figcaption className="font-body text-[12px] text-ink-muted
            text-center mt-3 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),

    pullQuote: ({ value }) => (
      <div className="my-10 p-8 bg-primary-light border border-primary/[0.08]
        rounded-[4px]">
        <blockquote className="font-display italic text-[22px] leading-[1.45]
          text-ink m-0 mb-4">
          "{value.quote}"
        </blockquote>
        {value.attribution && (
          <p className="font-body text-[13px] font-semibold text-primary m-0">
            — {value.attribution}
          </p>
        )}
      </div>
    ),

    callout: ({ value }) => (
      <div className="my-8 p-6 bg-accent-light border border-accent/20
        rounded-[4px]">
        <p className="font-body text-[15px] leading-[1.75] text-ink m-0">
          {value.text}
        </p>
      </div>
    ),
  },
};

export default function PortableTextRenderer({ value }) {
  if (!value) return null;
  return (
    <div className="max-w-[680px]">
      <PortableText value={value} components={components} />
    </div>
  );
}