"use client";

import LuxuryFooter from "@/shared/components/LuxuryFooter";
import Header from "@/shared/components/Header";
import HeroImage from "@/shared/components/HeroImage";
import ProductCard from "@/features/perfumes/components/ProductCard";
import TestimonialsCard from "@/shared/components/TestimonialsCard";
import { BestSellers } from "@/mock/BestSellers.products";
import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Marquee } from "@/shared/components/ui/marquee";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clock3,
  Gift,
  MessageCircleMore,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  ChevronDown,
} from "lucide-react";

type TrustPillar = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type CollectionCard = {
  title: string;
  tag: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: string;
};

type JourneyStep = {
  step: string;
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "left" ? "items-start text-left" : "items-center text-center",
      )}
    >
      <Badge
        variant="outline"
        className="border-foreground/15 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
      >
        {eyebrow}
      </Badge>
      <h2 className="max-w-3xl font-lejour text-3xl leading-tight md:text-5xl">
        {title}
      </h2>
      <p
        className={cn(
          "max-w-3xl text-sm leading-7 text-muted-foreground md:text-base",
          align === "left" ? "max-w-2xl" : "",
        )}
      >
        {description}
      </p>
    </div>
  );
}

const brandImages = ["brand1", "brand2", "brand3", "brand4", "brand5", "brand8", "brand7"];

const heroSignals = [
  {
    icon: Truck,
    label: "Secured delivery",
  },
  {
    icon: ShieldCheck,
    label: "Authentic selection",
  },
  {
    icon: Gift,
    label: "Gift-ready guidance",
  },
  {
    icon: Sparkles,
    label: "Designer to niche",
  },
];

const trustPillars: TrustPillar[] = [
  {
    icon: BadgeCheck,
    title: "Clear assortment",
    description:
      "The store is organized so designer, niche, and Middle Eastern scents feel easy to compare instead of noisy.",
  },
  {
    icon: Clock3,
    title: "Choice made simple",
    description:
      "Notes, strength, and occasion cues help visitors narrow down the right bottle before they ever reach checkout.",
  },
  {
    icon: PackageCheck,
    title: "Careful presentation",
    description:
      "A fragrance order should feel considered when it arrives, so the page leans into packaging and gift-readiness.",
  },
  {
    icon: MessageCircleMore,
    title: "Human support",
    description:
      "If two perfumes feel close, a quick message can usually settle the decision without guesswork.",
  },
];

const collectionCards: CollectionCard[] = [
  {
    title: "Designer",
    tag: "Familiar",
    description:
      "Recognisable houses and dependable signatures for shoppers who want a confident first pick.",
    image: "designer",
    imageAlt: "Designer fragrance collection",
    cta: "Explore designer edit",
  },
  {
    title: "Niche",
    tag: "Distinctive",
    description:
      "More character, more depth, and fewer obvious choices for people who like their scent to stand out.",
    image: "niche",
    imageAlt: "Niche fragrance collection",
    cta: "Explore niche edit",
  },
  {
    title: "Middle Eastern",
    tag: "Warm",
    description:
      "Oud, amber, and richer profiles for customers who want presence without losing balance.",
    image: "eastern",
    imageAlt: "Middle Eastern fragrance collection",
    cta: "Explore warm edit",
  },
];

const journeySteps: JourneyStep[] = [
  {
    step: "01",
    title: "Start with a family",
    description:
      "Designer for familiar signatures, niche for something less expected, and Middle Eastern for deeper warmth.",
  },
  {
    step: "02",
    title: "Match the moment",
    description:
      "Daily wear, evening plans, and gifting each benefit from a different kind of projection and mood.",
  },
  {
    step: "03",
    title: "Ask before you order",
    description:
      "If the shortlist still feels close, reach out and we will help trim it down with a little more context.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "How do I choose if I am new to fragrance?",
    answer:
      "Start with the family and the occasion. It is much easier to narrow down a bottle once you know whether you want something fresh, rich, or more expressive.",
  },
  {
    question: "Do you carry designer, niche, and Middle Eastern scents?",
    answer:
      "Yes. The store is arranged around those families so browsing feels closer to a guided edit than a random catalog.",
  },
  {
    question: "Can you help with gifts?",
    answer:
      "Absolutely. Share who it is for and the style they usually enjoy, and the shortlist becomes much easier to build.",
  },
  {
    question: "What if I am comparing two bottles?",
    answer:
      "Send the names over and we will help compare the notes, strength, and overall vibe so the choice feels less risky.",
  },
];

const reviews = [
  {
    name: "Aarav Sharma",
    review:
      "Royal Sandalwood feels like a proper daily signature. Warm, grounded, and still clean enough for office wear.",
  },
  {
    name: "Priya Iyer",
    review:
      "I was unsure about buying perfume online, but the note breakdown made the decision much easier. The bottle arrived beautifully packed too.",
  },
  {
    name: "Ishaan Malhotra",
    review:
      "The scent projects well without turning loud, and the page copy helped me understand why it fits evening use so well.",
  },
  {
    name: "Ananya Deshmukh",
    review:
      "I like that the store explains the strength and mood of each pick. It makes the shortlist feel far less random.",
  },
  {
    name: "Zoya Khan",
    review:
      "The oud and rose balance is elegant rather than heavy. It feels curated, not crowded.",
  },
];

