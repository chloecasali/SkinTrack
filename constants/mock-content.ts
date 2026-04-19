import type { AccentTone } from "@/constants/theme";

export type RoutineItem = {
  step: string;
  title: string;
  brandName: string;
  note: string;
  duration?: string;
  tone?: AccentTone;
};

export type RoutineSection = {
  key: "morning" | "night";
  items: RoutineItem[];
};

export type RecommendedProduct = {
  category: string;
  name: string;
  brand: string;
  highlight: string;
  imageUrl: string;
  imageFallbackLabel?: string;
  tone?: AccentTone;
};

export type SearchItem = {
  id: string;
  name: string;
  brand: string;
  category: string;
  benefit: string;
  tags: string[];
  tone?: AccentTone;
};

export type CalendarDay = {
  id: string;
  dayNumber: string;
  weekday: string;
  progressLabel: string;
};

export type CalendarRoutineStep = {
  id: string;
  title: string;
  subtitle: string;
  tone: AccentTone;
  completed?: boolean;
};

export const routineSections: RoutineSection[] = [
  {
    key: "morning",
    items: [
      {
        step: "01",
        title: "Hydrating Soft Cleanser",
        brandName: "Aesop",
        note: "A soft cleanse to start the day.",
        imageUrl:
          "https://www.drjart.com/media/export/cms/products/1000x1000/dj_sku_H7T901_1000x1000_0.jpg",
        imageFallbackLabel: "Cleanser",
        productType: "cleanser",
      },
      {
        step: "02",
        title: "Vitamin C Glow Serum",
        brandName: "La De Pluie",
        note: "Glow support before SPF.",
        imageUrl:
          "https://us.medik8.com/cdn/shop/files/20230922-PDPAsset1-Press_Glow-Packshot-US_todayshow2_grande.jpg?v=1762269828",
        imageFallbackLabel: "Serum",
        productType: "serum",
      },
      {
        step: "03",
        title: "Light Barrier Cream",
        brandName: "Lucent Atelier",
        note: "Hydration with a soft finish.",
        imageUrl:
          "https://us.laneige.com/cdn/shop/files/N_WBGM_24AD_Product_02_large.jpg?v=1703778546",
        imageFallbackLabel: "Cream",
        productType: "moisturizer",
      },
    ],
  },
  {
    key: "night",
    items: [
      {
        step: "01",
        title: "Melting Cleansing Balm",
        brandName: "Botanicals",
        note: "A comforting first cleanse.",
        imageUrl:
          "https://www.drjart.com/media/export/cms/products/1000x1000/dj_sku_H7T901_1000x1000_0.jpg",
        imageFallbackLabel: "Balm",
        duration: "2 min",
        productType: "makeupRemover",
      },
      {
        step: "02",
        title: "Purifying Toner",
        brandName: "Simple",
        note: "Rebalance skin after cleansing.",
        imageUrl:
          "https://us.laneige.com/cdn/shop/files/N_WBGM_24AD_Product_02_large.jpg?v=1703778546",
        imageFallbackLabel: "Toner",
        duration: "1 min",
        productType: "toner",
      },
      {
        step: "03",
        title: "Night Repair Nectar",
        brandName: "La De Pluie",
        note: "Repair and glow while you sleep.",
        duration: "1 min",
        imageUrl:
          "https://us.medik8.com/cdn/shop/files/20230922-PDPAsset1-Press_Glow-Packshot-US_todayshow2_grande.jpg?v=1762269828",
        imageFallbackLabel: "Night",
        productType: "serum",
      },
      {
        step: "04",
        title: "Velvet Recovery Cream",
        brandName: "Botanicals",
        note: "Seal comfort in overnight.",
        duration: "1 min",
        imageUrl:
          "https://us.laneige.com/cdn/shop/files/N_WBGM_24AD_Product_02_large.jpg?v=1703778546",
        imageFallbackLabel: "Cream",
        productType: "moisturizer",
      },
    ],
  },
];

