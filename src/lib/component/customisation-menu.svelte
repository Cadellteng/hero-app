<script lang="ts">
  import { fly } from "svelte/transition";
  import { onMount } from 'svelte';

  let screenHeight:number;
  onMount(() => {
    // Now we can safely access window
    screenHeight = window.innerHeight;

    // Add resize listener
    const handleResize = () => {
        screenHeight = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component destroy
    return () => {
        window.removeEventListener('resize', handleResize);
    };
  });

  export let customisationFormVisible;
  export let itemName;
  export let itemBasePrice;
  export let itemImage;
  export let customisationMenu;
  export let doCloseMenu;
  export let counterValue = 1

  const handleDecrement = () => {
    if (counterValue !== 0) {
      counterValue -= 1;
    } else {
      counterValue = 0;
    }
  };

  const handleIncrement = () => {
    counterValue += 1;
  };
</script>

{#if customisationFormVisible}
  <div
    class="customisation-form__container"
    transition:fly="{{ y: screenHeight, duration: 500 }}"
  >
    <div class="customisation-form__title">
      <span class="customisation-form__title-text">
        <h1>{itemName}</h1>
        <h3 class="current-price">${itemBasePrice.toFixed(2)}</h3>
      </span>
      <button 
        class="close-button"
        on:click={doCloseMenu}
      >
        <span
          class="material-symbols-outlined"
        >
          close
        </span>
      </button>
    </div>
    <div class="customisation-form__menu">
      <div class="customisation-form__item-image">
        <img src={itemImage} alt="Menu Item">
      </div>
      <div class="customisation-form__customisation-menu-container">
        {#each customisationMenu as item}
          <div class="customisation-form__customisation_menu-item-title">
            <div class="customisation-form__customisation_menu-item-title-name">
              {#if item.maxSelections === 1}
                <h2>{item.title}</h2>
                <h3>Select {item.maxSelections}</h3>
              {:else if item.maxSelections > 1}
                <h2>{item.title}</h2>
                <h3>Select up to {item.maxSelections}</h3>
              {/if}
            </div>
            {#if item.required}
              <div class="chip required">
                Required
              </div>
            {:else}
              <div class="chip">
                Optional
              </div>
            {/if}
          </div>
          <div class="customisation-form__customisation-menu-item">
            {#each item.options as option}
              {#if item.maxSelections === 1}
                <label>
                  <span class="customisation-form__customisation-menu-item-selection">
                    <input type="radio" name={item.title} value={option.name} />
                    <p>{option.name}</p>
                  </span>
                    {#if item.optionsAreFree}
                      <p>Free</p>
                    {:else if !item.optionsAreFree}
                      <p>${option.price.toFixed(2)}</p>
                    {/if}
                </label>
                {:else if item.maxSelections > 1}
                <label>
                  <span class="customisation-form__customisation-menu-item-selection">
                    <input type="checkbox" name={item.title} value={option.name} />
                    <p>{option.name}</p>
                  </span>
                    {#if item.optionsAreFree}
                      <p>Free</p>
                    {:else if !item.optionsAreFree}
                      <p>${option.price.toFixed(2)}</p>
                    {/if}
                </label>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
      <div class="customisation-form__counter">
        <button
          class="customisation-form__counter-decrement"
          on:click={handleDecrement}
        >-
        </button>
        <input type="number" class="customisation-form__counter-value" bind:value={counterValue} />
        <button
          class="customisation-form__counter-increment"
          on:click={handleIncrement}
        >+
        </button>
      </div>
      <button>Add to Cart - ${itemBasePrice.toFixed(2)}</button>
    </div>
  </div>
{/if}

<style>
  .customisation-form__container {
    position: fixed;
    top: var(--top-menu-height);
    padding: 1.5rem 1.5rem 0 1.5rem;
    border: 1px solid var(--primary-color);
    border-radius: 1.6rem 1.6rem 0 0;
    height: calc(100vh - var(--top-menu-height) - var(--bottom-menu-height) + .5rem);
    width: 100vw;
    max-width: 50rem;
    margin: 0 auto;
    background-color: var(--neutral-color);
    z-index: 200;
  }

  .customisation-form__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--primary-color);
    height: var(--customisation-form-height);
  }

  .customisation-form__title-text {
    display: flex;
    align-items: center;
  }

  .close-button {
    width: auto;
    padding: 0;
    background-color: var(--neutral-color);
    color: var(--primary-color);
  }

  .current-price {
    background-color: var(--primary-color);
    color: var(--neutral-color);
    margin-left: 2rem;
    font-size: 1.8rem;
    padding: .2rem 1rem;
    border-radius: 1rem;
  }

  .customisation-form__menu {
    overflow-y: auto;
    max-height: calc(100vh - var(--top-menu-height) - var(--bottom-menu-height) - var(--customisation-form-height) - 1.5rem);
  }

  .customisation-form__item-image {    
    margin-top: 1rem;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 25rem;
    border-radius: 1.6rem;
  }

  .customisation-form__customisation-menu-container {
    padding: 1rem .5rem 0 .5rem;
  }

  .customisation-form__customisation-menu-container > div:last-child {
    padding-bottom: 2rem;
  }

  .customisation-form__customisation_menu-item-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--primary-color);
    padding-top: 1rem;
  }

  .chip.required {
    background-color: var(--primary-color);
    color: var(--neutral-color);
    padding: .5rem 1rem;
    border-radius: 10rem;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .chip {
    border: .1rem solid var(--primary-color);
    padding: .5rem 1rem;
    border-radius: 10rem;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .customisation-form__customisation-menu-item {
    padding-top: 1rem;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.6rem;
  }

  .customisation-form__customisation-menu-item-selection {
    display: flex;
  }

  .customisation-form__customisation-menu-item-selection p {
    margin-left: 0.5rem;
  }

  .customisation-form__counter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .customisation-form__counter-decrement {
    width:20vw;
    margin: auto 0;
  }

  .customisation-form__counter-value {
    width:20vw;
    height: 5rem;
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    font-size: 1.8rem;
    font-weight: 400;
    border: .1rem solid var(--primary-color);
    border-radius: 1.2rem;
    margin: 0 3rem;
    text-align: center;
    background-color: var(--neutral-color);
    color: var(--primary-color);
  }

  .customisation-form__counter-increment {
    width:20vw;
    margin: auto 0;
  }

  button {
    margin: 1.5rem 0;
    font-size: 1.8rem;
  }
</style>