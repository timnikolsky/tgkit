import Client from 'client/Client'
import Base from './Base'

/** Contains data sent from a Web App to the bot */
export default class WebAppData extends Base {
    data: string
    buttonText: string

    constructor(client: Client, data: any) {
        super(client)

        this.data = data.data
        this.buttonText = data.button_text
    }
}