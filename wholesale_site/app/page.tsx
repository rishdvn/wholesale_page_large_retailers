"use client";

import Image from "next/image";
import { useState } from "react";
import { supabase } from "../lib/supabase";

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const PRODUCTS = {
  dinosaurs: [
    "Rexy", "Thumper", "Trikey", "Spikles", "Raptar", "Sky",
    "Soar", "Styke", "Teeny", "Tinkle", "Zippy", "Zoop",
  ],
  desserts: [
    "Strawberry Cake", "Chocolate Cone", "Crispy Bear", "Fruit Waffles",
    "Love Cone", "Matcha Tea Roll", "Rabbit Ice Cream", "Snow Ice Cream",
    "Cheese Berry Cake", "Strawberry Cone", "Strawberry Cup Cake", "Strawberry Tea Roll",
  ],
  animals: [
    "Bear", "Chick", "Crocodile", "Fawn", "Fox", "Grizzly Bear",
    "Hedgehog", "Hippo", "Kangaroo", "Owl", "Raccoon", "Squirrel",
  ],
  "vogue-vision": [
    "Crown", "Blush", "Handbag", "Backpack", "Body Lotion", "Comb And Mirror",
    "Eyeshadow", "Hair Dryer", "Makeup Brush", "Perfrume", "Powder Set", "Purse",
  ],
};

const CATEGORY_LABELS: Record<string, string> = {
  dinosaurs: "Dinosaurs",
  desserts: "Desserts",
  animals: "Animals",
  "vogue-vision": "Vogue Vision",
};

const CATEGORY_HERO: Record<string, string[]> = {
  dinosaurs: ["Rexy", "Thumper", "Trikey", "Spikles"],
  desserts: ["Strawberry Cake", "Chocolate Cone", "Crispy Bear", "Fruit Waffles"],
  animals: ["Fox", "Hedgehog", "Owl", "Bear"],
  "vogue-vision": ["Crown", "Handbag", "Blush", "Backpack"],
};

const NAV_LINKS = [
  { label: "Why Terra", href: "#why-terra" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

/* ──────────────────────────────────────────────
   ICONS (inline SVGs for value props)
   ────────────────────────────────────────────── */

function IconScreenFree() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="8" y="10" width="32" height="22" rx="3" stroke="#5D392E" strokeWidth="2.5" />
      <line x1="8" y1="32" x2="40" y2="10" stroke="#FF9E97" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="36" x2="28" y2="36" stroke="#5D392E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconAustralian() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <circle cx="24" cy="24" r="16" stroke="#5D392E" strokeWidth="2.5" />
      <path d="M24 12l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="#F7B661" />
      <path d="M16 30l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" fill="#F7B661" />
      <path d="M32 28l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3z" fill="#F7B661" />
    </svg>
  );
}

function IconProvenSeller() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <path d="M24 6l4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1z" fill="#F7B661" stroke="#5D392E" strokeWidth="2" />
      <path d="M18 38h12" stroke="#5D392E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 42h8" stroke="#5D392E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconMargins() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="8" y="28" width="8" height="12" rx="1" fill="#62B583" />
      <rect x="20" y="20" width="8" height="20" rx="1" fill="#62B583" />
      <rect x="32" y="12" width="8" height="28" rx="1" fill="#62B583" />
      <path d="M10 26l12-10 12-4" stroke="#5D392E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLowMin() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="10" y="14" width="28" height="24" rx="3" stroke="#5D392E" strokeWidth="2.5" />
      <rect x="16" y="20" width="6" height="6" rx="1" fill="#FFDBA7" />
      <rect x="26" y="20" width="6" height="6" rx="1" fill="#FFDBA7" />
      <rect x="16" y="28" width="6" height="6" rx="1" fill="#FFDBA7" />
      <path d="M18 10v4M30 10v4" stroke="#5D392E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconFastShip() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
      <rect x="4" y="20" width="28" height="14" rx="2" stroke="#5D392E" strokeWidth="2.5" />
      <path d="M32 24h6l4 6v4h-10v-10z" stroke="#5D392E" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="14" cy="36" r="3" fill="#F7B661" stroke="#5D392E" strokeWidth="2" />
      <circle cx="36" cy="36" r="3" fill="#F7B661" stroke="#5D392E" strokeWidth="2" />
      <line x1="4" y1="16" x2="16" y2="16" stroke="#FFDBA7" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="12" x2="20" y2="12" stroke="#FFDBA7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Sticky Nav
   ────────────────────────────────────────────── */

function StickyNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-terra-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image src="/brand/logo.png" alt="Terra Clay" width={40} height={40} className="rounded-lg" />
          <span className="font-bold text-lg text-terra-brown hidden sm:inline">TERRA CLAY</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-terra-dark hover:text-terra-brown transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="tel:+61426836720"
          className="hidden md:inline-flex items-center gap-2 bg-terra-brown text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-terra-dark transition-colors"
        >
          <PhoneIcon />
          Call Us: +61 426 836 720
        </a>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-terra-brown" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-terra-brown/10 px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm font-medium text-terra-dark hover:text-terra-brown">
              {l.label}
            </a>
          ))}
          <a
            href="tel:+61426836720"
            className="mt-2 flex items-center justify-center gap-2 bg-terra-brown text-white px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <PhoneIcon />
            +61 426 836 720
          </a>
        </div>
      )}
    </nav>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Hero
   ────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white to-terra-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-terra-light-green text-terra-green px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-terra-green rounded-full" />
              Now Accepting Wholesale Partners
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-terra-dark leading-tight">
              Stock Terra Clay<br />
              <span className="text-terra-brown">in Your Store</span>
            </h1>
            <p className="mt-6 text-lg text-terra-dark/70 max-w-lg leading-relaxed">
              Australia&apos;s #1 mess-free clay kits. Loved by 10,000+ families.
              <strong className="text-terra-green"> Strong impulse purchase</strong> at $14.95-$21.95 retail. Up to <strong className="text-terra-green">63% margins</strong>.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center bg-terra-amber text-terra-dark px-8 py-3.5 rounded-full font-bold text-base hover:brightness-105 transition shadow-lg shadow-terra-amber/30"
              >
                View Wholesale Pricing
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border-2 border-terra-brown text-terra-brown px-8 py-3.5 rounded-full font-bold text-base hover:bg-terra-brown hover:text-white transition"
              >
                Get in Touch
              </a>
            </div>
            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6 text-sm text-terra-dark/60">
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-terra-green" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Australian Made
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-terra-green" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Non-Toxic &amp; Safe
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-terra-green" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                10,000+ Sold
              </span>
            </div>
          </div>

          {/* Hero image grid */}
          <div className="grid grid-cols-2 gap-3">
            {["Rexy", "Thumper", "Trikey", "Spikles"].map((name) => (
              <div key={name} className="bg-white rounded-2xl p-4 shadow-sm border border-terra-brown/5 flex items-center justify-center aspect-square">
                <Image
                  src={`/products/dinosaurs/${name}.png`}
                  alt={name}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Why Stock Terra
   ────────────────────────────────────────────── */

const VALUE_PROPS = [
  { icon: <IconMargins />, title: "High Margins", desc: "Up to 63% profit per kit. Strong markup potential at $14.95-$21.95 retail." },
  { icon: <IconScreenFree />, title: "Strong Impulse Purchase", desc: "$14.95-$21.95 sweet spot. Customers grab without hesitation—perfect for quick decisions." },
  { icon: <IconProvenSeller />, title: "Birthday & Gift Hero", desc: "Last-minute gift solution. Works for kids' birthdays, couples' date nights, and thoughtful presents." },
  { icon: <IconAustralian />, title: "Year-Round Revenue", desc: "Not seasonal. Sells during holidays, rainy weekends, date nights, birthdays. Reliable inventory." },
  { icon: <IconLowMin />, title: "Low Minimums", desc: "Start with just 12 kits. Test the range without massive upfront commitment." },
  { icon: <IconFastShip />, title: "Fast Shipping", desc: "3-5 business days from our Melbourne warehouse to your storefront." },
];

function WhyTerra() {
  return (
    <section id="why-terra" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">Why Stock Terra?</h2>
          <p className="mt-3 text-terra-dark/60 max-w-2xl mx-auto">Everything a retailer needs: proven product, great margins, and zero hassle.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUE_PROPS.map((vp) => (
            <div key={vp.title} className="bg-terra-cream/60 border border-terra-brown/5 rounded-2xl p-6 hover:shadow-md transition">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">{vp.icon}</div>
              <h3 className="font-bold text-lg text-terra-dark">{vp.title}</h3>
              <p className="mt-2 text-sm text-terra-dark/60 leading-relaxed">{vp.desc}</p>
            </div>
          ))}
        </div>

        {/* Broad Customer Appeal */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-terra-light-green/40 to-terra-light-blue/40 rounded-2xl border border-terra-green/20 p-6">
            <h4 className="font-bold text-lg text-terra-dark mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-terra-green" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Broad Customer Appeal
            </h4>
            <div className="space-y-2 text-sm text-terra-dark/70">
              <p>✓ <strong>Parents & Families:</strong> Screen-free activity, educational, kids do independently</p>
              <p>✓ <strong>Couples & Date Nights:</strong> Creative bonding activity, stress relief, quality time</p>
              <p>✓ <strong>Gift Buyers:</strong> Thoughtful alternative to generic toys or flowers</p>
              <p>✓ <strong>Young Adults & Teens:</strong> Trending creative hobby, mindfulness activity</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-terra-peach/40 to-terra-pink/40 rounded-2xl border border-terra-coral/20 p-6">
            <h4 className="font-bold text-lg text-terra-dark mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-terra-coral" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Perfect For
            </h4>
            <div className="space-y-2 text-sm text-terra-dark/70">
              <p>• <strong>Toy stores</strong> — Kids' birthday gifts, family activities</p>
              <p>• <strong>Museum gift shops</strong> — Educational, creative souvenirs</p>
              <p>• <strong>Craft & hobby retailers</strong> — Adult creative hobbyists, couples</p>
              <p>• <strong>Boutique lifestyle stores</strong> — Date night ideas, unique gifts</p>
              <p>• <strong>Bookshops & gift stores</strong> — Thoughtful presents, alternative to books</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Already in Stores (Social Proof)
   ────────────────────────────────────────────── */

const RETAIL_SHOWCASES = [
  {
    src: "/retail/storefront_plushie_display.jpg",
    caption: "Children's Boutique",
    size: "large",
    objectPosition: "center"
  },
  {
    src: "/retail/storefront_window_display.jpg",
    caption: "Premium Window Display",
    size: "small",
    objectPosition: "center"
  },
  {
    src: "/retail/storefront_artisan_aesthetic.jpg",
    caption: "Artisan Toy Store",
    size: "small",
    objectPosition: "center 90%"
  },
  {
    src: "/retail/terra_retail_shelf_integration.jpg",
    caption: "Shelf-Ready Integration",
    size: "medium",
    objectPosition: "center"
  },
];

function AlreadyInStores() {
  return (
    <section className="py-24 bg-gradient-to-br from-terra-cream via-white to-terra-peach/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-terra-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-terra-brown/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-terra-amber/10 text-terra-brown px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-terra-amber/20">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Trusted by Retailers Australia-Wide
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-terra-dark mb-4">
            Already Stocked in<br />
            <span className="text-terra-brown">Leading Stores</span>
          </h2>
          <p className="text-lg text-terra-dark/60 max-w-2xl mx-auto">
            Join 100+ retailers bringing screen-free creativity to their customers.
            See how Terra displays beautifully in boutiques and toy stores.
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {/* Large featured image */}
          <div className="col-span-12 lg:col-span-7 group">
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <Image
                src={RETAIL_SHOWCASES[0].src}
                alt={RETAIL_SHOWCASES[0].caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: RETAIL_SHOWCASES[0].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terra-dark/80 via-terra-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 inline-block shadow-lg">
                  <p className="font-bold text-terra-dark text-lg">{RETAIL_SHOWCASES[0].caption}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with 2 smaller images */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
            {RETAIL_SHOWCASES.slice(1, 3).map((item, i) => (
              <div key={i} className="group">
                <div className="relative h-[240px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: item.objectPosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-terra-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 inline-block shadow-lg">
                      <p className="font-bold text-terra-dark text-sm">{item.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom full-width image */}
          <div className="col-span-12 group">
            <div className="relative h-[280px] lg:h-[320px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
              <Image
                src={RETAIL_SHOWCASES[3].src}
                alt={RETAIL_SHOWCASES[3].caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ objectPosition: RETAIL_SHOWCASES[3].objectPosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-terra-dark/80 via-terra-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 inline-block shadow-lg">
                  <p className="font-bold text-terra-dark text-lg">{RETAIL_SHOWCASES[3].caption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-terra-dark/70 text-sm mb-6">
            <strong className="text-terra-brown">Display-ready packaging.</strong> No assembly required. Stock arrives shelf-ready.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-terra-brown text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-terra-dark transition shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            View Wholesale Pricing
          </a>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Product Lines
   ────────────────────────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  dinosaurs: "bg-terra-light-green border-terra-green/20",
  desserts: "bg-terra-pink border-terra-coral/20",
  animals: "bg-terra-light-blue border-terra-blue/20",
  "vogue-vision": "bg-[#F9F0FF] border-[#B388FF]/20",
};

function ProductLines() {
  return (
    <section id="products" className="py-20 bg-terra-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">4 Product Lines, 48 Unique Kits</h2>
          <p className="mt-3 text-terra-dark/60 max-w-2xl mx-auto">Mix &amp; match across all collections. Something for every customer.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(CATEGORY_HERO).map(([cat, heroes]) => (
            <div key={cat} className={`rounded-2xl border p-5 ${CATEGORY_COLORS[cat]}`}>
              <h3 className="font-bold text-lg text-terra-dark mb-1">{CATEGORY_LABELS[cat]}</h3>
              <p className="text-sm text-terra-dark/60 mb-4">12 kits</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {heroes.map((name) => (
                  <div key={name} className="bg-white rounded-xl p-2 aspect-square flex items-center justify-center">
                    <Image
                      src={`/products/${cat}/${name}.png`}
                      alt={name}
                      width={120}
                      height={120}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <span className="inline-block text-xs font-semibold bg-white/80 text-terra-dark/70 px-3 py-1 rounded-full">
                Mix &amp; match available
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Pricing Table
   ────────────────────────────────────────────── */

const TIERS = [
  {
    name: "Taster Bundle",
    qty: 12,
    price: 10,
    boxTotal: 120,
    recRetail: 19.95,
    profitKit: 9.95,
    margin: 50,
    popular: false,
    features: ["12 kits — mix any themes", "Perfect to test the range", "Free POS display card", "Reorder anytime"],
  },
  {
    name: "Standard Bundle",
    qty: 24,
    price: 9,
    boxTotal: 216,
    recRetail: 19.95,
    profitKit: 10.95,
    margin: 55,
    popular: true,
    features: ["24 kits — our most popular tier", "Best balance of value & variety", "Free POS display card", "Priority restock support"],
  },
  {
    name: "Premium Bundle",
    qty: 48,
    price: 8,
    boxTotal: 384,
    recRetail: 19.95,
    profitKit: 11.95,
    margin: 60,
    popular: false,
    features: ["48 kits — maximum margin", "Dedicated account manager", "Free POS display card", "Co-branded social assets"],
  },
];

function PricingTable() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">Simple, Profitable Pricing</h2>
          <p className="mt-3 text-terra-dark/60 max-w-2xl mx-auto">
            Retail at <strong>$14.95-$21.95</strong> per kit. Strong impulse purchase. Your wholesale price starts at just $8.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl bg-white border-2 p-6 lg:p-8 flex flex-col ${
                tier.popular ? "pricing-popular border-terra-amber" : "border-terra-brown/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-terra-amber text-terra-dark text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-terra-dark">{tier.name}</h3>
              <p className="text-sm text-terra-dark/60 mt-1">{tier.qty} kits</p>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-terra-brown">${tier.price}</span>
                  <span className="text-sm text-terra-dark/60">/kit</span>
                </div>
                <p className="text-sm text-terra-dark/60 mt-1">Box total: <strong>${tier.boxTotal}</strong></p>
              </div>

              {/* Profit highlight */}
              <div className="mt-5 bg-terra-light-green rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-terra-dark/70">Rec. Retail</span>
                  <span className="font-semibold text-terra-dark">${tier.recRetail.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-terra-dark/70">Profit per kit</span>
                  <span className="font-bold text-terra-green">${tier.profitKit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-terra-dark/70">Profit per box</span>
                  <span className="font-bold text-terra-green">${(tier.profitKit * tier.qty).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-terra-green/20 flex justify-between text-sm">
                  <span className="text-terra-dark/70">Margin</span>
                  <span className="font-bold text-white bg-terra-green px-2.5 py-0.5 rounded-full text-xs">{tier.margin}%</span>
                </div>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-2.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-terra-dark/70">
                    <svg className="w-5 h-5 text-terra-green shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-6 inline-flex items-center justify-center py-3 rounded-full font-bold text-sm transition ${
                  tier.popular
                    ? "bg-terra-amber text-terra-dark hover:brightness-105 shadow-lg shadow-terra-amber/30"
                    : "bg-terra-brown text-white hover:bg-terra-dark"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Recommended Starter Pack
   ────────────────────────────────────────────── */

function StarterPackGuide() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-terra-cream/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-terra-amber/30 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-terra-amber/20 to-terra-peach/20 px-6 lg:px-10 py-6 border-b border-terra-amber/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-terra-amber rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-terra-dark">Our Best Value Bundle</h3>
            </div>
            <p className="text-terra-dark/70">Balanced inventory across all themes. Perfect mix to test customer preferences.</p>
          </div>

          {/* Content */}
          <div className="px-6 lg:px-10 py-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { name: "Dinosaurs", qty: 12, color: "bg-terra-light-green border-terra-green/20" },
                { name: "Animals", qty: 12, color: "bg-terra-light-blue border-terra-blue/20" },
                { name: "Desserts", qty: 12, color: "bg-terra-pink border-terra-coral/20" },
                { name: "Vogue Vision", qty: 12, color: "bg-[#F9F0FF] border-[#B388FF]/20" },
              ].map((cat) => (
                <div key={cat.name} className={`${cat.color} border rounded-xl p-4 text-center`}>
                  <p className="text-3xl font-bold text-terra-brown mb-1">{cat.qty}</p>
                  <p className="text-sm font-semibold text-terra-dark">{cat.name}</p>
                </div>
              ))}
            </div>

            <div className="bg-terra-light-green rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-terra-dark/70 font-medium">Total Kits:</span>
                <span className="text-2xl font-bold text-terra-dark">48 kits</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-terra-dark/70 font-medium">Wholesale Cost @ $8/kit:</span>
                <span className="text-2xl font-bold text-terra-brown">$384</span>
              </div>
              <div className="pt-3 border-t border-terra-green/20">
                <div className="flex justify-between items-center">
                  <span className="text-terra-dark/70 font-medium">Potential Revenue @ $19.95:</span>
                  <span className="text-xl font-bold text-terra-green">$957.60</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-terra-dark/70 font-medium">Your Profit:</span>
                  <span className="text-2xl font-bold text-terra-green">$573.60</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center bg-terra-amber text-terra-dark px-6 py-3.5 rounded-full font-bold text-base hover:brightness-105 transition shadow-lg shadow-terra-amber/30"
              >
                Order This Pack
              </a>
              <a
                href="#products"
                className="flex-1 inline-flex items-center justify-center border-2 border-terra-brown text-terra-brown px-6 py-3.5 rounded-full font-bold text-base hover:bg-terra-brown hover:text-white transition"
              >
                Customize Your Mix
              </a>
            </div>

            <p className="mt-4 text-sm text-terra-dark/60 text-center">
              💡 <strong>Pro tip:</strong> Most retailers reorder within 4-6 weeks. Customers typically purchase 2-3 different themes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: What's In Each Kit
   ────────────────────────────────────────────── */

const KIT_ITEMS = [
  { src: "/kit/clay.png", label: "Air-Dry Clay", desc: "4 vibrant, non-toxic colors in a sealed container" },
  { src: "/kit/instructions.png", label: "Instruction Card", desc: "Step-by-step visual guide — no reading required" },
  { src: "/kit/card.png", label: "Branded Packaging", desc: "Premium card packaging, ready for shelf display" },
  { src: "/kit/tools.png", label: "Sculpting Tools", desc: "4 kid-safe tools for shaping, cutting, and detailing" },
  { src: "/kit/figure.png", label: "Finished Figure", desc: "What the completed creation looks like" },
];

function WhatsInKit() {
  return (
    <section className="py-20 bg-terra-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">What&apos;s in Each Kit</h2>
          <p className="mt-3 text-terra-dark/60 max-w-2xl mx-auto">Every kit is a complete, self-contained creative experience. No extras needed.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {KIT_ITEMS.map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-terra-brown/5 overflow-hidden hover:shadow-md transition">
              <div className="bg-terra-peach/30 p-6 flex items-center justify-center aspect-square">
                <Image src={item.src} alt={item.label} width={200} height={200} className="object-contain w-full h-full" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-terra-dark">{item.label}</h3>
                <p className="mt-1 text-sm text-terra-dark/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Product Grid (Tabbed)
   ────────────────────────────────────────────── */

function ProductGrid() {
  const [activeTab, setActiveTab] = useState<string>("dinosaurs");
  const categories = Object.keys(PRODUCTS) as (keyof typeof PRODUCTS)[];

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">Full Product Range</h2>
          <p className="mt-3 text-terra-dark/60">48 unique kits across 4 collections</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === cat
                  ? "bg-terra-brown text-white"
                  : "bg-terra-cream text-terra-dark/70 hover:bg-terra-peach/50"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PRODUCTS[activeTab as keyof typeof PRODUCTS].map((name) => (
            <div key={name} className="bg-terra-cream/50 border border-terra-brown/5 rounded-2xl p-4 flex flex-col items-center hover:shadow-md transition">
              <div className="aspect-square w-full relative overflow-hidden mb-3">
                <Image
                  src={`/products/${activeTab}/${name}.png`}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-terra-dark text-center">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: How It Works
   ────────────────────────────────────────────── */

const STEPS = [
  { num: "1", title: "Choose Your Box", desc: "Pick your bundle size and mix themes across all 4 product lines.", color: "bg-terra-amber" },
  { num: "2", title: "We Ship Fast", desc: "3-5 business days from our Melbourne warehouse straight to your storefront.", color: "bg-terra-green" },
  { num: "3", title: "You Profit", desc: "Retail at $14.95-$21.95. Strong impulse purchase with up to 63% margin.", color: "bg-terra-coral" },
];

function HowItWorks() {
  return (
    <section className="py-20 bg-terra-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">How It Works</h2>
          <p className="mt-3 text-terra-dark/60">Three simple steps to start stocking Terra Clay.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {/* Connector line on desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-terra-brown/10" />
              )}
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 relative z-10`}>
                {step.num}
              </div>
              <h3 className="font-bold text-lg text-terra-dark">{step.title}</h3>
              <p className="mt-2 text-sm text-terra-dark/60 max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Contact Form
   ────────────────────────────────────────────── */

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      store_name: formData.get('store_name') as string,
      contact_name: formData.get('contact_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      bundle_interest: formData.get('bundle_interest') as string,
      message: formData.get('message') as string,
    };

    const { error: submitError } = await supabase
      .from('retail_enquiries')
      .insert([data]);

    if (submitError) {
      console.error('Error submitting form:', submitError);
      console.error('Error details:', JSON.stringify(submitError, null, 2));
      setError(`Error: ${submitError.message || 'Something went wrong. Please try again or contact us directly.'}`);
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-terra-dark">Get in Touch</h2>
          <p className="mt-3 text-terra-dark/60 max-w-2xl mx-auto">Ready to stock Terra Clay? Fill out the form and we&apos;ll get back to you within 24 hours.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-terra-light-green border border-terra-green/20 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-terra-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-terra-dark">Thank you!</h3>
                <p className="mt-2 text-terra-dark/70">We&apos;ve received your enquiry and will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-terra-dark mb-1.5">Store Name *</label>
                    <input required type="text" name="store_name" className="w-full border border-terra-brown/15 rounded-xl px-4 py-3 text-sm bg-terra-cream/30 focus:outline-none focus:ring-2 focus:ring-terra-amber/50 focus:border-terra-amber" placeholder="e.g. Little Luxe Boutique" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-terra-dark mb-1.5">Contact Name *</label>
                    <input required type="text" name="contact_name" className="w-full border border-terra-brown/15 rounded-xl px-4 py-3 text-sm bg-terra-cream/30 focus:outline-none focus:ring-2 focus:ring-terra-amber/50 focus:border-terra-amber" placeholder="Your name" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-terra-dark mb-1.5">Email *</label>
                    <input required type="email" name="email" className="w-full border border-terra-brown/15 rounded-xl px-4 py-3 text-sm bg-terra-cream/30 focus:outline-none focus:ring-2 focus:ring-terra-amber/50 focus:border-terra-amber" placeholder="you@store.com.au" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-terra-dark mb-1.5">Phone</label>
                    <input type="tel" name="phone" className="w-full border border-terra-brown/15 rounded-xl px-4 py-3 text-sm bg-terra-cream/30 focus:outline-none focus:ring-2 focus:ring-terra-amber/50 focus:border-terra-amber" placeholder="+61 4XX XXX XXX" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-terra-dark mb-1.5">Which bundle interests you?</label>
                  <select name="bundle_interest" className="w-full border border-terra-brown/15 rounded-xl px-4 py-3 text-sm bg-terra-cream/30 focus:outline-none focus:ring-2 focus:ring-terra-amber/50 focus:border-terra-amber">
                    <option value="">Select a bundle...</option>
                    <option>Taster Bundle (12 kits — $10/kit)</option>
                    <option>Standard Bundle (24 kits — $9/kit)</option>
                    <option>Premium Bundle (48 kits — $8/kit)</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-terra-dark mb-1.5">Message</label>
                  <textarea rows={4} name="message" className="w-full border border-terra-brown/15 rounded-xl px-4 py-3 text-sm bg-terra-cream/30 focus:outline-none focus:ring-2 focus:ring-terra-amber/50 focus:border-terra-amber resize-none" placeholder="Tell us about your store and what you're looking for..." />
                </div>
                <button type="submit" disabled={loading} className="w-full sm:w-auto bg-terra-amber text-terra-dark px-10 py-3.5 rounded-full font-bold text-base hover:brightness-105 transition shadow-lg shadow-terra-amber/30 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Contact info card */}
          <div className="lg:col-span-2">
            <div className="bg-terra-brown rounded-2xl p-8 text-white">
              <h3 className="font-bold text-xl mb-6">Prefer to Chat?</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <PhoneIcon />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+61426836720" className="text-terra-peach hover:underline">+61 426 836 720</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-1 shrink-0">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:hello@itsterra.com.au" className="text-terra-peach hover:underline">hello@itsterra.com.au</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-1 shrink-0">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-white/80">We typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mt-1 shrink-0">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-white/80">Melbourne, Australia</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-sm text-white/70">
                  Australian family business. ABN registered. Wholesale pricing available Australia-wide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SECTION: Footer
   ────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-terra-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo.png" alt="Terra Clay" width={36} height={36} className="rounded-lg" />
            <span className="font-bold text-lg">TERRA CLAY</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/70">
            <span>Australian Family Business</span>
            <span className="hidden sm:inline">|</span>
            <a href="mailto:hello@itsterra.com.au" className="hover:text-terra-peach transition">hello@itsterra.com.au</a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:+61426836720" className="hover:text-terra-peach transition">+61 426 836 720</a>
          </div>
          <p className="text-sm text-white/40">&copy; 2026 Terra Clay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <StickyNav />
      <Hero />
      <WhyTerra />
      <AlreadyInStores />
      <ProductLines />
      <PricingTable />
      <StarterPackGuide />
      <WhatsInKit />
      <ProductGrid />
      <HowItWorks />
      <ContactSection />
      <Footer />
    </>
  );
}
