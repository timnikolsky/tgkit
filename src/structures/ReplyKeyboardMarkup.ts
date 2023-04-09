import { ReplyKeyboardMarkupData } from '../../types'
import KeyboardButton from './KeyboardButton'

/** 
 * Represents a custom keyboard with reply options.
 * @see {@link https://core.telegram.org/bots#keyboards}
*/
export default class ReplyKeyboardMarkup {
	/** Array of button rows, each represented by an Array of KeyboardButton objects */
	keyboard: KeyboardButton[][]

	/**  Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to false, in which case the custom keyboard can be hidden and opened with a keyboard icon. */
	isPersistent?: boolean

	/** Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
	resizeKeyboard?: boolean

	/** Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to false. */
	oneTimeKeyboard?: boolean

	/** The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
	inputFieldPlaceholder?: string

	/** Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has replyToMessageId), sender of the original message. */
	selective?: boolean

	constructor(data: ReplyKeyboardMarkupData = {}) {
		this.keyboard = data.keyboard ? data.keyboard.map(row => row.map(button => new KeyboardButton(button))) : [],
		this.isPersistent = data.isPersistent,
		this.resizeKeyboard = data.resizeKeyboard
		this.oneTimeKeyboard = data.oneTimeKeyboard
		this.inputFieldPlaceholder = data.inputFieldPlaceholder
		this.selective = data.selective
	}

	setKeyboard(keyboard: KeyboardButton[][]) {
		this.keyboard = keyboard
		return this
	}

	setIsPersistent(isPersistent: boolean) {
		this.isPersistent = isPersistent
		return this
	}

	setResizeKeyboard(resizeKeyboard: boolean) {
		this.resizeKeyboard = resizeKeyboard
		return this
	}

	setOneTimeKeyboard(oneTimeKeyboard: boolean) {
		this.oneTimeKeyboard = oneTimeKeyboard
		return this
	}

	setInputFieldPlaceholder(inputFieldPlaceholder: string) {
		this.inputFieldPlaceholder = inputFieldPlaceholder
		return this
	}

	setSelective(selective: boolean) {
		this.selective = selective
		return this
	}

	toJSON(): object {
		return {
			keyboard: this.keyboard.map(row => row.map(row => row.toJSON())),
			resize_keyboard: this.resizeKeyboard,
			one_time_keyboard: this.oneTimeKeyboard,
			input_field_placeholder: this.inputFieldPlaceholder,
			selective: this.selective
		}
	}
}