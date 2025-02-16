// src/routes/(app)/+page.ts
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { activeLocation } from '$lib/stores';

console.log("Running +page.ts for main page...");

interface CustomisationMenuOptions {
  name: string;
  price: number;
}

interface CustomisationMenu {
  optionsAreFree?: boolean;
  options?: null | CustomisationMenuOptions[];
  optionsRef?: string | null;
  title?: string;
  required?: boolean;
  maxSelections?: number;
}

interface MenuItem {
  itemName: string;
  itemImage: string;
  itemBasePrice: number;
  isCustomizable: boolean;
  customisationMenu?: CustomisationMenu[];
}

interface Menu {
  id:string;
  subMenu: string;
  menuItems: MenuItem[];
}

interface ShopItem {
  id: string;
  shopName: string;
  shopImage: string;
  type: string;
  category?: string[];
}

interface StandardItems {
  [key: string]: StandardCustomisationSelection[]
}

interface StandardCustomisationSelection {
  name: string;
  price: number;
}

export const load = async () => {
  //* This part of the database is to check if the current user is logged in?
  try {
    // Check if the user is logged in
    // if (!auth.currentUser) {
    //   console.log("User is not logged in!");
    //   throw redirect(302, '/login');
    // }

    //* This part of the code is to query the firestore database
    const heroShop = getFirestore("hero-shop");
    const shopCollection = "super-huat-88-hawker-centre";
    console.log(`Attempting to fetch documents from collection: ${shopCollection}`);

    const shopRef = collection(heroShop, shopCollection)
    const shopSnapshot = await getDocs(shopRef);
    const shopItems:ShopItem[] = [];
    
    if (shopSnapshot.empty) {
      console.log(`No documents found in collection: ${shopCollection}`);
      return { shopItems: [] };
    }
    let shopName;
    shopSnapshot.forEach((doc) => {
      const docId = doc.id;
      const docData = doc.data();
      if (docId === "main") {
        shopName = docData.shopName;
        activeLocation.set(shopName);
        return;
      }
      shopItems.push({
        id: docId,
        shopName: docData.shopName,
        shopImage: docData.shopImage,
        type: docData.type,
        ...docData
      });
    });

    // Sort shopItems by shopName in alphabetical order
    shopItems.sort((a, b) => a.shopName.localeCompare(b.shopName));

    // console.log(JSON.stringify(shopItems, null, 2));

    const defaultShopId = shopItems[0]["id"];
    const menuRef = collection(heroShop, shopCollection, defaultShopId, "menu");
    const menuSnapshot = await getDocs(menuRef);
    const menuDocs: Menu[] = [];
    if (menuSnapshot.empty) {
      console.log(`No documents found in menu sub-collection`);
      return { menuDocs: [] as Menu[] };
    }

    let standardItems: StandardItems = {};
    menuSnapshot.forEach((doc) => {
      const docId = doc.id;
      const docData = doc.data();
      if (docId === "standard") {
        standardItems = docData as StandardItems;
        return
      } else {
        menuDocs.push({
          id:docId,
          subMenu: docData.subMenu,
          menuItems: docData.menuItems,
          ...docData
        });
      }
    })
    
    // await console.log(JSON.stringify(menuDocs[1], null, 2));
    await console.log(JSON.stringify(standardItems, null, 2));

    menuDocs.forEach((menuDoc) => {
      menuDoc["menuItems"].forEach((menuItem) => {
        if(menuItem["customisationMenu"]?.length === 0) {
          return
        } else {
          menuItem["customisationMenu"]?.forEach((customisationSet) => {
            customisationSet["options"] = standardItems[customisationSet["optionsRef"] as string]
          })
        }
      })
    })

    return {
      shopItems, shopName, menuDocs
    };
  } catch (error) {
    console.error("Error fetching items from Firestore:", error);
    throw error;
  }
};
