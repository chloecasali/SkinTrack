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
        title: "Cloud Cleanser",
        brandName: "Typology",
        note: "Fresh start for calm skin.",
        duration: "2 min",
        tone: "peach",
      },
      {
        step: "02",
        title: "Vitamin C Veil",
        brandName: "Allies of Skin",
        note: "Glow and protect before SPF.",
        duration: "1 min",
        tone: "lilac",
      },
      {
        step: "03",
        title: "Daily Fluid SPF 50",
        brandName: "La Roche-Posay",
        note: "Shield finish with no white cast.",
        duration: "1 min",
        tone: "sand",
      },
    ],
  },
  {
    key: "night",
    items: [
      {
        step: "01",
        title: "Gel-to-Milk Cleanser",
        brandName: "Pai",
        note: "Clean reset after the day.",
        duration: "2 min",
        tone: "mint",
      },
      {
        step: "02",
        title: "Barrier Repair Serum",
        brandName: "The Ordinary",
        note: "Repair and calm before cream.",
        duration: "1 min",
        tone: "lilac",
      },
      {
        step: "03",
        title: "Velvet Recovery Cream",
        brandName: "Aesop",
        note: "Seal hydration overnight.",
        duration: "1 min",
        tone: "peach",
      },
    ],
  },
];

export const recommendedProducts: RecommendedProduct[] = [
  {
    category: "Calm",
    name: "Rescue Balm",
    brand: "Dr. Jart+",
    highlight: "Barrier comfort in one layer.",
    imageUrl:
      "https://www.drjart.com/media/export/cms/products/1000x1000/dj_sku_H7T901_1000x1000_0.jpg",
    imageFallbackLabel: "Rescue",
    tone: "peach",
  },
  {
    category: "Hydrate",
    name: "Glass Water Gel",
    brand: "Laneige",
    highlight: "Fresh hydration without weight.",
    imageUrl:
      "https://us.laneige.com/cdn/shop/files/N_WBGM_24AD_Product_02_large.jpg?v=1703778546",
    imageFallbackLabel: "Hydrate",
    tone: "mint",
  },
  {
    category: "Refine",
    name: "PHA Essence",
    brand: "Medik8",
    highlight: "Gentle glow for texture days.",
    imageUrl:
      "https://us.medik8.com/cdn/shop/files/20230922-PDPAsset1-Press_Glow-Packshot-US_todayshow2_grande.jpg?v=1762269828",
    imageFallbackLabel: "Refine",
    tone: "lilac",
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
    tone: "peach",
  },
  {
    id: "vitamin-c-veil",
    name: "Vitamin C Veil",
    brand: "Allies of Skin",
    category: "Serum",
    benefit: "Brightens dull skin with a lightweight finish.",
    tags: ["serum", "vitamin c", "glow", "morning"],
    tone: "lilac",
  },
  {
    id: "daily-fluid-spf",
    name: "Daily Fluid SPF 50",
    brand: "La Roche-Posay",
    category: "SPF",
    benefit: "Light daily protection that layers under makeup.",
    tags: ["spf", "sun", "morning", "protection"],
    tone: "sand",
  },
  {
    id: "barrier-repair-serum",
    name: "Barrier Repair Serum",
    brand: "The Ordinary",
    category: "Serum",
    benefit: "Supports the skin barrier on high-stress days.",
    tags: ["barrier", "serum", "night", "repair"],
    tone: "mint",
  },
  {
    id: "velvet-recovery-cream",
    name: "Velvet Recovery Cream",
    brand: "Aesop",
    category: "Moisturizer",
    benefit: "Locks in overnight comfort with a richer finish.",
    tags: ["cream", "night", "hydration", "repair"],
    tone: "peach",
  },
  {
    id: "rescue-balm",
    name: "Rescue Balm",
    brand: "Dr. Jart+",
    category: "Treatment",
    benefit: "Calms stressed skin fast when the barrier feels tight.",
    tags: ["calm", "barrier", "balm", "repair"],
    tone: "sand",
  },
  {
    id: "glass-water-gel",
    name: "Glass Water Gel",
    brand: "Laneige",
    category: "Moisturizer",
    benefit: "Fresh hydration without weight or residue.",
    tags: ["hydration", "gel", "moisturizer", "light"],
    tone: "mint",
  },
  {
    id: "pha-essence",
    name: "PHA Essence",
    brand: "Medik8",
    category: "Essence",
    benefit: "Smooths texture with gentle exfoliation.",
    tags: ["pha", "refine", "essence", "texture"],
    tone: "lilac",
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
      tone: "sand",
      completed: true,
    },
    {
      id: "mon-antioxidants",
      title: "Use antioxidants",
      subtitle: "Vitamin C and barrier support.",
      tone: "lilac",
    },
    {
      id: "mon-moisture",
      title: "Moisturise face skin",
      subtitle: "Keep hydration sealed in.",
      tone: "peach",
    },
    {
      id: "mon-eyes",
      title: "Eyes area",
      subtitle: "Tap gently and avoid rubbing.",
      tone: "mint",
    },
  ],
  tue: [
    {
      id: "tue-cleanser",
      title: "Skin cleanser",
      subtitle: "Low-foam reset before treatment.",
      tone: "sand",
      completed: true,
    },
    {
      id: "tue-antioxidants",
      title: "Use antioxidants",
      subtitle: "Brighten and protect the barrier.",
      tone: "lilac",
      completed: true,
    },
    {
      id: "tue-moisture",
      title: "Moisturise face skin",
      subtitle: "Finish with a soft cream layer.",
      tone: "peach",
    },
    {
      id: "tue-eyes",
      title: "Eyes area",
      subtitle: "Use a light, fragrance-free gel.",
      tone: "mint",
    },
  ],
  wed: [
    {
      id: "wed-cleanser",
      title: "Skin cleanser",
      subtitle: "A fast cleanse before SPF.",
      tone: "sand",
    },
    {
      id: "wed-antioxidants",
      title: "Use antioxidants",
      subtitle: "Layer under moisturiser.",
      tone: "lilac",
    },
    {
      id: "wed-moisture",
      title: "Moisturise face skin",
      subtitle: "Keep the skin comfortable all day.",
      tone: "peach",
    },
    {
      id: "wed-eyes",
      title: "Eyes area",
      subtitle: "Press product in with ring finger.",
      tone: "mint",
    },
  ],
  thu: [
    {
      id: "thu-cleanser",
      title: "Skin cleanser",
      subtitle: "Fresh base for a simple routine.",
      tone: "sand",
    },
    {
      id: "thu-antioxidants",
      title: "Use antioxidants",
      subtitle: "Keep the skin bright and calm.",
      tone: "lilac",
    },
    {
      id: "thu-moisture",
      title: "Moisturise face skin",
      subtitle: "A soft cream to support recovery.",
      tone: "peach",
    },
    {
      id: "thu-eyes",
      title: "Eyes area",
      subtitle: "Finish with a light eye gel.",
      tone: "mint",
    },
  ],
  fri: [
    {
      id: "fri-cleanser",
      title: "Skin cleanser",
      subtitle: "Clean, simple, and fragrance-light.",
      tone: "sand",
    },
    {
      id: "fri-antioxidants",
      title: "Use antioxidants",
      subtitle: "Support glow before the weekend.",
      tone: "lilac",
    },
    {
      id: "fri-moisture",
      title: "Moisturise face skin",
      subtitle: "Use your richer recovery cream.",
      tone: "peach",
    },
    {
      id: "fri-eyes",
      title: "Eyes area",
      subtitle: "Cool down puffiness in one step.",
      tone: "mint",
    },
  ],
};
