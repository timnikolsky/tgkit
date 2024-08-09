<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
import '../styles/global.scss'

	let { children } = $props()
</script>

<div class="notification">
	TgKit library and website are still in early development!
</div>
<Navbar/>
<main class="main">
	{@render children()}
</main>

<style lang="scss">
	.main {
		max-width: 77rem;
		padding: 0 1rem;
		margin: 0 auto;
		min-height: 100%;
		height: calc(100svh - 6rem);
	}

	.notification {
		width: 100%;
		height: 2rem;
		background: color-mix(in srgb, var(--warning) 50%, var(--background));
		color: var(--foreground-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>