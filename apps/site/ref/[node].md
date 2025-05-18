---
outline: [2, 3]
---

<script setup>
	import { apiRef } from '../apiRef';
	import { useData } from 'vitepress';
	import { nodeCategories } from '../constants';
	import { onMounted } from 'vue';

	const { params } = useData();

	const node = apiRef.children.find((n) => n.name === params.value.node);
	const categoryName = nodeCategories.find((c) => c.kind === node.kind).text
	const nodeDescription = node.comment?.summary[0].text;
	const parentId = node.extendedTypes?.[0]?.target;
	const parentNative = typeof parentId !== 'number';
	const parentName = parentNative
		? parentId?.qualifiedName
		: apiRef.children.find((n) => n.id === parentId)?.name;

	const properties = node.children.filter(c => c.kind === 1024)
	const methods = node.children.filter(c => c.kind === 2048)

	const sectionTypes = [{
		name: 'Properties',
		value: properties
	}, {
		name: 'Methods',
		value: methods
	}]

	onMounted(() => {
		const query = [1, 2, 3, 4, 5, 6].map(n => `h${n}[id]:not(:has(a.header-anchor))`).join(',')
		console.log(query)
		const headings = document.querySelectorAll(query)
		
		for (const heading of headings) {
			const anchor = document.createElement('a')
			anchor.className = 'header-anchor'
			anchor.href = `#${heading.id}`
			anchor.setAttribute('aria-label', `Permalink to "${heading.id}"`)
			anchor.innerHTML = '&ZeroWidthSpace;'
			heading.appendChild(anchor)
		}
	})
</script>

<h1 :id="node.name">{{node.name}} <Badge type="info">{{categoryName}}</Badge></h1>

<p v-if="parentId" class="extends">
	extends <a :href="`/ref/${parentName}`">{{parentName}}</a>
</p>

{{ nodeDescription }}

<template v-for="section in sectionTypes">
	<template v-if="section.value.length > 0">
		<h2 :id="section.name">{{section.name}}</h2>
		<template v-for="childNode in section.value">
			<h3 :id="childNode.name">{{childNode.name}}</h3>
			{{childNode.comment?.summary.map((i) => i.text).join('')}}
		</template>
	</template>
</template>
