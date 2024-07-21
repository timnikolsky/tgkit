import PreCheckoutQuery from '../../structures/PreCheckoutQuery'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class PreCheckoutQueryEvent extends TelegramEvent {
	handle(data: any) {
		if(data.pre_checkout_query) {
			const preCheckoutQuery = new PreCheckoutQuery(this.client, data.pre_checkout_query)
			this.client.emit(Events.PreCheckoutQuery, preCheckoutQuery)
		}
	}
}