const Page = () => {
  const [bestSellersGender, setBestSellersGender] = useState<"male" | "female">(
    "male",
  );

  const bestSellerCards = BestSellers.filter(
    (product) => product.gender === bestSellersGender,
  );

  return (
    <div className="w-full overflow-hidden">
      <Header />

      <main className="w-full">
        <section className="relative isolate overflow-hidden border-b border-foreground/10 bg-background">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(9,30,24,0.06)_0%,transparent_38%,rgba(197,160,89,0.09)_100%)] dark:bg-[linear-gradient(115deg,rgba(229,195,166,0.06)_0%,transparent_42%,rgba(12,54,45,0.22)_100%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 md:py-12 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[1fr_0.9fr] lg:px-8 xl:gap-12">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="border-foreground/15 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
              >
                Curated fragrance store
              </Badge>
              <h1 className="mt-5 max-w-3xl font-lejour text-4xl leading-tight md:text-5xl lg:text-6xl">
                Designer, niche and Middle Eastern fragrances.
                <span className="mt-3 block font-general-sans text-xl font-light leading-tight text-muted-foreground md:text-3xl">
                  A sharper way to find your next signature scent.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Browse familiar designer houses, expressive niche labels, and
                richer Middle Eastern picks in one calm, easy-to-compare
                fragrance edit.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90 dark:text-[#E5C3A6]"
                >
                  <Link href="/products">
                    Shop fragrances
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-foreground/15 bg-background/70 px-6"
                >
                  <Link href="/products?type=NICHE">Browse niche edit</Link>
                </Button>
              </div>

              <div className="mt-6 flex max-w-xl flex-wrap gap-2.5">
                {heroSignals.map((signal) => {
                  const Icon = signal.icon;

                  return (
                    <span
                      key={signal.label}
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/75 px-3 py-2 text-xs text-muted-foreground backdrop-blur-sm"
                    >
                      <Icon className="size-3.5 text-foreground" />
                      {signal.label}
                    </span>
                  );
                })}
              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                Built for shoppers who want the catalog to feel polished, clear,
                and perfume-first.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-[23rem] items-center justify-center lg:max-w-[25rem] lg:justify-self-center">
              <div className="relative h-[28rem] w-full overflow-hidden rounded-[2rem] border border-foreground/10 bg-[#080705] shadow-[0_28px_80px_rgba(0,0,0,0.22)] sm:h-[31rem] lg:h-[32rem]">
                <HeroImage preload={false} variant="mobile" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.18)_100%)]" />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-accent/10 py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="border-foreground/15 bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
              >
                Still deciding
              </Badge>
              <h2 className="mt-6 max-w-2xl font-lejour text-4xl leading-tight md:text-6xl">
                A transparent starting point for finding your fragrance.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                Once the first glance gives you the mood, we keep the next
                decision simple: family, occasion, and the details that actually
                matter.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {heroSignals.map((signal) => {
                  const Icon = signal.icon;

                  return (
                    <span
                      key={signal.label}
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-2 text-xs text-muted-foreground backdrop-blur-sm"
                    >
                      <Icon className="size-3.5 text-foreground" />
                      {signal.label}
                    </span>
                  );
                })}
              </div>
            </div>

            <Card className="border-foreground/10 bg-background/90 shadow-sm">
              <CardHeader className="space-y-4">
                <Badge
                  variant="outline"
                  className="w-fit border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
                >
                  Before you buy
                </Badge>
                <CardTitle className="font-lejour text-2xl md:text-3xl">
                  A calmer way to narrow the shortlist
                </CardTitle>
                <CardDescription className="text-sm leading-7 md:text-base">
                  Aventrail answers the usual pre-checkout questions: what it
                  smells like, where it fits, and whether it feels like a safe
                  pick.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {[
                  "Start with a fragrance family, not a random bottle.",
                  "Compare notes, concentration, and occasion before you decide.",
                  "If two options feel close, send us the shortlist and we will help narrow it down.",
                ].map((point, index) => (
                  <div
                    key={point}
                    className="flex gap-4 rounded-2xl border border-foreground/10 bg-background/70 p-4"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {point}
                    </p>
                  </div>
                ))}
                <Button
                  asChild
                  className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 dark:text-[#E5C3A6]"
                >
                  <Link href="/products">
                    See the current edit
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-y border-foreground/10 bg-background/90 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Badge
                  variant="outline"
                  className="border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
                >
                  House names
                </Badge>
                <h2 className="mt-4 font-lejour text-3xl md:text-5xl">
                  Familiar labels, curated with restraint
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                The logo rail gives the store some instant credibility while still
                leaving room for more discovery-led picks.
              </p>
            </div>

            <div className="mt-8 flex w-full justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:24s]">
                {brandImages.map((id, i) => (
                  <div
                    key={id}
                    className="relative mx-6 h-20 w-32 overflow-hidden rounded-xl md:mx-16"
                  >
                    <CldImage
                      fill
                      alt={`Brand logo ${i + 1}`}
                      format="auto"
                      quality="80"
                      src={id}
                      sizes="(max-width: 768px) 104px, 128px"
                      className="object-contain object-center opacity-60 contrast-150 transition-all duration-300 hover:opacity-100 dark:invert-96 dark:contrast-125"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why people trust it"
            title="A storefront that answers the buying questions"
            description="Instead of throwing every bottle at the page, the homepage gives people the context they usually want first: how the catalog is organized, what each edit means, and where to get help."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <Card
                  key={pillar.title}
                  className="h-full border-foreground/10 bg-background/80 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-foreground/5 text-foreground">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Best sellers"
              title="A focused edit of the bottles people reach for first"
              description="The best-seller block keeps the homepage commercial, but still grounded in a simple browsing choice."
            />
            <div className="flex flex-wrap gap-2">
              <Button
                className="cursor-pointer rounded-full"
                variant={bestSellersGender === "male" ? "default" : "outline"}
                onClick={() => setBestSellersGender("male")}
              >
                Men
              </Button>
              <Button
                className="cursor-pointer rounded-full"
                variant={bestSellersGender === "female" ? "default" : "outline"}
                onClick={() => setBestSellersGender("female")}
              >
                Women
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/products">View all</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {bestSellerCards.map((product) => (
              <ProductCard
                key={product.id}
                brand={product.brand}
                gender={product.gender}
                id={product.id}
                name={product.name}
                price={product.price}
                publicImageUrl={product.publicImageUrl}
                rating={product.rating}
                link="/products"
              />
            ))}
          </div>
        </section>

        <section className="bg-accent/20 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Shop by family"
              title="Start with the kind of scent you already have in mind"
              description="When the bottle is still undecided, the family is usually the quickest way to reduce the list."
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {collectionCards.map((card) => (
                <Link
                  key={card.title}
                  href="/products"
                  className="group flex h-full flex-col rounded-3xl border border-foreground/10 bg-background p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Badge variant="outline" className="border-foreground/10">
                      {card.tag}
                    </Badge>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <div className="mt-5 flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-foreground/5 to-transparent">
                    <CldImage
                      src={card.image}
                      width={360}
                      height={320}
                      alt={card.imageAlt}
                      format="auto"
                      quality="auto"
                      removeBackground
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <h3 className="mt-5 font-lejour text-2xl">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {card.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                    <span>{card.cta}</span>
                    <ArrowRight className="size-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Choose with confidence"
            title="A short path from browsing to buying"
            description="This section helps the page feel like a guided store rather than a static catalog."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-foreground/10 bg-background/80 shadow-sm">
              <CardHeader className="space-y-4">
                <Badge
                  variant="outline"
                  className="w-fit border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
                >
                  How we help
                </Badge>
                <CardTitle className="font-lejour text-2xl md:text-3xl">
                  A short path from browsing to buying
                </CardTitle>
                <CardDescription className="text-sm leading-7 md:text-base">
                  We make the decision tree smaller: choose the family, check the
                  occasion, then compare the details that matter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {journeySteps.map((step) => (
                  <div
                    key={step.step}
                    className="rounded-2xl border border-foreground/10 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-medium">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-foreground/15"
                >
                  <Link href="/contact">
                    Talk to us before you order
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="rounded-3xl border border-foreground/10 bg-background/80 p-6 shadow-sm">
                <Badge variant="outline" className="border-foreground/10">
                  Frequently asked
                </Badge>
                <div className="mt-5 space-y-3">
                  {faqItems.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-2xl border border-foreground/10 bg-background p-4"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                        <span>{faq.question}</span>
                        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                      </summary>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-foreground/10 bg-foreground p-6 text-background">
                <p className="text-sm uppercase tracking-[0.3em] text-background/60">
                  Support line
                </p>
                <p className="mt-4 font-lejour text-2xl">
                  If a fragrance feels close, send us the shortlist.
                </p>
                <p className="mt-3 text-sm leading-7 text-background/80">
                  A quick message is often enough to narrow the choice between two
                  similar bottles, especially for gifting or first-time buyers.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 rounded-full border-background/20 bg-background text-foreground hover:bg-background/90"
                >
                  <Link href="/contact">
                    Ask for help
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Customer voices"
            title="What people notice after they buy"
            description="The best reviews usually mention the same three things: the scent itself, how it lasts, and how the order arrived."
          />

          <div className="mt-10 flex justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:66s]">
              {reviews.map((review, i) => (
                <TestimonialsCard
                  key={i}
                  name={review.name}
                  review={review.review}
                />
              ))}
            </Marquee>
          </div>
        </section>

        <LuxuryFooter />
      </main>
    </div>
  );
};

export default Page;
