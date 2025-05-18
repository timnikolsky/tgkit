import { ReflectionKind } from 'typedoc';

export interface NodeCategory {
	text: string,
	kind: number
}

export const nodeCategories: NodeCategory[] = [
	{
		text: 'Class',
		kind: 128, // ReflectionKind.Class
	},
	{
		text: 'Interface',
		kind: 256, // ReflectionKind.Interface,
	},
	{
		text: 'Enum',
		kind: 8, // ReflectionKind.Enum,
	},
	{
		text: 'Type',
		kind: 2097152, // ReflectionKind.TypeAlias,
	},
];
