import Client from '../client/Client';
import ChatMember from './ChatMember';

/** Represents a chat member that owns the chat and has all administrator privileges. */
export default class ChatMemberOwner extends ChatMember {
	/** *true*, if the user's presence in the chat is hidden */
	isAnonymous: boolean;

	/** Custom title for this user */
	customTitle?: string;

	constructor(client: Client, data: any) {
		super(client, data);

		this.isAnonymous = data.is_anonymous;
		this.customTitle = data.custom_title;
	}
}
