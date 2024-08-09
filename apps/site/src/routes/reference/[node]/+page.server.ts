import { docsModel } from '$lib/docsModel'
import type { EntryGenerator } from './$types'

export const prerender = true

export const entries: EntryGenerator = async () => {
	return docsModel.children.map((child: any) => ({
		node: child.name
	}))
}
