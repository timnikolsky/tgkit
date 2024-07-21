import Message from './Message'
import { Birthdate, BusinessIntro, BusinessLocation, BusinessOpeningHours, ChatLocation, ChatPermissions, ChatPhoto } from '../types'
import Client from '../client/Client'
import Chat from './Chat'
import { ReactionType } from '../utils/enums'
import Sticker from '../structures/Sticker'
import Location from '../structures/Location'
import { unixToDate } from '../utils/converters'

export default class ChatFull extends Chat {
	/**
	 * Identifier of the accent color for the chat name and backgrounds
	 * of the chat photo, reply header,and link preview.
	 * @see https://core.telegram.org/bots/api#accent-colors
	 */
	accentColorId: number

	/** The maximum number of reactions that can be set on a message in the chat */
	maxReactionCount: number

	/** Chat photo. */
	photo?: ChatPhoto

	/** The list of all active chat usernames; for private chats, supergroups and channels. */
	activeUsernames?: string[]

	/** For private chats, the date of birth of the user */
	birthdate?: Birthdate

	/** For private chats with business accounts, the intro of the business */
	businessIntro?: BusinessIntro

	/** For private chats with business accounts, the location of the business */
	businessLocation?: BusinessLocation

	/** For private chats with business accounts, the opening hours of the business */
	businessOpeningHours?: BusinessOpeningHours

	/** For private chats, the personal channel of the user */
	personalChat?: Chat

	/** List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
	availableReactions?: ReactionType[]

	/** Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
	backgroundCustomEmojiId?: string

	/** 
	 * Identifier of the accent color for the chat's profile background.
	 * @see https://core.telegram.org/bots/api#profile-accent-colors
	 */
	profileAccentColorId?: number

	/** Custom emoji identifier of the emoji chosen by the chat for its profile background */
	profileBackgroundCustomEmojiId?: string

	/** Custom emoji identifier of emoji status of the other party in a private chat. */
	emojiStatusCustomEmojiId?: string

	/** Expiration date of the emoji status of the chat or the other party in a private chat */
	emojiStatusExpirationDate?: Date

	/**  Bio of the other party in a private chat. */
	bio?: string

	/**
	 * *true*, if privacy settings of the other party in the private chat allows to use
	 * `tg://user?id=<user_id>` links only in chats with the user.
	 */
	hasPrivateForwards?: boolean

	/**
	 * *true*, if the privacy settings of the other party restrict
	 * sending voice and video note messages in the private chat.
	 */
	hasRestrictedVoiceAndVideoMessages?: boolean

	/** *true*, if users need to join the supergroup before they can send messages. */
	joinToSendMessages?: boolean

	/** *true*, if all users directly joining the supergroup need to be approved by supergroup administrators. */
	joinByRequest?: boolean

	/** Description, for groups, supergroups and channel chats. */
	description?: string

	/** Primary invite link, for groups, supergroups and channel chats. */
	inviteLink?: string

	/** The most recent pinned message (by sending date). */
	pinnedMessage?: Message

	/**  Default chat member permissions, for groups and supergroups. */
	permissions?: ChatPermissions

	/**
	 * *true*, if paid media messages can be sent or forwarded to the channel chat.
	 * The field is available only for channel chats.
	 */
	canSendPaidMedia?: boolean

	/**
	 * For supergroups, the minimum allowed delay between consecutive messages
	 * sent by each unpriviledged user; in seconds.
	 */
	slowModeDelay?: number

	/**
	 * For supergroups, the minimum number of boosts that a non-administrator user
	 * needs to add in order to ignore slow mode and chat permissions
	 */
	unrestrictBoostCount?: number

	/** The time after which all messages sent to the chat will be automatically deleted; in seconds. */
	messageAutoDeleteTime?: number

	/**
	 * *true*, if aggressive anti-spam checks are enabled in the supergroup.
	 * The field is only available to chat administrators.
	 */
	hasAggresiveAntiSpamEnabled?: boolean

	/**
	 * *true*, if non-administrators can only get the list of bots and administrators in the chat.
	 */
	hasHiddenMembers?: boolean

	/** *true*, if messages from the chat can't be forwarded to other chats. */
	hasProtectedContent?: boolean

	/** *true*, if messages from the chat can't be forwarded to other chats */
	hasVisibleHistory?: boolean

