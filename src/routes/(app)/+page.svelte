<script lang="ts">
  // import type { User } from 'firebase/auth';
  import { activeLocation } from '$lib/stores';
  import CategoryStallCard from '$lib/component/category-stall-card.svelte';
  import MenuItemCard from '$lib/component/menu-item-card.svelte';
  import CustomisationMenu from '$lib/component/customisation-menu.svelte';
  import { onMount } from 'svelte';
  import { fakeMenu } from '$lib/fakeMenu';
  import type { PageData, CustomisationParams, Menu } from '$lib/types';

  export let data: PageData;
  
  // let user: User | null = data.user;

  // The first stall item will always be active at load
  let activeState:boolean[] = [true, ...new Array(data.shopItems.length-1).fill(false)];
  let activeShop = data.shopItems[0].shopName || "";
  let menuItems: Menu[] = data.menuDocs;

  // const queryActiveShopMenu = () => {

  // }

  function capitalizeFirstLetter(str: string): string {
    if (typeof str !== 'string' || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleCardClick = (cardId: number) => {
    activeState = activeState.map((state, index) => index === cardId ? true : false);
    activeShop = data.shopItems[cardId]?.shopName || "";
    // console.log(activeState);
  }

  let customisationFormVisible = false;
  let customisationParams:any;
  const openCustomisationMenu = (itemName:string, itemBasePrice:number, itemImage:string, i:number, j:number) => {
    customisationParams = {
      itemName,
      itemBasePrice,
      itemImage,
      "customisationMenu": menuItems[i]["menuItems"][j]["customisationMenu"],
    }
    // console.log(JSON.stringify(customisationParams,null,2));
    customisationFormVisible = true;
  };
  const doCloseMenu = () => {customisationFormVisible = false;};
</script>

<main>
  <div class="category-stall-container">
    <h1>{$activeLocation}</h1>
    <div class="stall-list">
      {#each data.shopItems as item, i}
        <CategoryStallCard
          shopImage={item.shopImage}
          shopName={item.shopName}
          selected={activeState[i]}
          on:click={() => handleCardClick(i)}
        />
      {/each}
    </div>
  </div>
  <div class="menu-cards">
    <h1>{activeShop}</h1>
    {#each menuItems ?? [] as item, i}
      <h2>{capitalizeFirstLetter(item.subMenu)}</h2>
      {#if item?.menuItems}
      <div class="menu-cards__items">
        {#each item.menuItems as menuItem, j}
          <MenuItemCard
            itemName={menuItem.itemName}
            itemBasePrice={menuItem.itemBasePrice.toFixed(2)}
            itemImage={menuItem.itemImage}
            handleAdd={() => openCustomisationMenu(menuItem.itemName, menuItem.itemBasePrice, menuItem.itemImage, i, j)}
          />
        {/each}
      </div>
      {/if}
    {/each}
  </div>

  <CustomisationMenu
    {...customisationParams}
    customisationFormVisible = {customisationFormVisible}
    doCloseMenu = {doCloseMenu}
  />
</main>

<style>
  main {
    height: 100%;
    padding-top: 7rem;
    z-index: 100;
  }

  h1 {
    padding: 1rem 0 0 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h2 {
    padding: 1rem 0 0 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .category-stall-container {
    overflow-x: scroll; /* Enable horizontal scrolling */
    overflow-y: hidden;
    white-space: nowrap;
    width: 100%; /* Set the width of the container */
    height: 25rem;
    padding: 0 1rem;
  }

  .stall-list {
    display: grid; /* Use CSS Grid */
    grid-auto-flow: column; /* Make the grid items flow in columns */
    grid-auto-columns: auto; /* Set the width of each card, adjust as needed */
    gap: 1rem; /* Add some spacing between cards if needed */
    height: 100%;
  }

  .menu-cards:last-child {
    margin-bottom: calc(2rem + var(--bottom-menu-height));
  }

  .menu-cards__items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>