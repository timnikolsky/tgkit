import { toSnakeCase } from '../utils/converters'
import { MenuButtonType } from '../utils/enums'

/** Describes the bot's menu button in a private chat. */
export default class MenuButton {
	/** Type of the button */
	type: MenuButtonType


	constructor(type: MenuButtonType) {
		this.type = type
	}

	toJSON(): object {
		return {
			type: toSnakeCase(this.type)
		}
	}
}