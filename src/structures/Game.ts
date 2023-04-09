import Client from '../client/Client'
import Animation from './Animation'
import Base from './Base'
import MessageEntity from './MessageEntity'
import PhotoSize from './PhotoSize'

export class Game extends Base {
	/** Title of the game */
	title: string

	/** Description of the game */
	description: string

	/** Photo that will be displayed in the game message in chats. */
	photo: PhotoSize[]

	/**
	 * Brief description of the game or high scores included in the game message.
	 * Can be automatically edited to include current high scores for the game
	 * when the bot calls `<Client>.setGameScore()`, or manually edited as a regular message.
	 * 0-4096 characters.
	 **/
	text?: string

	/** Special entities that appear in *text*, such as usernames, URLs, bot commands, etc. */
	textEntities?: MessageEntity[]

	/**
	 * Animation that will be displayed in the game message in chats.
	 * Upload via [BotFather](https://t.me/botfather).
	 */
	animation?: Animation


	constructor(client: Client, data: any) {
		super(client)

		this.title = data.title
		this.description = data.description
		this.photo = data.photo?.map(
			(photoSizeData: any) => new PhotoSize(client, photoSizeData)
		)
		this.text = data.text
		this.textEntities = data.textEntities?.map(
			(messageEntityData: any) => new MessageEntity(client, messageEntityData)
		)
		this.animation = data.animation ?? new Animation(client, data.animation)
	}
}