<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores'

	let { data } = $props()
	let itemData = $derived(data.children.find((child: any) => child.name === $page.params.slug))
</script>

<h1 class="title">{itemData?.name}</h1>

<!-- Class -->
{#if itemData?.kind === 128}
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
	}
</style>