import User from './User'
import Client from '../client/Client'
import Base from './Base'
import type { Currency, OrderInfo } from '../../types'

/** Contains information about an incoming pre-checkout query. */
export default class PreCheckoutQuery extends Base {
	/** Unique query identifier */
	id: string

	/** User who sent the query */
	from: User

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

	/** Bot-specified invoice payload */
	invoicePayload: string

	/** Identifier of the shipping option chosen by the user */
	shippingOptionId?: string

	/** Order information provided by the user */
	orderInfo?: OrderInfo

	constructor(client: Client, data: any) {
		super(client)

		this.id = data.id
		this.from = new User(this.client, data.from)
		this.currency = data.currency
		this.totalAmount = data.total_amount
		this.invoicePayload = data.invoice_payload
		this.shippingOptionId = data.shipping_option_id
		this.orderInfo = data.order_info && {
			name: data.order_info.name,
			phoneNumber: data.order_info.phone_number,
			email: data.order_info.email,
			shippingAdress: data.order_info.shipping_adress
		}
	}
}