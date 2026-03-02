export interface Product {
  id: string;
  name: string;
  category: "Eggs" | "Honey" | "Chicken";
  price: number;
  unit: string;
  description: string;
  image: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "brown-eggs",
    name: "Brown Eggs",
    category: "Eggs",
    price: 210,
    unit: "dozen",
    description:
      "Farm-fresh brown eggs from free-range hens. Rich yolk, great nutrition.",
    image: "/assets/generated/brown-eggs.dim_400x300.jpg",
    badge: "Popular",
  },
  {
    id: "white-eggs",
    name: "White Eggs",
    category: "Eggs",
    price: 80,
    unit: "dozen",
    description:
      "Classic white eggs, freshly collected. Perfect for everyday cooking.",
    image: "/assets/generated/white-eggs.dim_400x300.jpg",
  },
  {
    id: "desi-eggs",
    name: "Desi Eggs",
    category: "Eggs",
    price: 240,
    unit: "dozen",
    description:
      "Authentic desi eggs from country hens. Darker yolk, richer taste.",
    image: "/assets/generated/desi-eggs.dim_400x300.jpg",
    badge: "Premium",
  },
  {
    id: "honey-200g",
    name: "Forest Organic Honey (200g)",
    category: "Honey",
    price: 250,
    unit: "200g jar",
    description:
      "Unfiltered raw forest organic honey. Pure, wild, and full of natural goodness.",
    image: "/assets/uploads/1772215435419-1.jpg",
    badge: "Organic",
  },
  {
    id: "honey-1kg",
    name: "Forest Organic Honey (1kg)",
    category: "Honey",
    price: 1250,
    unit: "1kg jar",
    description:
      "Unfiltered raw forest organic honey in bulk. Best value for daily use.",
    image: "/assets/uploads/1772023362350-3.png",
    badge: "Best Value",
  },
  {
    id: "chicken-desi-naatu",
    name: "Desi Naatu Chicken",
    category: "Chicken",
    price: 1300,
    unit: "kg",
    description:
      "Country-bred desi naatu chicken, curry cut. Bold flavour, ideal for traditional recipes.",
    image: "/assets/generated/chicken-desi-naatu.dim_400x300.jpg",
    badge: "Curry Cut",
  },
  {
    id: "chicken-broiler",
    name: "Broiler Chicken",
    category: "Chicken",
    price: 250,
    unit: "kg",
    description:
      "Tender skinless broiler chicken, curry cut. Clean, fresh, and ready to cook.",
    image: "/assets/generated/chicken-broiler.dim_400x300.jpg",
    badge: "Skinless",
  },
  {
    id: "chicken-naatu-live",
    name: "Naatu Chicken – Live",
    category: "Chicken",
    price: 850,
    unit: "bird",
    description:
      "Live naatu chicken, farm-raised free-range. Order fresh, delivered live.",
    image: "/assets/generated/chicken-naatu-live.dim_400x300.jpg",
    badge: "Live",
  },
];

export const CATEGORIES = ["Eggs", "Honey", "Chicken"] as const;
