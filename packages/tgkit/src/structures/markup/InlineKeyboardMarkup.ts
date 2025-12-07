import type { InlineKeyboardMarkupData } from '../../types';
import InlineKeyboardButton from './InlineKeyboardButton';

/**
 * Represents an inline keyboard that appears right next to the message it belongs to.
 * @see {@link https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating}
 */
export default class InlineKeyboardMarkup {
	/** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
	inlineKeyboard: InlineKeyboardButton[][];

	constructor(data: InlineKeyboardButton | (InlineKeyboardButton | InlineKeyboardButton[])[]) {
		if (data instanceof InlineKeyboardButton) {
			this.inlineKeyboard = [[data]];
			return;
		}

		const inlineKeyboard: InlineKeyboardButton[][] = [];
		for (const row of data) {
			if (row instanceof InlineKeyboardButton) {
				inlineKeyboard.push([row]);
			} else {
				inlineKeyboard.push(row);
			}
		}

		this.inlineKeyboard = inlineKeyboard;
	}

	toJSON(): object {
		return {
			inline_keyboard: this.inlineKeyboard.map((row) => row.map((row) => row.toJSON())),
		};
	}
}
