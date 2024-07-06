import Giveaway from 'structures/Giveaway'
import {
	BotCommandScopeType,
	CallbackQuery,
	Chat,
	Client,
	ForumTopicIconColor,
	InlineKeyboardButton,
	InlineKeyboardMarkup,
	KeyboardButtonPollType,
	Message,
	MessageEntity,
	MessageOrigin,
	ParseMode,
	PassportElementErrorSource,
	PassportElementType,
	PhotoSize,
	PollType,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
	StickerFormat,
	StickerType,
	User,
	Audio,
	Document,
	Animation,
	Sticker,
	Story,
	Video,
	VideoNote,
	Voice,
	Contact,
	Dice,
	Game,
	Location,
	Poll,
	Venue,
	ReactionType,
	InlineQuery,
	PollAnswer
} from '../src/'
import Invoice from 'structures/Invoice'
import PaidMedia from 'structures/PaidMedia'
import StarTransaction from 'structures/StarTransaction'
import PreCheckoutQuery from 'structures/PreCheckoutQuery'
import BusinessConnection from 'structures/BusinessConnection'

export type ChatType = 'private' | 'group' | 'supergroup' | 'channel'

export type MessageEntityType =
	| 'mention'
	| 'hashtag'
	| 'cashtag'
	| 'botCommand'
	| 'url'
	| 'email'
	| 'phoneNumber'
	| 'bold'
	| 'italic'
	| 'underline'
	| 'strikethrough'
	| 'spoiler'
	| 'code'
	| 'pre'
	| 'textLink'
	| 'textMention'
	| 'customEmoji'

export type Currency =
	| 'AED'
	| 'AFN'
	| 'ALL'
	| 'AMD'
	| 'ARS'
	| 'AUD'
	| 'AZN'
	| 'BAM'
	| 'BDT'
	| 'BGN'
	| 'BND'
	| 'BOB'
	| 'BRL'
	| 'BYN'
	| 'CAD'
	| 'CHF'
	| 'CLP'
	| 'CNY'
	| 'COP'
	| 'CRC'
	| 'CZK'
	| 'DKK'
	| 'DOP'
	| 'DZD'
	| 'EGP'
	| 'ETB'
	| 'EUR'
	| 'GBP'
	| 'GEL'
	| 'GTQ'
	| 'HKD'
	| 'HNL'
	| 'HRK'
	| 'HUF'
	| 'IDR'
	| 'ILS'
	| 'INR'
	| 'ISK'
	| 'JMD'
	| 'JPY'
	| 'KES'
	| 'KGS'
	| 'KRW'
	| 'KZT'
	| 'LBP'
	| 'LKR'
	| 'MAD'
	| 'MDL'
	| 'MMK'
	| 'MNT'
	| 'MOP'
	| 'MUR'
	| 'MVR'
	| 'MXN'
	| 'MYR'
	| 'MZN'
	| 'NGN'
	| 'NIO'
	| 'NOK'
	| 'NPR'
	| 'NZD'
	| 'PAB'
	| 'PEN'
	| 'PHP'
	| 'PKR'
	| 'PLN'
	| 'PYG'
	| 'QAR'
	| 'RON'
	| 'RSD'
	| 'RUB'
	| 'SAR'
	| 'SEK'
	| 'SGD'
	| 'THB'
	| 'TJS'
	| 'TRY'
	| 'TTD'
	| 'TWD'
	| 'TZS'
	| 'UAH'
	| 'UGX'
	| 'USD'
	| 'UYU'
	| 'UZS'
	| 'VND'
	| 'YER'
	| 'ZAR'
	| 'XTR'
	// https://github.com/microsoft/TypeScript/issues/29729
	| (string & {
		TYPE_HELPER_IGNORE?: never
	})

export type DiceEmoji = '🎲' | '🎯' | '🏀' | '⚽' | '🎳' | '🎰'

export type ChatId = number | `@${string}` | `${number}`

// TODO: Make it possible to send local files
export type InputFile = string

export interface ClientOptions {
	token?: string
	polling?: PollingOptions
	webhook?: WebhookOptions
	baseApiUrl?: string
}

export interface PollingOptions {
	timeout: number
}

export interface WebhookOptions {
	url: string
}

export interface LoginUrl {
	/**
	 * An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. 
	 * If the user refuses to provide authorization data, the original URL without information about the user 
	 * will be opened. The data added is the same as described in
	 * [Receiving authorization data](https://core.telegram.org/widgets/login#receiving-authorization-data).
	 *
	 * NOTE: You must always check the hash of the received data to verify the authentication and the integrity
	 * of the data as described in
	 * [Checking authorization](https://core.telegram.org/widgets/login#checking-authorization).
	 */
	url: string,
	/** New text of the button in forwarded messages. */
	forwardText: string
	/**
	 * Username of a bot, which will be used for user authorization. See Setting up a bot for more details.
	 * If not specified, the current bot's username will be assumed.
	 * The url's domain must be the same as the domain linked with the bot.
	 * @see {@link https://core.telegram.org/widgets/login#linking-your-domain-to-the-bot}
	 */
	botUsername?: string,
	/** Pass *true* to request the permission for your bot to send messages to the user. */
	requestWriteAccess?: boolean
}

export interface ChatPhoto {
	smallFileId: string
	smallFileUniqueId: string
	bigFileId: string
	bigFileUniqueId: string
}

export interface MaskPosition {
	/** The part of the face relative to which the mask should be placed. */
	point: 'forehead' | 'eyes' | 'mouth' | 'chin'
	/**
	 * Shift by X-axis measured in widths of the mask scaled to the face size, from left to right.
	 * For example, choosing -1 will place mask just to the left of the default mask position. 
	 */
	xShift: number
	/** 
	 * Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. 
	 * For example, 1 will place the mask just below the default mask position. 
	 */
	yShift: number
	/** Mask scaling coefficient. For example, 2 means double size. */
	scale: number
}

export interface ChatPermissions {
	/** *true*, if the user is allowed to send text messages, contacts, locations and venues */
	canSendMessages?: boolean
	/** 
	 * *true*, if the user is allowed to send audios, documents, photos, videos,
	 * video notes and voice notes, implies canSendMessages
	 */
	canSendMediaMessages?: boolean
	/** *true*, if the user is allowed to send polls, implies canSendMessages */
	canSendPolls?: boolean
	/**
	 * *true*, if the user is allowed to send animations, games,
	 * stickers and use inline bots, implies canSendMediaMessages
	 */
	canSendOtherMessages?: boolean
	/** *true*, if the user is allowed to add web page previews to their messages, implies canSendMediaMessages */
	canAddWebPagePreviews?: boolean
	/** 
	 * *true*, if the user is allowed to change the chat title, 
	 * photo and other settings. Ignored in public supergroups
	 */
	canChangeInfo?: boolean
	/** *true*, if the user is allowed to invite new users to the chat */
	canInviteUsers?: boolean
	/** *true*, if the user is allowed to pin messages. Ignored in public supergroups */
	canPinMessages?: boolean
	/** *true*, if the user is allowed to create forum topics. If omitted defaults to the value of can_pin_messages */
	canManageTopics?: boolean
}