	/** For supergroups, name of group sticker set. */
	stickerSetName?: string

	/** *true*, if the bot can change the group sticker set. */
	canSetStickerSet?: boolean

	/**
	 * For supergroups, the name of the group's custom emoji sticker set.
	 * Custom emoji from this set can be used by all users and bots in the group.
	 */
	customEmojiStickerSetName?: string

	/**
	 * Unique identifier for the linked chat, i.e. the discussion group identifier
	 * for a channel and vice versa; for supergroups and channel chats.
	 */
	linkedChatId?: number

	/** For supergroups, the location to which the supergroup is connected. */
	location?: ChatLocation

	constructor(client: Client, data: any) {
		super(client, data)

		this.accentColorId = data.accent_color_id
		this.maxReactionCount = data.max_reaction_count
		this.photo = data.photo && {
			smallFileId: data.photo.small_file_id,
			smallFileUniqueId: data.photo.small_file_unique_id,
			bigFileId: data.photo.big_file_id,
			bigFileUniqueId: data.photo.big_file_unique_id
		}
		this.activeUsernames = data.active_usernames
		this.birthdate = data.birthdate && {
			day: data.birthdate.day,
			month: data.birthdate.month,
			year: data.birthdate.year
		}
		this.businessIntro = data.business_intro && {
			title: data.business_intro.title,
			message: data.business_intro.message,
			sticker: data.business_intro.sticker && new Sticker(client, data.business_intro.sticker)
		}
		this.businessLocation = data.business_location && {
			address: data.business_location.address,
			location: data.business_location.location && new Location(client, data.business_location.location)
		}
		this.businessOpeningHours = data.business_opening_hours && {
			timeZoneName: data.business_opening_hours.time_zone_name,
			openingHours: data.business_opening_hours.opening_hours.map((interval: any) => ({
				openingMinute: interval.opening_minute,
				closingMinute: interval.closing_minute
			}))
		}
		this.personalChat = data.personal_chat && new Chat(client, data.personal_chat)
		// TODO
		this.availableReactions = data.available_reactions
		this.backgroundCustomEmojiId = data.background_custom_emoji_id
		this.profileAccentColorId = data.profile_accent_color_id
		this.profileBackgroundCustomEmojiId = data.profile_background_custom_emoji_id
		this.emojiStatusCustomEmojiId = data.emoji_status_custom_emoji_id
		this.emojiStatusExpirationDate = data.emoji_status_expiration_date && unixToDate(data.emoji_status_expiration_date)
		this.bio = data.bio
		this.hasPrivateForwards = data.has_private_forwards
		this.hasRestrictedVoiceAndVideoMessages = data.has_restricted_voice_and_video_messages
		this.joinToSendMessages = data.join_to_send_messages
		this.joinByRequest = data.join_by_request
		this.description = data.description
		this.inviteLink = data.inviteLink
		this.pinnedMessage = data.pinnedMessage && new Message(client, data.pinnedMessage)
		this.permissions = {
			canSendMessages: data.can_send_messages,
			canSendMediaMessages: data.can_send_media_messages,
			canSendPolls: data.can_send_polls,
			canSendOtherMessages: data.can_send_other_messages,
			canAddWebPagePreviews: data.can_add_web_page_previews,
			canChangeInfo: data.can_change_info,
			canInviteUsers: data.can_invite_users,
			canPinMessages: data.can_pin_messages
		}
		this.canSendPaidMedia = data.can_send_paid_media
		this.slowModeDelay = data.slow_mode_delay
		this.unrestrictBoostCount = data.unrestrict_boost_count
		this.messageAutoDeleteTime = data.message_auto_delete_time
		this.hasAggresiveAntiSpamEnabled = data.has_aggressive_anti_spam_enabled
		this.hasHiddenMembers = data.has_hidden_members
		this.hasProtectedContent = data.has_protected_content
		this.hasVisibleHistory = data.has_visible_history
		this.stickerSetName = data.sticker_set_name
		this.canSetStickerSet = data.can_set_sticker_set
		this.customEmojiStickerSetName = data.custom_emoji_sticker_set_name
		this.linkedChatId = data.linked_chat_id
		this.location = data.location && {
			location: new Location(client, data.location.location),
			address: data.location.address
		}
	}
}
