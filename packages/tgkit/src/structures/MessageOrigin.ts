import { toCamelCase } from 'utils/converters'
import Base from './Base'
import { MessageOriginType } from 'utils/enums'
import Client from 'client/Client'
import MessageOriginChannel from './MessageOriginChannel'
import MessageOriginChat from './MessageOriginChat'
import MessageOriginHiddenUser from './MessageOriginHiddenUser'
import MessageOriginUser from './MessageOriginUser'

export default abstract class MessageOrigin extends Base {
	/** Type of the message origin */
	abstract type: MessageOriginType

	/** Date the message was sent originally */
	abstract date: Date

	static from(client: Client, data: any) {
		const type = toCamelCase(data.type)

		if (type === MessageOriginType.Channel) {
			return new MessageOriginChannel(client, data)
		} else if (type === MessageOriginType.User) {
			return new MessageOriginUser(client, data)
		} else if (type === MessageOriginType.Chat) {
			return new MessageOriginChat(client, data)
		} else if (type === MessageOriginType.HiddenUser) {
			return new MessageOriginHiddenUser(client, data)
		}
	}
}