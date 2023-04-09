import MenuButton from './MenuButton'
import { MenuButtonType } from '../utils/enums'

/** Represents a menu button, which opens the bot's list of commands. */
export default class MenuButtonCommands extends MenuButton {
	constructor() {
		super(MenuButtonType.Commands)
	}
}