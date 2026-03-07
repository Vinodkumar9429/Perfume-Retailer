"use client";

import { SidebarMenuButton, SidebarSeparator, SidebarTrigger } from "@/shared/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  Heart,
  LogOut,
  Moon,
  Search,
  ShoppingCart,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import { Hyperlink } from "@/shared/components/ui/hyperlink";
import { AppSidebar } from "@/shared/components/app-sidebar";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";
import { NavItem } from "@/shared/components/SideBarContent";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { useDebounce } from "@/hooks/Debounce";
import { Settings } from "@/components/animate-ui/icons/settings";
import { AnimatedGradientText } from "@/shared/components/ui/animated-gradient-text";
import { UserRound } from "@/components/animate-ui/icons/user-round";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

const data: NavItem[] = [
  {
    title: "Middle Easterns",
    url: "/products?type=CLONES",
  },
  {
    title: "Designers",
    url: "/products?type=DESIGNER",
  },
  {
    title: "Niche",
    url: "/products?type=NICHE",
  },
  {
    title: "Men",
    url: "/products?gender=MEN",
  },
  {
    title: "Women",
    url: "/products?gender=WOMEN",
  },
];

const mockProducts = [
  { id: 1, name: "Amouage Interlude", slug: "amouage-interlude" },
  { id: 2, name: "Dior Sauvage", slug: "dior-sauvage" },
  {
    id: 3,
    name: "Killian Straight To Heaven",
    slug: "killian-straight-to-heaven",
  },
  { id: 4, name: "Creed Aventus", slug: "creed-aventus" },
];

const Header = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setIsMounted] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<typeof mockProducts>([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const { signOut } = useClerk();
  const router = useRouter();
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut(() => router.push("/"));
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      const id = setTimeout(() => {
        setResults([]);
      }, 0);

      return () => clearTimeout(id);
    }

    // const controller = new AbortController();

    // const fetchResult = async () => {
    //   try {
    //     const res = await fetch(`/products?search=${debouncedQuery}`, {
    //       signal: controller.signal,
    //     });
    //     const data = await res.json();
    //     setResults(data);
    //   } catch (err: any) {
    //     if (err.name === "AbortError") {
    //       console.error(err);
    //     }
    //   }
    // };

    // if (debouncedQuery.trim()) {
    //   fetchResult();
    // }

    // return () => controller.abort();
  }, [debouncedQuery]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!mounted) return <div className="h-16 w-full" />;

  return (
    <header className="w-full h-16 fixed top-0 left-0 bg-background z-50 font-general-sans">
      <nav className="w-full h-full border-b dark:border-[#C5A059]/10 flex justify-between items-center px-1">
        <div className="w-[27%] md:w-1/5 lg:w-1/6 flex justify-evenly items-center md:justify-center gap-x-0">
          <div className="md:hidden block">
            <AppSidebar />
            <SidebarTrigger className="scale-120" />
          </div>

          <div className="font-lejour md:text-xl relative hidden md:flex justify-center items-center tracking-widest">
            <AnimatedGradientText
              speed={1}
              colorFrom={resolvedTheme === "dark" ? "white" : "black"}
              colorTo={resolvedTheme === "dark" ? "#C5A059" : "#C5A079"}
            >
              AVENTRAIL
            </AnimatedGradientText>
          </div>
          <div className="bg-background text-foreground p-2 rounded-full flex md:hidden items-center justify-center border-2 border-border">
            <Search
              className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        <h1 className="font-lejour md:text-xl text-xl relative flex md:hidden justify-center items-center tracking-wider ">
          <AnimatedGradientText
            speed={1}
            colorFrom={resolvedTheme === "dark" ? "white" : "black"}
            colorTo={resolvedTheme === "dark" ? "#E5C3A6" : "#C5A079"}
          >
            AVETRAIL
          </AnimatedGradientText>
        </h1>

        <div className="md:flex justify-center items-center md:gap-x-2 lg:gap-x-4  text-sm hidden">
          <Hyperlink underlineClassName="underline underline-offset-2" href="/">
            Home
          </Hyperlink>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Hyperlink
                    underlineClassName="underline underline-offset-2"
                    href="/products"
                  >
                    Products
                  </Hyperlink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-52">
                    {data.map((item, i) => (
                      <NavigationMenuLink key={i} className="w-full" asChild>
                        <Link href={item.url}>{item.title}</Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Hyperlink
            underlineClassName="underline underline-offset-2"
            href="/about"
          >
            About Us
          </Hyperlink>
          <Hyperlink
            underlineClassName="underline underline-offset-2"
            href="/contact"
          >
            Contact Us
          </Hyperlink>
        </div>

        <div className="px-3 lg:pr-6 w-[31%] lg:w-auto flex justify-center items-center gap-x-2">
          <div className="bg-background text-foreground p-2 rounded-full hidden md:flex items-center justify-center border-2 border-border group">
            <Search
              className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setOpen(true);
              }}
            />
            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command>
                <CommandInput
                  placeholder="Search perfumes..."
                  value={query}
                  onValueChange={setQuery}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <ArrowRight />{" "}
                      <Link href={"/products/amouage-interlude"}>
                        Amouage interlude
                      </Link>
                    </CommandItem>
                    <CommandItem>
                      <ArrowRight />{" "}
                      <Link href={"/products/dior-sauvage"}>Dior sauvage</Link>
                    </CommandItem>
                    <CommandItem>
                      <ArrowRight />{" "}
                      <Link href={"/products/killian-straight-to-heaven"}>
                        Killian straight to heaven
                      </Link>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </div>

          <div className="bg-background text-foreground p-2 rounded-full flex items-center justify-center border-2 border-border group">
            <div className="relative ">
              <ShoppingCart className="w-4 h-4 group-hover:rotate-20 transition-transform duration-300" />
              <Badge className="scale-80 absolute bottom-[70%] left-1 bg-foreground">
                1
              </Badge>
            </div>
          </div>
          <div className="bg-background text-foreground p-2 rounded-full items-center justify-center hidden md:flex border-2 border-border group">
            <Heart className="w-4 h-4 group-hover:scale-120 transition-transform duration-300" />
          </div>

          <div className="flex justify-center items-center">
            {mounted && resolvedTheme === "dark" ? (
              <div className="px-2 py-2 border rounded-full">
                <Sun
                  className="h-[1.2rem] w-[1.2rem]"
                  onClick={() => {
                    setTheme("light");
                  }}
                />
              </div>
            ) : (
              <div className="px-2 py-2 border rounded-full">
                <Moon
                  className="h-[1.2rem] w-[1.2rem]"
                  onClick={() => {
                    setTheme("dark");
                  }}
                />
              </div>
            )}
          </div>
          <div className="md:flex hidden">
            {isSignedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="cursor-pointer transition-all hover:bg-accent"
                  >
                    <div className="flex justify-between items-center w-full font-general-sans">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>
                          {user?.firstName?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </SidebarMenuButton>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  align="end"
                  alignOffset={-20}
                  className="w-60 p-2 ml-2"
                >
                  <div className="flex flex-col gap-1">
                    <div className="px-2 py-1.5 mb-1">
                      <p className="text-sm font-semibold">{user?.fullName}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>

                    <SidebarSeparator className="my-1" />

                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-2 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <SidebarMenuButton asChild>
                <Link
                  href="/login"
                  className="flex justify-between items-center w-full font-general-sans"
                >
                  <div className="p-1 border rounded-full">
                    <UserRound className="w-5 h-5" />
                  </div>
                </Link>
              </SidebarMenuButton>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
