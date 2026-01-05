import { ParseMode } from './enums';

const escapers: Record<`${ParseMode}`, Record<string, string> | null> = {
	[ParseMode.HTML]: {
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
	},
	[ParseMode.MarkdownV2]: {
		_: '\\_',
		'*': '\\*',
		'[': '\\[',
		']': '\\]',
		'(': '\\(',
		')': '\\)',
		'~': '\\~',
		'`': '\\`',
		'>': '\\>',
		'#': '\\#',
		'+': '\\+',
		'-': '\\-',
		'=': '\\=',
		'|': '\\|',
		'{': '\\{',
		'}': '\\}',
		'.': '\\.',
		'!': '\\!',
	},
	[ParseMode.Markdown]: null,
};

export function escape(text: string, parseMode: ParseMode | `${ParseMode}`) {
	const escapedSymbols = escapers[parseMode];
	if (!escapedSymbols) return text;

	const regex = new RegExp(`[${Object.values(escapedSymbols).join('')}]`, 'g');
	return text.replace(regex, (r) => escapedSymbols[r as keyof typeof escapedSymbols] ?? r);
}
