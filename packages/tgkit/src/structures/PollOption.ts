import Client from '../client/Client'
import Base from './Base'

/** Contains information about one answer option in a poll. */
export default class PollOption extends Base {
	/** Option text */
	text: string

	/** Number of users that voted for this option */
	voterCount: number

	constructor(client: Client, data: any) {
		super(client)

		this.text = data.text
		this.voterCount = data.voter_count
	}
}