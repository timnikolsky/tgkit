import Client from '../client/Client'
import Base from './Base'
import Chat from './Chat'

/** Represents a message about a scheduled giveaway */
export default class Giveaway extends Base {
	/** The list of chats which the user must join to participate in the giveaway */
	chats: Chat[]

	/** Point in time when winners of the giveaway will be selected */
	winnersSelectionDate: Date

	/** The number of users which are supposed to be selected as winners of the giveaway */
	winnerCount: number

	/** *true*, if only users who join the chats after the giveaway started should be eligible to win */
	onlyNewMembers?: boolean

	/** *true*, if the list of giveaway winners will be visible to everyone */
	hasPublicWinners?: boolean

	/** Description of additional giveaway prize */
	prizeDescription?: string

	/**
	 * A list of two-letter [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country codes
	 * indicating the countries from which eligible users for the giveaway must come.
	 * If empty, then all users can participate in the giveaway.
	 * Users with a phone number that was bought on Fragment can always participate in giveaways.
	 */
	countryCodes?: string[]

	/** The number of months the Telegram Premium subscription won from the giveaway will be active for */
	premiumSubscriptionMonthCount?: number

	constructor(client: Client, data: any) {
		super(data)

		this.chats = data.chats.map((chatData: any) => new Chat(client, chatData))
		this.winnersSelectionDate = new Date(data.winners_selection_date * 1000)
		this.winnerCount = data.winner_count
		this.onlyNewMembers = data.only_new_members
		this.hasPublicWinners = data.has_public_winners
		this.prizeDescription = data.prize_description
		this.countryCodes = data.countryCodes
		this.premiumSubscriptionMonthCount = data.premium_subscription_month_count
	}
}