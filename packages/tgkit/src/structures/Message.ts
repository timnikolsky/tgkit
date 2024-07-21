import Client from '../client/Client'
import { ChatBoostAdded, ChatId, ChatMessagePinOptions, ExternalReplyInfo, ForumTopicClosed, ForumTopicCreated, ForumTopicEdited, ForumTopicReopened, GeneralForumTopicHidden, GeneralForumTopicUnhidden, GiveawayCompleted, GiveawayCreated, GiveawayWinners, InputMedia, LinkPreviewOptions, MessageAutoDeleteTimerChanged, MessageCopyOptions, MessageEditCaptionOptions, MessageEditMediaOptions, MessageEditTextOptions, MessageForwardOptions, MessageReactionSetOptons, PaidMediaInfo, PollStopOptions, ProximityAlertTriggered, Reaction, SuccessfulPayment, VideoChatEnded, VideoChatParticipantsInvited, VideoChatScheduled, VideoChatStarted, WriteAccessAlowed } from '../../types'
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
import TextQuote from './TextQuote'
import MessageOrigin from './MessageOrigin'
import Story from '../structures/Story'
import Invoice from '../structures/Invoice'
import Giveaway from '../structures/Giveaway'
import WebAppData from '../structures/WebAppData'
import { dateToUnix, toSnakeCase, unixToDate } from 'utils/converters'
import PaidMedia from '../structures/PaidMedia'
import { ReactionType } from 'utils/enums'

/** Represents a message */
export default class Message extends Base {
	/** Unique message identifier inside this chat */
	id: number

	/** Unique identifier of a message thread to which the message belongs; for supergroups only */
	threadId?: number

	/**
	 * Sender of the message; empty for messages sent to channels.
	 * For backward compatibility, the field contains a fake sender user in non-channel chats,
	 * if the message was sent on behalf of a chat.
	 */
	sender?: User

	/**
	 * Sender of the message, sent on behalf of a chat.
	 * For example, the channel itself for channel posts, the supergroup itself for messages from anonymous
	 * group administrators, the linked channel for messages automatically forwarded to the discussion group.
	 * For backward compatibility, the field `author` contains a fake sender user in non-channel chats,
	 * if the message was sent on behalf of a chat. 
	 */
	senderChat?: Chat

	/** If the sender of the message boosted the chat, the number of boosts added by the user */
	senderBoostCount?: number

	/**
	 * The bot that actually sent the message on behalf of the business account.
	 * Available only for outgoing messages sent on behalf of the connected business account.
	 */
	senderBusinessBot?: User

	/** Date the message was sent */
	date: Date

	/**
	 * Unique identifier of the business connection from which the message was received.
	 * If non-empty, the message belongs to a chat of the corresponding business account that is independent
	 * from any potential bot chat which might share the same identifier.
	 */
	businessConnectionId?: string

	/** Conversation the message belongs to */
	chat: Chat

	/** Information about the original message for forwarded messages */
	forwardOrigin?: MessageOrigin

	/** Whether the message is sent to a forum topic */
	isTopicMessage?: boolean

	/** Whether the message is a channel post that was automatically forwarded to the connected discussion group */
	isAutomaticForward?: boolean

	/**
	 * For replies in the same chat and message thread, the original message. Note that the Message
	 * in this field will not contain further `replyToMessage` fields even if it itself is a reply.
	 */
	replyToMessage?: Message

	/** Information about the message that is being replied to, which may come from another chat or forum topic */
	externalReply?: ExternalReplyInfo

	/** For replies that quote part of the original message, the quoted part of the message */
	quote?: TextQuote

	/** For replies to a story, the original story */
	replyToStory?: Story

	/** Bot through which the message was sent */
	viaBot?: User

	/** Date the message was last edited */
	editDate?: Date

	/** *true*, if the message can't be forwarded */
	hasProtectedContent?: boolean

	/**
	 * Whether the message was sent by an implicit action, for example,
	 * as an away or a greeting business message, or as a scheduled message
	 */
	isFromOffline?: boolean

	/** The unique identifier of a media message group this message belongs to */
	mediaGroupId?: string

	/**
	 * Signature of the post author for messages in channels,
	 * or the custom title of an anonymous group administrator
	 */
	authorSignature?: string

	/** For text messages, the actual UTF-8 text of the message */
	text?: string

	/** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
	entities?: MessageEntity[]

	/**
	 * Options used for link preview generation for the message,
	 * if it is a text message and link preview options were changed
	 */
	linkPreviewOptions: LinkPreviewOptions

	/** Unique identifier of the message effect added to the message */
	effectId?: string

