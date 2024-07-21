import type { EntryGenerator } from './$types'
import docsModel from '../../../../../../.temp/api-ref.json'

export const prerender = true

export const entries: EntryGenerator = async () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return docsModel.children.map((child: any) => ({
		slug: child.name
	}))
}
