import { toCamelCase } from '../utils/converters'
import { ChatMemberStatus } from '../utils/enums'
import Client from '../client/Client'
import Base from './Base'
import User from './User'

/** Represents a member of a chat */
export default class ChatMember extends Base {
	/** The member's status in the chat */
	status: ChatMemberStatus

	/** Information about the user */
	user: User

    
	constructor(client: Client, data: any) {
		super(client)

		this.status = toCamelCase(data.status) as ChatMemberStatus
		this.user = new User(client, data.user)
	}
}
