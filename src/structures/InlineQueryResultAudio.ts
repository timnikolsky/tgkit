import { InlineQueryResultAudioOptions, InputMessageContent } from '../../types'
import { InlineQueryResultType, ParseMode } from '../utils/enums'
import InlineKeyboardMarkup from './InlineKeyboardMarkup'
import InlineQueryResult from './InlineQueryResult'
import MessageEntity from './MessageEntity'

/** 
 * Represents a link to an MP3 audio file.
 * By default, this audio file will be sent by the user.
 * Alternatively, you can use *inputMessageContent* to send a message with the specified content instead of the audio.
 */
export default class InlineQueryResultAudio extends InlineQueryResult {
	/** A valid URL for the audio file */
	audioUrl: string

	/** Title */
	title: string

	/** Caption, 0-1024 characters after entities parsing */
	caption?: string

	/** 
	 * Mode for parsing entities in the audio caption. See formatting options for more details.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode

	/** List of special entities that appear in the caption, which can be specified instead of *parseMode* */
	captionEntities?: MessageEntity[]
	
	/** Performer */
	performer?: string
	
	/** Audio duration in seconds */
	audioDuration?: number
	
	/** Inline keyboard attached to the message */
	replyMarkup?: InlineKeyboardMarkup

	/** Content of the message to be sent */
	inputMessageContent?: InputMessageContent

	constructor(id: string, options: InlineQueryResultAudioOptions) {
		super(InlineQueryResultType.Article, id)

		this.audioUrl = options.audioUrl
		this.title = options.title
		this.caption = options.caption
		this.parseMode = options.parseMode
		this.captionEntities = options.captionEntities
		this.performer = options.performer
		this.audioDuration = options.audioDuration
		this.replyMarkup = options.replyMarkup
		this.inputMessageContent = options.inputMessageContent
	}

	toJSON(): object {
		return {
			type: this.type,
			id: this.id,
			audio_url: this.audioUrl,
			title: this.title,
			caption: this.caption,
			parse_mode: this.parseMode,
			caption_entities: this.captionEntities?.map((e) => e.toJSON()),
			performer: this.performer,
			audio_duration: this.audioDuration,
			reply_markup: this.replyMarkup?.toJSON(),
			input_message_content: this.inputMessageContent
		}
	}
}