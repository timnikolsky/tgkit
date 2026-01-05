import PhotoSize from '../PhotoSize';
import Client from '../../client/Client';
import Base from '../Base';

/** Information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUser button */
export default class SharedUser extends Base {
	/**
	 * Identifier of the shared user.
	 * The bot may not have access to the user and could be unable to use this identifier,
	 * unless the user is already known to the bot by some other means.
	 */
	userId: number;

	/** First name of the user, if the name was requested by the bot */
	firstName?: string;

	/** Last name of the user, if the name was requested by the bot */
	lastName?: string;

	/** Username of the user, if the username was requested by the bot */
	username?: string;

	/** Available sizes of the chat photo, if the photo was requested by the bot */
	photo?: PhotoSize[];

	constructor(client: Client, data: any) {
		super(client);

		this.userId = data.user_id;
		this.firstName = data.first_name;
		this.lastName = data.last_name;
		this.username = data.username;
		this.photo = data.photo?.map(
			(photoSizeData: any) => new PhotoSize(this.client, photoSizeData),
		);
	}
}
