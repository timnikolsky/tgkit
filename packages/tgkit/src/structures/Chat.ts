import {
	AnimationMessageSendOptions,
	AudioMessageSendOptions,
	ChatInviteLinkCreateOptions,
	ChatInviteLinkEditOptions,
	ChatMemberBanOptions,
	ChatMemberPromoteOptions,
	ChatMemberRestrictOptions,
	ChatMemberUnbanOptions,
	ChatMessagePinOptions,
	ChatPermissions,
	ChatPhoto,
	ChatType,
	ContactMessageSendOptions,
	ContactOptions,
	DiceEmoji,
	DiceMessageSendOptions,
	DocumentMessageSendOptions,
	ForumTopicCreateOptions,
	ForumTopicEditOptions,
	GeneralForumTopicEditOptions,
	InputFile,
	InputMedia,
	InputMediaAnimation,
	InvoiceSendOptions,
	LocationMessageSendOptions,
	MediaGroupMessageSendOptions,
	MyCommandsDeleteOptions,
	MyCommandsGetOptions,
	MyCommandsSetOptions,
	PhotoMessageSendOptions,
	PollMessageSendOptions,
	PollOptions,
	StickerSendOptions,
	TextMessageSendOptions,
	VenueMessageSendOptions,
	VenueOptions,
	VideoMessageSendOptions
} from '../../types'
import { BotCommandScopeType, ChatAction } from '../utils/enums'
import Client from '../client/Client'
import Base from './Base'
import BotCommand from './BotCommand'
import Message from './Message'
import MenuButton from './MenuButton'

