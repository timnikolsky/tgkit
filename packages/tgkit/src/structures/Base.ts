import Client from '../client/Client'

/** Internal class that provides an access to the client instance to most structures */
export default class Base {
	client: Client

	constructor(client: Client) {
		this.client = client
	}
}