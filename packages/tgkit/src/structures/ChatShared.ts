import Client from '../client/Client'
import Base from './Base'

/** Information about the chat whose identifier was shared with the bot using a KeyboardButtonRequestChat button. */
export default class ChatShared extends Base {
	/** Identifier of the request. */
	requestId: number

	/**
	 * Identifier of the shared chat. The bot may not have access to the chat and could be unable
	 * to use this identifier, unless the chat is already known to the bot by some other means.
	 */
	chatId: number

	constructor(client: Client, data: any) {
		super(client)

		this.requestId = data.request_id
		this.chatId = data.chat_id
	}
}