export interface TextMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	entities?: MessageEntity[]
	/** Disables link previews for links in this message */
	disableWebPagePreview?: boolean
	/** 
	 * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove
	// | ForceReply
}

export interface PhotoMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Photo caption, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	captionEntities?: MessageEntity[]
	/** Pass *true* if the photo needs to be covered with a spoiler animation */
	hasSpoiler?: boolean
	/** Disables link previews for links in this message */
	disableWebPagePreview?: boolean
	/**
	 * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/** 
	 * Additional export interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, 
	 * instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface AudioMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Audio caption, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	captionEntities?: MessageEntity[]
	/** Duration of the audio in seconds */
	duration?: number
	/** Performer */
	performer?: string
	/** Track name */
	title?: string
	/** 
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass “attach://<file_attach_name>” if the thumbnail
	 * was uploaded using multipart/form-dataunder <file_attach_name>.
	 */
	thumbnail?: InputFile
	/** Disables link previews for links in this message */
	disableWebPagePreview?: boolean
	/** Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface DocumentMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	// TODO: fix description
	/** 
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass “attach://<file_attach_name>” if the thumbnail
	 * was uploaded using multipart/form-dataunder <file_attach_name>.
	 */
	thumbnail?: InputFile
	/** Document caption, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	captionEntities?: MessageEntity[]
	/** Disables link previews for links in this message */
	disableWebPagePreview?: boolean
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface VideoMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Duration of sent video in seconds */
	duration?: number
	/** Video width */
	width?: number
	/** Video height */
	height?: number
	/** 
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass “attach://<file_attach_name>” if the thumbnail
	 * was uploaded using multipart/form-dataunder <file_attach_name>.
	 */
	thumbnail?: InputFile
	/** Video caption, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	captionEntities?: MessageEntity[]
	/** Pass *true* if the video needs to be covered with a spoiler animation */
	hasSpoiler?: boolean
	/** Pass true if the uploaded video is suitable for streaming */
	supportsStreaming?: boolean
	/** Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface AnimationMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Duration of sent animation in seconds */
	duration?: number
	/** Animation width */
	width?: number
	/** Animation height */
	height?: number
	/** 
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass “attach://<file_attach_name>” if the thumbnail
	 * was uploaded using multipart/form-dataunder <file_attach_name>.
	 */
	thumbnail?: InputFile
	/** Animation caption, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	captionEntities?: MessageEntity[]
	/** Pass *true* if the animation needs to be covered with a spoiler animation */
	hasSpoiler?: boolean
	/** 
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface VoiceMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Voice caption, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of parse_mode */
	captionEntities?: MessageEntity[]
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages)
	 *  Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface VideoNoteMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Duration of sent video in seconds */
	duration?: number
	/** 
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
	 * The thumbnail should be in JPEG format and less than 200 kB in size.
	 * A thumbnail's width and height should not exceed 320.
	 * Ignored if the file is not uploaded using multipart/form-data.
	 * Thumbnails can't be reused and can be only uploaded as a new file,
	 * so you can pass “attach://<file_attach_name>” if the thumbnail
	 * was uploaded using multipart/form-dataunder <file_attach_name>.
	 */
	thumbnail?: InputFile
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options.A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface LocationMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontalAccuracy?: number
	/** Period in seconds for which the location will be updated, should be between 60 and 86400 */
	livePeriod?: number
	/**
	 * For live locations, a direction in which the user is moving, in degrees.
	 * Must be between 1 and 360 if specified.
	 */
	heading?: number
	/**
	 * For live locations, a maximum distance for proximity alerts about approaching another chat member,
	 * in meters. Must be between 1 and 100_000 if specified.
	 */
	proximityAlertRadius?: number
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface VenueOptions {
	/** Latitude of the venue */
	latitude: number
	/** Longitude of the venue */
	longitude: number
	/** Name of the venue */
	title: string
	/** Address of the venue */
	address: string
}

export interface VenueMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Foursquare identifier of the venue */
	foursquareId?: string
	/**
	 * Foursquare type of the venue, if known.
	 * (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
	 */
	foursquareType?: string
	/** Google Places identifier of the venue */
	googlePlaceId?: string
	/**
	 * Google Places type of the venue
	 * @see {@link https://developers.google.com/places/web-service/supported_types}
	 */
	googlePlaceType?: string
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface ContactOptions {
	/** Contact's phone number */
	phoneNumber: string
	/** Contact's first name */
	firstName: string
	/** Contact's last name */
	lastName?: string
	/** Additional data about the contact in the form of a vCard, 0-2048 bytes */
	vcard?: string
}

export interface ContactMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/**
	 * Additional data about the contact in the form of a vCard, 0-2048 bytes
	 * @see {@link https://en.wikipedia.org/wiki/VCard}
	 */
	vcard?: string
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface PollOptions {
	/** Poll question, 1-255 characters */
	question: string
	/** List of poll options, 2-10 strings 1-100 characters each */
	options: string[]
}

export interface PollMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** *true*, if the poll needs to be anonymous, defaults to *true* */
	isAnonymous?: boolean
	/** Poll type, 'quiz' or 'regular', defaults to 'regular' */
	type?: PollType
	/** *true*, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to false */
	allowsMultipleAnswers?: boolean
	/** 0-based identifier of the correct answer option, required for polls in quiz mode */
	correctOptionId?: number
	/**
	 * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll,
	 * 0-200 characters with at most 2 line feeds after entities parsing
	 */
	explanation?: string
	/**
	 * Mode for parsing entities in the explanation
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	explanationParseMode?: ParseMode
	/** List of special entities that appear in the poll explanation, which can be specified instead of parseMode */
	explanationEntities?: MessageEntity[]
	/**
	 * Amount of time in seconds the poll will be active after creation, 5-600.
	 * Can't be used together with `closeDate`.
	 */
	openPeriod?: number
	/**
	 * Point in time when the poll will be automatically closed.
	 * Must be at least 5 and no more than 600 seconds in the future. Can't be used together with `openPeriod`.
	 */
	closeDate?: Date
	/** Pass *true* if the poll needs to be immediately closed. This can be useful for poll preview. */
	isClosed?: boolean
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard,
	 * instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface DiceMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/**
	 * Sends the message
	 * [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options.
	 * A JSON-serialized object for an inline keyboard, custom reply keyboard
	 *  instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove // | ForceReply
}

export interface MediaGroupMessageSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound. */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
}

export interface UserProfilePhotosGetOptions {
	/** Sequential number of the first photo to be returned. By default, all photos are returned. */
	offset?: number
	/** Limits the number of photos to be retrieved. Values between 1—100 are accepted. Defaults to 100. */
	limit?: number
}

export interface MessageForwardOptions {
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	/** Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound. */
	disableNotification?: boolean
	/** Protects the contents of the forwarded message from forwarding and saving */
	protectContent?: boolean
}

export interface MessageCopyOptions {
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
	caption?: string
	parseMode?: ParseMode
	captionEntities?: MessageEntity[]
	disableNotification?: boolean
	protectContent?: boolean
	replyToMessageId?: number
	allowSendingWithoutReply?: boolean
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove
	// | ForceReply
}

export interface ChatActionSendOptions {
	/** Unique identifier of the business connection on behalf of which the message will be sent */
	businessConnectionId?: string
	/** Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
	forumTopicId?: number
}

export interface WebAppInfo {
	/** An HTTPS URL of a Web App to be opened with additional data */
	url: string
}

export interface ClientEvents {
	raw: [data: any],
	ready: [client: Client],
	message: [message: Message],
	messageEdit: [message: Message],
	channelPost: [message: Message],
	channelPostEdit: [message: Message],
	businessConnection: [businessConnection: BusinessConnection],
	businessMessage: [message: Message],
	businessMessageEdit: [message: Message],
	// TODO
	businessMessagesDelete: [businessMessagesDelete: any],
	// TODO
	messageReaction: [messageReactionUpdated: any],
	// TODO
	messageReactionCount: [messageReactionCountUpdated: any],
	inlineQuery: [inlineQuery: InlineQuery],
	// TODO
	chosenInlineResult: [chosenInlineResult: any],
	callbackQuery: [callbackQuery: CallbackQuery],
	// TODO
	shippingQuery: [shippingQuery: any],
	preCheckoutQuery: [preCheckoutQuery: PreCheckoutQuery],
	poll: [poll: Poll],
	pollAnswer: [pollAnswer: PollAnswer],
	// TODO
	chatMeUpdate: [chatMemberUpdated: any],
	// TODO
	chatMemberUpdate: [chatMemberUpdated: any],
	// TODO
	chatJoinRequest: [chatJoinRequest: any],
	// TODO
	chatBoost: [chatBoostUpdated: any],
	// TODO
	chatBoostRemove: [ChatBoostRemove: any]
}

