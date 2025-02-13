<script lang="ts">
  export let selected:Boolean = true;
  export let shopImage:string = "/near-you.png";
  export let shopName:string = "Lorem ipsum";
</script>

<div 
  class="category-stall-card"
  class:selected={selected}
  role="button"
  tabindex="0"
  on:click
  on:keydown
>
  <img src={shopImage} alt="Near You">
  <div class="image-overlay">
      <p class="overlay-text" class:selected={selected}>{shopName}</p>
    </div>
</div>

<style>
  .category-stall-card {
    display: inline-block;
    width: 15rem;
    position: relative;
    height: 20rem;
    border-radius: 1.6rem;
    animation: deselectCard 0.3s ease-in-out;  /* Simple transition */
  }

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 1.6rem;
    height: 100%;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(52, 52, 74, 0.4);
    border-radius: 1.6rem;
  }

  /* Text animation */
  @keyframes selectText {
    from {
      font-size: 1.8rem;
      font-weight: 400;
    }
    to {
      align-items: center;
      font-size: 2.4rem;
      font-weight: 500;
      text-shadow: 
        -1px -1px 0 var(--primary-color),  
        1px -1px 0 var(--primary-color),
        -1px 1px 0 var(--primary-color),
        1px 1px 0 var(--primary-color);
    }
  }

  @keyframes deselectText {
    from {
      align-items: center;
      font-size: 2.4rem;
      font-weight: 500;
      text-shadow: 
        -1px -1px 0 var(--primary-color),  
        1px -1px 0 var(--primary-color),
        -1px 1px 0 var(--primary-color),
        1px 1px 0 var(--primary-color);
    }
    to {
      align-items: flex-end;
      font-size: 1.8rem;
      font-weight: 400;
    }
  }

  .overlay-text.selected{
    animation: selectText 0.3s forwards;
  }

  .overlay-text {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--neutral-color);
    font-size: 1.8rem;
    font-weight: 400;
    text-align: center;
    height: 100%;
    padding-bottom: 1.5rem;
    word-wrap: break-word;  /* Break words if they exceed the container's width */
    white-space: pre-line;  /* Handle line breaks and ensure text wraps properly */
    animation: deselectText 0.3s forwards;
  }
</style>