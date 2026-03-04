"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import Link from "next/link";
import { ChevronRight, Heart, Moon, ShoppingBag, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
  items?: NavItem[];
}

interface DataType {
  navMain: NavItem[];
}

const data: DataType = {
  navMain: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Wishlist",
      url: "/wishlist",
    },
    {
      title: "Products",
      url: "/products",
    },
    {
      title: "Categories",
      url: "",
      items: [
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
      ],
    },
    {
      title: "Gender",
      url: "",
      items: [
        {
          title: "Men",
          url: "/products?gender=MEN",
        },
        {
          title: "Women",
          url: "/products?gender=WOMEN",
        },
      ],
    },
    {
      title: "Contact Us",
      url: "/contact",
    },
    {
      title: "About Us",
      url: "/about",
    },
  ],
};

export function SideBarContentArea() {
  const { setOpenMobile } = useSidebar();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild></SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-y-5 pt-12">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div
                  className="flex justify-between items-center w-full"
                  onClick={() => {
                    setTheme(resolvedTheme === "light" ? "dark" : "light");
                    setOpenMobile(false);
                  }}
                >
                  <span>Dark Mode</span>
                  <div className="flex justify-center items-center">
                    {mounted && resolvedTheme === "dark" ? (
                      <div className="px-3 py-1 border rounded-full">
                        <Sun
                          className="h-[1.2rem] w-[1.2rem]"
                          onClick={() => {
                            setTheme("light");
                            setOpenMobile(false);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="px-3 py-1 border rounded-full">
                        <Moon
                          className="h-[1.2rem] w-[1.2rem]"
                          onClick={() => {
                            setTheme("dark");
                            setOpenMobile(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {data.navMain.map((item) => (
              <SidebarMenuItem
                key={item.title}
                className="py-1 rounded-xl focus:bg-accent"
              >
                <SidebarMenuButton asChild>
                  <Link
                    href={item.url}
                    className="font-medium flex justify-between items-center"
                    onClick={() => setOpenMobile(false)}
                  >
                    {item.title}

                    {item.title === "Wishlist" ? (
                      <Heart />
                    ) : item.title === "Products" ? (
                      <ShoppingBag />
                    ) : item.title === "Gender" ? null : item.title ===
                      "Categories" ? null : (
                      <ChevronRight />
                    )}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link
                            className="font-medium flex justify-between items-center"
                            href={item.url}
                            onClick={() => setOpenMobile(false)}
                          >
                            {item.title}
                            <ChevronRight />
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </>
  );
}
