export interface CustomisationMenuOptions {
  name: string;
  price: number;
}

export interface CustomisationMenu {
  optionsAreFree?: boolean;
  options?: null | CustomisationMenuOptions[];
  optionsRef?: string | null;
  title?: string;
  required?: boolean;
  maxSelections?: number;
}

export interface MenuItem {
  itemName: string;
  itemImage: string;
  itemBasePrice: number;
  isCustomizable: boolean;
  customisationMenu?: CustomisationMenu[];
}

export interface Menu {
  id: string;
  subMenu: string;
  menuItems: MenuItem[];
}

export interface ShopItem {
  id: string;
  shopName: string;
  shopImage: string;
  type: string;
  category?: string[];
}

export interface CustomisationParams {
  itemName: string;
  itemBasePrice: number;
  itemImage: string;
  customisationMenu?: CustomisationMenu[];
}

export interface PageData {
  shopItems: ShopItem[];
  menuDocs: Menu[];
}