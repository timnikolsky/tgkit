import { toCamelCase, unixToDate } from '../utils/converters';
import MessageOrigin from './MessageOrigin';
import { MessageOriginType } from '../utils/enums';
import Chat from './Chat';
import Base from './Base';
import Client from '../client/Client';

export default class MessageOriginChat extends Base implements MessageOrigin {
	/** Type of the message origin */
	type: MessageOriginType.Chat;

	/** Date the message was sent originally */
	date: Date;

	/** Chat that sent the message originally */
	senderChat: Chat;

	/** For messages originally sent by an anonymous chat administrator, original message author signature */
	authorSignature?: string;

	constructor(client: Client, data: any) {
		super(client);
		this.type = toCamelCase(data.type);
		this.date = unixToDate(data.date);
		this.senderChat = new Chat(client, data.sender_chat);
		this.authorSignature = data.author_signature;
	}
}
