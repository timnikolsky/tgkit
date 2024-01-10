import Client from '../client/Client'
import Base from './Base'

/** Contains data sent from a Web App to the bot */
export default class WebAppData extends Base {
	/** The data. Be aware that a bad client can send arbitrary data in this field.*/
	data: string

	/** 
	 * Text of the *WebApp* keyboard button from which the Web App was opened.
	 * Be aware that a bad client can send arbitrary data in this field.
	 */
	buttonText: string

	constructor(client: Client, data: any) {
		super(client)

		this.data = data.data
		this.buttonText = data.button_text
	}
}