export interface KeyboardButtonData {
	/**
	 * Text of the button.
	 * If none of the optional fields are used, it will be sent as a message when the button is pressed
	 */
	text: string
	/** If specified, pressing the button will open a list of suitable users */
	requestUser?: KeyboardButtonRequestUser
	/** If specified, pressing the button will open a list of suitable chats */
	requestChat?: KeyboardButtonRequestChat
	/**
	 * If *true*, the user's phone number will be sent as a contact when the button is pressed.
	 * Available in private chats only.
	 */
	requestContact?: boolean
	/**
	 * If *true*, the user's current location will be sent when the button is pressed.
	 * Available in private chats only
	 */
	requestLocation?: boolean
	/**
	 * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed.
	 * Available in private chats only
	 */
	requestPoll?: KeyboardButtonPollType
	/**
	 * If specified, the described Web App will be launched when the button is pressed.
	 * Available in private chats only.
	 */
	webApp?: WebAppInfo
}

export interface ReplyKeyboardMarkupData {
	/** Array of button rows, each represented by an Array of {@link KeyboardButton} */
	keyboard?: KeyboardButtonData[][]
	/**
	 * Requests clients to always show the keyboard when the regular keyboard is hidden.
	 * Defaults to false, in which case the custom keyboard can be hidden and opened with a keyboard icon.
	 */
	isPersistent?: boolean
	/**
	 * Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller 
	 * if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always
	 * of the same height as the app's standard keyboard.
	 */
	resizeKeyboard?: boolean
	/**
	 * Requests clients to hide the keyboard as soon as it's been used.
	 * The keyboard will still be available, but clients will automatically display the usual letter-keyboard
	 * in the chat - the user can press a special button in the input field to see the custom keyboard again.
	 * Defaults to false.
	 */
	oneTimeKeyboard?: boolean
	/** The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
	inputFieldPlaceholder?: string
	/**
	 * Use this parameter if you want to show the keyboard to specific users only. Targets:
	 * 1. users that are mentioned in the text of the Message object;
	 * 2. if the bot's message is a reply (has reply_to_message_id), sender of the original message.
	 */
	selective?: boolean
}

export interface ReplyKeyboardRemoveData {
	/** 
	 * Use this parameter if you want to remove the keyboard for specific users only. Targets:
	 * 1. users that are mentioned in the text of the Message object;
	 * 2. if the bot's message is a reply (has reply_to_message_id), sender of the original message.
	 */
	selective?: boolean
}

export interface CallbackQueryAnswerOptions {
	/** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters */
	text?: string
	/**
	 * If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults
	 * to false.
	 */
	showAlert?: boolean
	/**
	 * URL that will be opened by the user's client. If you have created a Game and accepted the conditions
	 * via [@Botfather](https://t.me/BotFather), specify the URL that opens your game — note that this will only work if 
	 * the query comes from a `callbackGame` button. Otherwise, you may use links like `t.me/your_bot?start=XXXX` that
	 * open your bot with a parameter.
	 */
	url?: string
	/**
	 * The maximum amount of time in seconds that the result of the callback query may be cached client-side.
	 * Telegram apps will support caching starting in version 3.14. Defaults to 0.
	 */
	cacheTime?: number
}

export interface InlineKeyboardMarkupData {
	inlineKeyboard?: InlineKeyboardButton[][]
}

export interface InlineKeyboardButtonData {
	text: string
	url?: string
	loginUrl?: LoginUrl,
	callbackData?: string
	webApp?: WebAppInfo
	switchInlineQuery?: string
	switchInlineQueryCurrentChat?: string
	// callbackGame?: CallbackGame,
	pay?: boolean
}

export interface UserProfilePhotos {
	/** Total number of profile pictures the target user has */
	totalCount: number
	/** Requested profile pictures (in up to 4 sizes each) */
	photos: PhotoSize[][]
}

export interface ChatMemberBanOptions {
	/**
	 * Date when the user will be unbanned.
	 * If user is banned for more than 366 days or less than 30 seconds from the current time,
	 * they are considered to be banned forever
	 */
	untilDate?: Date
	/**
	 * Pass *true* to delete all messages from the chat for the user that is being removed.
	 * If *false*, the user will be able to see messages in the group that were sent before the user was removed.
	 * Always *true* for supergroups and channels.
	 */
	revokeMessages?: boolean
}

export interface ChatMemberUnbanOptions {
	/** Do nothing if the user is not banned */
	onlyIfBanned?: boolean
}

export interface ChatMemberRestrictOptions {
	/**
	 * Date when restrictions will be lifted for the user, unix time.
	 * If user is restricted for more than 366 days or less than 30 seconds from the current time,
	 * they are considered to be restricted forever
	 */
	untilDate?: Date
}

export interface ChatMemberPromoteOptions {
	/** Pass *true* if the administrator's presence in the chat is hidden */
	isAnonymous?: boolean
	/**
	 * Pass *true* if the administrator can access the chat event log, chat statistics, message statistics in channels,
	 * see channel members, see anonymous administrators in supergroups and ignore slow mode.
	 * Implied by any other administrator privilege
	 */
	canManageChat?: boolean
	/** Pass *true* if the administrator can create channel posts, channels only */
	canPostMessages?: boolean
	/** Pass *true* if the administrator can edit messages of other users and can pin messages, channels only */
	canEditMessages?: boolean
	/** Pass *true* if the administrator can delete messages of other users */
	canDeleteMessages?: boolean
	/** Pass *true* if the administrator can manage video chats */
	canManageVideoChats?: boolean
	/** Pass *true* if the administrator can restrict, ban or unban chat members */
	canRestrictMembers?: boolean
	/**
	 * Pass *true* if the administrator can add new administrators with a subset of their own privileges
	 * or demote administrators that he has promoted, directly or indirectly
	 * (promoted by administrators that were appointed by him)
	 */
	canPromoteMembers?: boolean
	/** Pass *true* if the administrator can change chat title, photo and other settings */
	canChangeInfo?: boolean
	/** Pass *true* if the administrator can invite new users to the chat */
	canInviteUsers?: boolean
	/** Pass *true* if the administrator can pin messages, supergroups only */
	canPinMessages?: boolean
	/** Pass *true* if the user is allowed to create, rename, close, and reopen forum topics, supergroups only */
	canManageTopics?: boolean
}

export interface ChatInviteLinkCreateOptions {
	/** Invite link name; 0-32 characters */
	name?: string
	/** Point in time when the link will expire */
	expireDate?: Date
	/**
	 * The maximum number of users that can be members of the chat simultaneously
	 * after joining the chat via this invite link; 1-99999
	 */
	memberLimit?: number
	/**
	 * *true*, if users joining the chat via the link need to be approved by chat administrators.
	 * If *true*, memberLimit can't be specified
	 */
	createsJoinRequest?: boolean
}

export interface ChatInviteLinkEditOptions {
	/** Invite link name; 0-32 characters */
	name?: string
	/** Point in time when the link will expire */
	expireDate?: Date
	/**
	 * The maximum number of users that can be members of the chat simultaneously
	 * after joining the chat via this invite link; 1-99999
	 */
	memberLimit?: number
	/**
	 * *true*, if users joining the chat via the link need to be approved by chat administrators.
	 * If *true*, memberLimit can't be specified
	 */
	createsJoinRequest?: boolean
}

export interface ChatMessagePinOptions {
	/**
	 * Pass *true* if it is not necessary to send a notification to all chat members about the new pinned message.
	 * Notifications are always disabled in channels and private chats.
	 */
	disableNotification?: boolean
}

export interface MyCommandsSetOptions {
	/** Object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault */
	scope?: BotCommandScope
	/**
	 * A two-letter ISO 639-1 language code.
	 * If empty, commands will be applied to all users from the given scope,
	 * for whose language there are no dedicated commands
	 */
	languageCode?: string
}

export interface MyCommandsDeleteOptions {
	/** Object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault */
	scope?: BotCommandScope
	/**
	 * A two-letter ISO 639-1 language code.
	 * If empty, commands will be applied to all users from the given scope,
	 * for whose language there are no dedicated commands
	 */
	languageCode?: string
}

