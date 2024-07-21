<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
import '../styles/global.scss'

	let { children } = $props()
</script>

<!-- <div class="notification">
	TgKit is still in development!
</div> -->
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

	.notification {
		width: 100%;
		height: 2rem;
		background: color-mix(in srgb, var(--warning) 50%, var(--background));
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>