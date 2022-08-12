import { ChatPermissions, ChatPhoto, ChatType, TextMessageSendOptions } from 'typings';
import Client from '../client/Client';
import Base from './Base';
import Message from './Message';

/** Represents a chat */
export default class Chat extends Base {
    id: number
    type: ChatType
    title?: string
    username?: string
    firstName?: string
    lastName?: string
    photo?: ChatPhoto
    bio?: string
    hasPrivateForwards?: boolean
    description?: string
    inviteLink?: string
    pinnedMessage?: Message
    permissions?: ChatPermissions
    slowModeDelay?: number
    messageAutoDeleteTime?: number
    hasProtectedContent?: boolean
    stickerSetName?: string
    canSetStickerSet?: boolean
    linkedChatId?: number
    location?: string

    constructor(client: Client, data: any) {
        super(client)

        this.id = data.id
        this.type = data.type
        this.title = data.title
        this.username = data.username
        this.firstName = data.first_name
        this.lastName = data.last_name
        this.photo = data.photo && {
            smallFileId: data.photo.small_file_id,
            smallFileUniqueId: data.photo.small_file_unique_id,
            bigFileId: data.photo.big_file_id,
            bigFileUniqueId: data.photo.big_file_unique_id
        }
        this.bio = data.bio
        this.hasPrivateForwards = data.has_private_forwards
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
        this.hasProtectedContent = data.has_protected_content
        this.stickerSetName = data.sticker_set_name
        this.canSetStickerSet = data.can_set_sticker_set
        this.linkedChatId = data.linked_chat_id
        this.location = data.location
    }

    async send(text: string, options: TextMessageSendOptions = {}) {
        await this.client.rest.request('sendMessage', {
            chat_id: this.id,
            text,
            parse_mode: options.parseMode,
            entities: options.entities?.map(entity => entity.toJSON()),
            disable_web_page_preview: options.disableWebPagePreview,
            disable_notification: options.disableNotification,
            protect_content: options.protectContent,
            reply_to_message_id: options.replyToMessageId,
            allow_sending_without_reply: options.allowSendingWithoutReply,
            reply_markup: options.replyMarkup?.toJSON()
        })
    }
}