export const recommendedProducts: RecommendedProduct[] = [
  {
    category: "Botanicals",
    name: "Floral Renewal Essence",
    brand: "Botanicals",
    highlight: "Deep hydration with a natural glow finish.",
    imageUrl:
      "https://www.drjart.com/media/export/cms/products/1000x1000/dj_sku_H7T901_1000x1000_0.jpg",
    imageFallbackLabel: "Essence",
    productType: "moisturizer",
  },
  {
    category: "Purity",
    name: "Rose Clay Detox Mask",
    brand: "Purity",
    highlight: "Cleanses pores while keeping the skin calm.",
    imageUrl:
      "https://us.laneige.com/cdn/shop/files/N_WBGM_24AD_Product_02_large.jpg?v=1703778546",
    imageFallbackLabel: "Mask",
    productType: "mask",
  },
  {
    category: "Recovery",
    name: "Overnight Barrier Cream",
    brand: "Recovery",
    highlight: "Restores comfort and softness by the morning.",
    imageUrl:
      "https://us.medik8.com/cdn/shop/files/20230922-PDPAsset1-Press_Glow-Packshot-US_todayshow2_grande.jpg?v=1762269828",
    imageFallbackLabel: "Cream",
    productType: "moisturizer",
  },
];

export const searchSuggestionChips = [
  "cleanser",
  "spf",
  "barrier",
  "serum",
  "hydration",
] as const;

export const searchItems: SearchItem[] = [
  {
    id: "cloud-cleanser",
    name: "Cloud Cleanser",
    brand: "Typology",
    category: "Cleanser",
    benefit: "Soft morning cleanse for skin that feels reactive.",
    tags: ["cleanser", "morning", "gentle", "foam"],
    productType: "cleanser",
  },
  {
    id: "vitamin-c-veil",
    name: "Vitamin C Veil",
    brand: "Allies of Skin",
    category: "Serum",
    benefit: "Brightens dull skin with a lightweight finish.",
    tags: ["serum", "vitamin c", "glow", "morning"],
    productType: "serum",
  },
  {
    id: "daily-fluid-spf",
    name: "Daily Fluid SPF 50",
    brand: "La Roche-Posay",
    category: "SPF",
    benefit: "Light daily protection that layers under makeup.",
    tags: ["spf", "sun", "morning", "protection"],
    productType: "moisturizer",
  },
  {
    id: "barrier-repair-serum",
    name: "Barrier Repair Serum",
    brand: "The Ordinary",
    category: "Serum",
    benefit: "Supports the skin barrier on high-stress days.",
    tags: ["barrier", "serum", "night", "repair"],
    productType: "serum",
  },
  {
    id: "velvet-recovery-cream",
    name: "Velvet Recovery Cream",
    brand: "Aesop",
    category: "Moisturizer",
    benefit: "Locks in overnight comfort with a richer finish.",
    tags: ["cream", "night", "hydration", "repair"],
    productType: "moisturizer",
  },
  {
    id: "rescue-balm",
    name: "Rescue Balm",
    brand: "Dr. Jart+",
    category: "Treatment",
    benefit: "Calms stressed skin fast when the barrier feels tight.",
    tags: ["calm", "barrier", "balm", "repair"],
    productType: "moisturizer",
  },
  {
    id: "glass-water-gel",
    name: "Glass Water Gel",
    brand: "Laneige",
    category: "Moisturizer",
    benefit: "Fresh hydration without weight or residue.",
    tags: ["hydration", "gel", "moisturizer", "light"],
    productType: "moisturizer",
  },
  {
    id: "pha-essence",
    name: "PHA Essence",
    brand: "Medik8",
    category: "Essence",
    benefit: "Smooths texture with gentle exfoliation.",
    tags: ["pha", "refine", "essence", "texture"],
    productType: "peeling",
  },
];

