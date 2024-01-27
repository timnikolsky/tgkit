import Client from '../client/Client'
import Base from './Base'

/** Represents a message about a forwarded story in the chat. Currently holds no information. */
export default class Story extends Base {
	constructor(client: Client) {
		super(client)
	}
}