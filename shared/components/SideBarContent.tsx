"use client";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import Link from "next/link";
import {
  ChevronRight,
  Heart,
  LogOut,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Settings } from "@/components/animate-ui/icons/settings";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

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
  const [mounted, setIsMounted] = useState(false);
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();

  const { user } = useUser();
  const handleSignOut = async (e: React.FormEvent) => {
    e.preventDefault();
    await signOut(() => router.push("/"));
  };

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
    <SidebarGroupLabel>Account</SidebarGroupLabel>
    <SidebarMenuItem>
      {isSignedIn ? (
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton size="lg" className="cursor-pointer transition-all hover:bg-accent">
              <div className="flex justify-between items-center w-full font-general-sans">
                <h3>Profile</h3>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    {user?.firstName?.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </SidebarMenuButton>
          </PopoverTrigger>
          
          <PopoverContent side="bottom" align="start" className="w-64 p-2 ml-2">
            <div className="flex flex-col gap-1">
              
              <div className="px-2 py-1.5 mb-1">
                <p className="text-sm font-semibold">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
              
              <SidebarSeparator className="my-1" />

              {/* Action Links */}
              <Link href="/settings" className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-accent">
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
          <Link href="/login" className="flex justify-between items-center w-full font-general-sans">
            <h4>Login</h4>
            <div className="p-1 border rounded-full">
              <UserRound className="w-5 h-5" />
            </div>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  </SidebarMenu>
</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>

              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu className="gap-y-3">
            {data.navMain.map((item) => (
              <SidebarMenuItem
                key={item.title}
                className="py-1 rounded-xl focus:bg-accent font-general-sans"
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
