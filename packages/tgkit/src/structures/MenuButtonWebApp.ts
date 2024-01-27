import MenuButton from './MenuButton'
import { toSnakeCase } from '../utils/converters'
import { MenuButtonWebAppOptions, WebAppInfo } from '../../types'
import { MenuButtonType } from 'utils/enums'

export default class MenuButtonCommands extends MenuButton {
	/** Text on the button */
	text: string
    
	/**
	 * Description of the Web App that will be launched when the user presses the button.
	 * The Web App will be able to send an arbitrary message on behalf of the user
	 * using the method *\<Client>.answerWebAppQuery*.
	 */
	webApp: WebAppInfo


	constructor(options: MenuButtonWebAppOptions) {
		super(MenuButtonType.WebApp)

		this.text = options.text
		this.webApp = options.webApp
	}

	toJSON(): object {
		return {
			type: toSnakeCase(this.type),
			text: this.text,
			webApp: this.webApp
		}
	}
}