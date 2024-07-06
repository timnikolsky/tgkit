import { Currency } from '../../types'
import Client from '../client/Client'
import Base from './Base'

/** Contains basic information about an invoice. */
export default class Invoice extends Base {
	/** Product name */
	title: string

	/** Product description */
	description: string

	/** Unique bot deep-linking parameter that can be used to generate this invoice */
	startParameter: string

	/**
	 * Three-letter ISO 4217 currency code, or "XTR" for payments in Telegram Stars
	 * @see {@link https://core.telegram.org/bots/payments#supported-currencies}
	 */
	currency: Currency

	/**
	 * Total price in the *smallest units* of the currency (integer, **not** float/double).
	 * For example, for a price of `US$ 1.45` pass `totalAmount: 145`.
	 * See the *exp* parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json),
	 * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
	 */
	totalAmount: number
    
	constructor(client: Client, data: any) {
		super(client)

		this.title = data.title
		this.description = data.description
		this.startParameter = data.start_parameter
		this.currency = data.currency
		this.totalAmount = data.totalAmount
	}
}