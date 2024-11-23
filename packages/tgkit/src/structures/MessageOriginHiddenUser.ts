import { toCamelCase, unixToDate } from '../utils/converters';
import MessageOrigin from './MessageOrigin';
import { MessageOriginType } from '../utils/enums';
import Base from './Base';
import Client from '../client/Client';

export default class MessageOriginHiddenUser extends Base implements MessageOrigin {
	/** Type of the message origin */
	type: MessageOriginType.HiddenUser;

	/** Date the message was sent originally */
	date: Date;

	/** ame of the user that sent the message originally */
	senderUserName: string;

	constructor(client: Client, data: any) {
		super(client);
		this.type = toCamelCase(data.type);
		this.date = unixToDate(data.date);
		this.senderUserName = data.sender_user_name;
	}
}
