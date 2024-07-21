<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData

	function getKind(kind: number) {
		if (kind === 8) return 'enum'
		if (kind === 128) return 'class'
	}
</script>

<div class="docs">
	<aside class="sidebar">
		{#each data.children as child}
			<a href={`/reference/${child.name}`}>
				{child.name} ({getKind(child.kind)})
			</a>
		{/each}
	</aside>
	<div class="content">
		<slot/>
	</div>
</div>

<style lang="scss">
	.docs {
		width: 100%;
		min-height: 100svh;
		display: grid;
		grid-template-columns: auto 1fr;
		margin-top: 2.5rem;
		gap: 1.5rem;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		width: 18rem;
		gap: 0.5rem;
		background: var(--background-secondary);

		a {
			color: var(--accent);
			
		}
	}

	.content {

	}
</style>