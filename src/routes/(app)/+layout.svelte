<script lang="ts">
    import TopMenu from "$lib/component/top-menu.svelte";
    import { activeLocation } from '$lib/stores';

    import BottomMenu from "$lib/component/bottom-menu.svelte";

    let shopName = $activeLocation || "Your Location";
</script>

<main>
    <TopMenu locationName={shopName}/>
    <slot />
    <BottomMenu />
</main>

<style>

</style>