export interface MyCommandsGetOptions {
	/** A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault. */
	scope?: BotCommandScope
	/** A two-letter ISO 639-1 language code */
	languageCode?: string
}

export interface ChatAdministratorRights {
	/** *true*, if the user's presence in the chat is hidden */
	isAnonymous?: boolean
	/**
	 * *true*, if the administrator can access the chat event log, chat statistics, message statistics in channels,
	 * see channel members, see anonymous administrators in supergroups and ignore slow mode.
	 * Implied by any other administrator privilege
	 */
	canManageChat?: boolean
	/** *true*, if the administrator can delete messages of other users */
	canDeleteMessages?: boolean
	/** *true*, if the administrator can manage video chats */
	canManageVideoChats?: boolean
	/** *true*, if the administrator can restrict, ban or unban chat members */
	canRestrictMembers?: boolean
	/**
	 * *true*, if the administrator can add new administrators with a subset of their own privileges
	 * or demote administrators that he has promoted, directly or indirectly
	 * (promoted by administrators that were appointed by the user)
	 */
	canPromoteMembers?: boolean
	/** *true*, if the user is allowed to change the chat title, photo and other settings */
	canChangeInfo?: boolean
	/** *true*, if the user is allowed to invite new users to the chat */
	canInviteUsers?: boolean
	/** *true*, if the administrator can post in the channel; channels only */
	canPostMessages?: boolean
	/** *true*, if the administrator can edit messages of other users and can pin messages; channels only */
	canEditMessages?: boolean
	/** *true*, if the user is allowed to pin messages; groups and supergroups only */
	canPinMessages?: boolean
	/** *true*, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
	canManageTopics?: boolean
}

export interface MyDefaultAdministratorRightsSetOptions {
	/**
	 * Pass true to change the default administrator rights of the bot in channels.
	 * Otherwise, the default administrator rights of the bot for groups and supergroups will be changed.
	 */
	forChannels?: boolean
}

export interface MessageEditTextOptions {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	businessConnectionId?: string
	/** Mode for parsing entities in the message text */
	parseMode: ParseMode
	/** A list of special entities that appear in message text, which can be specified instead of parseMode */
	entities?: MessageEntity[]
	/** Disables link previews for links in this message */
	disableWebPagePreview?: boolean
	/** An object for an inline keyboard */
	replyMarkup?: InlineKeyboardMarkup
}

export interface MessageEditCaptionOptions {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	businessConnectionId?: string
	/** Mode for parsing entities in the message caption */
	parseMode?: ParseMode
	/** A list of special entities that appear in the caption, which can be specified instead of parseMode */
	entities?: MessageEntity[]
	/** An object for an inline keyboard */
	replyMarkup?: InlineKeyboardMarkup
}

export interface MessageEditMediaOptions {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	businessConnectionId?: string
	/** An object for an inline keyboard */
	replyMarkup?: InlineKeyboardMarkup
}

export interface PollStopOptions {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	businessConnectionId?: string
	/** An object for a new message inline keyboard */
	replyMarkup?: InlineKeyboardMarkup
}

export interface StickerSendOptions {
	/** Emoji associated with the sticker; only for just uploaded stickers */
	emoji?: string
	/** Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound. */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass true if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * Additional export interface options. A JSON-serialized object for an inline keyboard,
	 * custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user.
	 */
	replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove
	// | ForceReply
}

export interface BotCommandScopeDefault {
	/** Scope type */
	type: BotCommandScopeType.Default
}

export interface BotCommandScopeAllPrivateChats {
	/** Scope type */
	type: BotCommandScopeType.AllPrivateChats
}

export interface BotCommandScopeAllGroupChats {
	/** Scope type */
	type: BotCommandScopeType.AllGroupChats
}

export interface BotCommandScopeAllChatAdministrators {
	/** Scope type */
	type: BotCommandScopeType.AllChatAdministrators
}

export interface BotCommandScopeChat {
	/** Scope type */
	type: BotCommandScopeType.Chat
	chatId: number | string
}

export interface BotCommandScopeChatAdministrators {
	/** Scope type */
	type: BotCommandScopeType.ChatAdministrators
	chatId: number | string
}

export interface BotCommandScopeChatMember {
	/** Scope type */
	type: BotCommandScopeType.ChatMember
	chatId: ChatId
	userId: number
}

export interface InvoiceSendOptions {
	/** Product name, 1-32 characters */
	title: string
	/** Product description, 1-255 characters */
	description: string
	/**
	 * Bot-defined invoice payload, 1-128 bytes.
	 * This will not be displayed to the user, use for your internal processes.
	 */
	payload: string
	/** Payments provider token, obtained via [@BotFather](https://t.me/botfather) */
	providerToken: string
	/**
	 * Three-letter ISO 4217 currency code
	 * @see https://core.telegram.org/bots/payments#supported-currencies
	 */
	currency: string
	/**
	 * Price breakdown, a list of components
	 * (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
	 */
	prices: LabeledPrice[]
	/** The maximum accepted amount for tips in the *smallest units* of the currency (integer, **not** float). For example, for a maximum tip of `US$ 1.45` pass `maxTipAmount: 145`. See the *exp* parameter in [currencieson](https://core.telegram.org/bots/payments/currencieson), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. */
	maxTipAmount?: number
	/**
	 * An array of suggested amounts of tip in the *smallest units* of the currency (integer, **not** float).
	 * At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive,
	 * passed in a strictly increased order and must not exceed  *maxTipAmount*.
	 */
	suggestedTipAmounts?: number[]
	/**
	 * Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a *Pay* button,
	 * allowing multiple users to pay directly from the forwarded message, using the same invoice.
	 * If non-empty, forwarded copies of the sent message will have a *URL* button with a deep link to the bot
	 * (instead of a *Pay* button), with the value used as the start parameter
	 */
	startParameter?: string
	/**
	 * JSON-serialized data about the invoice, which will be shared with the payment provider.
	 * A detailed description of required fields should be provided by the payment provider.
	 */
	providerData?: string
	/**
	 * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
	 * People like it better when they see what they are paying for.
	 */
	photoUrl?: string
	/** Photo size in bytes */
	photoSize?: number
	/** Photo width */
	photoWidth?: number
	/** Photo height */
	photoHeight?: number
	/** Pass *true*, if you require the user's full name to complete the order */
	needName?: boolean
	/** Pass *true*, if you require the user's phone number to complete the order */
	needPhoneNumber?: boolean
	/** Pass *true*, if you require the user's email address to complete the order */
	needEmail?: boolean
	/** Pass *true*, if you require the user's shipping address to complete the order */
	needShippingAddress?: boolean
	/** Pass *true*, if user's phone number should be sent to provider */
	sendPhoneNumberToProvider?: boolean
	/** Pass *true*, if user's email address should be sent to provider */
	sendEmailToProvider?: boolean
	/** Pass *true*, if the final price depends on the shipping method */
	isFlexible?: boolean
	/**
	 * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass *true* if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * An object for an
	 * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
	 * If empty, one 'Pay `total price`' button will be shown. If not empty, the first button must be a Pay button.
	 */
	replyMarkup?: InlineKeyboardMarkup
}

