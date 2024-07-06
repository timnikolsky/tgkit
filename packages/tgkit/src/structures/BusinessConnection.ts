import User from 'structures/User'
import Client from '../client/Client'
import Base from './Base'
import Chat from './Chat'
import { unixToDate } from 'utils/converters'

/** Represents a message about a scheduled giveaway */
export default class BusinessConnection extends Base {
	/** Unique identifier of the business connection */
	id: string

	/** Business account user that created the business connection */
	user: User

	/** Identifier of a private chat with the user who created the business connection. */
	userChatId: number

	/** Date the connection was established */
	date: Date

	/** *true*, if the bot can act on behalf of the business account in chats that were active in the last 24 hours */
	canReply: boolean

	/** *true*, if the connection is active */
	isEnabled: boolean

	constructor(client: Client, data: any) {
		super(data)

		this.id = data.id
		this.user = new User(client, data.user)
		this.userChatId = data.userChatId
		this.date = unixToDate(data.date)
		this.canReply = data.canReply
		this.isEnabled = data.isEnabled
	}
}