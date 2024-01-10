import { dateToUnix, unixToDate } from '../utils/converters'
import Client from '../client/Client'
import Base from './Base'
import User from './User'

export default class ChatInviteLink extends Base {
	/** Invite link */
	inviteLink: string

	/** Creator of the link */
	creator: User

	/** *true*, if the link is primary */
	isPrimary: boolean

	/** *true*, if the link is revoked */
	isRevoked: boolean

	/** Point in time when the link will expire or has been expired */
	expireDate: Date

	/** Maximum number of users that can be members of the chat 
	 * simultaneously after joining the chat via this invite link; 1-99999
	 */
	memberLimit: number

	/** Number of pending join requests created using this link */
	pendingJoinRequestCount?: number

	
	constructor(client: Client, data: any) {
		super(client)

		this.inviteLink = data.invite_link
		this.creator = new User(client, data.creator)
		this.isPrimary = data.is_primary
		this.isRevoked = data.is_revoked
		this.expireDate = unixToDate(data.expire_date)
		this.memberLimit = data.member_limit
	}

	toJSON(): object {
		return {
			inviteLink: this.inviteLink,
			creator: this.creator,
			is_primary: this.isPrimary,
			is_revoked: this.isRevoked,
			expire_date: dateToUnix(this.expireDate),
			member_limit: this.memberLimit
		}
	}
}