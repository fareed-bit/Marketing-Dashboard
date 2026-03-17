import type { CreatorNiche } from "@/types/creator";

export interface NicheConfig {
  key: CreatorNiche;
  label: string;
}

export const creatorNiches: NicheConfig[] = [
  { key: "cocktail_mixology", label: "Cocktail & Mixology" },
  { key: "bartender", label: "Bartender" },
  { key: "hosting_entertaining", label: "Hosting & Entertaining" },
  { key: "home_kitchen", label: "Home & Kitchen" },
  { key: "gift_guide", label: "Gift Guide" },
  { key: "tech_gadget", label: "Tech & Gadget" },
  { key: "food_cooking", label: "Food & Cooking" },
  { key: "date_night_couples", label: "Date Night & Couples" },
  { key: "luxury_lifestyle", label: "Luxury Lifestyle" },
  { key: "ugc_specialist", label: "UGC Specialist" },
  { key: "amazon_finds", label: "Amazon Finds" },
];
