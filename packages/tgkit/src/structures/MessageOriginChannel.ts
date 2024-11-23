import { toCamelCase, unixToDate } from '../utils/converters';
import MessageOrigin from './MessageOrigin';
import { MessageOriginType } from '../utils/enums';
import Chat from './Chat';
import Base from './Base';
import Client from '../client/Client';

export default class MessageOriginChannel extends Base implements MessageOrigin {
	/** Type of the message origin */
	type: MessageOriginType.Channel;

	/** Date the message was sent originally */
	date: Date;

	/** Channel chat to which the message was originally sent */
	chat: Chat;

	/** Unique message identifier inside the chat */
	messageId: number;

	/** Signature of the original post author */
	authorSignature?: string;

	constructor(client: Client, data: any) {
		super(client);
		this.type = toCamelCase(data.type);
		this.date = unixToDate(data.date);
		this.chat = new Chat(client, data.chat);
		this.messageId = data.message_id;
		this.authorSignature = data.author_signature;
	}
}
