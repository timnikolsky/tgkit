import { ChatMemberRestrictedPermissions } from '../../types'
import { unixToDate } from '../utils/converters'
import Client from '../client/Client'
import ChatMember from './ChatMember'

/** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
export default class ChatMemberResticted extends ChatMember {
	/** *true*, if the user is a member of the chat at the moment of the request */
	isMember: boolean

	/** Chat member permissions */
	permissions: ChatMemberRestrictedPermissions

	/** Date when restrictions will be lifted for this user. If *null*, then the user is restricted forever */
	restrictedUntil: Date | null

    
	constructor(client: Client, data: any) {
		super(client, data)

		this.isMember = data.is_member
		this.permissions = {
			canChangeInfo: data.can_change_info,
			canInviteUsers: data.can_invite_users,
			canPinMessages: data.can_pin_messages,
			canManageTopics: data.can_manage_topics,
			canSendMessages: data.can_send_messages,
			canSendMediaMessages: data.can_send_media_messages,
			canSendPolls: data.can_send_polls,
			canSendOtherMessages: data.can_send_other_messages,
			canAddWebPagePreviews: data.can_add_web_page_previews
		}
		this.restrictedUntil = data.until_date ? unixToDate(data.until_date) : null
	}
}
