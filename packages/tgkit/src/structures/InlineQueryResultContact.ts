// import { InlineQueryResultContactOptions, InputMessageContent } from '../../types'
// import { InlineQueryResultType } from '../utils/enums'
// import InlineKeyboardMarkup from './InlineKeyboardMarkup'
// import InlineQueryResult from './InlineQueryResult'

// /** 
//  * Represents a contact with a phone number.
//  * By default, this audio file will be sent by the user.
//  * Alternatively, you can use *inputMessageContent*
//  * to send a message with the specified content instead of the contact.
//  */
// export default class InlineQueryResultContact extends InlineQueryResult {
// 	/** Contact's phone number */
// 	phoneNumber: string

// 	/** Contact's first name */
// 	firstName: string

// 	/** Contact's last name */
// 	lastName?: string

// 	/**
//      * Additional data about the contact in the form of a vCard
//      * @see {@link https://en.wikipedia.org/wiki/VCard}
//      */
// 	vcard?: string

// 	/** Inline keyboard attached to the message */
// 	replyMarkup?: InlineKeyboardMarkup

// 	/** Content of the message to be sent */
// 	inputMessageContent?: InputMessageContent

// 	/** Url of the thumbnail for the result */
// 	thumbnailUrl?: string

// 	/** Thumbnail width */
// 	thumbnailWidth?: number

// 	/** Thumbnail height */
// 	thumbnailHeight?: number


// 	constructor(id: string, options: InlineQueryResultContactOptions) {
// 		super(InlineQueryResultType.Article, id)

// 		this.phoneNumber = options.phoneNumber
// 		this.firstName = options.tifirstNametle
// 		this.lastName = options.lastName
// 		this.vcard = options.vcard
// 		this.replyMarkup = options.replyMarkup
// 		this.inputMessageContent = options.inputMessageContent
// 		this.thumbnailUrl = options.thumbnailUrl
// 		this.thumbnailWidth = options.thumbnailWidth
// 		this.thumbnailHeight = options.thumbnailHeight
// 	}

// 	toJSON(): object {
// 		return {
// 			type: this.type,
// 			id: this.id,
// 			audio_url: this.phoneNumber,
// 			title: this.firstName,
// 			caption: this.lastName,
// 			parse_mode: this.parseMode,
// 			caption_entities: this.captionEntities?.map((e) => e.toJSON()),
// 			performer: this.performer,
// 			audio_duration: this.audioDuration,
// 			reply_markup: this.replyMarkup?.toJSON(),
// 			input_message_content: this.inputMessageContent
// 		}
// 	}
// }