export interface InvoiceLinkCreateOptions {
	/** Product name, 1-32 characters */
	title: string
	/** Product description, 1-255 characters */
	description: string
	/**
	 * Bot-defined invoice payload, 1-128 bytes.
	 * This will not be displayed to the user, use for your internal processes.
	 */
	payload: string
	/** Payments provider token, obtained via [@BotFather](https://t.me/botfather) */
	providerToken: string
	/**
	 * Three-letter ISO 4217 currency code
	 * @see https://core.telegram.org/bots/payments#supported-currencies
	 */
	currency: string
	/**
	 * Price breakdown, a list of components
	 * (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
	 */
	prices: LabeledPrice[]
	/** The maximum accepted amount for tips in the *smallest units* of the currency (integer, **not** float). For example, for a maximum tip of `US$ 1.45` pass `maxTipAmount: 145`. See the *exp* parameter in [currencieson](https://core.telegram.org/bots/payments/currencieson), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. */
	maxTipAmount?: number
	/**
	 * An array of suggested amounts of tip in the *smallest units* of the currency (integer, **not** float).
	 * At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive,
	 * passed in a strictly increased order and must not exceed *maxTipAmount*.
	 */
	suggestedTipAmounts?: number[]
	/**
	 * JSON-serialized data about the invoice, which will be shared with the payment provider.
	 * A detailed description of required fields should be provided by the payment provider.
	 */
	providerData?: string
	/**
	 * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
	 * People like it better when they see what they are paying for.
	 * */
	photoUrl?: string
	/** Photo size in bytes */
	photoSize?: number
	/** Photo width */
	photoWidth?: number
	/** Photo height */
	photoHeight?: number
	/** Pass *true*, if you require the user's full name to complete the order */
	needName?: boolean
	/** Pass *true*, if you require the user's phone number to complete the order */
	needPhoneNumber?: boolean
	/** Pass *true*, if you require the user's email address to complete the order */
	needEmail?: boolean
	/** Pass *true*, if you require the user's shipping address to complete the order */
	needShippingAddress?: boolean
	/** Pass *true*, if user's phone number should be sent to provider */
	sendPhoneNumberToProvider?: boolean
	/** Pass *true*, if user's email address should be sent to provider */
	sendEmailToProvider?: boolean
	/** Pass *true*, if the final price depends on the shipping method */
	isFlexible?: boolean
}

export interface ShippingQueryAnswerOptions {
	/** Required if *ok* is *true*. An array of available shipping options */
	shippingOptions?: ShippingOption[]
	/**
	 * Required if *ok* is *false*.Error message in human readable form that explains
	 * why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable').
	 * Telegram will display this message to the user.
	 */
	errorMessage?: string
}

export interface ShippingOption {
	id: string
	title: string
	prices: LabeledPrice[]
}

export interface LabeledPrice {
	/** Portion label */
	label: string
	/** Price of the product in the smallest units of the [currency](https://core.telegram.org/bots/payments#supported-currencies) (integer, **not** float). For example, for a price of `US$ 1.45` pass `amount: 145`. See the *exp* parameter in [currencieson](https://core.telegram.org/bots/payments/currencieson), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
	amount: number
}

export interface PreCheckoutQueryAnswerOptions {
	errorMessage: string
}

export interface InputSticker {
	/**
	 * The added sticker.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	sticker: InputFile | string
	/** List of 1-20 emoji associated with the sticker */
	emojiList: string[]
	/** Position where the mask should be placed on faces. For mask” stickers only. */
	maskPosition?: MaskPosition
	/**
	 * List of 0-20 search keywords for the sticker with total length of up to 64 characters.
	 * For regular and customEmoji stickers only.
	 */
	keywords?: string[]
}

export interface StickerSetCreateOptions {
	/** User identifier of created sticker set owner */
	userId: number
	/**
	 * Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., *animals*).
	 * Can contain only English letters, digits and underscores.
	 * Must begin with a letter, can't contain consecutive underscores and must end in `"_by_<bot_username>"`.
	 * `<bot_username>` is case insensitive. 1-64 characters.
	 */
	name: string
	/** Sticker set title, 1-64 characters */
	title: string
	/** List of 1-50 initial stickers to be added to the sticker set */
	stickers: InputSticker[]
	/** Format of stickers in the set */
	stickerFormat: StickerFormat
	/** Type of stickers in the set. By default, a regular sticker set is created. */
	stickerType?: StickerType
	/**
	 * If stickers in the sticker set must be repainted to the color of text when used in messages,
	 * the accent color if used as emoji status, white on chat photos,
	 * or another appropriate color based on context; for custom emoji sticker sets only
	 */
	needsRepainting?: boolean
}

export interface ForumTopicCreateOptions {
	/** Color of the topic icon in RGB format. */
	iconColor: ForumTopicIconColor
	/**
	 * Unique identifier of the custom emoji shown as the topic icon.
	 * Use `<Client>.getForumTopicIconStickers()` to get all allowed custom emoji identifiers.
	 */
	iconCustomEmojiId?: string
}

export interface ForumTopicEditOptions {
	/** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept */
	name?: string
	/**
	 * New unique identifier of the custom emoji shown as the topic icon.
	 * Use `<Client>.getForumTopicIconStickers()` to get all allowed custom emoji identifiers.
	 */
	iconCustomEmojiId?: string
}

export interface GeneralForumTopicEditOptions {
	/** New topic name, 0-128 characters. */
	name: string
}

export interface ShippingAddress {
	/** Two-letter ISO 3166-1 alpha-2 country code */
	countryCode: string
	/** State, if applicable */
	state: string
	/** City */
	city: string
	/** First line for the address */
	streetLine1: string
	/** Second line for the address */
	streetLine2: string
	/** Address post code */
	postCode: string
}


export interface PassportElementErrorDataField {
	/** Error source */
	source: PassportElementErrorSource.Data
	/** The section of the user's Telegram Passport which has the error */
	type:
	| PassportElementType.PersonalDetails
	| PassportElementType.Passport
	| PassportElementType.DriverLicense
	| PassportElementType.IdentityCard
	| PassportElementType.InternalPassport
	| PassportElementType.Address
	/** Name of the data field which has the error */
	fieldName: string
	/** Base64-encoded data hash */
	dataHash: string
	/** Error message */
	message: string
}

export interface PassportElementErrorFrontSide {
	/** Error source */
	source: PassportElementErrorSource.FrontSide
	/** The section of the user's Telegram Passport which has the error */
	type:
	| PassportElementType.Passport
	| PassportElementType.DriverLicense
	| PassportElementType.IdentityCard
	| PassportElementType.InternalPassport
	/** Base64-encoded hash of the file with the front side of the document */
	fileHash: string
	/** Error message */
	message: string
}

export interface PassportElementErrorReverseSide {
	/** Error source */
	source: PassportElementErrorSource.ReverseSide
	/** The section of the user's Telegram Passport which has the error */
	type:
	| PassportElementType.DriverLicense
	| PassportElementType.IdentityCard
	/** Base64-encoded hash of the file with the reverse side of the document */
	fileHash: string
	/** Error message */
	message: string
}

export interface PassportElementErrorSelfie {
	/** Error source */
	source: PassportElementErrorSource.Selfie
	/** The section of the user's Telegram Passport which has the error */
	type:
	| PassportElementType.Passport
	| PassportElementType.DriverLicense
	| PassportElementType.IdentityCard
	| PassportElementType.InternalPassport
	/** Base64-encoded hash of the file with the selfie */
	fileHash: string
	/** Error message */
	message: string
}

export interface PassportElementErrorFile {
	/** Error source */
	source: PassportElementErrorSource.File
	/** The section of the user's Telegram Passport which has the error */
	type:
	| PassportElementType.UtilityBill
	| PassportElementType.BankStatement
	| PassportElementType.RentalAgreement
	| PassportElementType.PassportRegistration
	| PassportElementType.TemporaryRegistration
	/** Base64-encoded file hash */
	fileHash: string
	/** Error message */
	message: string
}

export interface PassportElementErrorFiles {
	/** Error source */
	source: PassportElementErrorSource.Files
	/** The section of the user's Telegram Passport which has the error */
	type:
	| PassportElementType.UtilityBill
	| PassportElementType.BankStatement
	| PassportElementType.RentalAgreement
	| PassportElementType.PassportRegistration
	| PassportElementType.TemporaryRegistration
	/** List of base64-encoded file hashes */
	fileHashes: string[]
	/** Error message */
	message: string
}

