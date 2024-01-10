import Client from 'client/Client'
import { ChatId, MessageAutoDeleteTimerChanged, MessageCopyOptions, MessageForwardOptions, SuccessfulPayment } from '../../types'
import Animation from './Animation'
import Audio from './Audio'
import Base from './Base'
import Chat from './Chat'
import Contact from './Contact'
import Dice from './Dice'
import Document from './Document'
import Game from './Game'
import InlineKeyboardMarkup from './InlineKeyboardMarkup'
import Location from './Location'
import MessageEntity from './MessageEntity'
import PhotoSize from './PhotoSize'
import Poll from './Poll'
import Sticker from './Sticker'
import User from './User'
import Venue from './Venue'
import Video from './Video'
import VideoNote from './VideoNote'
import Voice from './Voice'
import UserShared from './UserShared'
import ChatShared from './ChatShared'

/** Represents a message */
export default class Message extends Base {
	/** Unique message identifier inside this chat */
	id: number

	/** Unique identifier of a message thread to which the message belongs; for supergroups only */
	threadId?: number

	/** Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
	sender?: User

	/** Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group. For backward compatibility, the field `author` contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
	senderChat?: Chat

	/** Date the message was sent */
	date: Date

	/** Conversation the message belongs to */
	chat: Chat

	/** For forwarded messages, sender of the original message */
	forwardFrom?: User

	/** For messages forwarded from channels or from anonymous administrators, information about the original sender chat */
	forwardFromChat?: Chat

	/** For messages forwarded from channels, identifier of the original message in the channel */
	forwardFromMessageId?: number

	/** For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present */
	forwardSignature?: string

	/** Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
	forwardSenderName?: string

	/** For forwarded messages, date the original message was sent in Unix time */
	forwardDate?: Date

	/** *true*, if the message is sent to a forum topic */
	isTopicMessage?: boolean

	/** *true*, if the message is a channel post that was automatically forwarded to the connected discussion group */
	isAutomaticForward?: boolean

	/** For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
	replyToMessage?: Message

	/** Bot through which the message was sent */
	viaBot?: User

	/** Date the message was last edited */
	editDate?: Date

	/** *true*, if the message can't be forwarded */
	hasProtectedContent: boolean

	/** The unique identifier of a media message group this message belongs to */
	mediaGroupId?: string

	/** Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
	authorSignature?: string

	/** For text messages, the actual UTF-8 text of the message */
	text?: string

	/** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
	entities?: MessageEntity[]

	/** Message is an animation, information about the animation. For backward compatibility, when this field is set, the `document` field will also be set */
	animation?: Animation

	/** Message is an audio file, information about the file */
	audio?: Audio

	/** Message is a general file, information about the file */
	document?: Document

	/** Message is a photo, available sizes of the photo */
	photo?: PhotoSize[]

	/** Message is a sticker, information about the sticker */
	sticker?: Sticker

	/** Message is a video, information about the video */
	video?: Video

	/** Message is a video note, information about the video message */
	videoNote?: VideoNote

	/** Message is a voice message, information about the file */
	voice?: Voice

	/** Caption for the animation, audio, document, photo, video or voice */
	caption?: string

	/** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
	captionEntities?: MessageEntity[]

	/** *true*, if the message media is covered by a spoiler animation */
	hasMediaSpoiler?: boolean

	/** Message is a shared contact, information about the contact */
	contact?: Contact

	/** Message is a dice with random value */
	dice?: Dice

	/** Message is a game, information about the game. */
	game?: Game

	/** Message is a native poll, information about the poll */
	poll?: Poll

	/** Message is a venue, information about the venue. For backward compatibility, when this field is set, the `location` field will also be set */
	venue?: Venue

	/** Message is a location, information about the location */
	location?: Location


	/** Telegram Passport data */
	// TODO Add passport data
	// passportData?: PassportData

	/** Inline keyboard attached to the message. `loginUrl` buttons are represented as ordinary `url` buttons. */
	replyMarkup?: InlineKeyboardMarkup
	
	// Service messages

	/**
	 * Service message.
	 * 
	 * New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
	 */
	newChatMembers?: User[]

	/** 
	 * Service message.
	 * 
	 * A member was removed from the group, information about them (this member may be the bot itself)
	 */
	leftChatMember?: User[]

	/** 
	 * Service message.
	 * 
	 * A chat title was changed to this value
	 */
	newChatTitle?: string

	/** 
	 * Service message.
	 * 
	 * A chat photo was change to this value
	 */
	newChatPhoto?: PhotoSize[]

	/** 
	 * Service message.
	 * 
	 * The chat photo was deleted
	 */
	deleteChatPhoto?: boolean

	/** 
	 * Service message.
	 * 
	 * The group has been created
	 */
	groupChatCreated?: boolean

	/** 
	 * Service message.
	 * 
	 * The supergroup has been created.
	 * 
	 * This field can't be received in a message coming through updates,
	 * because bot can't be a member of a supergroup when it is created.
	 * It can only be found in `replyToMessage` if someone replies
	 * to a very first message in a directly created supergroup.
	 */
	superGroupChatCreated?: boolean

