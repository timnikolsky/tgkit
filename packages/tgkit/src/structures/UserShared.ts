import Client from '../client/Client';
import Base from './Base';

/** Information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUser button */
export default class User extends Base {
	/** Identifier of the request. */
	requestId: number;

	/**
	 * Identifier of the shared user.
	 * The bot may not have access to the user and could be unable to use this identifier,
	 * unless the user is already known to the bot by some other means.
	 */
	userId: number;

	constructor(client: Client, data: any) {
		super(client);

		this.requestId = data.request_id;
		this.userId = data.user_id;
	}
}
