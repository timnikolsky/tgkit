<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
import '../styles/global.scss'

	let { children } = $props()
</script>

<Navbar/>
<main class="main">
	{@render children()}
</main>

<style lang="scss">
	.main {
		max-width: 77rem;
		padding: 0 1rem;
		margin: 0 auto;
	}
</style>