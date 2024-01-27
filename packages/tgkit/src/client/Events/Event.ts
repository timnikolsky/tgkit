import Client from 'client/Client'

export default class TelegramEvent {
	client: Client

	constructor(client: Client) {
		this.client = client
	}

	handle(data: any) {
		return data
	}
}