	/**
	 * Message is an animation, information about the animation.
	 * For backward compatibility, when this field is set, the `document` field will also be set
	 */
	animation?: Animation

	/** Message is an audio file, information about the file */
	audio?: Audio

	/** Message is a general file, information about the file */
	document?: Document

	/** Message contains paid media; information about the paid media */
	paidMedia?: PaidMediaInfo

	/** Message is a photo, available sizes of the photo */
	photo?: PhotoSize[]

	/** Message is a sticker, information about the sticker */
	sticker?: Sticker

	/** Message is a forwarded story */
	story?: Story

	/** Message is a video, information about the video */
	video?: Video

	/** Message is a video note, information about the video message */
	videoNote?: VideoNote

	/** Message is a voice message, information about the file */
	voice?: Voice

	/** Caption for the animation, audio, document, photo, video or voice */
	caption?: string

	/**
	 * For messages with a caption, special entities like usernames,
	 * URLs, bot commands, etc. that appear in the caption
	 */
	captionEntities?: MessageEntity[]

	/** *true*, if the caption must be shown above the message media */
	showCaptionAboveMedia?: boolean

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

	/**
	 * Message is a venue, information about the venue.
	 * For backward compatibility, when this property is set, the `location` field will also be set
	 */
	venue?: Venue

	/** Message is a location, information about the location */
	location?: Location

	/**
	 * Service message.
	 * 
	 * New members that were added to the group or supergroup and information about them
	 * (the bot itself may be one of these members)
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
	invoice?: Invoice

	successfulPayment?: SuccessfulPayment

	userShared?: UserShared

	chatShared?: ChatShared

	/** The domain name of the website on which the user has logged in */
	connectedWebsite?: string

	writeAccessAllowed?: WriteAccessAlowed

	passportData: any
	// passportData: PassportData
	
	proximityAlertTriggered?: ProximityAlertTriggered

	boostAdded?: ChatBoostAdded

	chatBackgroundSet?: any
	// chatBackgroundSet?: ChatBackground

	forumTopicCreated?: ForumTopicCreated

	forumTopicEdited?: 	ForumTopicEdited
	
	forumTopicClosed?: ForumTopicClosed

	forumTopicReopened?: ForumTopicReopened

	generalForumTopicHidden?: GeneralForumTopicHidden

	generalForumTopicUnhidden?: GeneralForumTopicUnhidden

	giveawayCreated?: GiveawayCreated

	giveaway?: Giveaway

	giveawayWinners?: GiveawayWinners

	giveawayCompleted?: GiveawayCompleted

	videoChatScheduled?: VideoChatScheduled

	videoChatStarted?: VideoChatStarted

	videoChatEnded?: VideoChatEnded

	videoChatParticipantsInvited?: VideoChatParticipantsInvited

	webAppData?: WebAppData

	replyMarkup?: InlineKeyboardMarkup

