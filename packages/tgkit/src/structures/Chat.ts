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
} from '../types'
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

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.id
		this.type = data.type
		this.title = data.title
		this.username = data.username
		this.firstName = data.first_name
		this.lastName = data.last_name
		this.isForum = data.is_forum
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