/** Represents a chat */
export default class Chat extends Base {
	/** Unique identifier for this chat */
	id: number
	/** Type of chat */
	type: ChatType
	/** Title, for supergroups, channels and group chats */
	title?: string
	/** Username, for private chats, supergroups and channels if available */
	username?: string
	/** First name of the other party in a private chat */
	firstName?: string
	/** Last name of the other party in a private chat */
	lastName?: string
	/** *true*, if the supergroup chat is a forum (has topics enabled) */
	isForum?: boolean
	/**
	 * Chat photo.
	 * Returned only in `<Client>.getChat()`.
	 */
	photo?: ChatPhoto
	/**
	 * The list of all active chat usernames;
	 * for private chats, supergroups and channels.
	 * Returned only in `<Client>.getChat()`.
	 */
	activeUsernames?: string[]
	/**
	 * Custom emoji identifier of emoji status of the other party in a private chat.
	 * Returned only in `<Client>.getChat()`.
	 */
	emojiStatusCustomEmojiId?: string
	/**
	 * Bio of the other party in a private chat.
	 * Returned only in `<Client>.getChat()`.
	 */
	bio?: string
	/**
	 * *true*, if privacy settings of the other party in the private chat allows to use
	 * `tg://user?id=<user_id>` links only in chats with the user.
	 * Returned only in `<Client>.getChat()`.
	 */
	hasPrivateForwards?: boolean
	/**
	 * *true*, if the privacy settings of the other party restrict
	 * sending voice and video note messages in the private chat.
	 * Returned only in `<Client>.getChat()`.
	 */
	hasRestrictedVoiceAndVideoMessages?: boolean
	/**
	 * *true*, if users need to join the supergroup before they can send messages.
	 * Returned only in `<Client>.getChat()`.
	 */
	joinToSendMessages?: boolean
	/**
	 * *true*, if all users directly joining the supergroup need to be approved by supergroup administrators.
	 * Returned only in `<Client>.getChat()`.
	 */
	joinByRequest?: boolean
	/**
	 * Description, for groups, supergroups and channel chats.
	 * Returned only in `<Client>.getChat()`.
	 */
	description?: string
	/**
	 * Primary invite link, for groups, supergroups and channel chats.
	 * Returned only in `<Client>.getChat()`.
	 */
	inviteLink?: string
	/**
	 * The most recent pinned message (by sending date).
	 * Returned only in `<Client>.getChat()`.
	 */
	pinnedMessage?: Message
	/**
	 * Default chat member permissions, for groups and supergroups.
	 * Returned only in `<Client>.getChat()`.
	 */
	permissions?: ChatPermissions
	/**
	 * For supergroups, the minimum allowed delay between consecutive messages
	 * sent by each unpriviledged user; in seconds.
	 * Returned only in `<Client>.getChat()`.
	 */
	slowModeDelay?: number
	/**
	 * The time after which all messages sent to the chat will be automatically deleted; in seconds.
	 * Returned only in `<Client>.getChat()`.
	 */
	messageAutoDeleteTime?: number
	/**
	 * *true*, if aggressive anti-spam checks are enabled in the supergroup.
	 * The field is only available to chat administrators.
	 * Returned only in `<Client>.getChat()`.
	 */
	hasAggresiveAntiSpamEnabled?: boolean
	/**
	 * *true*, if non-administrators can only get the list of bots and administrators in the chat.
	 * Returned only in `<Client>.getChat()`.
	 */
	hasHiddenMembers?: boolean
	/**
	 * *true*, if messages from the chat can't be forwarded to other chats.
	 * Returned only in `<Client>.getChat()`.
	 */
	hasProtectedContent?: boolean
	/**
	 * For supergroups, name of group sticker set.
	 * Returned only in `<Client>.getChat()`.
	 */
	stickerSetName?: string
	/**
	 * *true*, if the bot can change the group sticker set.
	 * Returned only in `<Client>.getChat()`.
	 */
	canSetStickerSet?: boolean
	/**
	 * Unique identifier for the linked chat, i.e. the discussion group identifier
	 * for a channel and vice versa; for supergroups and channel chats.
	 * Returned only in `<Client>.getChat()`.
	 */
	linkedChatId?: number
	/**
	 * For supergroups, the location to which the supergroup is connected.
	 * Returned only in `<Client>.getChat()`.
	 */
	location?: string

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.id
		this.type = data.type
		this.title = data.title
		this.username = data.username
		this.firstName = data.first_name
		this.lastName = data.last_name
		this.isForum = data.is_forum
		this.photo = data.photo && {
			smallFileId: data.photo.small_file_id,
			smallFileUniqueId: data.photo.small_file_unique_id,
			bigFileId: data.photo.big_file_id,
			bigFileUniqueId: data.photo.big_file_unique_id
		}
		this.activeUsernames = data.active_usernames
		this.emojiStatusCustomEmojiId = data.emoji_status_custom_emoji_id
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
		this.slowModeDelay = data.slow_mode_delay
		this.messageAutoDeleteTime = data.message_auto_delete_time
		this.hasAggresiveAntiSpamEnabled = data.has_aggressive_anti_spam_enabled
		this.hasHiddenMembers = data.has_hidden_members
		this.hasProtectedContent = data.has_protected_content
		this.stickerSetName = data.sticker_set_name
		this.canSetStickerSet = data.can_set_sticker_set
		this.linkedChatId = data.linked_chat_id
		this.location = data.location
	}

	async sendMessage(text: string, options?: TextMessageSendOptions) {
		return this.client.sendMessage(this.id, text, options)
	}

	async sendPhoto(photo: InputFile, options?: PhotoMessageSendOptions) {
		return this.client.sendPhoto(this.id, photo, options)
	}

	async sendAudio(audio: InputFile, options?: AudioMessageSendOptions) {
		return this.client.sendAudio(this.id, audio, options)
	}

	async sendDocument(document: InputFile, options?: DocumentMessageSendOptions) {
		return this.client.sendDocument(this.id, document, options)
	}

	async sendVideo(video: InputFile, options?: VideoMessageSendOptions) {
		return this.client.sendVideo(this.id, video, options)
	}

	async sendAnimation(animation: InputFile, options?: AnimationMessageSendOptions) {
		return this.client.sendAnimation(this.id, animation, options)
	}

	async sendVoice(voice: InputFile, options?: AudioMessageSendOptions) {
		return this.client.sendVoice(this.id, voice, options)
	}

	async sendVideoNote(videoNote: InputFile, options?: AudioMessageSendOptions) {
		return this.client.sendVideoNote(this.id, videoNote, options)
	}

	async sendMediaGroup(media: Exclude<InputMedia, InputMediaAnimation>[], options?: MediaGroupMessageSendOptions) {
		return this.client.sendMediaGroup(this.id, media, options)
	}

	async sendLocation(latitude: number, longitude: number, options?: LocationMessageSendOptions) {
		return this.client.sendLocation(this.id, latitude, longitude, options)
	}

	async sendVenue(venue: VenueOptions, options?: VenueMessageSendOptions) {
		return this.client.sendVenue(this.id, venue, options)
	}

	async sendContact(contact: ContactOptions, options?: ContactMessageSendOptions) {
		return this.client.sendContact(this.id, contact, options)
	}

	async sendPoll(poll: PollOptions, options?: PollMessageSendOptions) {
		return this.client.sendPoll(this.id, poll, options)
	}

	async sendDice(emoji: DiceEmoji, options?: DiceMessageSendOptions) {
		return this.client.sendDice(this.id, emoji, options)
	}

	async sendSticker(sticker: InputFile | string, options?: StickerSendOptions) {
		return this.client.sendSticker(this.id, sticker, options)
	}

	async sendChatAction(action: ChatAction) {
		return this.client.sendChatAction(this.id, action)
	}

	async sendInvoice(options: InvoiceSendOptions) {
		return this.client.sendInvoice(this.id, options)
	}

	async banMember(userId: number, options?: ChatMemberBanOptions) {
		return this.client.banChatMember(this.id, userId, options)
	}

	async unbanMember(userId: number, options?: ChatMemberUnbanOptions) {
		return this.client.unbanChatMember(this.id, userId, options)
	}

	async restrictMember(userId: number, permissions: ChatPermissions, options?: ChatMemberRestrictOptions) {
		return this.client.restrictChatMember(this.id, userId, permissions, options)
	}

	async promoteMember(userId: number, options?: ChatMemberPromoteOptions) {
		return this.client.promoteChatMember(this.id, userId, options)
	}

	async setAdministratorCustomTitle(userId: number, customTitle: string) {
		return this.client.setChatAdministratorCustomTitle(this.id, userId, customTitle)
	}

	async banSenderChat(senderChatId: number) {
		return this.client.banChatSenderChat(this.id, senderChatId)
	}

	async unbanSenderChat(senderChatId: number) {
		return this.client.unbanChatSenderChat(this.id, senderChatId)
	}

	async setPermissions(permissions: ChatPermissions) {
		return this.client.setChatPermissions(this.id, permissions)
	}

	async exportInviteLink() {
		return this.client.exportChatInviteLink(this.id)
	}

	async createInviteLink(options?: ChatInviteLinkCreateOptions) {
		return this.client.createChatInviteLink(this.id, options)
	}

	async editInviteLink(inviteLink: string, options?: ChatInviteLinkEditOptions) {
		return this.client.editChatInviteLink(this.id, inviteLink, options)
	}

	async revokeInviteLink(inviteLink: string) {
		return this.client.revokeChatInviteLink(this.id, inviteLink)
	}

	async approveJoinRequest(userId: number) {
		return this.client.approveChatJoinRequest(this.id, userId)
	}

	async declineJoinRequest(userId: number) {
		return this.client.declineChatJoinRequest(this.id, userId)
	}

	async setPhoto(photo: InputFile) {
		return this.client.setChatPhoto(this.id, photo)
	}

	async deletePhoto() {
		return this.client.deleteChatPhoto(this.id)
	}

	async setTitle(title: string) {
		return this.client.setChatTitle(this.id, title)
	}

	async setDescription(description: string) {
		return this.client.setChatDescription(this.id, description)
	}

	async pinMessage(messageId: number, options?: ChatMessagePinOptions) {
		return this.client.pinChatMessage(this.id, messageId, options)
	}

	async unpinMessage(messageId?: number) {
		return this.client.unpinChatMessage(this.id, messageId)
	}

	async unpinAllMessages() {
		return this.client.unpinAllChatMessages(this.id)
	}

	async leave() {
		return this.client.leaveChat(this.id)
	}

	async getAdministrators() {
		return this.client.getChatAdministrators(this.id)
	}

	async getMemberCount() {
		return this.client.getChatMemberCount(this.id)
	}

	async getMember(userId: number) {
		return this.client.getChatMember(this.id, userId)
	}

	async setStickerSet(stickerSetName: string) {
		return this.client.setChatStickerSet(this.id, stickerSetName)
	}

	async deleteStickerSet() {
		return this.client.deleteChatStickerSet(this.id)
	}

	async createForumTopic(name: string, options: ForumTopicCreateOptions) {
		return this.client.createForumTopic(this.id, name, options)
	}

	async editForumTopic(forumTopicId: number, options: ForumTopicEditOptions) {
		return this.client.editForumTopic(this.id, forumTopicId, options)
	}

	async closeForumTopic(forumTopicId: number) {
		return this.client.closeForumTopic(this.id, forumTopicId)
	}

	async reopenForumTopic(forumTopicId: number) {
		return this.client.reopenForumTopic(this.id, forumTopicId)
	}

	async deleteForumTopic(forumTopicId: number) {
		return this.client.deleteForumTopic(this.id, forumTopicId)
	}

	async unpinAllForumTopicMessages(forumTopicId: number) {
		return this.client.unpinAllForumTopicMessages(this.id, forumTopicId)
	}

	async editGeneralForumTopic(options: GeneralForumTopicEditOptions) {
		return this.client.editGeneralForumTopic(this.id, options)
	}

	async closeGeneralForumTopic() {
		return this.client.closeGeneralForumTopic(this.id)
	}

	async reopenGeneralForumTopic() {
		return this.client.reopenGeneralForumTopic(this.id)
	}

	async hideGeneralForumTopic() {
		return this.client.hideGeneralForumTopic(this.id)
	}

	async unhideGeneralForumTopic() {
		return this.client.unhideGeneralForumTopic(this.id)
	}

	async setMyCommands(commands: BotCommand[], options?: Omit<MyCommandsSetOptions, 'scope'>) {
		return this.client.setMyCommands(commands, {
			scope: {
				type: BotCommandScopeType.Chat,
				chatId: this.id
			},
			languageCode: options?.languageCode
		})
	}

	async deleteMyCommands(options?: Omit<MyCommandsDeleteOptions, 'scope'>) {
		return this.client.deleteMyCommands({
			scope: {
				type: BotCommandScopeType.Chat,
				chatId: this.id
			},
			languageCode: options?.languageCode
		})
	}

	async getMyCommands(options?: Omit<MyCommandsGetOptions, 'scope'>) {
		return this.client.getMyCommands({
			scope: {
				type: BotCommandScopeType.Chat,
				chatId: this.id
			},
			languageCode: options?.languageCode
		})
	}
    
	/** Change the bot's menu button in this chat. */
	async setMenuButton(menuButton: MenuButton) {
		return this.client.setChatMenuButton(this.id, menuButton)
	}

	/** Get the current value of the bot's menu button in this chat */
	async getMenuButton() {
		return this.client.getChatMenuButton(this.id)
	}
}
