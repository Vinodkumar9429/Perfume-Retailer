"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn } from "@/lib/utils";

export type ProductFilters = {
  search?: string;
  brand?: string;
  gender?: string;
  type?: string;
  highlight?: string;
  note?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

type ProductFiltersSheetProps = {
  activeFilters: ProductFilters;
  brands: string[];
  notes: string[];
  resultCount: number;
  totalCount: number;
};

const filterKeys = [
  "search",
  "brand",
  "gender",
  "type",
  "highlight",
  "note",
  "minPrice",
  "maxPrice",
  "sort",
] as const;

export const genderOptions = [
  { label: "Men", value: "MEN" },
  { label: "Women", value: "WOMEN" },
];

export const typeOptions = [
  { label: "Designer", value: "DESIGNER" },
  { label: "Niche", value: "NICHE" },
  { label: "Middle Eastern", value: "CLONES" },
];

export const highlightOptions = [
  { label: "Featured", value: "FEATURED" },
  { label: "Best seller", value: "BEST_SELLER" },
  { label: "New arrival", value: "NEW_ARRIVAL" },
];

export const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Highest rated", value: "rating-desc" },
  { label: "Name: A to Z", value: "name-asc" },
];

const selectClassName =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]";

const getActiveCount = (filters: ProductFilters) =>
  filterKeys.filter((key) => Boolean(filters[key])).length;

function ToggleGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(selected ? "" : option.value)}
              className={cn(
                "rounded-full border px-3 py-2 text-sm transition-colors",
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/10 bg-background text-muted-foreground hover:bg-accent",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const ProductFiltersSheet = ({
  activeFilters,
  brands,
  notes,
  resultCount,
  totalCount,
}: ProductFiltersSheetProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ProductFilters>(activeFilters);

  const activeCount = useMemo(
    () => getActiveCount(activeFilters),
    [activeFilters],
  );

  useEffect(() => {
    setDraft(activeFilters);
  }, [activeFilters]);

  const updateDraft = (key: keyof ProductFilters, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const buildUrl = (filters: ProductFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => params.delete(key));
    params.delete("cursor");

    filterKeys.forEach((key) => {
      const value = filters[key]?.trim();
      if (value) params.set(key, value);
    });

    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const applyFilters = () => {
    router.push(buildUrl(draft));
    setOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters: ProductFilters = {};
    setDraft(emptyFilters);
    router.push(buildUrl(emptyFilters));
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full border-foreground/15">
          <SlidersHorizontal className="size-4" />
          Filter
          {activeCount > 0 ? (
            <Badge className="ml-1 bg-foreground text-background">
              {activeCount}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b border-foreground/10">
          <SheetTitle className="font-lejour text-2xl">
            Filter perfumes
          </SheetTitle>
          <SheetDescription>
            Match the catalog to the same query params your perfume API accepts.
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-1 flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            applyFilters();
          }}
        >
          <div className="flex-1 space-y-6 px-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="product-search">Search</Label>
              <Input
                id="product-search"
                value={draft.search ?? ""}
                onChange={(event) => updateDraft("search", event.target.value)}
                placeholder="Name, brand, or description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-sort">Sort</Label>
              <select
                id="product-sort"
                value={draft.sort ?? ""}
                onChange={(event) => updateDraft("sort", event.target.value)}
                className={selectClassName}
              >
                <option value="">Default</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <ToggleGroup
              label="Gender"
              options={genderOptions}
              value={draft.gender}
              onChange={(value) => updateDraft("gender", value)}
            />

            <ToggleGroup
              label="Category"
              options={typeOptions}
              value={draft.type}
              onChange={(value) => updateDraft("type", value)}
            />

            <div className="space-y-2">
              <Label htmlFor="product-brand">Brand</Label>
              <select
                id="product-brand"
                value={draft.brand ?? ""}
                onChange={(event) => updateDraft("brand", event.target.value)}
                className={selectClassName}
              >
                <option value="">All brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-note">Note</Label>
              <select
                id="product-note"
                value={draft.note ?? ""}
                onChange={(event) => updateDraft("note", event.target.value)}
                className={selectClassName}
              >
                <option value="">All notes</option>
                {notes.map((note) => (
                  <option key={note} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product-highlight">Highlight</Label>
              <select
                id="product-highlight"
                value={draft.highlight ?? ""}
                onChange={(event) =>
                  updateDraft("highlight", event.target.value)
                }
                className={selectClassName}
              >
                <option value="">Any highlight</option>
                {highlightOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="product-min-price">Min price</Label>
                <Input
                  id="product-min-price"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={draft.minPrice ?? ""}
                  onChange={(event) =>
                    updateDraft("minPrice", event.target.value)
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-max-price">Max price</Label>
                <Input
                  id="product-max-price"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={draft.maxPrice ?? ""}
                  onChange={(event) =>
                    updateDraft("maxPrice", event.target.value)
                  }
                  placeholder="15000"
                />
              </div>
            </div>

            <p className="rounded-2xl border border-foreground/10 bg-accent/20 p-3 text-sm text-muted-foreground">
              Showing {resultCount} of {totalCount} perfumes with the current
              selection.
            </p>
          </div>

          <SheetFooter className="border-t border-foreground/10">
            <Button type="submit" className="rounded-full">
              Apply filters
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ProductFiltersSheet;
