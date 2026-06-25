// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const Home        = lazy(() => import("./pages/Home"));
const About       = lazy(() => import("./pages/About"));
const Programs    = lazy(() => import("./pages/Programs"));
const Donate      = lazy(() => import("./pages/Donate"));
const Volunteer   = lazy(() => import("./pages/Volunteer"));
const Events      = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Blog        = lazy(() => import("./pages/Blog"));
const BlogDetail  = lazy(() => import("./pages/BlogDetail"));
const Gallery     = lazy(() => import("./pages/Gallery"));
const Contact     = lazy(() => import("./pages/Contact"));
const Partner     = lazy(() => import("./pages/Partner"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-accent animate-spin" />
        <p className="font-body text-[13px] text-ink-muted">Loading…</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display font-bold text-ink text-[64px] leading-none mb-4">404</h1>
        <p className="font-body text-[18px] text-ink-secondary mb-8">This page doesn't exist.</p>
        <a href="/" className="font-body text-[14px] font-semibold text-primary
          no-underline border-b border-primary/30 hover:border-primary pb-px transition-colors">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

// Pages that hide Navbar + Footer
const NO_CHROME = ["/donate"];
// Pages that hide Footer only (they have their own)
const NO_FOOTER = ["/blog/"];

function Shell() {
  const { pathname } = useLocation();
  const hideAll    = NO_CHROME.some(p => pathname.startsWith(p));
  const hideFooter = NO_FOOTER.some(p => pathname.startsWith(p));

  return (
    <>
      {!hideAll && <Navbar />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/programs"       element={<Programs />} />
          <Route path="/donate"         element={<Donate />} />
          <Route path="/volunteer"      element={<Volunteer />} />
          <Route path="/events"         element={<Events />} />
          <Route path="/events/:slug"   element={<EventDetail />} />
          <Route path="/blog"           element={<Blog />} />
          <Route path="/blog/:slug"     element={<BlogDetail />} />
          <Route path="/gallery"        element={<Gallery />} />
          <Route path="/contact"        element={<Contact />} />
          {/* <Route path="/partner"        element={<Partner />} /> */}
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </Suspense>

      {!hideAll && !hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}