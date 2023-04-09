import Client from '../client/Client'
import Base from './Base'
import User from './User'

/** Represents one row of the high scores table for a game. */
export class GameHighScore extends Base {
	/** Position in high score table for the game */
	position: number
	/** User */
	user: User
	/** Score */
	score: number

	constructor(client: Client, data: any) {
		super(client)

		this.position = data.position
		this.user = new User(client, data.user)
		this.score = data.score
	}
}