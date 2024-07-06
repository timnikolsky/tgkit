import { toCamelCase, unixToDate } from 'utils/converters'
import MessageOrigin from './MessageOrigin'
import { MessageOriginType } from 'utils/enums'
import User from './User'
import Base from './Base'
import Client from '../client/Client'

export default class MessageOriginUser extends Base implements MessageOrigin {
	/** Type of the message origin */
	type: MessageOriginType.User

	/** Date the message was sent originally */
	date: Date

	/** User that sent the message originally */
	senderUser: User

	constructor(client: Client, data: any) {
		super(client)
		this.type = toCamelCase(data.type)
		this.date = unixToDate(data.date)
		this.senderUser = new User(client, data.sender_user)
	}
}
