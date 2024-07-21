import Chat from '../structures/Chat'
import ClientUser from '../structures/ClientUser'
import Message from '../structures/Message'
import {
	AnimationMessageSendOptions,
	AudioMessageSendOptions,
	CallbackQueryAnswerOptions,
	ChatActionSendOptions,
	ChatAdministratorRights,
	ChatId,
	ChatInviteLinkCreateOptions,
	ChatInviteLinkEditOptions,
	ChatMemberBanOptions,
	ChatMemberPromoteOptions,
	ChatMemberRestrictOptions,
	ChatMemberUnbanOptions,
	ChatMessagePinOptions,
	ChatPermissions,
	ClientEvents,
	ClientOptions,
	ContactMessageSendOptions,
	ContactOptions,
	DiceEmoji,
	DiceMessageSendOptions,
	DocumentMessageSendOptions,
	ForumTopicCreateOptions,
	ForumTopicEditOptions,
	GameHighScore,
	GameHighScoreGetOptions,
	GameScoreSetOptions,
	GameSendOptions,
	GeneralForumTopicEditOptions,
	InputFile,
	InputMedia,
	InputMediaAnimation,
	InputSticker,
	InvoiceLinkCreateOptions,
	InvoiceSendOptions,
	LocationMessageSendOptions,
	MaskPosition,
	MediaGroupMessageSendOptions,
	MessageCopyOptions,
	MessageEditCaptionOptions,
	MessageEditMediaOptions,
	MessageEditReplyMarkupOptions,
	MessageEditTextOptions,
	MessageForwardOptions,
	MessageReactionSetOptons,
	MyCommandsDeleteOptions,
	MyCommandsGetOptions,
	MyCommandsSetOptions,
	MyDefaultAdministratorRightsSetOptions,
	PassportElementError,
	PhotoMessageSendOptions,
	PollMessageSendOptions,
	PollOptions,
	PollStopOptions,
	PreCheckoutQueryAnswerOptions,
	Reaction,
	ShippingQueryAnswerOptions,
	StarTransactions,
	StarTransactionsGetOptions,
	StickerSendOptions,
	StickerSetCreateOptions,
	TextMessageSendOptions,
	UserChatBoosts,
	UserProfilePhotos,
	UserProfilePhotosGetOptions,
	VenueMessageSendOptions,
	VenueOptions,
	VideoMessageSendOptions,
	VideoNoteMessageSendOptions,
	VoiceMessageSendOptions
} from '../../types'
import RestManager from '../rest/RestManager'
import EventManager from './Events/EventManager'
import PollingManager from './PollingManager'
import PhotoSize from '../structures/PhotoSize'
import File from '../structures/File'
import { dateToUnix, toCamelCase, unixToDate } from '../utils/converters'
import BotCommand from '../structures/BotCommand'
import InlineKeyboardMarkup from '../structures/InlineKeyboardMarkup'
import Poll from '../structures/Poll'
import Sticker from '../structures/Sticker'
import StickerSet from '../structures/StickerSet'
import User from '../structures/User'
import ChatMember from '../structures/ChatMember'
import ChatMemberOwner from '../structures/ChatMemberOwner'
import ChatMemberAdministrator from '../structures/ChatMemberAdministrator'
import ChatMemberMember from '../structures/ChatMemberMember'
import ChatMemberRestricted from '../structures/ChatMemberRestricted'
import ChatMemberLeft from '../structures/ChatMemberLeft'
import ChatMemberBanned from '../structures/ChatMemberBanned'
import WebhookManager from './WebhookManager'
import ForumTopic from '../structures/ForumTopic'
import InlineQueryResult from '../structures/InlineQueryResult'
import { toSnakeCase } from '../utils/converters'
import { EventEmitter } from 'events'
import { ChatAction, ReactionType, StickerFormat } from '../utils/enums'
import MenuButton from '../structures/MenuButton'
import MenuButtonDefault from '../structures/MenuButtonDefault'
import MenuButtonWebApp from '../structures/MenuButtonWebApp'
import MenuButtonCommands from '../structures/MenuButtonCommands'
import ChatInviteLink from '../structures/ChatInviteLink'
import BusinessConnection from 'structures/BusinessConnection'
import StarTransaction from 'structures/StarTransaction'
import ChatFull from 'structures/ChatFull'

export default class Client extends EventEmitter {
	options: ClientOptions
	token?: string
	rest: RestManager
	polling: PollingManager
	eventManager: EventManager
	webhook: WebhookManager

	constructor(options: ClientOptions = {}) {
		super()

		this.options = options
		this.token = options.token ?? process.env.TELEGRAM_TOKEN
		this.rest = new RestManager(this)
		this.polling = new PollingManager(this, options.polling)
		this.eventManager = new EventManager(this)
		this.webhook = new WebhookManager(this, options.webhook)
	}

	/**
	 * Receive incoming updates using long polling.
	 * You can get all updates in events if you are using `client.polling.start()`
	 */
	async getUpdates() {
		return await this.rest.request('getUpdates')
	}
	

	// Methods

	/**
	 * Returns basic information about the bot in form of a User instance.
	 */
	async getMe() {
		const userData = await this.rest.request('getMe')
		
		return new ClientUser(this, userData)
	}

	/**
	 * Use this method to log out from the cloud Bot API server before launching the bot locally.
	 * You **must** log out the bot before running it locally,
	 * otherwise there is no guarantee that the bot will receive updates.
	 * After a successful call, you can immediately log in on a local server,
	 * but will not be able to log in back to the cloud Bot API server for 10 minutes.
	 */
	async logOut(): Promise<void> {
		await this.rest.request('logOut')
	}

	/**
	 * Use this method to close the bot instance before moving it from one local server to another.
	 * You need to delete the webhook before calling this method to ensure
	 * that the bot isn't launched again after server restart.
	 * The method will return error 429 in the first 10 minutes after the bot is launched.
	 */
	async close(): Promise<void> {
		await this.rest.request('close')
	}
	
