import Client from '../client/Client';
import Base from './Base';
import User from './User';

/** Represents an answer of a user in a non-anonymous poll */
export default class PollAnswer extends Base {
	/** Unique poll identifier */
	id: string;

	/** Number of users that voted for this option */
	user: User;

	/** 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote */
	optionIds: number[];

	constructor(client: Client, data: any) {
		super(client);

		this.id = data.poll_id;
		this.user = new User(client, data.user);
		this.optionIds = data.option_ids;
	}
}
