import Client from 'client/Client'
import { MessageEntityType } from '../../types'
import { toCamelCase } from '../utils/converters'
import User from './User'
import Base from './Base'

/** Represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export default class MessageEntity extends Base {
	/**
     * Type of the entity
     * @see {@link https://core.telegram.org/bots/api#messageentity}
     */
	type: MessageEntityType

	/** Offset in UTF-16 code units to the start of the entity */
	offset: number

	/** Length of the entity in UTF-16 code units */
	length: number

	/** For 'textLink' only, url that will be opened after user taps on the text */
	url?: string

	/** For 'textMention' only, the mentioned user */
	user?: User
    
	/** For 'pre' only, the programming language of the entity text */
	language?: string

	/** 
	 * For 'customEmoji' only, unique identifier of the custom emoji.
	 * Use `<Client>.getCustomEmojiStickers` to get full information about the sticker.
	 */
	customEmojiId?: string

	// TODO: make user-constructable
	constructor(client: Client, data: any) {
		super(client)

		this.type = data.type && toCamelCase(data.type)
		this.offset = data.offset
		this.length = data.length
		this.url = data.url
		this.user = data.user && new User(client, data.user)
		this.language = data.language
		this.customEmojiId = data.custom_emoji_id
	}

	toJSON(): object {
		return {
			type: this.type,
			offset: this.offset,
			length: this.length,
			url: this.url,
			user: this.user?.id,
			language: this.language,
			customEmojiId: this.customEmojiId
		}
	}
}