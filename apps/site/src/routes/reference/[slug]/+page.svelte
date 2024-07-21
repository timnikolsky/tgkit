<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores'
	import { NodeKind } from '$lib/docsModel';

	let { data } = $props()
	let itemData = $derived(data.children.find((child: any) => child.name === $page.params.slug))
</script>

<h1 class="title">
	{itemData.name}
	<span class={`kind-badge ${NodeKind[itemData.kind].toLowerCase()}`}>
		{NodeKind[itemData.kind]}
	</span>
</h1>
{#if itemData.extendedTypes}
	<span class="extends">extends {itemData.extendedTypes[0].name === 'default' ? 'Base' : itemData.extendedTypes[0].name}</span>
{/if}

{#if itemData.comment}
	<p class="description">{itemData.comment.summary[0].text}</p>
{/if}

<!-- Class -->
{#if itemData.kind === NodeKind.Class}
	<h2>Properties</h2>
	<ul>
		{#each itemData.children.filter((c: any) => c.kind === 1024) as property}
			<li><code>{property.name}: {property.type.name}</code></li>
		{/each}
	</ul>
	<h2>Methods</h2>
	<ul>
		{#each itemData.children.filter((c: any) => c.kind === 2048) as method}
			<li><code>{method.name}({
				method.signatures[0].parameters
					?.map((p: any) => `${p.name}${p.flags.isOptional ? '?' : ''}: ${p.type.name}`)
					.join(', ')
			})</code></li>
		{/each}
	</ul>
{/if}

<details>
	<pre>{JSON.stringify(itemData, null, 2)}</pre>
</details>

<style lang="scss">
	.title {
		margin: 0;
		font-size: 2.5rem;
		letter-spacing: -0.02em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		line-height: 100%;
	}

	.extends {
		color: var(--text-subtle);
		font-size: 1.25rem;
		line-height: 100%;
		margin-top: 0.5rem;
	}

	.description {
		font-size: 1.25rem;
		margin-top: 1rem;
	}

	.kind-badge {
		background: color-mix(in srgb, var(--badge-color) 20%, transparent);
		color: var(--badge-color);
		padding: 0 0.25rem;
		border-radius: 0.25rem;
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 125%;
		margin-top: 0.5rem;

		&.class {
			--badge-color: var(--node-class-color);
		}

		&.interface {
			--badge-color: var(--node-interface-color);
		}

		&.enum {
			--badge-color: var(--node-enum-color);
		}

		&.type {
			--badge-color: var(--node-type-color);
		}
	}
</style>