	/**
	 * Send text message.
	 * @param chatId Unique identifier for the target chat or username of the target channel
	 *               (in the format `@channelusername`)
	 * @param text Text of the message to be sent, 1-4096 characters after entities parsing
	 * @param options The options to provide
	 * @returns The sent message
     * 
     * @example
     * // Send basic message
     * const message = await client.sendMessage('@timnikolsky', 'Hello!')
     * console.log(`Sent message with content: ${message.text}`)
	 */
	async sendMessage(chatId: ChatId, text: string, options?: TextMessageSendOptions): Promise<Message> {
		const messageData = await this.rest.request('sendMessage', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			text,
			parse_mode: options?.parseMode,
			entities: options?.entities?.map((entity) => entity.toJSON()),
			disable_web_page_preview: options?.disableWebPagePreview,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	/**
	 * Forward message of any kind.
     * Service messages can't be forwarded.
	 * @param fromChatId Unique identifier for the chat where the original message was sent
	 *                   (in the format `@channelusername`)
	 * @param messageId Message identifier in the chat specified in `fromChatId`
     * @param chatId Unique identifier for the target chat or username of the target channel
	 *               (in the format `@channelusername`)
	 * @param options The options to provide
	 * @returns The sent message
     */
	async forwardMessage(
		fromChatId: ChatId,
		messageId: number,
		chatId: ChatId,
		options?: MessageForwardOptions
	): Promise<Message> {
		const messageData = await this.rest.request('forwardMessage', {
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			from_chat_id: fromChatId,
			message_id: messageId,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent
		})

		return new Message(this, messageData)
	}

	/**
	 * Copy message of any kind.
	 * Service messages and invoice messages can't be copied.
	 * A quiz poll can be copied only if the value of the field 'correctOptionId' is known to the bot.
	 * The method is analogous to the method forwardMessage, but the copied message doesn't have a link
	 * to the original message.
	 */
	async copyMessage(
		fromChatId: ChatId,
		messageId: number,
		chatId: ChatId,
		options?: MessageCopyOptions
	): Promise<number> {
		const messageCopiedId = await this.rest.request('copyMessage', {
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			from_chat_id: fromChatId,
			message_id: messageId,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup
		})

		return messageCopiedId
	}

	async sendPhoto(chatId: ChatId, photo: InputFile, options?: PhotoMessageSendOptions) {
		const messageData = await this.rest.request('sendPhoto', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			photo,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			has_spoiler: options?.hasSpoiler,
			caption_entities: options?.captionEntities?.map((entity) => entity.toJSON()),
			disable_web_page_preview: options?.disableWebPagePreview,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendAudio(chatId: ChatId, audio: InputFile, options?: AudioMessageSendOptions) {
		const messageData = await this.rest.request('sendAudio', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			audio,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities?.map((entity) => entity.toJSON()),
			duration: options?.duration,
			performer: options?.performer,
			title: options?.title,
			thumbnail: options?.thumbnail,
			disable_web_page_preview: options?.disableWebPagePreview,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendDocument(chatId: ChatId, document: InputFile, options?: DocumentMessageSendOptions) {
		const messageData = await this.rest.request('sendDocument', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			document,
			thumbnail: options?.thumbnail,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities?.map((entity) => entity.toJSON()),
			disable_web_page_preview: options?.disableWebPagePreview,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendVideo(chatId: ChatId, video: InputFile, options?: VideoMessageSendOptions) {
		const messageData = await this.rest.request('sendVideo', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			video,
			duration: options?.duration,
			width: options?.width,
			height: options?.height,
			thumbnail: options?.thumbnail,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities?.map((entity) => entity.toJSON()),
			has_spoiler: options?.hasSpoiler,
			supports_streaming: options?.supportsStreaming,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendAnimation(chatId: ChatId, animation: InputFile, options?: AnimationMessageSendOptions) {
		const messageData = await this.rest.request('sendAnimation', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			animation,
			duration: options?.duration,
			width: options?.width,
			height: options?.height,
			thumbnail: options?.thumbnail,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities?.map((entity) => entity.toJSON()),
			has_spoiler: options?.hasSpoiler,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendVoice(chatId: ChatId, voice: InputFile, options?: VoiceMessageSendOptions) {
		const messageData = await this.rest.request('sendVoice', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			voice,
			caption: options?.caption,
			parse_mode: options?.parseMode,
			caption_entities: options?.captionEntities?.map((entity) => entity.toJSON()),
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendVideoNote(chatId: ChatId, videoNote: InputFile, options?: VideoNoteMessageSendOptions) {
		const messageData = await this.rest.request('sendVideoNote', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			video_note: videoNote,
			duration: options?.duration,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendMediaGroup(
		chatId: ChatId,
		media: Exclude<InputMedia, InputMediaAnimation>[],
		options?: MediaGroupMessageSendOptions
	) {
		const messagesData = await this.rest.request('sendMediaGroup', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			media: media.map((media) => ({
				type: media.type,
				media: media.media,
				thumbnail: 'thumbnail' in media ? media.thumbnail : undefined,
				caption: media.caption,
				parse_mode: media.parseMode,
				caption_entities: media.captionEntities?.map((entity: any) => entity.toJSON()),
				width: 'width' in media ? media.width : undefined,
				height: 'height' in media ? media.height : undefined,
				duration: 'duration' in media ? media.duration : undefined,
				performer: 'performer' in media ? media.performer : undefined,
				title: 'title' in media ? media.title : undefined,
				supports_streaming: 'supportsStreaming' in media ? media.supportsStreaming : undefined,
				disable_content_type_detection: 'disableContentTypeDetection' in media ? media.disableContentTypeDetection : undefined,
				has_spoiler: 'hasSpoiler' in media ? media.hasSpoiler : undefined
			})),
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId
		})

		return messagesData.map((messageData: any) => new Message(this, messageData))
	}

	async sendLocation(chatId: ChatId, latitude: number, longitude: number, options?: LocationMessageSendOptions) {
		const messageData = await this.rest.request('sendLocation', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			latitude,
			longitude,
			horizontal_accuracy: options?.horizontalAccuracy,
			live_period: options?.livePeriod,
			heading: options?.heading,
			proximity_alert_radius: options?.proximityAlertRadius,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	// TODO
	// async editMessageLiveLocation(
	// 	chatId: ChatId,
	// 	messageId: number,
	// 	latitude: number,
	// 	longitude: number,
	// 	options?:
	// 	LocationMessageSendOptions
	// ) {
	// 	const messageData = await this.rest.request('sendVideo', {
	// 		chat_id: chatId,
	// 		message_thread_id: options?.forumTopicId,
	// 		latitude,
	// 		longitude,
	// 		horizontal_accuracy: options?.horizontalAccuracy,
	// 		live_period: options?.livePeriod,
	// 		heading: options?.heading,
	// 		proximity_alert_radius: options?.proximityAlertRadius,
	// 		disable_notification: options?.disableNotification,
	// 		protect_content: options?.protectContent,
	// 		reply_to_message_id: options?.replyToMessageId,
	// 		allow_sending_without_reply: options?.allowSendingWithoutReply,
	// 		reply_markup: options?.replyMarkup?.toJSON()
	// 	})
	//
	// 	return new Message(this, messageData)
	// }

	// async stopMessageLiveLocation(chatId: ChatId, messageId: number, options?: LocationMessageSendOptions) {

	/** 
	 * Send information about a venue.
	 * @param chatId Unique identifier for the target chat or username
	 *               of the target channel (in the format `@channelusername`)
	 * @param venue Venue coordinates and info
	 * @param options The options to provide
	 * @returns The sent message
	 */
	async sendVenue(chatId: ChatId, venue: VenueOptions, options?: VenueMessageSendOptions) {
		const messageData = await this.rest.request('sendVenue', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			latitude: venue.latitude,
			longitude: venue.longitude,
			title: venue.title,
			address: venue.address,
			foursquare_id: options?.foursquareId,
			foursquare_type: options?.foursquareType,
			google_place_id: options?.googlePlaceId,
			google_place_type: options?.googlePlaceType,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	/** 
	 * Send phone contacts.
	 * @param chatId Unique identifier for the target chat or username
	 *               of the target channel(in the format `@channelusername`)
	 * @param contact Contact info
	 * @param options The options to provide
	 * @returns The sent message
	 */
	async sendContact(chatId: ChatId, contact: ContactOptions, options?: ContactMessageSendOptions) {
		const messageData = await this.rest.request('sendContact', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			phone_number: contact.phoneNumber,
			first_name: contact.firstName,
			last_name: contact.lastName,
			vcard: options?.vcard,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	/** 
	 * Send a native poll.
	 * @param chatId Unique identifier for the target chat or username
	 *               of the target channel (in the format `@channelusername`)
	 * @param poll Poll configuration
	 * @param options The options to provide
	 * @returns The sent message
	 */
	async sendPoll(chatId: ChatId, poll: PollOptions, options?: PollMessageSendOptions) {
		const messageData = await this.rest.request('sendPoll', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			question: poll.question,
			options: poll.options,
			is_anonymous: options?.isAnonymous,
			type: options?.type,
			allows_multiple_answers: options?.allowsMultipleAnswers,
			correct_option_id: options?.correctOptionId,
			explanation: options?.explanation,
			explanation_parse_mode: options?.explanationParseMode,
			explanation_entities:
				options?.explanationEntities && options?.explanationEntities.map((entity) => entity.toJSON()),
			open_period: options?.openPeriod,
			close_date: options?.closeDate,
			is_closed: options?.isClosed,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	/** 
	 * Send an animated emoji that will display a random value.
	 * @param chatId Unique identifier for the target chat or username
	 *               of the target channel (in the format `@channelusername`)
	 * @param emoji Emoji on which the dice throw animation is based.
	 * @param options The options to provide
	 * @returns The sent message
	 */
	async sendDice(chatId: ChatId, emoji?: DiceEmoji, options?: DiceMessageSendOptions) {
		const messageData = await this.rest.request('sendDice', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			dice: emoji,
			disable_notification: options?.disableNotification,
			protect_content: options?.protectContent,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async sendChatAction(chatId: ChatId, action: ChatAction, options?: ChatActionSendOptions) {
		await this.rest.request('sendChatAction', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_thread_id: options?.forumTopicId,
			action: toSnakeCase(action)
		})
	}

	async setMessageReaction(chatId: ChatId, messageId: number, reaction?: Reaction[], options?: MessageReactionSetOptons) {
		const reactionData = reaction?.map((r) => {
			if (r.type === ReactionType.Emoji) {
				return {
					type: toSnakeCase(r.type),
					emoji: r.emoji
				}
			} else if (r.type === ReactionType.CustomEmoji) {
				return {
					type: toSnakeCase(r.type),
					custom_emoji_id: r.customEmojiId
				}
			}
		})

		await this.rest.request('setMessageReaction', {
			chat_id: chatId,
			message_id: messageId,
			reaction: reactionData,
			is_big: options?.isBig
		})
	}

	async getUserProfilePhotos(userId: number, options?: UserProfilePhotosGetOptions): Promise<UserProfilePhotos> {
		const userProfilePhotosData = await this.rest.request('getUserProfilePhotos', {
			user_id: userId,
			offset: options?.offset,
			limit: options?.limit
		})

		return {
			totalCount: userProfilePhotosData.total_count,
			photos: userProfilePhotosData.photos.map((photoSizes: any[]) =>
				photoSizes.map((photoSize) => new PhotoSize(this, photoSize))
			)
		}
	}

	async getFile(fileId: string) {
		const fileData = await this.rest.request('getFile', {
			file_id: fileId
		})

		return new File(this, fileData)
	}

	async banChatMember(chatId: ChatId, userId: number, options?: ChatMemberBanOptions) {
		await this.rest.request('banChatMember', {
			chat_id: chatId,
			user_id: userId,
			until_date: options?.untilDate,
			revoke_messages: options?.revokeMessages
		})
	}

	async unbanChatMember(chatId: ChatId, userId: number, options?: ChatMemberUnbanOptions) {
		await this.rest.request('unbanChatMember', {
			chat_id: chatId,
			user_id: userId,
			only_if_banned: options?.onlyIfBanned
		})
	}

	async restrictChatMember(
		chatId: ChatId,
		userId: number,
		permissions: ChatPermissions,
		options?: ChatMemberRestrictOptions
	) {
		await this.rest.request('restrictChatMember', {
			chat_id: chatId,
			user_id: userId,
			permissions: {
				...Object.keys(permissions).map((key) => ({
					[toSnakeCase(key)]: permissions[key as keyof ChatPermissions]
				}))
			},
			until_date: options?.untilDate
		})
	}

	/**
	 * Use this method to promote or demote a user in a supergroup or a channel.
	 * The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights.
	 * Pass *false* for all boolean parameters to demote a user.
	 */
	async promoteChatMember(chatId: ChatId, userId: number, options?: ChatMemberPromoteOptions) {
		await this.rest.request('restrictChatMember', {
			chat_id: chatId,
			user_id: userId,
			is_anonymous: options?.isAnonymous,
			can_manage_chat: options?.canManageChat,
			can_post_messages: options?.canPostMessages,
			can_edit_messages: options?.canEditMessages,
			can_delete_messages: options?.canDeleteMessages,
			can_manage_video_chats: options?.canManageVideoChats,
			can_restrict_members: options?.canRestrictMembers,
			can_promote_members: options?.canPromoteMembers,
			can_change_info: options?.canChangeInfo,
			can_invite_users: options?.canInviteUsers,
			can_pin_messages: options?.canPinMessages,
			can_manage_topics: options?.canManageTopics
		})
	}

	async setChatAdministratorCustomTitle(chatId: ChatId, userId: number, customTitle: string) {
		await this.rest.request('setChatAdministratorCustomTitle', {
			chat_id: chatId,
			user_id: userId,
			custom_title: customTitle
		})
	}

	async banChatSenderChat(chatId: ChatId, senderId: number) {
		await this.rest.request('banChatSenderChat', {
			chat_id: chatId,
			sender_id: senderId
		})
	}

	async unbanChatSenderChat(chatId: ChatId, senderId: number) {
		await this.rest.request('unbanChatSenderChat', {
			chat_id: chatId,
			sender_id: senderId
		})
	}

	async setChatPermissions(chatId: ChatId, permissions: ChatPermissions) {
		await this.rest.request('setChatPermissions', {
			chat_id: chatId,
			permissions
		})
	}

	async exportChatInviteLink(chatId: ChatId) {
		await this.rest.request('exportChatInviteLink', {
			chat_id: chatId
		})
	}

	async createChatInviteLink(chatId: ChatId, options?: ChatInviteLinkCreateOptions) {
		const chatInviteLinkData = await this.rest.request('createChatInviteLink', {
			chat_id: chatId,
			name: options?.name,
			expire_date: options?.expireDate && dateToUnix(options.expireDate),
			member_limit: options?.memberLimit,
			creates_join_request: options?.createsJoinRequest
		})
		
		return new ChatInviteLink(this, chatInviteLinkData)
	}

	async editChatInviteLink(chatId: ChatId, inviteLink: string, options?: ChatInviteLinkEditOptions) {
		const chatInviteLinkData = await this.rest.request('editChatInviteLink', {
			chat_id: chatId,
			invite_link: inviteLink,
			name: options?.name,
			expire_date: options?.expireDate && dateToUnix(options.expireDate),
			member_limit: options?.memberLimit,
			creates_join_request: options?.createsJoinRequest
		})
		
		return new ChatInviteLink(this, chatInviteLinkData)
	}

	async revokeChatInviteLink(chatId: ChatId, inviteLink: string) {
		const chatInviteLinkData = await this.rest.request('revokeChatInviteLink', {
			chat_id: chatId,
			invite_link: inviteLink
		})
		
		return new ChatInviteLink(this, chatInviteLinkData)
	}

	async approveChatJoinRequest(chatId: ChatId, userId: number) {
		await this.rest.request('approveChatJoinRequest', {
			chat_id: chatId,
			user_id: userId
		})
	}

	async declineChatJoinRequest(chatId: ChatId, userId: number) {
		await this.rest.request('declineChatJoinRequest', {
			chat_id: chatId,
			user_id: userId
		})
	}

	async setChatPhoto(chatId: ChatId, photo: InputFile) {
		await this.rest.request('setChatPhoto', {
			chat_id: chatId,
			photo: photo
		})
	}

	async deleteChatPhoto(chatId: ChatId) {
		await this.rest.request('deleteChatPhoto', {
			chat_id: chatId
		})
	}

	async setChatTitle(chatId: ChatId, title: string) {
		await this.rest.request('setChatTitle', {
			chat_id: chatId,
			title: title
		})
	}

	async setChatDescription(chatId: ChatId, description: string) {
		await this.rest.request('setChatDescription', {
			chat_id: chatId,
			description: description
		})
	}

	async pinChatMessage(chatId: ChatId, messageId: number, options?: ChatMessagePinOptions) {
		await this.rest.request('pinChatMessage', {
			chat_id: chatId,
			message_id: messageId,
			disable_notification: options?.disableNotification
		})
	}

	async unpinChatMessage(chatId: ChatId, messageId?: number) {
		await this.rest.request('unpinChatMessage', {
			chat_id: chatId,
			message_id: messageId
		})
	}

	async unpinAllChatMessages(chatId: ChatId) {
		await this.rest.request('unpinAllChatMessages', {
			chat_id: chatId
		})
	}

	async leaveChat(chatId: ChatId) {
		await this.rest.request('leaveChat', {
			chat_id: chatId
		})
	}

	async getChat(chatId: ChatId): Promise<ChatFull> {
		const chatData = await this.rest.request('getChat', {
			chat_id: chatId
		})

		return new ChatFull(this, chatData)
	}

	async getChatAdministrators(chatId: ChatId) {
		const chatAdministratorsData = await this.rest.request('getChatAdministrators', {
			chat_id: chatId
		})

		return chatAdministratorsData.map((chatAdministratorData: any) => new ChatMember(this, chatAdministratorData))
	}

	async getChatMemberCount(chatId: ChatId): Promise<number> {
		return await this.rest.request('getChatMemberCount', {
			chat_id: chatId
		})
	}

	async getChatMember(chatId: ChatId, userId: number): Promise<ChatMember> {
		const chatMemberData = await this.rest.request('getChatMember', {
			chat_id: chatId,
			user_id: userId
		})

		switch (chatMemberData.status) {
			case 'owner':
				return new ChatMemberOwner(this, chatMemberData)
			case 'administrator':
				return new ChatMemberAdministrator(this, chatMemberData)
			case 'member':
				return new ChatMemberMember(this, chatMemberData)
			case 'restricted':
				return new ChatMemberRestricted(this, chatMemberData)
			case 'left':
				return new ChatMemberLeft(this, chatMemberData)
			case 'banned':
				return new ChatMemberBanned(this, chatMemberData)
			default:
				return new ChatMember(this, chatMemberData)
		}
	}

	async setChatStickerSet(chatId: ChatId, stickerSetName: string) {
		await this.rest.request('setChatStickerSet', {
			chat_id: chatId,
			sticker_set_name: stickerSetName
		})
	}

	async deleteChatStickerSet(chatId: ChatId) {
		await this.rest.request('deleteChatStickerSet', {
			chat_id: chatId
		})
	}

	async getForumTopicIconStickers() {
		return (await this.rest.request('getForumTopicIconStickers')).map(
			(stickerData: any) => new Sticker(this, stickerData)
		)
	}

	async createForumTopic(chatId: ChatId, name: string, options: ForumTopicCreateOptions) {
		const forumTopicData = await this.rest.request('createForumTopic', {
			chat_id: chatId,
			name: name,
			icon_color: options.iconColor,
			icon_custom_emoji_id: options.iconCustomEmojiId
		})

		return new ForumTopic(this, forumTopicData)
	}

	async editForumTopic(chatId: ChatId, forumTopicId: number, options: ForumTopicEditOptions) {
		await this.rest.request('editForumTopic', {
			chat_id: chatId,
			message_thread_id: forumTopicId,
			name: options.name,
			icon_custom_emoji_id: options.iconCustomEmojiId
		})
	}

	async closeForumTopic(chatId: ChatId, forumTopicId: number) {
		await this.rest.request('closeForumTopic', {
			chat_id: chatId,
			message_thread_id: forumTopicId
		})
	}

	async reopenForumTopic(chatId: ChatId, forumTopicId: number) {
		await this.rest.request('reopenForumTopic', {
			chat_id: chatId,
			message_thread_id: forumTopicId
		})
	}

	async deleteForumTopic(chatId: ChatId, forumTopicId: number) {
		await this.rest.request('deleteForumTopic', {
			chat_id: chatId,
			message_thread_id: forumTopicId
		})
	}

	async unpinAllForumTopicMessages(chatId: ChatId, forumTopicId: number) {
		await this.rest.request('unpinAllForumTopicMessages', {
			chat_id: chatId,
			message_thread_id: forumTopicId
		})
	}

	async editGeneralForumTopic(chatId: ChatId, options: GeneralForumTopicEditOptions) {
		await this.rest.request('editGeneralForumTopic', {
			chat_id: chatId,
			name: options.name
		})
	}

	async closeGeneralForumTopic(chatId: ChatId) {
		await this.rest.request('closeGeneralForumTopic', {
			chat_id: chatId
		})
	}

	async reopenGeneralForumTopic(chatId: ChatId) {
		await this.rest.request('reopenGeneralForumTopic', {
			chat_id: chatId
		})
	}

	async hideGeneralForumTopic(chatId: ChatId) {
		await this.rest.request('hideGeneralForumTopic', {
			chat_id: chatId
		})
	}

	async unhideGeneralForumTopic(chatId: ChatId) {
		await this.rest.request('unhideGeneralForumTopic', {
			chat_id: chatId
		})
	}

	async unpinAllGeneralForumTopicMessages(chatId: ChatId) {
		await this.rest.request('unpinAllGeneralForumTopicMessages', {
			chat_id: chatId
		})
	}

	async answerCallbackQuery(callbackQueryId: string, options?: CallbackQueryAnswerOptions) {
		await this.rest.request('answerCallbackQuery', {
			callback_query_id: callbackQueryId,
			text: options?.text,
			show_alert: options?.showAlert,
			url: options?.url,
			cache_time: options?.cacheTime
		})
	}

	async getUserChatBoosts(chatId: ChatId, userId: number): Promise<UserChatBoosts> {
		const userChatBoostsData = await this.rest.request('getUserChatBoosts', {
			chat_id: chatId,
			user_id: userId
		})

		return {
			boosts: userChatBoostsData.boosts.map(
				(boostData: any) => ({
					boostId: boostData.boost_id,
					addDate: unixToDate(boostData.add_date),
					expirationDate: unixToDate(boostData.expiration_date),
					// TODO
					source: boostData.source
				})
			)
		}
	}

	async getBusinessConnection(businessConnectionId: string) {
		const businessConnectionData = await this.rest.request('getBusinessConnection', {
			business_connection_id: businessConnectionId
		})

		return new BusinessConnection(this, businessConnectionData)
	}

	async setMyCommands(commands: BotCommand[], options?: MyCommandsSetOptions) {
		await this.rest.request('setMyCommands', {
			commands: commands,
			scope: options?.scope && {
				type: toSnakeCase(options.scope.type),
				// @ts-expect-error
				chat_id: options.scope.chatId,
				// @ts-expect-error
				user_id: options.scope.userId
			},
			language_code: options?.languageCode
		})
	}

	async deleteMyCommands(options?: MyCommandsDeleteOptions) {
		await this.rest.request('deleteMyCommands', {
			scope: options?.scope && {
				type: toSnakeCase(options.scope.type),
				// @ts-expect-error
				chat_id: options.scope.chatId,
				// @ts-expect-error
				user_id: options.scope.userId
			},
			language_code: options?.languageCode
		})
	}

	async getMyCommands(options?: MyCommandsGetOptions) {
		const myCommandsData = await this.rest.request('getMyCommands', {
			scope: options?.scope && {
				type: toSnakeCase(options.scope.type),
				// @ts-expect-error
				chat_id: options.scope.chatId,
				// @ts-expect-error
				user_id: options.scope.userId
			},
			language_code: options?.languageCode
		})

		return myCommandsData
	}

	/**
	 * Change the bot's name
	 * 
	 * @param name New bot name; 0-64 characters.
	 *             Pass an empty string to remove the dedicated name for the given language.
	 * @param languageCode A two-letter ISO 639-1 language code. If empty, the name
	 *                     will be shown to all users for whose language there is no dedicated name.
	 */
	async setMyName(name?: string, languageCode?: string) {
		await this.rest.request('setMyName', {
			name,
			language_code: languageCode
		})
	}

	/**
	 * Get the current bot name for the given user language
	 * 
	 * @param languageCode A two-letter ISO 639-1 language code or an empty string
	 * @returns Bot's name
	 */
	async getMyName(languageCode?: string) {
		const nameData = await this.rest.request('getMyName', {
			language_code: languageCode
		})

		return nameData.name
	}

	/**
	 * Change the bot's description, which is shown in the chat with the bot if the chat is empty
	 * 
	 * @param description New bot description; 0-512 characters.
	 *                    Pass an empty string to remove the dedicated description for the given language.
	 * @param languageCode A two-letter ISO 639-1 language code. If empty, the description
	 *                     will be applied to all users for whose language there is no dedicated description.
	 */
	async setMyDescription(description?: string, languageCode?: string) {
		await this.rest.request('setMyDescription', {
			description,
			language_code: languageCode
		})
	}

	/**
	 * Get the current bot description for the given user language
	 * 
	 * @param languageCode A two-letter ISO 639-1 language code or an empty string
	 * @returns Bot's description
	 */
	async getMyDescription(languageCode?: string) {
		const descriptionData = await this.rest.request('getMyDescription', {
			language_code: languageCode
		})

		return descriptionData.description
	}

	/**
	 * Change the bot's short description, which is shown on the bot's profile page
	 * and is sent together with the link when users share the bot
	 * 
	 * @param description New short description for the bot; 0-120 characters.
	 *                    Pass an empty string to remove the dedicated short description for the given language.
	 * @param languageCode A two-letter ISO 639-1 language code. If empty, the short description
	 *                     will be applied to all users for whose language there is no dedicated short description.
	 */
	async setMyShortDescription(shortDescription?: string, languageCode?: string) {
		await this.rest.request('setMyShortDescription', {
			short_description: shortDescription,
			language_code: languageCode
		})
	}

	/**
	 * Get the current bot short description for the given user language
	 * 
	 * @param languageCode A two-letter ISO 639-1 language code or an empty string
	 * @returns Bot's short description
	 */
	async getMyShortDescription(languageCode?: string) {
		const shortDescriptionData = await this.rest.request('getMyDescription', {
			language_code: languageCode
		})

		return shortDescriptionData.short_description
	}

	/**
	 * Change the bot's menu button in a private chat, or the default menu button.
	 * 
	 * @param chatId Unique identifier for the target private chat.
	 *               If not specified, default bot's menu button will be changed
	 * @param menuButton Bot's new menu button. Defaults to *MenuButtonDefault*.
	 */
	async setChatMenuButton(chatId?: ChatId, menuButton?: MenuButton) {
		await this.rest.request('setChatMenuButton', {
			chat_id: chatId,
			menu_button: menuButton?.toJSON() ?? new MenuButtonDefault().toJSON()
		})
	}

	/**
	 * Get the current value of the bot's menu button in a private chat, or the default menu button.
	 * 
	 * @param chatId Unique identifier for the target private chat.
	 *               If not specified, default bot's menu button will be returned
	 */
	async getChatMenuButton(chatId?: ChatId): Promise<MenuButton> {
		const menuButtonData = await this.rest.request('getChatMenuButton', {
			chat_id: chatId
		})

		switch (menuButtonData.type) {
			case 'commands':
				return new MenuButtonCommands()
			case 'web_app':
				return new MenuButtonWebApp({
					text: menuButtonData.text,
					webApp: {
						url: menuButtonData.web_app.url
					}
				}) 
			case 'default':
				return new MenuButtonDefault()
			default:
				return new MenuButton(menuButtonData.type)
		}
	}

	/**
	 * Change the default administrator rights requested by the bot
	 * when it's added as an administrator to groups or channels.
	 * These rights will be suggested to users, but they are free to modify the list before adding the bot.
	 * 
	 * @param rights Object describing new default administrator rights.
	 *               If not specified, the default administrator rights will be cleared.
	 */
	async setMyDefaultAdministratorRights(
		rights: ChatAdministratorRights,
		options?: MyDefaultAdministratorRightsSetOptions
	) {
		await this.rest.request('setMyDefaultAdministratorRights', {
			rights: {
				is_anonymous: rights.isAnonymous,
				can_manage_chat: rights.canManageChat,
				can_delete_messages: rights.canDeleteMessages,
				can_manage_video_chats: rights.canManageVideoChats,
				can_restrict_members: rights.canRestrictMembers,
				can_promote_members: rights.canPromoteMembers,
				can_change_info: rights.canChangeInfo,
				can_invite_users: rights.canInviteUsers,
				can_post_messages: rights.canPostMessages,
				can_edit_messages: rights.canEditMessages,
				can_pin_messages: rights.canPinMessages
			},
			for_channels: options?.forChannels
		})
	}

	/**
	 * Get default administrator rights of the bot in channels.
	 */
	async getMyDefaultAdministratorRights(
		options?: MyDefaultAdministratorRightsSetOptions
	): Promise<ChatAdministratorRights> {
		const myDefaultAdministratorRightsData = await this.rest.request('getMyDefaultAdministratorRights', {
			for_channels: options?.forChannels
		})

		return {
			isAnonymous: myDefaultAdministratorRightsData.is_anonymous,
			canManageChat: myDefaultAdministratorRightsData.can_manage_chat,
			canDeleteMessages: myDefaultAdministratorRightsData.can_delete_messages,
			canManageVideoChats: myDefaultAdministratorRightsData.can_manage_video_chats,
			canRestrictMembers: myDefaultAdministratorRightsData.can_restrict_members,
			canPromoteMembers: myDefaultAdministratorRightsData.can_promote_members,
			canChangeInfo: myDefaultAdministratorRightsData.can_change_info,
			canInviteUsers: myDefaultAdministratorRightsData.can_invite_users,
			canPostMessages: myDefaultAdministratorRightsData.can_post_messages,
			canEditMessages: myDefaultAdministratorRightsData.can_edit_messages,
			canPinMessages: myDefaultAdministratorRightsData.can_pin_messages
		}
	}

	async editMessageText(chatId: ChatId, messageId: number, text: string, options?: MessageEditTextOptions) {
		const messageData = await this.rest.request('editMessageText', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_id: messageId,
			text,
			parse_mode: options?.parseMode,
			disable_web_page_preview: options?.disableWebPagePreview,
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})

		return new Message(this, messageData)
	}

	async editInlineMessageText(inlineMessageId: string, text: string, options?: MessageEditTextOptions) {
		await this.rest.request('editMessageText', {
			business_connection_id: options?.businessConnectionId,
			inline_message_id: inlineMessageId,
			text,
			parse_mode: options?.parseMode,
			disable_web_page_preview: options?.disableWebPagePreview,
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})
	}

	async editMessageCaption(
		chatId: ChatId,
		messageId: number,
		caption: string | null,
		options?: MessageEditCaptionOptions
	) {
		const messageData = await this.rest.request('editMessageCaption', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_id: messageId,
			caption: caption ?? undefined,
			parse_mode: options?.parseMode,
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})

		return new Message(this, messageData)
	}

	async editInlineMessageCaption(
		inlineMessageId: string,
		caption: string | null,
		options?: MessageEditCaptionOptions
	) {
		await this.rest.request('editMessageCaption', {
			business_connection_id: options?.businessConnectionId,
			inline_message_id: inlineMessageId,
			caption: caption ?? undefined,
			parse_mode: options?.parseMode,
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})
	}

	async editMessageMedia(chatId: ChatId, messageId: number, media: InputMedia, options?: MessageEditMediaOptions) {
		await this.rest.request('editMessageMedia', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_id: messageId,
			media: {
				type: media.type,
				media: media.media,
				thumbnail: 'thumbnail' in media ? media.thumbnail : undefined,
				caption: media.caption,
				parse_mode: media.parseMode,
				caption_entities: media.captionEntities?.map((entity: any) => entity.toJSON()),
				width: 'width' in media ? media.width : undefined,
				height: 'height' in media ? media.height : undefined,
				duration: 'duration' in media ? media.duration : undefined,
				performer: 'performer' in media ? media.performer : undefined,
				title: 'title' in media ?  media.title : undefined,
				supports_streaming: 'supportsStreaming' in media ? media.supportsStreaming : undefined,
				disable_content_type_detection: 'disableContentTypeDetection' in media
					? media.disableContentTypeDetection
					: undefined,
				has_spoiler: 'hasSpoiler' in media ? media.hasSpoiler : undefined
			},
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})
	}

	async editInlineMessageMedia(inlineMessageId: string, media: InputMedia, options?: MessageEditMediaOptions) {
		await this.rest.request('editMessageMedia', {
			business_connection_id: options?.businessConnectionId,
			inline_message_id: inlineMessageId,
			media: {
				type: media.type,
				media: media.media,
				thumbnail: 'thumbnail' in media ? media.thumbnail : undefined,
				caption: media.caption,
				parse_mode: media.parseMode,
				caption_entities: media.captionEntities?.map((entity: any) => entity.toJSON()),
				width: 'width' in media ? media.width : undefined,
				height: 'height' in media ? media.height : undefined,
				duration: 'duration' in media ? media.duration : undefined,
				performer: 'performer' in media ? media.performer : undefined,
				title: 'title' in media ?  media.title : undefined,
				supports_streaming: 'supportsStreaming' in media ? media.supportsStreaming : undefined,
				disable_content_type_detection: 'disableContentTypeDetection' in media
					? media.disableContentTypeDetection
					: undefined,
				has_spoiler: 'hasSpoiler' in media ? media.hasSpoiler : undefined
			},
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})
	}

	// editMessageLiveLocation
	// editInlineMessageLiveLocation

	// stopMessageLiveLocation
	// stopInlineMessageLiveLocation

	async editMessageReplyMarkup(chatId: ChatId, messageId: number, replyMarkup: InlineKeyboardMarkup, options?: MessageEditReplyMarkupOptions) {
		const messageData = await this.rest.request('editMessageReplyMarkup', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_id: messageId,
			reply_markup: replyMarkup.toJSON()
		})

		return new Message(this, messageData)
	}

	async editInlineMessageReplyMarkup(inlineMessageId: string, replyMarkup: InlineKeyboardMarkup, options?: MessageEditReplyMarkupOptions) {
		await this.rest.request('editMessageReplyMarkup', {
			business_connection_id: options?.businessConnectionId,
			inline_message_id: inlineMessageId,
			reply_markup: replyMarkup.toJSON()
		})
	}

	async stopPoll(chatId: ChatId, messageId: number, options?: PollStopOptions) {
		const pollData = await this.rest.request('stopPoll', {
			business_connection_id: options?.businessConnectionId,
			chat_id: chatId,
			message_id: messageId,
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})

		return new Poll(this, pollData)
	}

	async deleteMessage(chatId: ChatId, messageId: number) {
		await this.rest.request('deleteMessage', {
			chat_id: chatId,
			message_id: messageId
		})
	}

	async deleteMessages(chatId: ChatId, messageIds: number[]) {
		await this.rest.request('deleteMessages', {
			chat_id: chatId,
			message_ids: messageIds
		})
	}

	async sendSticker(chatId: ChatId, sticker: InputFile | string, options?: StickerSendOptions) {
		const messageData = await this.rest.request('sendSticker', {
			chat_id: chatId,
			sticker: sticker,
			emoji: options?.emoji,
			disable_notification: options?.disableNotification,
			reply_to_message_id: options?.replyToMessageId,
			reply_markup: options?.replyMarkup && options.replyMarkup.toJSON()
		})

		return new Message(this, messageData)
	}

	async getStickerSet(name: string) {
		const stickerSetData = await this.rest.request('getStickerSet', {
			name
		})

		return new StickerSet(this, stickerSetData)
	}

	async getCustomEmojiStickers(customEmojiIds: string[]) {
		const stickersData = await this.rest.request('getCustomEmojiStickers', {
			custom_emoji_ids: customEmojiIds
		})

		return stickersData.map((stickerData: any) => new Sticker(this, stickerData))
	}

	async uploadStickerFile(userId: number, sticker: InputFile, stickerFormat: StickerFormat) {
		const fileData = await this.rest.request('uploadStickerFile', {
			user_id: userId,
			sticker,
			sticker_format: toSnakeCase(stickerFormat)
		})

		return new File(this, fileData)
	}

	async createNewStickerSet(options: StickerSetCreateOptions) {
		await this.rest.request('createNewStickerSet', {
			user_id: options.userId,
			name: options.name,
			title: options.title,
			stickers: options.stickers.map((inputSticker) => ({
				sticker: inputSticker.sticker,
				emoji_list: inputSticker.emojiList,
				mask_position: inputSticker.maskPosition
					? {
						point: inputSticker.maskPosition.point,
						x_shift: inputSticker.maskPosition.xShift,
						y_shift: inputSticker.maskPosition.yShift,
						scale: inputSticker.maskPosition.scale
					}
					: undefined,
				keywords: inputSticker.keywords
			})),
			sticker_format: toSnakeCase(options.stickerFormat),
			sticker_type: toSnakeCase(options.stickerType),
			needs_repainting: options.needsRepainting
		})
	}

	async addStickerToSet(userId: number, name: string, sticker: InputSticker) {
		await this.rest.request('addStickerToSet', {
			user_id: userId,
			name,
			sticker: {
				sticker: sticker.sticker,
				emoji_list: sticker.emojiList,
				mask_position: sticker.maskPosition
					? {
						point: sticker.maskPosition.point,
						x_shift: sticker.maskPosition.xShift,
						y_shift: sticker.maskPosition.yShift,
						scale: sticker.maskPosition.scale
					}
					: undefined,
				keywords: sticker.keywords
			}
		})
	}

	async setStickerPositionInSet(sticker: string, position: number) {
		await this.rest.request('setStickerPositionInSet', {
			sticker,
			position
		})
	}

	async deleteStickerFromSet(sticker: string) {
		await this.rest.request('deleteStickerFromSet', {
			sticker
		})
	}

	async setStickerEmojiList(sticker: string, emojiList: string[]) {
		await this.rest.request('setStickerEmojiList', {
			sticker,
			emoji_list: emojiList
		})
	}

	async setStickerKeywords(sticker: string, keywords: string[]) {
		await this.rest.request('setStickerKeywords', {
			sticker,
			keywords
		})
	}

	async setStickerMaskPosition(sticker: string, maskPosition: MaskPosition) {
		await this.rest.request('setStickerMaskPosition', {
			sticker,
			mask_position: {
				point: maskPosition.point,
				x_shift: maskPosition.xShift,
				y_shift: maskPosition.yShift,
				scale: maskPosition.scale
			}
		})
	}

	async setStickerTitle(sticker: string, title: string) {
		await this.rest.request('setStickerTitle', {
			sticker,
			title
		})
	}

	async setStickerSetThumbnail(name: string, userId: number, thumbnail?: InputFile | string) {
		await this.rest.request('setStickerSetThumbnail', {
			name,
			user_id: userId,
			thumbnail
		})
	}

	async setCustomEmojiStickerSetThumbnail(name: string, customEmojiId?: string) {
		await this.rest.request('setCustomEmojiStickerSetThumbnail', {
			name,
			custom_emoji_id: customEmojiId
		})
	}

	async deleteStickerSet(name: string) {
		await this.rest.request('deleteStickerSet', {
			name
		})
	}

	// TODO
	// async answerInlineQuery(inlineQueryId: string, results: InlineQueryResult[], options: InlineQueryAnswerOptions) {
	// 	await this.rest.request('answerInlineQuery', {
	// 		inline_query_id: inlineQueryId,
	// 		results: ...,
	// 		cache_time: options.cacheTime,
	// 		is_personal: options.isPesonal,
	// 		next_offset: options.nextOffset,
	// 		button: options.button
	// 	})
	// }
 
	async answerWebAppQuery(webAppQueryId: string, result: InlineQueryResult) {
		await this.rest.request('answerWebAppQuery', {
			web_app_query_id: webAppQueryId,
			result: result.toJSON()
		})
	}

	async sendInvoice(chatId: ChatId, options: InvoiceSendOptions) {
		const messageData = await this.rest.request('sendInvoice', {
			chat_id: chatId,
			title: options.title,
			description: options.description,
			payload: options.payload,
			provider_token: options.providerToken,
			currency: options.currency,
			prices: options.prices,
			max_tip_amount: options.maxTipAmount,
			suggested_tip_amounts: options.suggestedTipAmounts,
			start_parameter: options.startParameter,
			provider_data: options.providerData,
			photo_url: options.photoUrl,
			photo_size: options.photoSize,
			photo_width: options.photoWidth,
			photo_height: options.photoHeight,
			need_name: options.needName,
			need_phone_number: options.needPhoneNumber,
			need_email: options.needEmail,
			need_shipping_address: options.needShippingAddress,
			send_phone_number_to_provider: options.sendPhoneNumberToProvider,
			send_email_to_provider: options.sendEmailToProvider,
			is_flexible: options.isFlexible,
			disable_notification: options.disableNotification,
			protect_content: options.protectContent,
			reply_to_message_id: options.replyToMessageId,
			allow_sending_without_reply: options.allowSendingWithoutReply,
			reply_markup: options.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	/**
	 * Create a link for an invoice.
	 * @returns The created invoice link
	 */
	async createInvoiceLink(options: InvoiceLinkCreateOptions): Promise<string> {
		return await this.rest.request('createInvoiceLink', {
			title: options.title,
			description: options.description,
			payload: options.payload,
			provider_token: options.providerToken,
			photo_url: options.photoUrl,
			photo_size: options.photoSize,
			photo_width: options.photoWidth,
			photo_height: options.photoHeight,
			need_name: options.needName,
			need_phone_number: options.needPhoneNumber,
			need_email: options.needEmail,
			need_shipping_address: options.needShippingAddress,
			send_phone_number_to_provider: options.sendPhoneNumberToProvider,
			send_email_to_provider: options.sendEmailToProvider,
			is_flexible: options.isFlexible
		})
	}

	async answerShippingQuery(shippingQueryId: string, ok: boolean, options: ShippingQueryAnswerOptions) {
		await this.rest.request('answerShippingQuery', {
			shipping_query_id: shippingQueryId,
			ok: ok,
			shipping_options: options.shippingOptions?.map((shippingOption) => ({
				id: shippingOption.id,
				title: shippingOption.title,
				prices: shippingOption.prices?.map((price) => ({
					label: price.label,
					amount: price.amount
				}))
			})),
			error_message: options?.errorMessage
		})
	}

	async answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, options?: PreCheckoutQueryAnswerOptions) {
		await this.rest.request('answerPreCheckoutQuery', {
			pre_checkout_query_id: preCheckoutQueryId,
			ok: ok,
			error_message: options?.errorMessage
		})
	}

	async getStarTransactions(options: StarTransactionsGetOptions): Promise<StarTransactions> {
		const starTransactionsData = await this.rest.request('getStarTransactions', {
			offset: options.offset,
			limit: options.limit
		})

		return {
			transactions: new StarTransaction(this, starTransactionsData.transactions)
		}
	}

	async refundStarPayment(userId: number, telegramPaymentChargeId: string) {
		await this.rest.request('refundStarPayment', {
			user_id: userId,
			telegram_payment_charge_id: telegramPaymentChargeId
		})
	}

	async setPassportDataErrors(userId: number, errors: PassportElementError[]) {
		await this.rest.request('setPassportDataErrors', {
			user_id: userId,
			errors: errors.map((error) => ({
				source: error.source,
				type: toSnakeCase(error.type),
				data_hash: 'dataHash' in error ? error.dataHash : undefined,
				file_hash: 'fileHash' in error ? error.fileHash : undefined,
				file_hashes: 'fileHashes' in error ? error.fileHashes : undefined,
				element_hash: 'elementHash' in error ? error.elementHash : undefined,
				message: error.message
			}))
		})
	}

	async sendGame(chatId: ChatId, gameShortName: string, options?: GameSendOptions) {
		const messageData = await this.rest.request('sendGame', {
			chat_id: chatId,
			game_short_name: gameShortName,
			disable_notification: options?.disableNotification,
			reply_to_message_id: options?.replyToMessageId,
			allow_sending_without_reply: options?.allowSendingWithoutReply,
			reply_markup: options?.replyMarkup?.toJSON()
		})

		return new Message(this, messageData)
	}

	async setGameScore(userId: number, score: number, options?: GameScoreSetOptions) {
		const messageData = await this.rest.request('setGameScore', {
			user_id: userId,
			score: score,
			disable_edit_message: options?.disableEditMessage,
			chat_id: options?.chatId,
			message_id: options?.messageId,
			inline_message_id: options?.inlineMessageId
		})

		if (messageData) {
			return new Message(this, messageData)
		}
	}

	async getGameHighScores(userId: number, options?: GameHighScoreGetOptions): Promise<GameHighScore[]> {
		const highScoresData = (await this.rest.request('getGameHighScores', {
			user_id: userId,
			chat_id: options?.chatId,
			message_id: options?.messageId,
			inline_message_id: options?.inlineMessageId
		})) as any[]

		const highScores = highScoresData.map((highScoreData: any) => ({
			position: highScoreData.position,
			user: new User(this, highScoreData.user),
			score: highScoreData.score
		}))

		return highScores
	}

	// Event handlers

	on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
		return super.on(event, listener)
	}

	once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => void) {
		return super.once(event, listener)
	}
}
