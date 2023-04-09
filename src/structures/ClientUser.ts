import User from './User'
import Client from '../client/Client'

export default class ClientUser extends User {
	/** *true*, if the bot can be invited to groups */
	canJoinGroups: boolean

	/**
     * *true*, if privacy mode is disabled for the bot
     * @see {@link https://core.telegram.org/bots/api#privacy-mode}
     **/
	canReadAllGroupMessages: boolean

	/** *true*, if the bot supports inline queries */
	supportsInlineQueries: boolean
    

	constructor(client: Client, data: any) {
		super(client, data)

		this.canJoinGroups = data.can_join_groups
		this.canReadAllGroupMessages = data.can_read_all_group_messages
		this.supportsInlineQueries = data.supports_inline_queries
	}

	toString() {
		return '@' + this.username
	}
}