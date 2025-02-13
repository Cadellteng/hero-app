<script lang="ts">
  import { onMount } from 'svelte';
  
  let selected = [false, false, false];

  function updateSelectedState() {
    const currentPath = window.location.pathname;
    if (currentPath === '/') {
      selected = [false, true, false];
    } else if (currentPath === '/location') {
      selected = [true, false, false];
    } else if (currentPath === '/profile') {
      selected = [false, false, true];
    }
  }

  // Call the function when the component is mounted
  onMount(() => {
    updateSelectedState();
  });
</script>

<div class="bottom-menu">
  <ul>
    <li class:selected={selected[0]}>
      <a href="#location">
        <span class="material-symbols-outlined">location_on</span>
        <p>Location</p>
      </a>
    </li>
    <li class:selected={selected[1]}>
      <a href="#menu">
        <span class="material-symbols-outlined">local_dining</span>
        <p>Menu</p>
      </a>
    </li>
    <li class:selected={selected[2]}>
      <a href="/profile">
        <span class="material-symbols-outlined">person</span>
        <p>Profile</p>
      </a>
    </li>
  </ul>
</div>

<style>
  .bottom-menu {
    border-top: .2rem solid rgba(52, 52, 74, 0.5);
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--neutral-color);
    color: var(--primary-color);
    height: var(--bottom-menu-height);
    text-align: center;
  }

  .bottom-menu ul {
    list-style-type: none;
    margin: 0;
    display: flex;
    justify-content: space-around;
    height: 100%;
  }

  li {
    width: 8rem;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  li.selected {
    color: var(--secondary-color);
  }

  li.selected .material-symbols-outlined{
    font-variation-settings:
    'FILL' 1;
    transform: scale(1.2);
  }

  .bottom-menu a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span.material-symbols-outlined {
    margin-bottom: .8rem;
  }
</style>