/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ─── Colors ───────────────────────────────────────────────
      colors: {
        primary: {
          DEFAULT: "#1B4332",
          mid: "#2D6A4F",
          light: "#E8F0EB",
        },
        accent: {
          DEFAULT: "#C9A84C",
          hover: "#E2C97E",
          light: "#FAF3E0",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          surface: "#FAFAF7",
          alt: "#F0EBE1",
        },
        ink: {
          DEFAULT: "#0D0D0D",
          secondary: "#4A4A4A",
          muted: "#7A7A7A",
        },
        border: {
          DEFAULT: "#E0D8CE",
          subtle: "rgba(0,0,0,0.06)",
        },
      },

      // ─── Typography ───────────────────────────────────────────
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },

      fontSize: {
        display: ["72px", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h1: ["56px", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h2: ["44px", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
        h3: ["32px", { lineHeight: "1.28", letterSpacing: "-0.01em" }],
        h4: ["24px", { lineHeight: "1.38" }],
        h5: ["20px", { lineHeight: "1.4" }],
        "body-lg": ["20px", { lineHeight: "1.78" }],
        body: ["18px", { lineHeight: "1.78" }],
        "body-sm": ["16px", { lineHeight: "1.65" }],
        caption: ["14px", { lineHeight: "1.5" }],
        overline: ["11px", { lineHeight: "1", letterSpacing: "0.16em" }],
      },

      // ─── Spacing ──────────────────────────────────────────────
      spacing: {
        18: "72px",
        22: "88px",
        26: "104px",
        30: "120px",
        34: "136px",
        100: "100px",
        120: "120px",
        140: "140px",
      },

      // ─── Max widths ───────────────────────────────────────────
      maxWidth: {
        container: "1100px",
        "container-wide": "1280px",
        "container-narrow": "720px",
      },

      // ─── Border radius ────────────────────────────────────────
      borderRadius: {
        btn: "8px",
        card: "12px",
        pill: "9999px",
      },

      // ─── Box shadows ──────────────────────────────────────────
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.07)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.11)",
        btn: "0 2px 12px rgba(201,168,76,0.25)",
        "btn-hover": "0 6px 24px rgba(201,168,76,0.4)",
        float: "0 8px 36px rgba(0,0,0,0.09)",
        "float-lg": "0 16px 56px rgba(0,0,0,0.13)",
      },

      // ─── Transitions ──────────────────────────────────────────
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        350: "350ms",
        850: "850ms",
      },

      // ─── Animation ────────────────────────────────────────────
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.9" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        underlineDraw: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        ticker: "ticker 32s linear infinite",
        "scroll-pulse": "scrollPulse 2.2s ease-in-out infinite",
        "fade-up": "fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both",
        underline: "underlineDraw 0.9s cubic-bezier(0.22,1,0.36,1) 0.9s both",
      },
    },
  },
  plugins: [],
};
