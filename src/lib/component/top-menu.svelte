<script lang="ts">
  export let locationName:string;
</script>

<div class="top-menu">
  <div class="current-location">
    <span class="material-symbols-outlined">location_on</span>
    <div class="current-location__information">
      <p class="current-location__title">Current Location</p>
      <p class="current-location__address">{locationName}</p>
    </div>
  </div>
  <div class="notification-icon">
    <span class="material-symbols-outlined">notifications</span>
  </div>
</div>

<style>
  .top-menu {
    z-index: 900;
    border-bottom: .2rem solid rgba(52, 52, 74, 0.5);
    position: fixed;
    top: 0;
    width: 100%;
    background-color: var(--neutral-color);
    color: var(--primary-color);
    height: var(--top-menu-height);
    justify-content: space-between;
    padding: 1rem 2rem;
    display: flex;
  }

  .current-location {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .current-location .material-symbols-outlined {
    margin-right: .8rem;
    font-variation-settings: 'FILL' 1;
  }

  .current-location__information {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }

  .current-location__title {
    font-size: 1.2rem;
    color: rgba(52, 52, 74, 0.5);
  }

  .current-location__address {
    font-size: 1.4rem;
    font-weight: 400;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 100;
  }

  .notification-icon {
    display: flex;
    align-items: center;
  }
</style>