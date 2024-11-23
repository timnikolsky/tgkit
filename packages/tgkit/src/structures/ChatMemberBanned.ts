import { unixToDate } from '../utils/converters';
import Client from '../client/Client';
import ChatMember from './ChatMember';

/** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
export default class ChatMemberLeft extends ChatMember {
	/** Date when restrictions will be lifted for this user. If *null*, then the user is banned forever */
	bannedUntil: Date | null;

	constructor(client: Client, data: any) {
		super(client, data);

		this.bannedUntil = data.until_date ? unixToDate(data.until_date) : null;
	}
}
