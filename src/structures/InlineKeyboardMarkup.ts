import { InlineKeyboardMarkupData } from '../../types'
import InlineKeyboardButton from './InlineKeyboardButton'

/** 
 * Represents an inline keyboard that appears right next to the message it belongs to.
 * @see {@link https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating}
*/
export default class InlineKeyboardMarkup {
	/** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
	inlineKeyboard: InlineKeyboardButton[][]

	constructor(data: InlineKeyboardMarkupData = {}) {
		this.inlineKeyboard = data.inlineKeyboard ?? []
	}

	setKeyboard(inlineKeyboard: InlineKeyboardButton[][]) {
		this.inlineKeyboard = inlineKeyboard
		return this
	}

	toJSON(): object {
		return {
			inline_keyboard: this.inlineKeyboard.map(row => row.map(row => row.toJSON())),
		}
	}
}