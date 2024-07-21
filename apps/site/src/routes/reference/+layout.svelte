<script lang="ts">
	import { NodeKind } from '$lib/docsModel';
	import type { LayoutData } from './$types';

	let { data, children } = $props()
	let searchText = $state('')
	let filteredNodes = $derived(data.children.filter((n: any) => n.name.toLowerCase().includes(searchText.toLowerCase())))
</script>

<div class="docs">
	<aside class="sidebar">
		<input class="search" bind:value={searchText} placeholder="Search">
		<div class="sidebar-links">
			{#if searchText}
				{#if filteredNodes.length}
					{#each filteredNodes as node}
						<a class="sidebar-link" href={`/reference/${node.name}`}>
							<div class={`kind ${NodeKind[node.kind].toLowerCase()}`}>
								{NodeKind[node.kind][0]}
							</div>
							<span>{node.name}</span>
						</a>
					{/each}
				{:else}
					Nothing found.
				{/if}
			{:else}
				{#each Object.keys(NodeKind).filter((k) => !Number(k)) as kind}
					<span class="sidebar-links-group">{kind}</span>
					{#each data.children.filter((n: any) => n.kind === NodeKind[kind as any]) as node}
						<a class="sidebar-link" href={`/reference/${node.name}`}>
							<div class={`kind ${NodeKind[node.kind].toLowerCase()}`}>
								{NodeKind[node.kind][0]}
							</div>
							<span>{node.name}</span>
						</a>
					{/each}
				{/each}
			{/if}
		</div>
	</aside>
	<article class="content">
		{@render children()}
	</article>
</div>

<style lang="scss">
	.docs {
		width: 100%;
		height: calc(100svh - 4rem - 2.5rem);
		display: grid;
		grid-template-columns: auto 1fr;
		margin-top: 2.5rem;
		gap: 3rem;
		position: relative;
	}

	.sidebar {
		width: 18rem;
		height: calc(100vh - 4rem);
		overflow-y: scroll;
		position: sticky;
		top: calc(4rem + 2.5rem);
		display: flex;
		flex-direction: column;
		gap: 2rem;
		overflow-y: scroll;

		-ms-overflow-style: none;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.sidebar-links-group {
		font-size: 1rem;
		font-weight: 500;
		margin-top: 1rem;
		margin-bottom: 0.5rem;
	}

	.search {
		background: var(--background-secondary);
		border: 1px solid var(--border);
		height: 2.5rem;
		font-size: 1rem;
		outline: none;
		flex-shrink: 0;
		border-radius: 0.5rem;
		padding: 0 0.5rem;
		font-family: var(--font);
		position: sticky;
		top: 0;
	}

	.sidebar-links {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow-x: hidden;
		height: fit-content;
		flex-shrink: 0;
	}

	.sidebar-link {
		display: flex;
		color: var(--text);
		text-decoration: none;
		height: 2rem;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		border-radius: 0.5rem;
		transition: 0.2s;
		padding: 0 0.5rem;

		&:hover {
			background: var(--background-hover);
		}
	}

	.kind {
		width: 1rem;
		height: 1rem;
		font-size: 0.875rem;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		line-height: 100%;
		flex-shrink: 0;
		font-family: var(--font-mono);
		background: color-mix(in srgb, var(--icon-color) 20%, transparent);
		color: var(--icon-color);

		&.class {
			--icon-color: var(--node-class-color);
		}

		&.interface {
			--icon-color: var(--node-interface-color);
		}

		&.enum {
			--icon-color: var(--node-enum-color);
		}

		&.type {
			--icon-color: var(--node-type-color);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
	}
</style>