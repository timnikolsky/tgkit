import { ChatType } from '../../types'
import Client from '../client/Client'
import Base from './Base'
import Location from './Location'
import User from './User'

/** Represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results. */
export default class InlineQuery extends Base {
	/** Unique identifier for this query */
	id: string

	/** Sender */
	from: User

	/** Text of the query (up to 256 characters) */
	query: string

	/** Offset of the results to be returned, can be controlled by the bot */
	offset: string
    
	/** Type of the chat, from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat */
	chatType?: ChatType

	/** Sender location, only for bots that request user location */
	location?: Location

    
	constructor(client: Client, data: any) {
		super(client)

		this.id = data.id
		this.from = new User(client, data.from)
		this.query = data.query
		this.offset = data.offset
		this.chatType = data.chat_type
		this.location = data.location && new Location(client, data.location)
	}
}