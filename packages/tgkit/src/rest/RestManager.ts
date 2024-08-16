import Client from '../client/Client'
import TelegramBotAPIError from '../errors/TgKitError'

export default class RestManager {
	client: Client

	constructor(client: Client) {
		this.client = client
	}

	async request(method: string, params?: Record<string, any>): Promise<any> {
		// const formData = new FormData()

		// for (const param in params) {
		// 	if (typeof params[param] === 'object') {
		// 		formData.append(param, JSON.stringify(params[param]))
		// 	} else {
		// 		formData.append(param, params[param])
		// 	}
		// 	console.log(param)
		// 	console.log(params[param])
		// }

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
	}
}