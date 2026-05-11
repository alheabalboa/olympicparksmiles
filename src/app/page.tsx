"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const heroSlides = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2400&auto=format&fit=crop",
];

function HeroBackgroundLayers({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  // Auto-rotating crossfade between hero images (Klaas-style ambient slider feel)
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Scroll-driven parallax: the whole slide stack scales 1.0 → 1.15 and drifts up as the user scrolls past the hero
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const slideScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15], { clamp: true });
  const slideY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-8%"], { clamp: true });
  const timelineY = useTransform(scrollYProgress, [0, 0.33], ["-44%", "101%"], { clamp: true });

  return (
    <>
      {/* Stacked slides — crossfade between images while parallaxing on scroll */}
      <motion.div
        style={{ scale: slideScale, y: slideY }}
        className="absolute inset-0 z-0"
      >
        {heroSlides.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: i === activeIndex ? 1 : 0, scale: i === activeIndex ? 1 : 1.08 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={src}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        ))}
      </motion.div>
      {/* Dark gradient + radial overlays for hero text contrast */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#03192c]/55 via-[#03192c]/40 to-[#03192c]/90" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_30%_40%,rgba(3,25,44,0)_0%,rgba(3,25,44,0.6)_70%)]" />
      {/* Slide indicators (bottom-right) */}
      <div className="absolute bottom-[140px] right-6 z-[3] hidden flex-col items-end gap-3 lg:bottom-[150px] lg:right-16 lg:flex">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            className={`h-[3px] w-10 transition-all duration-500 ${
              i === activeIndex ? "bg-[#fcec9b]" : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
      {/* Vertical scroll-progress timeline (Klaas .slide-timeline) */}
      <div className="absolute right-6 top-1/2 z-[3] hidden h-[154px] w-px -translate-y-1/2 overflow-hidden bg-white/15 lg:right-16 lg:hidden">
        <motion.div style={{ y: timelineY }} className="h-full w-full bg-white" />
      </div>
    </>
  );
}

const navItems = [
  { label: "Home", hasDropdown: true, href: "#top" },
  { label: "Treatments", hasDropdown: true, href: "#treatments" },
  { label: "About", hasDropdown: true, href: "#about" },
  { label: "Blog", hasDropdown: true, href: "#blog" },
  { label: "Contact", hasDropdown: false, href: "#contact" },
];

const categories = [
  {
    title: "General Dentistry",
    bg: "bg-[#f5f5d9]",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    items: ["Check-Ups & Cleanings", "Tooth-Coloured Fillings", "Family Dental Care", "Oral Cancer Screening"],
  },
  {
    title: "Cosmetic Dentistry",
    bg: "bg-[#f2eee9]",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
    items: ["Porcelain Veneers", "Teeth Whitening", "Composite Bonding", "Smile Makeover"],
  },
  {
    title: "Orthodontics",
    bg: "bg-[#ece5de]",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    items: ["Invisalign® Clear Aligners", "Traditional Braces", "Retainers", "Early Orthodontics"],
  },
];

const featuredTreatments = [
  {
    name: "Dental Implants",
    category: "General Dentistry",
    desc: "A small titanium post surgically placed into your jawbone, acting as an artificial tooth root — provides a secure and natural-looking replacement. Free consultation available.",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Check-Ups & Cleanings",
    category: "General Dentistry",
    desc: "Thorough exams and digital X-rays. Removes plaque and tartar buildup. Personalized oral hygiene advice and early detection of cavities and gum disease.",
    img: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Family Dental Care",
    category: "General Dentistry",
    desc: "We welcome patients of all ages. Our gentle approach ensures your children, teens, and adults receive the dental care they need — under one roof.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Invisalign®",
    category: "Orthodontics",
    desc: "A modern orthodontic solution using clear, removable aligners to gently shift your teeth into place — no brackets, no wires, no hassle. Free consultation offered.",
    img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Traditional Braces",
    category: "Orthodontics",
    desc: "Modern metal braces to help kids, teens, and adults achieve healthy, beautifully aligned smiles. Treatment typically 18–36 months.",
    img: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Teeth Whitening",
    category: "Cosmetic Dentistry",
    desc: "Our professional teeth whitening treatments can lighten discoloration and stains for a radiant, youthful smile. Safe, fast results.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Porcelain Veneers",
    category: "Cosmetic Dentistry",
    desc: "Porcelain veneers are thin, custom-crafted shells that cover the front surface of your teeth to improve color, shape, and alignment.",
    img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Composite Bonding",
    category: "Cosmetic Dentistry",
    desc: "Cosmetic bonding repairs chips, cracks, gaps, and discoloration using tooth-colored resin. Same-day treatment with instant results.",
    img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=600&auto=format&fit=crop",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=800&auto=format&fit=crop",
];

const galleryTabs = ["Cosmetic", "Family", "Orthodontic"];

const blogCards = [
  { category: "Patient Guide", title: "What to expect at your first visit at Olympic Park Smiles", img: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=800&auto=format&fit=crop" },
  { category: "News", title: "Same-day dental appointments in Calgary SW", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop" },
  { category: "Care", title: "Sedation options for anxious patients", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop" },
  { category: "Prevention", title: "Why digital X-rays matter for kids' dental care", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop" },
  { category: "Orthodontics", title: "Choosing between Invisalign and traditional braces", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" },
  { category: "Insurance", title: "What the CDCP means for your family's dental coverage", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop" },
];

const blogAccordion = [
  {
    title: "What can I expect at my first visit?",
    content: "You'll be warmly welcomed, followed by a thorough exam, digital X-rays if needed, and a personalized discussion about your oral health and goals.",
  },
  {
    title: "Do you offer same-day appointments?",
    content: "Yes, we reserve time daily for emergency or urgent visits. Call us and we'll do our best to see you as soon as possible.",
  },
  {
    title: "What if I'm nervous about dental visits?",
    content: "You're not alone. We specialize in helping anxious patients feel safe and supported. Our gentle approach, calming environment, and sedation options make a big difference.",
  },
];

const stats = [
  { value: "4.9★", label: "120+ Reviews", sub: "Rating" },
  { value: "4", label: "Expert doctors", sub: "Team" },
  { value: "Mon–Fri", label: "9 AM – 5 PM", sub: "Hours" },
];

const team = [
  {
    name: "Dr. Ebraheem Alhammadi",
    role: "DDS — Dalhousie University",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Lissandre Colbran",
    role: "DDS — University of Michigan",
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Brendan Kalin",
    role: "DDS, B.Acc. — University of Alberta",
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dr. Kevin Kalin",
    role: "DDS — University of Alberta",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop",
  },
];

const treatmentDetails = [
  { name: "Dental Implants", img: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=300&auto=format&fit=crop" },
  { name: "Invisalign®", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=300&auto=format&fit=crop" },
  { name: "Teeth Whitening", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=300&auto=format&fit=crop" },
  { name: "Porcelain Veneers", img: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=300&auto=format&fit=crop" },
];

function TiltImage({ src, className, innerClassName = "" }: { src: string; className?: string; innerClassName?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [0, 1], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-[1000px] ${className}`}
    >
      <div className={`overflow-hidden rounded-[32px] w-full h-full ${innerClassName}`}>
        <motion.img
          src={src}
          alt=""
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

function ColorReveal({ children, color = "bg-[#ebe3de]", className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[32px] ${className}`}>
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        className={`absolute inset-0 z-10 ${color}`}
      />
      {children}
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return (
    <div className="mb-16 flex items-center gap-4">
      <span className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${dark ? "text-white/60" : "text-[#03192c]"}`}>{number}</span>
      <span className={`h-px w-12 ${dark ? "bg-white/20" : "bg-[#03192c]/20"}`} />
      <p className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${dark ? "text-[#fcec9b]" : "text-[#fcec9b]"}`}>{label}</p>
    </div>
  );
}

export default function ClonePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState(galleryTabs[0]);
  const [openAccordion, setOpenAccordion] = useState(blogAccordion[0].title);
  const [activeFeaturedCategory, setActiveFeaturedCategory] = useState("General Dentistry");
  const heroRef = useRef<HTMLElement>(null);

  const visibleFeaturedTreatments = featuredTreatments.filter(
    (treatment) => treatment.category === activeFeaturedCategory
  );

  return (
    <main className="scroll-smooth bg-white text-[#03192c] font-sans">

      {/* ============================================
          HEADER / NAVIGATION
          ============================================ */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#03192c] text-white">
        <div className="flex h-[88px] w-full items-center justify-between lg:h-[127px]">
          {/* Logo Section */}
          <div className="flex h-full items-center border-r border-white/10 px-6 lg:px-12">
            <img src="/images/olympic-smiles-logo.webp" alt="Olympic Park Smiles Dental" className="h-12 w-auto lg:h-16" />
          </div>

          {/* Dual-Row Center Section */}
          <div className="hidden h-full flex-1 flex-col lg:flex">
            {/* Top Row: Info & Booking */}
            <div className="flex h-1/2 items-center justify-between border-b border-white/10 px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              <div className="flex items-center gap-10">
                <a href="mailto:info@olympicparksmiles.com" className="transition-colors hover:text-white">info@olympicparksmiles.com</a>
                <a href="tel:4033002224" className="transition-colors hover:text-white">(403) 300-2224</a>
              </div>
              <a href="https://www.olympicparksmiles.com/book-appointment/" className="text-[#fcec9b] transition-colors hover:text-white">Book Appointment</a>
            </div>

            {/* Bottom Row: Navigation Menu */}
            <nav className="flex h-1/2 items-center justify-center gap-10 px-10">
              {navItems.map((item) => {
                const isTreatments = item.label === "Treatments";
                return (
                  <div key={item.label} className="group relative flex h-full items-center">
                    <a
                      href={item.href}
                      className="flex items-center gap-2 text-[12.6px] font-semibold uppercase tracking-[0.15em] text-white/90 transition hover:text-white"
                    >
                      {item.label}
                      {item.hasDropdown && (
                        <span className="text-[10px] transition-transform group-hover:rotate-180">▼</span>
                      )}
                    </a>
                    {item.hasDropdown ? (
                      <div className="pointer-events-none absolute left-1/2 top-full z-20 w-[600px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#03192c] p-8 opacity-0 shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:pointer-events-auto group-hover:mt-0 group-hover:opacity-100 lg:mt-0">
                        {isTreatments ? (
                          <div className="grid grid-cols-2 gap-10">
                            <div>
                              <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#fcec9b]">Categories</p>
                              <ul className="space-y-4 text-[15px] font-medium text-white/80">
                                {categories.map(cat => (
                                  <li key={cat.title} className="hover:text-white transition cursor-pointer flex items-center gap-3">
                                    <div className="h-1 w-1 rounded-full bg-[#fcec9b]" />
                                    {cat.title}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#fcec9b]">Popular</p>
                              <div className="grid grid-cols-2 gap-4">
                                {treatmentDetails.map((treatment) => (
                                  <div key={treatment.name} className="group/item cursor-pointer">
                                    <div className="aspect-square overflow-hidden rounded-xl bg-white/10 mb-2">
                                      <img src={treatment.img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                                    </div>
                                    <p className="text-[12px] font-semibold text-white/90 group-hover/item:text-white transition-colors leading-tight">{treatment.name}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-[#fcec9b]">Explore {item.label}</p>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="aspect-video rounded-xl bg-white/5 p-4 flex items-center justify-center text-center">
                                <p className="text-sm font-medium text-white/60">Featured content about {item.label} dentistry</p>
                              </div>
                              <ul className="space-y-3 text-sm text-white/80">
                                <li className="hover:text-white transition cursor-pointer">• Overview</li>
                                <li className="hover:text-white transition cursor-pointer">• Our Approach</li>
                                <li className="hover:text-white transition cursor-pointer">• Success Stories</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Mobile Menu & Desktop Spacer */}
          <div className="flex h-full items-center">
            <button
              type="button"
              className="px-6 lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <div className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5">
                <div className="h-0.5 w-5 bg-white" />
                <div className="h-0.5 w-5 bg-white" />
              </div>
            </button>
            <div className="hidden lg:block lg:w-[126px]" />
          </div>
        </div>

        {/* Fixed Menu Button - Only visible on desktop large screens */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="fixed right-0 top-0 z-50 hidden h-[126px] w-[126px] flex-col items-center justify-center border-l border-white/10 bg-[#03192c] text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#02101e] lg:flex"
        >
          <div className="mb-2 flex flex-col gap-1.5">
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-6 bg-white" />
          </div>
          Menu
        </button>
      </header>

      {/* ============================================
          MOBILE FULL-SCREEN MENU
          ============================================ */}
      {menuOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] bg-[#03192c] px-6 py-8 text-white lg:px-12 lg:py-12"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/images/olympic-smiles-logo.webp" alt="Olympic Park Smiles Dental" className="h-10 w-auto lg:h-12" />
                <p className="text-xl font-semibold tracking-tight lg:text-2xl">Olympic Park Smiles</p>
              </div>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="mt-20 grid lg:grid-cols-2 lg:mt-32">
              <nav className="flex flex-col gap-6 text-4xl font-medium sm:text-5xl lg:text-7xl">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#fcec9b] transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-12 lg:mt-0 lg:pl-20">
                <p className="text-[14px] uppercase tracking-[0.2em] text-[#fcec9b]">Get in touch</p>
                <div className="mt-6 space-y-8 text-xl lg:text-2xl">
                  <a href="mailto:info@olympicparksmiles.com" className="block hover:text-[#fcec9b] transition-colors">info@olympicparksmiles.com</a>
                  <a href="tel:4033002224" className="block hover:text-[#fcec9b] transition-colors">(403) 300-2224</a>
                  <p className="max-w-xs text-white/60">23 Canada Olympic Common SW, Calgary, AB T3H 6K4</p>
                </div>
              </div>
            </div>
            <p className="mt-auto text-sm text-[#fcec9b]">Open Mon–Fri 9:00 AM – 5:00 PM. Sat by appointment. Book online for faster scheduling.</p>
          </div>
        </motion.div>
      ) : null}

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        ref={heroRef}
        id="top"
        className="relative bg-[#03192c]"
        style={{ height: "150vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroBackgroundLayers containerRef={heroRef} />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center px-6 lg:px-12">
          <FadeIn>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#b69f8f]" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#b69f8f] lg:text-[14px]">OLYMPIC PARK SMILES</p>
              <div className="h-[1px] w-12 bg-[#b69f8f]" />
            </div>
            <h1 className="mt-8 max-w-[980px] text-[52px] font-normal leading-[1.05] tracking-tight sm:text-7xl md:text-8xl lg:text-[84px] text-white">
              Comfort. Care. Confidence.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10 max-w-[680px]">
            <p className="text-xl font-light leading-relaxed text-white/80 lg:text-2xl">
              Family-friendly dental care in Calgary — for the whole family, under one roof. From kids&rsquo; checkups to cosmetic and restorative treatments, we provide gentle, efficient care using the latest technology.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="https://www.olympicparksmiles.com/book-appointment/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 rounded-full border border-white/50 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-white hover:text-[#03192c]"
              >
                Book Appointment
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.span>
              </a>
              <a
                href="tel:4033002224"
                className="group inline-flex items-center gap-4 rounded-full bg-[#fcec9b] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#03192c] transition-all hover:bg-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call (403) 300-2224
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Hero Bottom Anchor Links */}
        <div className="absolute bottom-0 left-0 z-20 w-full border-t border-white/10 bg-[#03192c]/80 backdrop-blur-md">
          <div className="mx-auto flex h-[100px] max-w-[1440px] items-center gap-6 overflow-x-auto whitespace-nowrap px-6 sm:gap-8 lg:h-[130px] lg:justify-between lg:gap-0 lg:overflow-visible lg:px-12">
            {[
              { label: "Treatments", href: "#treatments" },
              { label: "About", href: "#about" },
              { label: "The team", href: "#team" },
              { label: "Gallery", href: "#gallery" },
              { label: "Book online", href: "https://www.olympicparksmiles.com/book-appointment/", primary: true },
            ].map((anchor) => (
              <a
                key={anchor.label}
                href={anchor.href}
                target={anchor.primary ? "_blank" : undefined}
                rel={anchor.primary ? "noopener noreferrer" : undefined}
                className={`flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors lg:text-[12px] lg:tracking-[0.25em] ${
                  anchor.primary ? "text-[#fcec9b] hover:text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {anchor.label}
              </a>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ============================================
          CURRENT PROMOTIONS (OPS marquee)
          ============================================ */}
      <section className="border-y border-white/10 bg-[#03192c] py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
          <FadeIn>
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[#fcec9b]/40" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fcec9b]">Current Offers</p>
            </div>
          </FadeIn>
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                headline: "Free Consultation",
                title: "Implants, Invisalign & Wisdom teeth",
                sub: "Free sedation with dental treatment (oral sedation only)",
              },
              {
                headline: "$895",
                title: "Dental Implants From",
                sub: "Includes imaging. $355 parts fee applies.",
              },
              {
                headline: "$750",
                title: "Implant Crown",
                sub: "Lab fee applies.",
              },
              {
                headline: "$50",
                title: "Gift Card for New Patients",
                sub: "With new patient exam + hygiene.",
              },
              {
                headline: "Free for Life",
                title: "Teeth Whitening",
                sub: "ValueMed take-home kits.",
              },
            ].map((promo, index) => (
              <FadeIn key={promo.headline} delay={index * 0.08}>
                <div className="group flex h-full flex-col justify-between bg-[#03192c] p-8 transition-colors hover:bg-[#0a2238] lg:p-10">
                  <p className="text-[28px] font-semibold tracking-tight text-[#fcec9b] lg:text-[34px]">
                    {promo.headline}
                  </p>
                  <p className="mt-3 text-[15px] font-medium uppercase tracking-[0.15em] text-white lg:text-base">
                    {promo.title}
                  </p>
                  <p className="mt-6 text-[13px] leading-relaxed text-white/60 lg:text-sm">
                    {promo.sub}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p className="mt-8 text-center text-[11px] uppercase tracking-[0.2em] text-white/40">
              Limited-time offers — call <a href="tel:4033002224" className="text-[#fcec9b] hover:text-white">(403) 300-2224</a> for details
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          TREATMENTS CATEGORIES
          ============================================ */}
      <section
        id="treatments"
        className="scroll-mt-[92px] mx-auto w-full max-w-[1440px] px-6 py-24 lg:py-32"
      >
        <FadeIn>
          <SectionLabel number="1" label="Treatments" />
          <h2 className="mb-16 text-[42px] font-semibold tracking-tight text-[#03192c] lg:text-[56px]">Dental care categories</h2>
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category, index) => (
            <FadeIn key={category.title} delay={index * 0.1}>
              <article className={`group h-full overflow-hidden rounded-[32px] p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 ${category.bg}`}>
                {/* Category image */}
                <ColorReveal color="bg-[#d0c0b4]" className="mb-8">
                  <TiltImage
                    src={category.img}
                    className="aspect-[4/5]"
                  />
                </ColorReveal>
                <h3 className="text-3xl font-semibold text-[#03192c]">{category.title}</h3>
                {/* Treatment links grid */}
                <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-[#03192c]/80 transition-transform group-hover:translate-x-0.5">
                      <div className="h-1 w-1 flex-shrink-0 rounded-full bg-[#03192c]/40" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#treatments"
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#03192c]/60 transition-colors hover:text-[#03192c]"
                >
                  {category.title} <span>→</span>
                </a>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================
          FEATURED TREATMENTS
          ============================================ */}
      <section className="bg-[#03192c] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <FadeIn>
            <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fcec9b]">Featured</p>
                <h2 className="mt-4 text-[42px] font-semibold tracking-tight text-white lg:text-[56px]">Featured treatments</h2>
              </div>
              <a
                href="https://www.olympicparksmiles.com/book-appointment/"
                className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-[#03192c]"
              >
                Book appointment
              </a>
            </div>
          </FadeIn>
          <div className="mb-12 flex flex-wrap gap-3">
            {["General Dentistry", "Cosmetic Dentistry", "Orthodontics"].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFeaturedCategory(category)}
                className={`rounded-full border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${
                  activeFeaturedCategory === category
                    ? "border-white bg-white text-[#03192c]"
                    : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visibleFeaturedTreatments.map((treatment, index) => (
              <FadeIn key={treatment.name} delay={index * 0.1}>
                <article className="group h-full rounded-[32px] border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/[0.08]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fcec9b]">{treatment.category}</p>
                  <h3 className="mt-4 text-[28px] font-normal leading-tight text-white">{treatment.name}</h3>
                  <div className="mt-8 overflow-hidden rounded-2xl aspect-video bg-white/5">
                    <TiltImage src={treatment.img} className="w-full h-full" />
                  </div>
                  <p className="mt-6 text-[15px] leading-relaxed text-white/60">
                    {treatment.desc}
                  </p>
                  <a
                    href="https://www.olympicparksmiles.com/book-appointment/"
                    className="mt-10 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fcec9b] transition-colors group-hover:text-white"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-transform group-hover:scale-110">→</div>
                    Book now
                  </a>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ABOUT — WHAT MAKES US DIFFERENT
          ============================================ */}
      <section
        id="about"
        className="scroll-mt-[92px] mx-auto w-full max-w-[1440px] px-6 py-24 lg:py-32"
      >
        <FadeIn>
          <SectionLabel number="2" label="About us" />
          <h2 className="mb-16 text-[42px] font-semibold tracking-tight text-[#03192c] lg:text-[56px]">What makes us different</h2>
        </FadeIn>
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Patient-Centered Care",
              desc: "We tailor every treatment plan to your specific needs and goals — no cookie-cutter dentistry here.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              ),
            },
            {
              title: "Modern Technology",
              desc: "From digital X-rays to 3D scanning and intraoral cameras, we use the latest tools to deliver safe, efficient care.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              ),
            },
            {
              title: "Comfort-Focused",
              desc: "We offer sedation options, gentle techniques, and a welcoming space designed to help ease dental anxiety.",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              ),
            },
          ].map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.1}>
              <div className="group rounded-[32px] border border-[#e8e0da] bg-white p-12 transition-all hover:bg-[#fafaf8] hover:shadow-xl">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e8e0da] bg-[#fafaf8] text-[#03192c]">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-semibold text-[#03192c]">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#03192c]/70">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================
          KNOW-HOW / STATS SECTION
          ============================================ */}
      <section className="scroll-mt-[92px] mx-auto w-full max-w-[1440px] px-6 py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <FadeIn>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fcec9b]">Know-how</p>
              <h2 className="mt-8 font-serif text-[48px] leading-[1.1] text-[#03192c] sm:text-[64px] lg:text-[75.6px]">
                Modern dental care that <span className="text-[#03192c]/40">puts you first</span>
              </h2>
            </FadeIn>
            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              <FadeIn delay={0.1}>
                <ColorReveal color="bg-[#d0c0b4]">
                  <TiltImage
                    src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2070&auto=format&fit=crop"
                    className="aspect-[4/5]"
                  />
                </ColorReveal>
              </FadeIn>
              <FadeIn delay={0.2}>
                <ColorReveal color="bg-[#b8a89d]">
                  <TiltImage
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
                    className="aspect-[4/5]"
                  />
                </ColorReveal>
              </FadeIn>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <FadeIn delay={0.3}>
              <div className="rounded-[32px] border border-[#e8e0da] bg-[#fafaf8] p-12 lg:p-16">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#03192c]/60">Our Clinic</p>
                <p className="mt-8 text-lg leading-relaxed text-[#03192c]/80 lg:text-xl">
                  Located in Calgary at 23 Canada Olympic Common SW, we combine modern technology with a patient-first approach. We welcome new patients and work hard to make every visit smooth, comfortable, and stress-free.
                </p>
                <p className="mt-4 text-[13px] font-semibold text-[#03192c]/60">
                  Canadian Dental Care Plan (CDCP) accepted &bull; Direct billing available
                </p>
                <a
                  href="https://www.olympicparksmiles.com/book-appointment/"
                  className="mt-10 inline-block rounded-full border border-[#03192c]/30 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#03192c] transition hover:bg-[#03192c] hover:text-white"
                >
                  Meet the team
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <ColorReveal color="bg-[#03192c]" className="mt-12">
                <TiltImage
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop"
                  className="aspect-video"
                  innerClassName="opacity-60"
                />
              </ColorReveal>
            </FadeIn>
          </div>
        </div>

        {/* Stats — plain text blocks */}
        <div className="mt-24 grid gap-12 md:grid-cols-3">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div>
                <p className="text-[70px] font-bold tracking-tight text-[#03192c] leading-none">{stat.value}</p>
                <p className="mt-3 text-[15px] font-medium text-[#03192c]/60">{stat.label}<span className="mx-2 text-[#03192c]/30">/</span>{stat.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================
          BOOK ONLINE CTA — FULL-WIDTH IMAGE BACKGROUND
          ============================================ */}
      <section className="relative overflow-hidden bg-[#03192c]">
        {/* Background image with dark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03192c]/90 to-[#03192c]/60" />
        <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-24 lg:grid-cols-3 lg:items-center lg:px-12 lg:py-32">
          <FadeIn>
            <h3 className="text-[36.4px] font-medium text-white">Book online</h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-white/80">
              To book an appointment straight away you can use our online booking form. We accept new patients of all ages.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="https://www.olympicparksmiles.com/book-appointment/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-4 rounded-full bg-[#927e70] px-10 py-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-[#03192c]"
            >
              Booking form
              <span>→</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          TEAM SECTION
          ============================================ */}
      <section
        id="team"
        className="scroll-mt-[92px] bg-white py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <FadeIn>
            <SectionLabel number="3" label="Our team" />
            <h2 className="mb-16 text-[42px] font-semibold tracking-tight text-[#03192c] lg:text-[56px]">Meet the doctors</h2>
          </FadeIn>

          <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.1} className="min-w-[300px] flex-shrink-0 lg:min-w-[380px]">
                <article className="group overflow-hidden rounded-[32px] bg-white transition-all hover:shadow-2xl">
                  <TiltImage
                    src={member.img}
                    className="aspect-[3/4]"
                  />
                  <div className="rounded-b-[32px] bg-[#ebe3de] p-8 lg:p-10">
                    <h3 className="text-2xl font-semibold text-[#03192c] lg:text-[26px]">{member.name}</h3>
                    <p className="mt-2 text-[13px] font-medium text-[#03192c]/60 uppercase tracking-widest">{member.role}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          LOCATION / CLINIC SECTION
          ============================================ */}
      <section className="bg-[#03192c] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <FadeIn>
            <div className="mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fcec9b]">Visit us</p>
              <h2 className="mt-4 text-[42px] font-semibold tracking-tight text-white lg:text-[56px]">Our Calgary clinic</h2>
            </div>
          </FadeIn>
          <div className="grid gap-0 border-y border-white/10 lg:grid-cols-3 lg:border-x divide-y divide-white/10 lg:divide-x lg:divide-y-0">
            {/* Address */}
            <FadeIn delay={0}>
              <div className="group relative flex h-[300px] flex-col items-center justify-center overflow-hidden p-8 text-center lg:h-[450px]">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1449156003053-93d3a67ca8a5?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-[#03192c]/70 transition-colors group-hover:bg-[#03192c]/50" />
                <div className="relative z-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fcec9b] mb-4">Address</p>
                  <p className="text-2xl font-normal tracking-tight text-[#e4d9d1] lg:text-3xl">23 Canada Olympic Common SW</p>
                  <p className="mt-2 text-lg text-white/60">Calgary, AB T3H 6K4</p>
                </div>
              </div>
            </FadeIn>
            {/* Hours */}
            <FadeIn delay={0.1}>
              <div className="group relative flex h-[300px] flex-col items-center justify-center overflow-hidden p-8 text-center lg:h-[450px]">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-[#03192c]/70 transition-colors group-hover:bg-[#03192c]/50" />
                <div className="relative z-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#fcec9b] mb-4">Hours</p>
                  <p className="text-2xl font-normal tracking-tight text-[#e4d9d1] lg:text-3xl">Mon – Fri: 9AM – 5PM</p>
                  <p className="mt-2 text-lg text-white/60">Sat: By appointment &bull; Sun: Closed</p>
                </div>
              </div>
            </FadeIn>
            {/* Book */}
            <FadeIn delay={0.2}>
              <a
                href="https://www.olympicparksmiles.com/book-appointment/"
                className="group relative flex h-[300px] flex-col items-center justify-center overflow-hidden p-8 text-center lg:h-[450px]"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-[#03192c]/70 transition-colors group-hover:bg-transparent" />
                <p className="relative z-10 text-4xl font-normal tracking-tight text-[#e4d9d1] transition-all group-hover:scale-110 lg:text-5xl">Book online →</p>
              </a>
            </FadeIn>
          </div>

          {/* Areas Served */}
          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              <span>Serving:</span>
              {["Calgary SW", "Springbank Hill", "Signal Hill", "Aspen Woods"].map((area) => (
                <span key={area} className="text-white/60">{area}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          GALLERY SECTION
          ============================================ */}
      <section
        id="gallery"
        className="scroll-mt-[92px] mx-auto w-full max-w-[1440px] px-6 py-24 lg:py-32"
      >
        <FadeIn>
          <SectionLabel number="4" label="Gallery" />
          <h2 className="mb-16 text-[42px] font-semibold tracking-tight text-[#03192c] lg:text-[56px]">Success stories</h2>
        </FadeIn>

        <div className="mb-12 flex flex-wrap gap-4">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveGalleryTab(tab)}
              className={`rounded-full px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all ${
                activeGalleryTab === tab
                  ? "bg-[#03192c] text-white shadow-xl"
                  : "bg-[#ebe3de] text-[#03192c] hover:bg-[#e1d6cf]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <FadeIn key={`${activeGalleryTab}-${index}`} delay={index * 0.05}>
              <div className="group relative">
                <TiltImage
                  src={galleryImages[index % galleryImages.length]}
                  className="aspect-[4/5]"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#03192c]/40 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                  <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl">+</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ============================================
          BLOG / ARTICLES SECTION
          ============================================ */}
      <section
        id="blog"
        className="scroll-mt-[92px] mx-auto w-full max-w-[1440px] px-6 py-24 lg:py-32"
      >
        <FadeIn>
          <SectionLabel number="5" label="Articles" />
          <h2 className="mb-16 text-[42px] font-semibold tracking-tight text-[#03192c] lg:text-[56px]">Featured insights</h2>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogCards.map((card, index) => (
            <FadeIn key={card.title} delay={index * 0.1}>
              <article className="group h-full overflow-hidden rounded-[32px] border border-[#e8e0da] bg-white transition-all hover:-translate-y-2 hover:shadow-2xl">
                <TiltImage
                  src={card.img}
                  className="aspect-[16/10]"
                />
                <div className="p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#fcec9b]">{card.category}</p>
                  <h3 className="mt-4 text-xl font-semibold leading-tight text-[#03192c] lg:text-2xl transition-colors group-hover:text-[#03192c]/70">{card.title}</h3>
                  <div className="mt-8 flex items-center gap-2 text-[13px] font-bold text-[#03192c]">
                    Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 rounded-[32px] border border-[#e8e0da] bg-[#fafaf8] p-10 lg:p-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#03192c]/60">Patient FAQ</p>
          <div className="mt-8 divide-y divide-[#03192c]/10">
            {blogAccordion.map((item) => {
              const isOpen = openAccordion === item.title;
              return (
                <div key={item.title} className="py-6">
                  <button
                    type="button"
                    onClick={() => setOpenAccordion(isOpen ? "" : item.title)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-xl font-semibold text-[#03192c] lg:text-2xl">{item.title}</span>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#03192c]/20 text-[#03192c] transition-transform ${isOpen ? "rotate-45" : ""}`}>+</div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-6 max-w-[800px] text-lg leading-relaxed text-[#03192c]/70">
                      {item.content}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          NEWSLETTER SECTION
          ============================================ */}
      <section className="bg-[#ebe3de] py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h3 className="text-4xl font-semibold tracking-tight text-[#03192c] lg:text-6xl">Subscribe to our newsletter</h3>
            <p className="mt-6 text-xl text-[#03192c]/70 lg:text-2xl">Get practical oral health tips and clinic updates every month.</p>
            <form className="mt-12 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-16 flex-1 rounded-full border border-[#d0c0b4] bg-white px-8 text-lg outline-none focus:ring-2 focus:ring-[#927e70]/20"
              />
              <button className="h-16 rounded-full bg-[#03192c] px-10 text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#02101e]">
                Sign up
              </button>
            </form>
          </FadeIn>
          <FadeIn delay={0.2}>
            <TiltImage
              src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2083&auto=format&fit=crop"
              className="aspect-square shadow-2xl"
            />
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          CONTACT / BOOKING CTA
          ============================================ */}
      <section id="contact" className="scroll-mt-[92px] bg-[#ebe3de] py-24 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1440px] gap-16 px-6 lg:grid-cols-[1.2fr_1fr]">
          <FadeIn>
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#03192c]/50">Next</span>
              <span className="h-px w-12 bg-[#03192c]/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#03192c]/50">Contact</span>
            </div>
            <h2 className="text-5xl font-semibold tracking-tight text-[#03192c] lg:text-8xl">Contact</h2>
            <p className="mt-10 max-w-[600px] text-xl leading-relaxed text-[#03192c]/70 lg:text-2xl">
              Ready for your next appointment? Book online or call <a href="tel:4033002224" className="font-semibold hover:underline">(403) 300-2224</a> — we&rsquo;d love to welcome you to our Calgary clinic.
            </p>
            <a
              href="https://www.olympicparksmiles.com/book-appointment/"
              className="mt-12 group inline-flex items-center gap-6 rounded-full bg-[#927e70] py-6 px-12 text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#03192c]"
            >
              Book appointment
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-2">→</div>
            </a>
          </FadeIn>
          <FadeIn delay={0.2}>
            <TiltImage
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2069&auto=format&fit=crop"
              className="aspect-[4/5] shadow-[0_40px_100px_rgba(146,126,112,0.3)]"
            />
          </FadeIn>
        </div>
      </section>

      {/* ============================================
          FOOTER TOP — MENU / SOCIAL / BOOK BUTTONS
          ============================================ */}
      <section className="bg-white px-6 py-12 lg:px-12 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 md:grid-cols-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="group relative flex h-[200px] items-center justify-center overflow-hidden rounded-[40px] border border-[#d8c6bb] bg-white text-[28px] font-medium text-[#03192c] lg:h-[280px] lg:text-[42px]"
          >
            <div className="absolute inset-0 translate-y-full bg-[#03192c] transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors group-hover:text-white">Menu</span>
          </button>
          <div className="flex h-[200px] items-center justify-center gap-8 rounded-[40px] border border-[#d8c6bb] bg-[#ebe3de] lg:h-[280px]">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/OlympicParkSmiles"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-[#03192c]/20 text-[#03192c] lg:h-20 lg:w-20"
            >
              <div className="absolute inset-0 scale-0 rounded-full bg-[#03192c] transition-transform duration-300 group-hover:scale-100" />
              <svg className="relative z-10 h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/olympicparksmiles"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-[#03192c]/20 text-[#03192c] lg:h-20 lg:w-20"
            >
              <div className="absolute inset-0 scale-0 rounded-full bg-[#03192c] transition-transform duration-300 group-hover:scale-100" />
              <svg className="relative z-10 h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/olympicparksmiles"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-[#03192c]/20 text-[#03192c] lg:h-20 lg:w-20"
            >
              <div className="absolute inset-0 scale-0 rounded-full bg-[#03192c] transition-transform duration-300 group-hover:scale-100" />
              <svg className="relative z-10 h-5 w-5 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <a
            href="https://www.olympicparksmiles.com/book-appointment/"
            className="group relative flex h-[200px] items-center justify-center overflow-hidden rounded-[40px] bg-[#03192c] text-[28px] font-medium text-white lg:h-[280px] lg:text-[42px]"
          >
            <div className="absolute inset-0 translate-y-full bg-[#927e70] transition-transform duration-500 group-hover:translate-y-0" />
            <span className="relative z-10 transition-colors group-hover:text-white">Book online</span>
          </a>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="bg-[#03192c] px-6 py-16 text-[#c9b4a7] lg:px-12 lg:py-24">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <div className="flex items-center gap-3">
              <img src="/images/olympic-smiles-logo.webp" alt="Olympic Park Smiles Dental" className="h-8 w-auto" />
              <p className="text-xl font-bold text-white">Olympic Park Smiles Dental</p>
            </div>
            <p className="max-w-md text-center text-sm leading-relaxed lg:text-left">
              Your Smile, Our Passion. Calgary&rsquo;s trusted dental team.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em] lg:justify-end">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-[1440px] border-t border-white/10 pt-8 text-center text-[10px] font-medium uppercase tracking-[0.1em] opacity-40">
          &copy; 2026 Olympic Park Smiles Dental. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