export interface PassportElementErrorTranslationFile {
	/** Error source */
	source: PassportElementErrorSource.TranslationFile
	/** Type of element of the user's Telegram Passport which has the issue */
	type:
	| PassportElementType.Passport
	| PassportElementType.DriverLicense
	| PassportElementType.IdentityCard
	| PassportElementType.InternalPassport
	| PassportElementType.UtilityBill
	| PassportElementType.BankStatement
	| PassportElementType.RentalAgreement
	| PassportElementType.Passport
	| PassportElementType.TemporaryRegistration
	/** Base64-encoded file hash */
	fileHash: string
	/** Error message */
	message: string
}

export interface PassportElementErrorTranslationFiles {
	/** Error source */
	source: PassportElementErrorSource.TranslationFiles
	/** Type of element of the user's Telegram Passport which has the issue */
	type:
	| PassportElementType.Passport
	| PassportElementType.DriverLicense
	| PassportElementType.IdentityCard
	| PassportElementType.InternalPassport
	| PassportElementType.UtilityBill
	| PassportElementType.BankStatement
	| PassportElementType.RentalAgreement
	| PassportElementType.PassportRegistration
	| PassportElementType.TemporaryRegistration
	/** List of base64-encoded file hashes */
	fileHashes: string[]
	/** Error message */
	message: string
}

export interface GameSendOptions {
	/**
	 * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages).
	 * Users will receive a notification with no sound.
	 */
	disableNotification?: boolean
	/** Protects the contents of the sent message from forwarding and saving */
	protectContent?: boolean
	/** If the message is a reply, ID of the original message */
	replyToMessageId?: number
	/** Pass *true* if the message should be sent even if the specified replied-to message is not found */
	allowSendingWithoutReply?: boolean
	/**
	 * A JSON-serialized object for an
	 * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
	 * If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game.
	 */
	replyMarkup?: InlineKeyboardMarkup
}

export interface GameScoreSetOptions {
	/**
	 * Pass *true* if the high score is allowed to decrease.
	 * This can be useful when fixing mistakes or banning cheaters
	 */
	disableEditMessage?: boolean
	/** Pass *true* if the game message should not be automatically edited to include the current scoreboard */
	force?: boolean
	/** Required if *inlineMessageId* is not specified. Unique identifier for the target chat */
	chatId?: number
	/** Required if *inlineMessageId* is not specified. Identifier of the sent message */
	messageId?: number
	/** Required if *chatId* and *messageId* are not specified. Identifier of the inline message */
	inlineMessageId?: string
}

export interface GameHighScoreGetOptions {
	/** Required if *inlineMessageId* is not specified. Unique identifier for the target chat */
	chatId?: number
	/** Required if *inlineMessageId* is not specified. Identifier of the sent message */
	messageId?: number
	/** Required if *chatId* and *messageId* are not specified. Identifier of the inline message */
	inlineMessageId?: string
}

export interface GameHighScore {
	/** Position in high score table for the game */
	position: number
	/** User */
	user: User
	/** Score */
	score: number
}

export interface PassportElementErrorUnspecified {
	/** Error source */
	source: PassportElementErrorSource.Unspecified
	/** Type of element of the user's Telegram Passport which has the issue */
	type: string
	/** Base64-encoded element hash */
	elementHash: string
	/** Error message */
	message: string
}

export interface ChatMemberAdministratorPermissions {
	/**
	 * If the administrator can access the chat event log, chat statistics, message statistics in channels,
	 * see channel members, see anonymous administrators in supergroups and ignore slow mode.
	 * Implied by any other administrator privilege
	 */
	canManageChat: boolean
	/** If the administrator can delete messages of other users */
	canDeleteMessages: boolean
	/** If the administrator can manage video chats */
	canManageVoiceChats: boolean
	/** If the administrator can restrict, ban or unban chat members */
	canRestrictMembers: boolean
	/**
	 * If the administrator can add new administrators with a subset of their own privileges
	 * or demote administrators that he has promoted, directly or indirectly
	 * (promoted by administrators that were appointed by the user)
	 */
	canPromoteMembers: boolean
	/** If the administrator can change the chat title, photo and other settings */
	canChangeInfo: boolean
	/** If the user is allowed to invite new users to the chat */
	canInviteUsers: boolean
	/** If the administrator can post in the channel, channels only */
	canPostMessages?: boolean
	/** If the administrator can edit messages of other users and can pin messages, channels only */
	canEditMessages?: boolean
	/** If the user is allowed to pin messages; groups and supergroups only */
	canPinMessages?: boolean
	/** *true*, if the user is allowed to create, rename, close, and reopen forum topics; supergroups only */
	canManageTopics?: boolean
}

export interface ChatMemberRestrictedPermissions {
	/** If user is allowed to change the chat title, photo and other settings */
	canChangeInfo: boolean
	/** If the user is allowed to invite new users to the chat */
	canInviteUsers: boolean
	/** If the user is allowed to pin messages; groups and supergroups only */
	canPinMessages?: boolean
	/** *true*, if the user is allowed to create forum topics */
	canManageTopics?: boolean
	/** If the user is allowed to send text messages, contacts, locations and venues */
	canSendMessages: boolean
	/**
	 * If the user is allowed to send audios, documents, photos,
	 * videos, video notes and voice notes, implies *canSendMessages*
	 */
	canSendMediaMessages: boolean
	/** If the user is allowed to send polls, implies *canSendMessages* */
	canSendPolls: boolean
	/**
	 * If the user is allowed to send animations, games,
	 * stickers and use inline bots, implies *canSendMediaMessages*
	 */
	canSendOtherMessages: boolean
	/** If the user is allowed to add web page previews to their messages, implies *canSendMediaMessages* */
	canAddWebPagePreviews: boolean
}

export type PassportElementError =
	| PassportElementErrorDataField
	| PassportElementErrorFrontSide
	| PassportElementErrorReverseSide
	| PassportElementErrorSelfie
	| PassportElementErrorFile
	| PassportElementErrorFiles
	| PassportElementErrorTranslationFile
	| PassportElementErrorTranslationFiles
	| PassportElementErrorUnspecified

export type BotCommandScope =
	| BotCommandScopeDefault
	| BotCommandScopeAllPrivateChats
	| BotCommandScopeAllGroupChats
	| BotCommandScopeAllChatAdministrators
	| BotCommandScopeChat
	| BotCommandScopeChatAdministrators
	| BotCommandScopeChatMember

export type InputMedia =
	| InputMediaPhoto
	| InputMediaVideo
	| InputMediaAnimation
	| InputMediaAudio
	| InputMediaDocument

export interface InputMediaPhoto {
	/** Type of the result */
	type: 'photo'
	// TODO: Maybe allow to use file in other formats than string
	/** 
	 * File to send. Pass a *fileId* to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	media: string
	/** Caption of the photo to be sent, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the photo caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in the caption, which can be specified instead of `parseMode` */
	captionEntities?: MessageEntity[]
	/** Pass *true* if the photo needs to be covered with a spoiler animation */
	hasSpoiler?: boolean
}

export interface InputMediaVideo {
	/** Type of the result */
	type: 'video'
	// TODO: Maybe allow to use file in other formats than string
	/** 
	 * File to send. Pass a *fileId* to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	media: string
	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	thumbnail?: InputFile | string
	/** Caption of the video to be sent, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the video caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in the caption, which can be specified instead of `parseMode` */
	captionEntities?: MessageEntity[]
	/** Video width */
	width?: number
	/** Video height */
	height?: number
	/** Video duration in seconds */
	duration?: number
	/** Pass *true* if the uploaded video is suitable for streaming */
	supportsStreaming?: boolean
	/** Pass *true* if the photo needs to be covered with a spoiler animation */
	hasSpoiler?: boolean
}

export interface InputMediaAnimation {
	/** Type of the result */
	type: 'animation'
	// TODO: Maybe allow to use file in other formats than string
	/** 
	 * File to send. Pass a *fileId* to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	media: string
	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	thumbnail?: InputFile | string
	/** Caption of the animation to be sent, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the animation caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in the caption, which can be specified instead of `parseMode` */
	captionEntities?: MessageEntity[]
	/** Animation width */
	width?: number
	/** Animation height */
	height?: number
	/** Animation duration in seconds */
	duration?: number
	/** Pass *true* if the animation needs to be covered with a spoiler animation */
	hasSpoiler?: boolean
}