export const calendarDays: CalendarDay[] = [
  { id: "mon", dayNumber: "5", weekday: "Mon", progressLabel: "1/4" },
  { id: "tue", dayNumber: "6", weekday: "Tue", progressLabel: "2/4" },
  { id: "wed", dayNumber: "7", weekday: "Wed", progressLabel: "0/4" },
  { id: "thu", dayNumber: "8", weekday: "Thu", progressLabel: "0/4" },
  { id: "fri", dayNumber: "9", weekday: "Fri", progressLabel: "0/4" },
];

export const calendarRoutineStepsByDay: Record<
  CalendarDay["id"],
  CalendarRoutineStep[]
> = {
  mon: [
    {
      id: "mon-cleanser",
      title: "Skin cleanser",
      subtitle: "Fresh morning cleanse.",
      productType: "cleanser",
      completed: true,
    },
    {
      id: "mon-antioxidants",
      title: "Use antioxidants",
      subtitle: "Vitamin C and barrier support.",
      productType: "serum",
    },
    {
      id: "mon-moisture",
      title: "Moisturise face skin",
      subtitle: "Keep hydration sealed in.",
      productType: "moisturizer",
    },
    {
      id: "mon-eyes",
      title: "Eyes area",
      subtitle: "Tap gently and avoid rubbing.",
      productType: "eyecream",
    },
  ],
  tue: [
    {
      id: "tue-cleanser",
      title: "Skin cleanser",
      subtitle: "Low-foam reset before treatment.",
      productType: "cleanser",
      completed: true,
    },
    {
      id: "tue-antioxidants",
      title: "Use antioxidants",
      subtitle: "Brighten and protect the barrier.",
      productType: "serum",
      completed: true,
    },
    {
      id: "tue-moisture",
      title: "Moisturise face skin",
      subtitle: "Finish with a soft cream layer.",
      productType: "moisturizer",
    },
    {
      id: "tue-eyes",
      title: "Eyes area",
      subtitle: "Use a light, fragrance-free gel.",
      productType: "eyecream",
    },
  ],
  wed: [
    {
      id: "wed-cleanser",
      title: "Skin cleanser",
      subtitle: "A fast cleanse before SPF.",
      productType: "cleanser",
    },
    {
      id: "wed-antioxidants",
      title: "Use antioxidants",
      subtitle: "Layer under moisturiser.",
      productType: "serum",
    },
    {
      id: "wed-moisture",
      title: "Moisturise face skin",
      subtitle: "Keep the skin comfortable all day.",
      productType: "moisturizer",
    },
    {
      id: "wed-eyes",
      title: "Eyes area",
      subtitle: "Press product in with ring finger.",
      productType: "eyecream",
    },
  ],
  thu: [
    {
      id: "thu-cleanser",
      title: "Skin cleanser",
      subtitle: "Fresh base for a simple routine.",
      productType: "cleanser",
    },
    {
      id: "thu-antioxidants",
      title: "Use antioxidants",
      subtitle: "Keep the skin bright and calm.",
      productType: "serum",
    },
    {
      id: "thu-moisture",
      title: "Moisturise face skin",
      subtitle: "A soft cream to support recovery.",
      productType: "moisturizer",
    },
    {
      id: "thu-eyes",
      title: "Eyes area",
      subtitle: "Finish with a light eye gel.",
      productType: "eyecream",
    },
  ],
  fri: [
    {
      id: "fri-cleanser",
      title: "Skin cleanser",
      subtitle: "Clean, simple, and fragrance-light.",
      productType: "cleanser",
    },
    {
      id: "fri-antioxidants",
      title: "Use antioxidants",
      subtitle: "Support glow before the weekend.",
      productType: "serum",
    },
    {
      id: "fri-moisture",
      title: "Moisturise face skin",
      subtitle: "Use your richer recovery cream.",
      productType: "moisturizer",
    },
    {
      id: "fri-eyes",
      title: "Eyes area",
      subtitle: "Cool down puffiness in one step.",
      productType: "eyecream",
    },
  ],
};
