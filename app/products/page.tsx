import PerfumeGrid, {
  type PerfumeGridProduct,
} from "@/features/perfumes/components/PerfumeGrid";
import ProductFiltersSheet, {
  genderOptions,
  highlightOptions,
  sortOptions,
  type ProductFilters,
  typeOptions,
} from "@/features/perfumes/components/ProductFiltersSheet";
import Header from "@/shared/components/Header";
import { Badge } from "@/shared/components/ui/badge";

type SearchParams = Record<string, string | string[] | undefined>;

type ProductType = "DESIGNER" | "NICHE" | "CLONES";
type ProductGender = "male" | "female";
type ProductHighlight = "FEATURED" | "BEST_SELLER" | "NEW_ARRIVAL";

type Product = PerfumeGridProduct & {
  gender: ProductGender;
  type: ProductType;
  highlight: ProductHighlight;
  notes: string[];
  description: string;
};

type ProductsPageProps = {
  searchParams?: Promise<SearchParams>;
};

const tempProducts: Product[] = [
  {
    id: "1",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    publicImageUrl: `women-chanel-coco-mademoiselle`,
    gender: "female",
    price: 12499,
    rating: 4.8,
    type: "DESIGNER",
    highlight: "BEST_SELLER",
    notes: ["Citrus", "Rose", "Patchouli"],
    description: "A polished designer eau de parfum with a confident floral trail.",
  },
  {
    id: "2",
    name: "Miss Dior Eau de Parfum",
    brand: "Dior",
    publicImageUrl: `women-dior-miss-dior-edp`,
    gender: "female",
    price: 10999,
    rating: 4.7,
    type: "DESIGNER",
    highlight: "FEATURED",
    notes: ["Rose", "Musk", "Vanilla"],
    description: "A romantic designer floral built around soft rose and musk.",
  },
  {
    id: "3",
    name: "Classique Eau de Parfum",
    brand: "Jean Paul Gaultier",
    publicImageUrl: `women-jpg-classique-edp`,
    gender: "female",
    price: 9499,
    rating: 4.6,
    type: "DESIGNER",
    highlight: "NEW_ARRIVAL",
    notes: ["Orange Blossom", "Vanilla", "Amber"],
    description: "A warm designer scent with sweet florals and amber depth.",
  },
  {
    id: "4",
    name: "Velvet Infusion",
    brand: "Dolce & Gabbana",
    publicImageUrl: `women-dng-velvet-infusion`,
    gender: "female",
    price: 13999,
    rating: 4.5,
    type: "NICHE",
    highlight: "FEATURED",
    notes: ["Iris", "Amber", "Woods"],
    description: "A more distinctive profile for shoppers exploring niche-style depth.",
  },
  {
    id: "5",
    name: "Libre Eau de Parfum",
    brand: "Yves Saint Laurent",
    publicImageUrl: `women-ysl-libre-edp`,
    gender: "female",
    price: 11999,
    rating: 4.7,
    type: "DESIGNER",
    highlight: "BEST_SELLER",
    notes: ["Lavender", "Orange Blossom", "Vanilla"],
    description: "A bold designer floral with aromatic brightness.",
  },
  {
    id: "6",
    name: "Born In Roma",
    brand: "Valentino",
    publicImageUrl: `women-valentino-born-in-roma-women`,
    gender: "female",
    price: 10499,
    rating: 4.6,
    type: "DESIGNER",
    highlight: "NEW_ARRIVAL",
    notes: ["Jasmine", "Vanilla", "Woods"],
    description: "A modern designer pick with soft florals and a warm base.",
  },
  {
    id: "7",
    name: "Man In Black",
    brand: "Bvlgari",
    publicImageUrl: `men-bvlgari-man-in-black`,
    gender: "male",
    price: 8999,
    rating: 4.5,
    type: "CLONES",
    highlight: "FEATURED",
    notes: ["Amber", "Leather", "Spice"],
    description: "A rich, warm profile for shoppers drawn to Middle Eastern intensity.",
  },
  {
    id: "8",
    name: "Allure Homme Sport Eau Extrême",
    brand: "Chanel",
    publicImageUrl: `men-chanel-allure-homme-sport-extreme`,
    gender: "male",
    price: 12499,
    rating: 4.7,
    type: "DESIGNER",
    highlight: "BEST_SELLER",
    notes: ["Citrus", "Musk", "Tonka"],
    description: "A crisp designer scent with sporty freshness and smooth tonka.",
  },
  {
    id: "9",
    name: "Luna Rossa Black",
    brand: "Prada",
    publicImageUrl: `men-prada-luna-rossa-black`,
    gender: "male",
    price: 9499,
    rating: 4.6,
    type: "DESIGNER",
    highlight: "NEW_ARRIVAL",
    notes: ["Amber", "Patchouli", "Musk"],
    description: "A sleek designer fragrance with soft woods and amber warmth.",
  },
  {
    id: "10",
    name: "Hero Eau de Parfum",
    brand: "Burberry",
    publicImageUrl: `men-burberry-hero-edp`,
    gender: "male",
    price: 10499,
    rating: 4.4,
    type: "NICHE",
    highlight: "FEATURED",
    notes: ["Cedar", "Pine", "Incense"],
    description: "A textured woody profile with a more outdoorsy niche character.",
  },
  {
    id: "11",
    name: "Ysl Myslf Eau de Parfum",
    brand: "Yves Saint Laurent",
    publicImageUrl: `men-ysl-myslf-edp`,
    gender: "male",
    price: 11999,
    rating: 4.7,
    type: "DESIGNER",
    highlight: "BEST_SELLER",
    notes: ["Bergamot", "Orange Blossom", "Woods"],
    description: "A clean designer signature with bright citrus and woods.",
  },
  {
    id: "12",
    name: "Acqua Di Giò Profondo",
    brand: "Giorgio Armani",
    publicImageUrl: `men-armani-acqua-di-gio-profondo`,
    gender: "male",
    price: 11499,
    rating: 4.8,
    type: "DESIGNER",
    highlight: "NEW_ARRIVAL",
    notes: ["Marine", "Cypress", "Musk"],
    description: "A fresh designer aquatic with mineral depth.",
  },
];

