import Client from '../client/Client'
import Base from './Base'

/** Represents a forum topic. */
export default class ForumTopic extends Base {
	/** Unique identifier of the forum topic */
	id: number

	/** Name of the topic */
	name: string

	/** Color of the topic icon in RGB format */
	iconColor: number

	/** Unique identifier of the custom emoji shown as the topic icon */
	iconCustomEmojiId?: string

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.message_thread_id
		this.name = data.name
		this.iconColor = data.icon_color
		this.iconCustomEmojiId = data.icon_custom_emoji_id
	}
}