import {
	KeyboardButtonData,
	KeyboardButtonRequestChat,
	KeyboardButtonRequestUser,
	WebAppInfo,
} from '../types';
import { KeyboardButtonPollType } from '../utils/enums';

/**
 * Represents one button of the reply keyboard.
 * For simple text buttons can be used instead of this object to specify text of the button.
 * Optional fields request_contact, request_location, and request_poll are mutually exclusive.
 */
export default class KeyboardButton {
	/**
	 * Text of the button.
	 * If none of the optional fields are used, it will be sent as a message when the button is pressed
	 */
	text?: string;

	/** If specified, pressing the button will open a list of suitable users */
	requestUser?: KeyboardButtonRequestUser;

	/** If specified, pressing the button will open a list of suitable chats */
	requestChat?: KeyboardButtonRequestChat;

	/**
	 * If *true*, the user's phone number will be sent as a contact when the button is pressed.
	 * Available in private chats only.
	 */
	requestContact?: boolean;

	/**
	 * If *true*, the user's current location will be sent when the button is pressed.
	 * Available in private chats only
	 */
	requestLocation?: boolean;

	/**
	 * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed.
	 * Available in private chats only
	 */
	requestPoll?: KeyboardButtonPollType;

	/**
	 * If specified, the described Web App will be launched when the button is pressed.
	 * Available in private chats only.
	 */
	webApp?: WebAppInfo;

	constructor(data: KeyboardButtonData) {
		(this.text = data.text), (this.requestUser = data.requestUser);
		this.requestChat = data.requestChat;
		this.requestContact = data.requestContact;
		this.requestLocation = data.requestLocation;
		this.requestPoll = data.requestPoll;
		this.webApp = data.webApp;
	}

	setText(text: string) {
		this.text = text;
		return this;
	}

	setRequestUser(requestUser: KeyboardButtonRequestUser) {
		this.requestUser = requestUser;
		return this;
	}

	setRequestChat(requestChat: KeyboardButtonRequestChat) {
		this.requestChat = requestChat;
		return this;
	}

	setRequestContact(requestContact: boolean) {
		this.requestContact = requestContact;
		return this;
	}

	setRequestLocation(requestLocation: boolean) {
		this.requestLocation = requestLocation;
		return this;
	}

	setRequestPoll(requestPoll: KeyboardButtonPollType) {
		this.requestPoll = requestPoll;
		return this;
	}

	setWebApp(webApp: WebAppInfo) {
		this.webApp = webApp;
		return this;
	}

	toJSON(): object {
		return {
			text: this.text,
			request_user: this.requestUser
				? {
						request_id: this.requestUser.requestId,
						user_is_bot: this.requestUser.userIsBot,
						user_is_premium: this.requestUser.userIsPremium,
					}
				: undefined,
			request_chat: this.requestChat
				? {
						request_id: this.requestChat.requestId,
						chat_is_channel: this.requestChat.chatIsChannel,
						chat_is_forum: this.requestChat.chatIsForum,
						chat_has_username: this.requestChat.chatHasUsername,
						chat_is_created: this.requestChat.chatIsCreated,
						// TODO: refactor
						user_administator_rights: this.requestChat.userAdministratorRights
							? {
									is_anonymous:
										this.requestChat.userAdministratorRights.isAnonymous,
									can_manage_chat:
										this.requestChat.userAdministratorRights.canManageChat,
									can_delete_messages:
										this.requestChat.userAdministratorRights.canDeleteMessages,
									can_manage_video_chats:
										this.requestChat.userAdministratorRights
											.canManageVideoChats,
									can_restrict_members:
										this.requestChat.userAdministratorRights.canRestrictMembers,
									can_promote_members:
										this.requestChat.userAdministratorRights.canPromoteMembers,
									can_change_info:
										this.requestChat.userAdministratorRights.canChangeInfo,
									can_invite_users:
										this.requestChat.userAdministratorRights.canInviteUsers,
									can_post_messages:
										this.requestChat.userAdministratorRights.canPostMessages,
									can_edit_messages:
										this.requestChat.userAdministratorRights.canEditMessages,
									can_pin_messages:
										this.requestChat.userAdministratorRights.canPinMessages,
									can_manage_topics:
										this.requestChat.userAdministratorRights.canManageTopics,
								}
							: undefined,
						bot_administator_rights: this.requestChat.userAdministratorRights
							? {
									is_anonymous:
										this.requestChat.userAdministratorRights.isAnonymous,
									can_manage_chat:
										this.requestChat.userAdministratorRights.canManageChat,
									can_delete_messages:
										this.requestChat.userAdministratorRights.canDeleteMessages,
									can_manage_video_chats:
										this.requestChat.userAdministratorRights
											.canManageVideoChats,
									can_restrict_members:
										this.requestChat.userAdministratorRights.canRestrictMembers,
									can_promote_members:
										this.requestChat.userAdministratorRights.canPromoteMembers,
									can_change_info:
										this.requestChat.userAdministratorRights.canChangeInfo,
									can_invite_users:
										this.requestChat.userAdministratorRights.canInviteUsers,
									can_post_messages:
										this.requestChat.userAdministratorRights.canPostMessages,
									can_edit_messages:
										this.requestChat.userAdministratorRights.canEditMessages,
									can_pin_messages:
										this.requestChat.userAdministratorRights.canPinMessages,
									can_manage_topics:
										this.requestChat.userAdministratorRights.canManageTopics,
								}
							: undefined,
						bot_is_member: this.requestChat.botIsMember,
					}
				: undefined,
			request_contact: this.requestContact,
			request_location: this.requestLocation,
			request_poll: this.requestPoll,
		};
	}
}
