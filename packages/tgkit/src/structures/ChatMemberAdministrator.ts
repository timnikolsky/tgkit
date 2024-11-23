import { ChatMemberAdministratorPermissions } from '../types';
import Client from '../client/Client';
import ChatMember from './ChatMember';

/** Represents a chat member that has some additional privileges. */
export default class ChatMemberOwner extends ChatMember {
	/** *true*, if the bot is allowed to edit administrator privileges of that user */
	canBeEdited: boolean;

	/** *true*, if the user's presence in the chat is hidden */
	isAnonymous: boolean;

	/** Chat member permissions */
	permissions: ChatMemberAdministratorPermissions;

	/** Custom title for this user */
	customTitle?: string;

	constructor(client: Client, data: any) {
		super(client, data);

		this.canBeEdited = data.can_be_edited;
		this.isAnonymous = data.is_anonymous;
		this.permissions = {
			canManageChat: data.can_manage_chat,
			canDeleteMessages: data.can_delete_messages,
			canManageVoiceChats: data.can_manage_voice_chats,
			canRestrictMembers: data.can_restrict_members,
			canPromoteMembers: data.can_promote_members,
			canChangeInfo: data.can_change_info,
			canInviteUsers: data.can_invite_users,
			canPostMessages: data.can_post_messages,
			canEditMessages: data.can_edit_messages,
			canPinMessages: data.can_pin_messages,
			canManageTopics: data.can_manage_topics,
		};
		this.customTitle = data.custom_title;
	}
}
