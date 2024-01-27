import Client from '../client/Client'
import ChatMember from './ChatMember'

/** Represents a chat member that has no additional privileges or restrictions. */
export default class ChatMemberMember extends ChatMember {
	constructor(client: Client, data: any) {
		super(client, data)
	}
}
