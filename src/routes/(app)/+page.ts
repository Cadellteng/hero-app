// src/routes/(app)/+page.ts
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { activeLocation } from '$lib/stores';

console.log("Running +page.ts for main page...");

interface MenuItem {
  itemBasePrice: number;
  itemImage: string;
  itemName: string;
}

interface Menu {
  subMenu: string;
  menuItems: MenuItem[];
}

interface ShopItem {
  id: string;
  shopName: string;
  shopImage: string;
  type: string;
  category?: string[];
  menu?: Menu[];
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
    const collectionName = "super-huat-88-hawker-centre";
    console.log(`Attempting to fetch documents from collection: ${collectionName}`);

    const querySnapshot = await getDocs(collection(heroShop, collectionName));
    
    if (querySnapshot.empty) {
      console.log(`No documents found in collection: ${collectionName}`);
      return { items: [] };
    }

    const items:ShopItem[] = [];
    let shopName;
    querySnapshot.forEach((doc) => {
      const docId = doc.id;
      const docData = doc.data();
      if (docId === "main") {
        shopName = docData.shopName;
        activeLocation.set(shopName);
        return;
      }
      items.push({
        id: docId,
        shopName: docData.shopName,
        shopImage: docData.shopImage,
        type: docData.type,
        ...docData
      });
    });

    // Sort items by shopName in alphabetical order
    items.sort((a, b) => a.shopName.localeCompare(b.shopName));

    console.log(JSON.stringify(items, null, 2));

    return {
      items, shopName
    };
  } catch (error) {
    console.error("Error fetching items from Firestore:", error);
    throw error;
  }
};
