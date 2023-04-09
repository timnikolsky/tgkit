import Client from '../client/Client'
import TelegramBotAPIError from '../errors/TeleScriptError'

export default class RestManager {
	client: Client

	constructor(client: Client) {
		this.client = client
	}

	async request(method: string, params?: object): Promise<any> {
		try {
			const res = await fetch(`https://api.telegram.org/bot${this.client.token}/${method}`, {
				method: 'POST',
				body: JSON.stringify(params),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const data = await res.json()
			if(!data.ok) {
				throw new TelegramBotAPIError(data.description)
			}
			return data.result
		} catch (error: any) {
			console.log(error)
			// TODO
			// throw new TeleScriptError(error.response.data.description)
		}
	}
}