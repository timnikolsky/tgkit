import Chat from './Chat'
import Client from '../client/Client'
import Base from './Base'

/** Represents a message about a forwarded story in the chat. Currently holds no information. */
export default class Story extends Base {
	/** Chat that posted the story */
	chat: Chat

	/** Unique identifier for the story in the chat */
	id: number

	constructor(client: Client, data: any) {
		super(client)

		this.chat = new Chat(client, data.chat)
		this.id = data.id
	}
}