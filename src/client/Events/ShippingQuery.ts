import Message from '../../structures/Message'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class ShippingQueryEvent extends TelegramEvent {
	handle(data: any) {
		if(data.message) {
			const message = new Message(this.client, data.message)
			this.client.emit(Events.ShippingQuery, message)
		}
	}
}