	/** 
	 * Service message.
	 * 
	 * The channel has been created.
	 * 
	 * This field can't be received in a message coming through updates,
	 * because bot can't be a member of a supergroup when it is created.
	 * It can only be found in `replyToMessage` if someone replies
	 * to a very first message in a directly created supergroup.
	 */
	channelChatCreated?: boolean

	messageAutoDeleteTimerChanged?: MessageAutoDeleteTimerChanged

	migrateToChatId?: number

	migrateFromChatId?: number

	/** Specified message was pinned. */
	pinnedMessage?: Message

	/** Message is an invoice for a payment, information about the invoice. */
	// invoice?: Invoice

	successfulPayment?: SuccessfulPayment

	userShared?: UserShared

	chatShared?: ChatShared

	/** The domain name of the website on which the user has logged in */
	connectedWebsite: string

	// writeAccessAllowed?: WriteAccessAlowed

	// // TODO: is that a service message?
	// passportData: PassportData
	
	// ProximityAlertTriggered?: ProximityAlertTriggered

	// ForumTopicCreated?: ForumTopicCreated

	// ForumTopicEdited?: 	ForumTopicEdited
	
	// ForumTopicClosed?: ForumTopicClosed

	// ForumTopicReopened?: 	ForumTopicReopened

	// GeneralForumTopicHidden?: 	GeneralForumTopicHidden

	// GeneralForumTopicUnhidden

	// VideoChatScheduled

	// VideoChatStarted

	// VideoChatEnded

	// VideoChatParticipantsInvited

	// WebAppData

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.message_id
		this.threadId = data.thread_id
		this.sender = data.from && new User(client, data.from)
		this.senderChat = data.sender_chat && new Chat(client, data.sender_chat)
		this.date = new Date(data.date * 1000)
		this.chat = new Chat(client, data.chat)
		this.forwardFrom = data.forward_from && new User(client, data.forward_from)
		this.forwardFromChat = data.forward_from_chat && new Chat(client, data.forward_from_chat)
		this.forwardFromMessageId = data.forward_from_message_id
		this.forwardSignature = data.forward_signature
		this.forwardSenderName = data.forward_sender_name
		this.forwardDate = new Date(data.forward_date * 1000)
		this.isTopicMessage = data.is_topic_message
		this.isAutomaticForward = data.is_automatic_forward
		this.replyToMessage = data.reply_to_message && new Message(client, data.reply_to_message)
		this.viaBot = data.via_bot && new User(client, data.via_bot)
		this.editDate = new Date(data.edit_date * 1000)
		this.hasProtectedContent = data.has_protected_content
		this.mediaGroupId = data.media_group_id
		this.authorSignature = data.author_signature
		this.text = data.text
		this.entities = data.entities && data.entities.map(
			(entityData: any) => new MessageEntity(this.client, entityData)
		)
		this.animation = data.animation && new Animation(this.client, data.animation)
		this.audio = data.audio && new Audio(this.client, data.audio)
		this.document = data.document && new Document(this.client, data.document)
		this.photo = data.photo && data.photo.map((photoData: any) => new PhotoSize(this.client, photoData))
		this.sticker = data.sticker && new Sticker(this.client, data.sticker)
		this.video = data.video && new Video(this.client, data.video)
		this.videoNote = data.video_note && new VideoNote(this.client, data.video_note)
		this.voice = data.voice && new Voice(this.client, data.voice)
		this.caption = data.caption
		this.captionEntities =
			data.caption_entities &&
			data.caption_entities.map((entityData: any) => new MessageEntity(this.client, entityData))
		this.contact = data.contact && new Contact(this.client, data.contact)
		this.dice = data.dice && new Dice(this.client, data.dice)
		this.venue = data.venue && new Venue(this.client, data.venue)
		this.location = data.location && new Location(this.client, data.location)
		this.pinnedMessage = data.pinned_message && new Message(this.client, data.pinned_message)
		this.connectedWebsite = data.connected_website
		this.replyMarkup = data.reply_markup && new InlineKeyboardMarkup(data.reply_markup)
	}

	async forward(chatId: ChatId, options?: MessageForwardOptions) {
		await this.client.rest.request('forwardMessage', {
			chat_id: chatId,
			from_chat_id: this.chat.id,
			message_id: this.id,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent
		})
	}

	/**
     * Copy message of any kind.
     * Service messages and invoice messages can't be copied.
     * A quiz poll can be copied only if the value of the field 'correctOptionId' is known to the bot.
     * The method is analogous to the method forwardMessage,
	 * but the copied message doesn't have a link to the original message.
     */
	async copy(chatId: number | string, options?: MessageCopyOptions) {
		await this.client.rest.request('copyMessage', {
			chat_id: chatId,
			from_chat_id: this.chat.id,
			message_id: this.id,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup
		})
	}
}
