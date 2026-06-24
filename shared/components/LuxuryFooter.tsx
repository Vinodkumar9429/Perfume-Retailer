import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "Men", href: "/products?gender=MEN" },
      { label: "Women", href: "/products?gender=WOMEN" },
      { label: "Designers", href: "/products?type=DESIGNER" },
      { label: "Niche", href: "/products?type=NICHE" },
      { label: "Middle Eastern", href: "/products?type=CLONES" },
    ],
  },
];

const LuxuryFooter = () => {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge
              variant="outline"
              className="border-foreground/15 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.24em] sm:tracking-[0.35em]"
            >
              Fragrance edit
            </Badge>
            <h3 className="mt-5 max-w-2xl font-lejour text-3xl leading-tight md:text-5xl">
              A quieter way to finish the fragrance hunt.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              Aventrail keeps the closing details simple: explore the edit, ask
              for help if two bottles feel close, and choose with a little more
              context than a crowded catalog usually gives.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Designer edits",
                "Niche finds",
                "Middle Eastern blends",
                "Gift-ready",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-3 py-2 text-xs text-muted-foreground"
                >
                  <Sparkles className="size-3.5 text-[#C5A059]" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-foreground/90 dark:text-[#E5C3A6]"
              >
                Browse fragrances
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium text-foreground transition hover:bg-foreground/5"
              >
                Need a second opinion?
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {footerLinks.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-3 text-sm text-foreground/75">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="border-t border-foreground/10 pt-6 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Support
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <MapPin className="mt-1 size-4 shrink-0 text-[#C5A059]" />
                  <p className="text-sm leading-7 text-foreground/75">
                    Aventrail Luxury Fragrances, Unit 402, 4th Floor, Platinum
                    Tower, MG Road, Gurugram Sector 25, Haryana, 122002, India.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Clock3 className="mt-1 size-4 shrink-0 text-[#C5A059]" />
                  <p className="text-sm leading-7 text-foreground/75">
                    Use the contact page when you want help comparing two bottles
                    or narrowing the shortlist.
                  </p>
                </div>
                <div className="flex gap-3">
                  <MessageCircleMore className="mt-1 size-4 shrink-0 text-[#C5A059]" />
                  <p className="text-sm leading-7 text-foreground/75">
                    Clear details, careful presentation, and human support sit in
                    the same place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 AVENTRAIL. All rights reserved.</p>
          <p>
            Developed by -{" "}
            <Link
              className="font-semibold text-foreground underline underline-offset-4"
              target="_blank"
              href="https://vinodevagency.vercel.app/"
            >
              V Agency
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
