import {
  AccentTones,
  AppColors,
  AppShadows,
  ProductTypeColors,
} from "@/constants/theme";

export function useAppTheme() {
  return {
    colors: AppColors,
    accents: AccentTones,
    productAccents: ProductTypeColors,
    shadows: AppShadows,
  };
}
