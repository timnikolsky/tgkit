import { unixToDate } from '../utils/converters';
import Client from '../client/Client';
import Base from './Base';

export default class StarTransaction extends Base {
	/**
	 * Unique identifier of the transaction. Coincides with the identifer of the original transaction
	 * for refund transactions. Coincides with <SuccessfulPayment>.telegramPaymentChargeId
	 * for successful incoming payments from users.
	 */
	id: string;

	/** Number of Telegram Stars transferred by the transaction */
	amount: number;

	/** Date the transaction was created */
	date: Date;

	// TODO
	source: any;

	constructor(client: Client, data: any) {
		super(client);

		this.id = data.id;
		this.amount = data.amount;
		this.date = unixToDate(data.date);
		this.source = data.source;
	}
}
