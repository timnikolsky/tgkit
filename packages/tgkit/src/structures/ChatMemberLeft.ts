import Client from '../client/Client';
import ChatMember from './ChatMember';

/** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
export default class ChatMemberLeft extends ChatMember {
	constructor(client: Client, data: any) {
		super(client, data);
	}
}