export interface InputMediaAudio {
	/** Type of the result */
	type: 'audio'
	// TODO: Maybe allow to use file in other formats than string
	/** 
	 * File to send. Pass a *fileId* to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	media: string
	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	thumbnail?: InputFile | string
	/** Caption of the audio to be sent, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the audio caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in the caption, which can be specified instead of `parseMode` */
	captionEntities?: MessageEntity[]
	/** Audio duration in seconds */
	duration?: number
	/** Performer of the audio */
	performer?: string
	/** Title of the audio */
	title?: string
}

export interface InputMediaDocument {
	/** Type of the result */
	type: 'document'
	// TODO: Maybe allow to use file in other formats than string
	/** 
	 * File to send. Pass a *fileId* to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	media: string
	/**
	 * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
	 * @see {@link https://core.telegram.org/bots/api#sending-files}
	 */
	thumbnail?: InputFile | string
	/** Caption of the document to be sent, 0-1024 characters after entities parsing */
	caption?: string
	/**
	 * Mode for parsing entities in the document caption.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in the caption, which can be specified instead of `parseMode` */
	captionEntities?: MessageEntity[]
	/**
	 * Disables automatic server-side content type detection for files uploaded using multipart/form-data.
	 * Always *true*, if the document is sent as part of an album.
	 */
	disableContentTypeDetection?: boolean
}

export interface KeyboardButtonRequestUser {
	// TODO: fix description if needed
	/**
	 * Identifier of the request, which will be received back in the UserShared object.
	 * Must be unique within the message
	 */
	requestId: number
	/** 
	 * Pass *true* to request a bot, pass False to request a regular user.
	 * If not specified, no additional restrictions are applied.
	 */
	userIsBot?: boolean
	/**
	 * Pass *true* to request a premium user, pass False to request a non-premium user.
	 * If not specified, no additional restrictions are applied.
	 */
	userIsPremium?: boolean
}

export interface MenuButtonWebAppOptions {
	/** Text on the button */
	text: string
	/**
	 * Description of the Web App that will be launched when the user presses the button.
	 * The Web App will be able to send an arbitrary message on behalf of the user
	 * using the method *\<Client>.answerWebAppQuery*.
	 */
	webApp: WebAppInfo
}

export interface KeyboardButtonRequestChat {
	// TODO: fix description if needed
	/**
	 * Identifier of the request, which will be received back in the ChatShared object.
	 * Must be unique within the message
	 */
	requestId: number

	chatIsChannel?: boolean

	chatIsForum?: boolean

	chatHasUsername?: boolean

	chatIsCreated?: boolean

	userAdministratorRights?: ChatAdministratorRights

	botAdministratorRights?: ChatAdministratorRights

	botIsMember?: boolean
}

export type InputMessageContent =
	| InputTextMessageContent
	| InputLocationMessageContent
	| InputVenueMessageContent
	| InputContactMessageContent
	| InputInvoiceMessageContent

export interface InputTextMessageContent {
	/** Text of the message to be sent, 1-4096 characters */
	messageText: string
	/**
	 * Mode for parsing entities in the message text.
	 * @see {@link https://core.telegram.org/bots/api#formatting-options}
	 */
	parseMode?: ParseMode
	/** List of special entities that appear in message text, which can be specified instead of *parseMode* */
	entities?: MessageEntity[]
	/** Disables link previews for links in the sent message */
	disableWebPagePreview?: boolean
}

export interface InputLocationMessageContent {
	/** Latitude of the location in degrees */
	latitude: number
	/** Longitude of the location in degrees */
	longitude: number
	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontalAccuracy?: number
	/** Period in seconds for which the location can be updated, should be between 60 and 86400. */
	livePeriod?: number
	/**
	 * For live locations, a direction in which the user is moving, in degrees.
	 * Must be between 1 and 360 if specified.
	 */
	heading?: number
	/**
	 * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters.
	 * Must be between 1 and 100000 if specified. 
	 */
	proximityAlertRadius?: number
}

export interface InputVenueMessageContent {
	/** Latitude of the venue in degrees */
	latitude: number
	/** Longitude of the venue in degrees */
	longitude: number
	/** Name of the venue */
	title: string
	/** Address of the venue */
	adress: string
	/** Foursquare identifier of the venue, if known */
	foursquareId?: string
	/**
	 * Foursquare type of the venue, if known.
	 * (For example, *'arts_entertainment/default'*, *'arts_entertainment/aquarium'* or *'food/icecream'*.)
	 */
	foursquareType?: string
	/** Google Places identifier of the venue */
	googlePlaceId?: string
	/**
	 * Google Places type of the venue
	 * @see {@link https://developers.google.com/places/web-service/supported_types}
	 */
	googlePlaceType?: string
}

export interface InputContactMessageContent {
	/** Contact's phone number */
	phoneNumber: string
	/** Contact's first name */
	firstName: string
	/** Contact's last name */
	lastName?: string
	/** Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes */
	vcard?: string
}

export interface InputInvoiceMessageContent {
	/** Product name, 1-32 characters */
	title: string
	/** Product description, 1-255 characters */
	description: string
	/**
	 * Bot-defined invoice payload, 1-128 bytes.
	 * This will not be displayed to the user, use for your internal processes.
	 */
	payload: string
	/** Payment provider token, obtained via [@BotFather](https://t.me/BotFather) */
	providerToken: string
	/**
	 * Three-letter ISO 4217 currency code
	 * @see {@link https://core.telegram.org/bots/payments#supported-currencies}
	 */
	currency: string
	/** 
	 * Price breakdown, a list of components 
	 * (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
	 */
	prices: LabeledPrice[]
	/**
	 * The maximum accepted amount for tips in the *smallest units* of the currency.
	 * For example, for a maximum tip of US$ 1.45 pass `maxTipAmount: 145`.
	 * Defaults to 0.
	 */
	maxTipAmount?: number
	/**
	 * An array of suggested amounts of tip in the smallest units of the currency.
	 * At most 4 suggested tip amounts can be specified.
	 * The suggested tip amounts must be positive,
	 * passed in a strictly increased orderandmust not exceed *max_tip_amount*.
	 */
	suggestedTipAmounts?: number[]
	/**
	 * A JSON-serialized object for data about the invoice, which will be shared with the payment provider.
	 * A detailed description of the required fields should be provided by the payment provider.
	 */
	providerData?: string
	/**
	 * URL of the product photo for the invoice.
	 * Can be a photo of the goods or a marketing image for a service.
	 */
	photoUrl?: string
	/** Photo size in bytes */
	photoSize?: number
	/** Photo width */
	photoWidth?: number
	/** Photo height */
	photoHeight?: number
	/** Pass *true* if you require the user's full name to complete the order */
	needName?: boolean
	/** Pass *true* if you require the user's phone number to complete the order */
	needPhoneNumber?: boolean
	/** Pass *true* if you require the user's email address to complete the order */
	needEmail?: boolean
	/** Pass *true* if you require the user's shipping address to complete the order */
	needShippingAddress?: boolean
	/** Pass *true* if the user's phone number should be sent to provider */
	sendPhoneNumberToProvider?: boolean
	/** Pass *true* if the user's email address should be sent to provider */
	sendEmailToProvider?: boolean
	/** Pass *true* if the final price depends on the shipping method */
	isFlexible?: boolean
}

export interface InlineQueryResultArticleOptions {
	/** Title of the result */
	title: string
	/** Content of the message to be sent */
	inputMessageContent: InputMessageContent
	/** Inline keyboard attached to the message */
	replyMarkup?: InlineKeyboardMarkup
	/** URL of the result */
	url?: string
	/** Pass *true* if you don't want the URL to be shown in the message */
	hideUrl?: boolean
	/** Short description of the result */
	description?: string
	/** Url of the thumbnail for the result */
	thumbnailUrl?: string
	/** Thumbnail width */
	thumbnailWidth?: number
	/** Thumbnail height */
	thumbnailHeight?: number
}

