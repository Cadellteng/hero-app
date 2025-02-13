<script>
  import TopMenu from "$lib/component/top-menu.svelte";
  import { activeLocation } from "$lib/stores";
  import BottomMenu from "$lib/component/bottom-menu.svelte";
  import CustomisationMenu from "$lib/component/customisation-menu.svelte";

  let shopName = $activeLocation || "Your Location";
  let customisationFormVisible = true;
  const handleClick = () => {
    customisationFormVisible = !customisationFormVisible;
  }
</script>

<TopMenu locationName={shopName}/>
<div class="component-container">
</div>
<BottomMenu />

<style>
  .component-container {
    margin-top: var(--top-menu-height);
  }
</style>