	/**
	 * Utility property, does not come from Telegram Bot API. A message is considered a service message
	 * if it is not sent directly by the user, but is sent by Telegram as a result of some event.
	 * 
	 * Visually such messages appear not as regular message bubbles, but as centered text with no visible sender.
	 */
	get isService(): boolean {
		return Boolean(
			this.newChatMembers ||
			this.leftChatMember ||
			this.newChatTitle ||
			this.newChatPhoto ||
			this.deleteChatPhoto ||
			this.groupChatCreated ||
			this.superGroupChatCreated ||
			this.channelChatCreated ||
			this.messageAutoDeleteTimerChanged ||
			this.migrateToChatId ||
			this.migrateFromChatId ||
			this.pinnedMessage ||
			this.successfulPayment ||
			this.userShared ||
			this.chatShared ||
			this.connectedWebsite ||
			this.writeAccessAllowed ||
			this.passportData ||
			this.proximityAlertTriggered ||
			this.boostAdded ||
			this.chatBackgroundSet ||
			this.forumTopicCreated ||
			this.forumTopicEdited ||
			this.forumTopicClosed ||
			this.forumTopicReopened ||
			this.generalForumTopicHidden ||
			this.generalForumTopicUnhidden ||
			this.giveawayCreated ||
			this.giveawayWinners ||
			this.giveawayCompleted ||
			this.videoChatScheduled ||
			this.videoChatStarted ||
			this.videoChatEnded ||
			this.videoChatParticipantsInvited ||
			this.webAppData
		)
	}

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.message_id
		this.threadId = data.thread_id
		this.sender = data.from && new User(client, data.from)
		this.senderChat = data.sender_chat && new Chat(client, data.sender_chat)
		this.senderBoostCount = data.sender_boost_count
		this.senderBusinessBot = data.sender_business_bot && new User(client, data.sender_business_bot)
		this.date = new Date(data.date * 1000)
		this.businessConnectionId = data.business_connection_id
		this.chat = new Chat(client, data.chat)
		this.forwardOrigin = data.forward_origin && MessageOrigin.from(client, data.forward_origin)
		this.isTopicMessage = data.is_topic_message
		this.isAutomaticForward = data.is_automatic_forward
		this.replyToMessage = data.reply_to_message && new Message(client, data.reply_to_message)
		this.externalReply = data.external_reply && {
			origin: MessageOrigin.from(client, data.external_reply.origin),
			chat: data.external_reply.chat && new Chat(client, data.external_reply.chat),
			messageId: data.external_reply.message_id,
			linkPreviewOptions: data.external_reply.link_preview_options && {
				isDisabled: data.external_reply.link_preview_options.is_disabled,
				url: data.external_reply.link_preview_options.url,
				preferSmallMedia: data.external_reply.link_preview_options.prefer_small_media,
				preferLargeMedia: data.external_reply.link_preview_options.prefer_large_media,
				showAboveText: data.external_reply.link_preview_options.show_above_text
			},
			animation: data.external_reply.animation && new Animation(client, data.external_reply.animation),
			audio: data.external_reply.audio && new Audio(client, data.external_reply.audio),
			document: data.external_reply.document && new Document(client, data.external_reply.document),
			photo: data.external_reply.photo && data.external_reply.photo.map((photoData: any) => new PhotoSize(client, photoData)),
			sticker: data.external_reply.sticker && new Sticker(client, data.external_reply.sticker),
			story: data.external_reply.story && new Story(client, data.external_reply.story),
			video: data.external_reply.video && new Video(client, data.external_reply.video),
			videoNote: data.external_reply.video_note && new VideoNote(client, data.external_reply.video_note),
			voice: data.external_reply.voice && new Voice(client, data.external_reply.voice),
			hasMediaSpoiler: data.external_reply.has_media_spoiler,
			contact: data.external_reply.contact && new Contact(client, data.external_reply.contact),
			dice: data.external_reply.dice && new Dice(client, data.external_reply.dice),
			game: data.external_reply.game && new Game(client, data.external_reply.game),
			giveaway: data.external_reply.giveaway && new Giveaway(client, data.external_reply.giveaway),
			giveawayWinners: data.external_reply.giveaway_winners && {
				chat: new Chat(client, data.external_reply.giveaway_winners.chat),
				giveawayMessageId: data.external_reply.giveaway_winners.giveaway_message_id,
				winnersSelectionDate: dateToUnix(data.external_reply.giveaway_winners.winners_selection_date),
				winnerCount: data.external_reply.giveaway_winners.winner_count,
				winners: data.external_reply.giveaway_winners.winners.map((winnerData: any) => new User(client, winnerData)),
				additionalChatCount: data.external_reply.giveaway_winners.additional_chat_count,
				premiumSubscriptionMonthCount: data.external_reply.giveaway_winners.premium_subscription_month_count,
				unclaimedPrizeCount: data.external_reply.giveaway_winners.unclaimed_prize_count,
				onlyNewMembers: data.external_reply.giveaway_winners.only_new_members,
				wasRefunded: data.external_reply.giveaway_winners.was_refunded,
				prizeDescription: data.external_reply.giveaway_winners.prize_description
			}
		}
		this.quote = data.quote && new TextQuote(client, data.quote)
		this.replyToStory = data.reply_to_story && new Story(client, data.reply_to_story)
		this.viaBot = data.via_bot && new User(client, data.via_bot)
		this.editDate = unixToDate(data.edit_date)
		this.hasProtectedContent = data.has_protected_content
		this.mediaGroupId = data.media_group_id
		this.authorSignature = data.author_signature
		this.text = data.text
		this.entities = data.entities && data.entities.map(
			(entityData: any) => new MessageEntity(this.client, entityData)
		)
		this.linkPreviewOptions = data.link_preview_options && {
			isDisabled: data.link_preview_options.is_disabled,
			url: data.url,
			preferSmallMedia: data.prefer_small_media,
			preferLargeMedia: data.prefer_large_media,
			showAboveText: data.show_above_text
		}
		this.effectId = data.effect_id
		this.animation = data.animation && new Animation(this.client, data.animation)
		this.audio = data.audio && new Audio(this.client, data.audio)
		this.document = data.document && new Document(this.client, data.document)
		this.paidMedia = data.paid_media && {
			starCount: data.star_count,
			paidMedia: PaidMedia.from(client, data.paid_media)
		}
		this.photo = data.photo && data.photo.map((photoData: any) => new PhotoSize(this.client, photoData))
		this.sticker = data.sticker && new Sticker(this.client, data.sticker)
		this.story = data.story && new Story(this.client, data.story)
		this.video = data.video && new Video(this.client, data.video)
		this.videoNote = data.video_note && new VideoNote(this.client, data.video_note)
		this.voice = data.voice && new Voice(this.client, data.voice)
		this.caption = data.caption
		this.captionEntities =
			data.caption_entities &&
			data.caption_entities.map((entityData: any) => new MessageEntity(this.client, entityData))
		this.showCaptionAboveMedia = data.show_caption_above_media
		this.hasMediaSpoiler = data.has_media_spoiler
		this.contact = data.contact && new Contact(this.client, data.contact)
		this.dice = data.dice && new Dice(this.client, data.dice)
		this.game = data.game && new Game(this.client, data.game)
		this.poll = data.poll && new Poll(this.client, data.poll)
		this.venue = data.venue && new Venue(this.client, data.venue)
		this.location = data.location && new Location(this.client, data.location)
		this.newChatMembers = data.new_chat_members && data.new_chat_members.map((memberData: any) => new User(this.client, memberData))
		this.leftChatMember = data.left_chat_member && data.left_chat_member.map((memberData: any) => new User(this.client, memberData))
		this.newChatTitle = data.new_chat_title
		this.newChatPhoto = data.new_chat_photo && data.new_chat_photo.map(
			(photoData: any) => new PhotoSize(this.client, photoData)
		)
		this.deleteChatPhoto = data.delete_chat_photo
		this.groupChatCreated = data.group_chat_created
		this.superGroupChatCreated = data.supergroup_chat_created
		this.channelChatCreated = data.channel_chat_created
		this.messageAutoDeleteTimerChanged = data.message_auto_delete_timer_changed && {
			messageAutoDeleteTime: data.message_auto_delete_timer_changed.message_auto_delete_time
		}
		this.migrateToChatId = data.migrate_to_chat_id
		this.migrateFromChatId = data.migrate_from_chat_id
		this.pinnedMessage = data.pinned_message && new Message(this.client, data.pinned_message)
		this.invoice = data.invoice && new Invoice(this.client, data.invoice)
		this.successfulPayment = data.successful_payment && {
			currency: data.successful_payment.currency,
			totalAmount: data.successful_payment.total_amount,
			invoicePayload: data.successful_payment.invoice_payload,
			shippingOptionId: data.successful_payment.shipping_option_id,
			orderInfo: data.successful_payment.order_info && {
				name: data.successful_payment.order_info.name,
				phoneNumber: data.successful_payment.order_info.phone_number,
				email: data.successful_payment.order_info.email,
				shippingAddress: data.successful_payment.order_info.shipping_address && {
					countryCode: data.successful_payment.order_info.shipping_address.country_code,
					state: data.successful_payment.order_info.shipping_address.state,
					city: data.successful_payment.order_info.shipping_address.city,
					streetLine1: data.successful_payment.order_info.shipping_address.street_line1,
					streetLine2: data.successful_payment.order_info.shipping_address.street_line2,
					postCode: data.successful_payment.order_info.shipping_address.post_code
				}
			},
			telegramPaymentChargeId: data.successful_payment.telegram_payment_charge_id,
			providerPaymentChargeId: data.successful_payment.provider_payment_charge_id
		}
		this.userShared = data.user_shared && new UserShared(this.client, data.user_shared)
		this.chatShared = data.chat_shared && new ChatShared(this.client, data.chat_shared)
		this.connectedWebsite = data.connected_website
		this.writeAccessAllowed = data.write_access_allowed && {
			fromRequest: data.write_access_allowed.from_request,
			webAppName: data.write_access_allowed.web_app_name,
			fromAttachmentMenu: data.write_access_allowed.from_attachment_menu
		}
		// TODO
		this.passportData = data.passport_data
		this.proximityAlertTriggered = data.proximity_alert_triggered && {
			traveler: data.proximity_alert_triggered.traveler && new User(this.client, data.proximity_alert_triggered.traveler),
			watcher: data.proximity_alert_triggered.watcher && new User(this.client, data.proximity_alert_triggered.watcher),
			distance: data.proximity_alert_triggered.distance
		}
		this.boostAdded = data.boost_added && {
			boostCount: data.boost_added.boost_count
		}
		// TODO
		this.chatBackgroundSet = data.chat_background_set
		this.forumTopicCreated = data.forum_topic_created && {
			name: data.forum_topic_created.name,
			iconColor: data.forum_topic_created.icon_color,
			iconCustomEmojiId: data.forum_topic_created.icon_custom_emoji_id
		}
		this.forumTopicEdited = data.forum_topic_edited && {
			name: data.forum_topic_edited.name,
			iconCustomEmojiId: data.forum_topic_edited.icon_custom_emoji_id
		}
		this.forumTopicClosed = data.forum_topic_closed && {}
		this.forumTopicReopened = data.forum_topic_reopened && {}
		this.generalForumTopicHidden = data.general_forum_topic_hidden && {}
		this.generalForumTopicUnhidden = data.general_forum_topic_unhidden && {}
		this.giveawayCreated = data.giveaway_created && {}
		this.giveaway = data.giveaway && new Giveaway(this.client, data.giveaway)
		this.giveawayWinners = data.giveaway_winners && {
			chat: new Chat(this.client, data.giveaway_winners.chat),
			giveawayMessageId: data.giveaway_winners.giveaway_message_id,
			winnersSelectionDate: unixToDate(data.giveaway_winners.winners_selection_date),
			winnerCount: data.giveaway_winners.winner_count,
			winners: data.giveaway_winners.winners.map((winnerData: any) => new User(this.client, winnerData)),
			additionalChatCount: data.giveaway_winners.additional_chat_count,
			premiumSubscriptionMonthCount: data.giveaway_winners.premium_subscription_month_count,
			unclaimedPrizeCount: data.giveaway_winners.unclaimed_prize_count,
			onlyNewMembers: data.giveaway_winners.only_new_members,
			wasRefunded: data.giveaway_winners.was_refunded,
			prizeDescription: data.giveaway_winners.prize_description
		}
		this.giveawayCompleted = data.giveaway_completed && {
			winnerCount: data.giveaway_completed.winner_count,
			unclaimedPrizeCount: data.giveaway_completed.unclaimed_prize_count,
			giveawayMessage: data.giveaway_completed.giveaway_message && new Message(this.client, data.giveaway_completed.giveaway_message)
		}
		this.videoChatScheduled = data.video_chat_scheduled && {
			startDate: unixToDate(data.video_chat_scheduled.start_date)
		},
		this.videoChatStarted = data.video_chat_started && {}
		this.videoChatEnded = data.video_chat_ended && {
			duration: data.video_chat_ended.duration
		}
		this.videoChatParticipantsInvited = data.video_chat_participants_invited && {
			users: data.video_chat_participants_invited.users.map((userData: any) => new User(this.client, userData))
		}
		this.webAppData = data.web_app_data && new WebAppData(this.client, data.web_app_data)
		this.replyMarkup = data.reply_markup && new InlineKeyboardMarkup(data.reply_markup)
	}

	async forward(chatId: ChatId, options?: MessageForwardOptions) {
		await this.client.forwardMessage(this.chat.id, this.id, chatId, options)
	}

	/**
     * Copy message of any kind.
     * Service messages and invoice messages can't be copied.
     * A quiz poll can be copied only if the value of the field 'correctOptionId' is known to the bot.
     * The method is analogous to the method forwardMessage,
	 * but the copied message doesn't have a link to the original message.
     */
	async copy(chatId: ChatId, options?: MessageCopyOptions) {
		await this.client.copyMessage(this.chat.id, this.id, chatId, options)
	}

	async setReaction(reaction?: Reaction[], options?: MessageReactionSetOptons) {
		await this.client.setMessageReaction(this.chat.id, this.id, reaction, options)
	}

	async pin(options?: ChatMessagePinOptions) {
		await this.client.pinChatMessage(this.chat.id, this.id, options)
	}

	async unpin() {
		await this.client.unpinChatMessage(this.chat.id, this.id)
	}

	async editText(text: string, options?: MessageEditTextOptions) {
		await this.client.editMessageText(this.chat.id, this.id, text, options)
	}

	async editCaption(caption: string | null, options?: MessageEditCaptionOptions) {
		await this.client.editMessageCaption(this.chat.id, this.id, caption, options)
	}

	async editMedia(media: InputMedia, options?: MessageEditMediaOptions) {
		await this.client.editMessageMedia(this.chat.id, this.id, media, options)
	}

	// TODO
	// async editLiveLocation()

	async editReplyMarkup(markup: InlineKeyboardMarkup, options?: MessageEditCaptionOptions) {
		await this.client.editMessageReplyMarkup(this.chat.id, this.id, markup, options)
	}

	async delete() {
		await this.client.deleteMessage(this.chat.id, this.id)
	}

	async stopPoll(options?: PollStopOptions) {
		await this.client.stopPoll(this.chat.id, this.id, options)
	}
}