export interface InlineQueryResultAudioOptions {
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
}

// interface InlineQueryResultContactOptions {

// }


// Service messages

export interface MessageAutoDeleteTimerChanged {
	/** New auto-delete time for messages in the chat; in seconds */
	messageAutoDeleteTime: number
}

export interface SuccessfulPayment {
	/**
	 * Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars
	 * @see {@link https://core.telegram.org/bots/payments#supported-currencies}
	 */
	currency: Currency
	/**
	 * Total price in the *smallest units* of the currency (integer, **not** float/double).
	 * For example, for a price of `US$ 1.45` pass `totalAmount: 145`.
	 * See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json),
	 * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
	 */
	totalAmount: number,
	/** Bot specified invoice payload */
	invoicePayload: string,
	/** Identifier of the shipping option chosen by the user */
	shippingOptionId?: string,
	/** Order information provided by the user */
	orderInfo?: OrderInfo,
	/** Telegram payment identifier */
	telegramPaymentChargeId: string,
	/** Provider payment identifier */
	providerPaymentChargeId: string
}

export interface OrderInfo {
	/** User name */
	name?: string,
	/** User's phone number */
	phoneNumber?: string,
	/** User email */
	email?: string,
	/** User shipping adress */
	shippingAddress: ShippingAddress
}

// TODO: move to own class
export interface ExternalReplyInfo {
	origin: MessageOrigin,
	chat?: Chat,
	messageId?: number,
	linkPreviewOptions?: LinkPreviewOptions,
	animation?: Animation,
	audio?: Audio,
	document?: Document,
	paidMedia?: PaidMediaInfo,
	photo?: PhotoSize[],
	sticker?: Sticker,
	story?: Story,
	video?: Video,
	videoNote?: VideoNote,
	voice?: Voice,
	hasMediaSpoiler?: boolean,
	contact?: Contact,
	dice?: Dice,
	game?: Game,
	giveaway?: Giveaway,
	giveawayWinners?: GiveawayWinners,
	invoice?: Invoice,
	location?: Location,
	poll?: Poll,
	venue?: Venue
}

export interface WriteAccessAlowed {
	/** *true*, if the access was granted after the user accepted an explicit request from a Web App */
	fromRequest?: boolean,
	/** Name of the Web App, if the access was granted when the Web App was launched from a link */
	webAppName?: string,
	/** *true*, if the access was granted when the bot was added to the attachment or side menu */
	fromAttachmentMenu?: boolean
}

/** Represents a service message about the creation of a scheduled giveaway. Currently holds no information. */
export interface GiveawayCreated {

}

export interface GiveawayWinners {
	/** The chat that created the giveaway */
	chat: Chat,
	/** Identifier of the message with the giveaway in the chat */
	giveawayMessageId: number,
	/** Point in time when winners of the giveaway were selected */
	winnersSelectionDate: Date,
	/** Total number of winners in the giveaway */
	winnerCount: number,
	/** List of up to 100 winners of the giveaway */
	winners: User[],
	/** The number of other chats the user had to join in order to be eligible for the giveaway */
	additionalChatCount?: number,
	/** The number of months the Telegram Premium subscription won from the giveaway will be active for */
	premiumSubscriptionMonthCount?: number,
	/** Number of undistributed prizes */
	unclaimedPrizeCount?: number,
	/** *true*, if only users who had joined the chats after the giveaway started were eligible to win */
	onlyNewMembers?: boolean,
	/** *true*, if the giveaway was canceled because the payment for it was refunded */
	wasRefunded?: boolean,
	/** Description of additional giveaway prize */
	prizeDescription?: string
}

export interface GiveawayCompleted {
	/** Number of winners in the giveaway */
	winnerCount: number,
	/** Number of undistributed prizes */
	unclaimedPrizeCount?: number,
	/** Message with the giveaway that was completed, if it wasn't deleted */
	giveawayMessage?: Message
}

export interface LinkPreviewOptions {
	/** *true*, if the link preview is disabled */
	isDisabled?: boolean
	/** URL to use for the link preview. If empty, then the first URL found in the message text will be used */
	url?: string,
	/**
	 * *true*, if the media in the link preview is supposed to be shrunk;
	 * ignored if the URL isn't explicitly specified or media size change isn't supported for the preview
	 */
	preferSmallMedia?: boolean,
	/**
	 * *true*, if the media in the link preview is supposed to be enlarged;
	 * ignored if the URL isn't explicitly specified or media size change isn't supported for the preview
	 */
	preferLargeMedia?: boolean,
	/**
	 * *true*, if the link preview must be shown above the message text;
	 * otherwise, the link preview will be shown below the message text
	 */
	showAboveText?: boolean
}

export interface PaidMediaInfo {
	/** The number of Telegram Stars that must be paid to buy access to the media */
	starCount: number,
	/** Information about the paid media */
	paidMedia: PaidMedia
}

// export interface PassportData {
// 	/** Array with information about documents and other Telegram Passport elements that was shared with the bot */
// 	data: EncryptedPassportElement[],
// 	/** Encrypted credentials required to decrypt the data */
// 	credentials: EncryptedCredentials
// }

export interface PassportFile {
	/** Identifier for this file, which can be used to download or reuse the file */
	fileId: string,
	/**
	 * Unique identifier for this file, which is supposed to be the same over time and for different bots.
	 * Can't be used to download or reuse the file.
	 */
	fileUniqueId: string,
	/** File size in bytes */
	fileSize: number,
	/** Time when the file was uploaded */
	fileDate: Date
}

export interface ProximityAlertTriggered {
	/** User that triggered the alert */
	traveler: User,
	/** User that set the alert */
	watcher: User,
	/** The distance between the users */
	distance: number
}

export interface ChatBoostAdded {
	/** Number of boosts added by the user */
	boostCount: number
}

export interface ForumTopicCreated {
	/** Name of the topic */
	name: string,
	/** Color of the topic icon in RGB format */
	iconColor: number,
	/** Unique identifier of the custom emoji shown as the topic icon */
	iconCustomEmojiId?: string
}

export interface ForumTopicEdited {
	/** New name of the topic, if it was edited */
	name: string,
	/**
	 * New identifier of the custom emoji shown as the topic icon, if it was edited;
	 * an empty string if the icon was removed
	 */
	iconCustomEmojiId?: string
}

export interface ForumTopicClosed {

}

export interface ForumTopicReopened {

}

export interface GeneralForumTopicHidden {

}

export interface GeneralForumTopicUnhidden {

}

export interface VideoChatScheduled {
	/** Point in time when the video chat is supposed to be started by a chat administrator */
	startDate: Date
}

export interface VideoChatStarted {

}

export interface VideoChatEnded {
	/** Video chat duration in seconds */
	duration: number
}

export interface VideoChatParticipantsInvited {
	/** New members that were invited to the video chat */
	users: User[]
}

export type Reaction = EmojiReaction | CustomEmojiReaction

export interface EmojiReaction {
	type: ReactionType.Emoji
	emoji: string
}

export interface CustomEmojiReaction {
	type: ReactionType.CustomEmoji
	customEmojiId: string
}

export interface MessageReactionSetOptons {
	isBig?: boolean
}

export interface UserChatBoosts {
	/** The list of boosts added to the chat by the user */
	boosts: ChatBoost[]
}

// TODO move to class
export interface ChatBoost {
	/** Unique identifier of the boost */
	boostId: string,
	addDate: Date,
	expirationDate: Date,
	source: any
}

export interface StarTransactions {
	transactions: StarTransaction
}

export interface StarTransactionsGetOptions {
	/** Number of transactions to skip in the response */
	offset: number
	/** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
	limit: number
}

export interface MessageEditReplyMarkupOptions {
	/** Unique identifier of the business connection on behalf of which the message to be edited was sent */
	businessConnectionId?: string
}
