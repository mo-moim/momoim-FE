import { COMMON_CATEGORIES, SUB_CATEGORIES } from "@/constants/options";

export type CategoryKey = (typeof COMMON_CATEGORIES)[number]["value"];

export interface GatheringCreateFormData {
  name: string;
  isPeriodic: boolean;
  image: string;
  category: string;
  subCategory: string | string[];
  location: string;
  address: string;
  nextGatheringAt: string;
  capacity: number;
  description: string;
  tags: string[];
  gatheringType?: string;
}

export type SubCategoryValueKey = (typeof SUB_CATEGORIES)[keyof typeof SUB_CATEGORIES][number]["value"];
