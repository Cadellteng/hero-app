import { writable } from 'svelte/store';

// To store the active locationName for the top menu
export const activeLocation = writable(null);

// To store the active shopName in the menu (/) page
export const activeShop = writable(null);