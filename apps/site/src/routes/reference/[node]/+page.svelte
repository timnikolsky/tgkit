<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores'
	import { NodeKind } from '$lib/docsModel';

	let { data } = $props()
	let itemData = $derived(data.children.find((child: any) => child.name === $page.params.node))
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
	{@const properties = itemData.children.filter((c: any) => c.kind === 1024)}
	{@const methods = itemData.children.filter((c: any) => c.kind === 2048)}
	<section class="contents">
		{#if properties.length}
			<div class="contents-column">
				<h3>Properties</h3>
				{#each properties as property}
					<a class="contents-node" href={`#${property.name}`}>{property.name}</a>
				{/each}
			</div>
		{/if}
		{#if methods.length}
			<div class="contents-column">
				<h3>Methods</h3>
				{#each methods as method}
					<a class="contents-node" href={`#${method.name}`}>{method.name}</a>
				{/each}
			</div>
		{/if}
	</section>

	{#if properties.length}
		<section class="nodes-category">
			<h2>Properties</h2>

			{#each properties as property}
				<div class="nodes-category-node" id={property.name}>
					<h3 class="nodes-category-node-name">
						{property.name}
						{#if property.type.type === 'reference' && data.children.includes((child: any) => child.name === property.type.name)}
							<a href={`/reference/${property.type.name}`} class="nodes-category-node-type">{property.type.name}</a>
						{:else}
							<span class="nodes-category-node-type">{property.type.name}</span>
						{/if}
					</h3>
					{#if property.comment}
						<p>{property.comment?.summary[0].text}</p>
					{/if}
					<a href={property.sources[0].url}>See the code</a>
				</div>
			{/each}
		</section>
	{/if}
	{#if methods.length}
		<section class="nodes-category">
			<h2>Methods</h2>

			{#each methods as method}
				<div class="nodes-category-node" id={method.name}>
					<h3 class="nodes-category-node-name">
						{method.name}({method.signatures[0].parameters?.map((p: any) => `${p.name}: ${p.type.name}`).join(', ')}): {method.signatures[0].type.name}
					</h3>
					{#if method.comment}
						<p>{method.comment?.summary[0].text}</p>
					{/if}
					<a href={method.sources[0].url}>See the code</a>
				</div>
			{/each}
		</section>
	{/if}
{/if}

{#if itemData.kind === NodeKind.Enum}
	{@const members = itemData.children.filter((c: any) => c.kind === 16)}
	<section class="contents">
		<div class="contents-column">
			<h3>Members</h3>
			{#each members as member}
				<span class="contents-node">{member.name} = '{member.type.value}'</span>
			{/each}
		</div>
	</section>
{/if}

{#if itemData.kind === NodeKind.Interface}
	{@const properties = itemData.children?.filter((c: any) => c.kind === 1024)}
	<section class="contents">
		{#if properties?.length}
			<div class="contents-column">
				<h3>Properties</h3>
				{#each properties as property}
					<a class="contents-node" href={`#${property.name}`}>{property.name}</a>
				{/each}
			</div>
		{/if}
	</section>

	{#if properties?.length}
		<section class="nodes-category">
			<h2>Properties</h2>

			{#each properties as property}
				<div class="nodes-category-node" id={property.name}>
					<h3 class="nodes-category-node-name">
						{property.name}
						{#if property.type.type === 'reference' && data.children.includes((child: any) => child.name === property.type.name)}
							<a href={`/reference/${property.type.name}`} class="nodes-category-node-type">{property.type.name}</a>
						{:else}
							<span class="nodes-category-node-type">{property.type.name}</span>
						{/if}
					</h3>
					{#if property.comment}
						<p>{property.comment?.summary[0].text}</p>
					{/if}
					<a href={property.sources[0].url}>See the code</a>
				</div>
			{/each}
		</section>
	{/if}
{/if}

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
		color: var(--foreground-subtle);
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

	.contents {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		width: 100%;
	}

	.contents-column {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.contents-node {
		font-family: var(--font-mono);
		color: var(--foreground-secondary);
		text-decoration: none;
		height: 2rem;
		border-radius: 0.5rem;
		padding: 0 0.5rem;
		display: flex;
		align-items: center;

		&:hover {
			background: var(--background-hover);
		}
	}

	.nodes-category {
		display: flex;
		flex-direction: column;
	}
	
	.nodes-category-node {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--border);
		padding: 2rem 0;
	}

	.nodes-category-node-name {
		font-family: var(--font-mono);
		line-height: 1.5rem;
		margin: 0;
	}

	.nodes-category-node-type {
		text-decoration: none;
		color: var(--foreground-secondary);
	}
</style>