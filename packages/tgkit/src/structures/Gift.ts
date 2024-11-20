import Client from 'client/Client'
import Base from 'structures/Base'
import Sticker from 'structures/Sticker'

export default class Gift extends Base {
	/** Unique identifier of the gift */
	id: number

	/** The sticker that represents the gift */
	sticker: Sticker

	/** The number of Telegram Stars that must be paid to send the sticker */
	starCount: number

	/** The total number of the gifts of this type that can be sent; for limited gifts only */
	totalCount?: number

	/** The number of remaining gifts of this type that can be sent; for limited gifts only */
	remainingCount?: number

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.id
		this.sticker = new Sticker(client, data.sticker)
		this.starCount = data.star_count
		this.totalCount = data.total_count
		this.remainingCount = data.remaining_count
	}
}
