import MenuButton from './MenuButton';
import { MenuButtonType } from '../utils/enums';

/** Describes that no specific value for the menu button was set. */
export default class MenuButtonCommands extends MenuButton {
	constructor() {
		super(MenuButtonType.Default);
	}
}
