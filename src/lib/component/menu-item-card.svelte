<script lang="ts">
  export let itemName;
  export let itemBasePrice;
  export let itemImage = "/chicken-rice.png";
  export let handleAdd;
</script>

<div class="menu-item-card">
  <img class="menu-item-image" src={itemImage} alt={itemName} />
  <div class="menu-item-details">
    <p class="menu-item-title">{itemName}</p>
    <div class="price-and-add">
      <p class="menu-item-price"><span class="currency-sign">$</span>{itemBasePrice}</p>
      <button
        class="menu-item-add"
        on:click={handleAdd}
      >
        <span class="material-symbols-outlined">
          add_circle
        </span>
      </button>
    </div>
  </div>
</div>

<style>
  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0
  }
  
  .menu-item-card {
    border: 1px solid rgba(52, 52, 74, 0.5);
    width: 20rem;
    max-width: 50%;
    border-radius: 1.6rem;
    height: 27rem;
  }

  .menu-item-image {
    width: 100%;
    border-radius: 1.6rem 1.6rem 0 0;
    object-fit: cover;
    height: 16rem;
  }

  .menu-item-details {
    margin: 0 0.5rem;
  }

  .menu-item-title {
    font-size: 1.8rem;
    font-weight: 600;
    padding: .5rem 0;
    height: 6.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .menu-item-price {
    font-size: 1.8rem;
    font-weight: 700;
  }

  .currency-sign {
    margin-right: 0.5rem;
  }

  .price-and-add {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu-item-add {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    width: auto;
    height: auto;
    background-color: var(--neutral-background);
    color: var(--primary-color);
  }
</style>