const getParam = (params: SearchParams, key: keyof ProductFilters) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
};

const getActiveFilters = (params: SearchParams): ProductFilters => ({
  search: getParam(params, "search"),
  brand: getParam(params, "brand"),
  gender: getParam(params, "gender"),
  type: getParam(params, "type"),
  highlight: getParam(params, "highlight"),
  note: getParam(params, "note"),
  minPrice: getParam(params, "minPrice"),
  maxPrice: getParam(params, "maxPrice"),
  sort: getParam(params, "sort"),
});

const normalize = (value: string) => value.trim().toLowerCase();

const getProductGenderParam = (gender: ProductGender) =>
  gender === "male" ? "MEN" : "WOMEN";

const hasTextMatch = (product: Product, search: string) => {
  const value = normalize(search);

  return [product.name, product.brand, product.description].some((field) =>
    normalize(field).includes(value),
  );
};

const filterProducts = (products: Product[], filters: ProductFilters) => {
  const minPrice = filters.minPrice ? Number(filters.minPrice) : undefined;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : undefined;

  return products.filter((product) => {
    if (filters.search && !hasTextMatch(product, filters.search)) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (
      filters.gender &&
      getProductGenderParam(product.gender) !== filters.gender
    ) {
      return false;
    }
    if (filters.type && product.type !== filters.type) return false;
    if (filters.highlight && product.highlight !== filters.highlight) {
      return false;
    }
    if (
      filters.note &&
      !product.notes.some((note) => normalize(note) === normalize(filters.note!))
    ) {
      return false;
    }
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;

    return true;
  });
};

const sortProducts = (products: Product[], sort?: string) => {
  const sortedProducts = [...products];

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
    default:
      return sortedProducts.sort((a, b) => Number(b.id) - Number(a.id));
  }
};

const getUniqueValues = (values: string[]) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

const getOptionLabel = (
  options: { label: string; value: string }[],
  value?: string,
) => options.find((option) => option.value === value)?.label ?? value;

const getActiveFilterChips = (filters: ProductFilters) =>
  [
    filters.search ? `Search: ${filters.search}` : null,
    filters.brand ? `Brand: ${filters.brand}` : null,
    filters.gender
      ? `Gender: ${getOptionLabel(genderOptions, filters.gender)}`
      : null,
    filters.type ? `Category: ${getOptionLabel(typeOptions, filters.type)}` : null,
    filters.highlight
      ? `Highlight: ${getOptionLabel(highlightOptions, filters.highlight)}`
      : null,
    filters.note ? `Note: ${filters.note}` : null,
    filters.minPrice ? `From INR ${filters.minPrice}` : null,
    filters.maxPrice ? `Under INR ${filters.maxPrice}` : null,
    filters.sort ? `Sort: ${getOptionLabel(sortOptions, filters.sort)}` : null,
  ].filter(Boolean) as string[];

const Page = async ({ searchParams }: ProductsPageProps) => {
  const params = (await searchParams) ?? {};
  const activeFilters = getActiveFilters(params);
  const filteredProducts = sortProducts(
    filterProducts(tempProducts, activeFilters),
    activeFilters.sort,
  );
  const brands = getUniqueValues(tempProducts.map((product) => product.brand));
  const notes = getUniqueValues(tempProducts.flatMap((product) => product.notes));
  const activeFilterChips = getActiveFilterChips(activeFilters);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-foreground/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge
              variant="outline"
              className="border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.35em]"
            >
              Fragrance catalog
            </Badge>
            <h1 className="mt-4 font-lejour text-4xl leading-tight md:text-6xl">
              Browse the current edit
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              Filter designer, niche, and Middle Eastern perfumes by the same
              query fields your backend accepts.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} of {tempProducts.length} perfumes
            </p>
            <ProductFiltersSheet
              activeFilters={activeFilters}
              brands={brands}
              notes={notes}
              resultCount={filteredProducts.length}
              totalCount={tempProducts.length}
            />
          </div>
        </div>

        {activeFilterChips.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {activeFilterChips.map((chip) => (
              <Badge
                key={chip}
                variant="outline"
                className="border-foreground/10 bg-background px-3 py-1 text-muted-foreground"
              >
                {chip}
              </Badge>
            ))}
          </div>
        ) : null}

        <PerfumeGrid
          tempProducts={filteredProducts}
          emptyState={
            <div className="max-w-md rounded-3xl border border-foreground/10 bg-background p-8 text-center shadow-sm">
              <h2 className="font-lejour text-3xl">No perfumes found</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Try clearing a filter or widening the price range to bring more
                bottles back into the edit.
              </p>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Page;
