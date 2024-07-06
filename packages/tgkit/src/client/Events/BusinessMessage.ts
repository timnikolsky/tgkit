import Events from '../../utils/Events'
import TelegramEvent from './Event'
import Message from 'structures/Message'

export default class BusinessMessageEvent extends TelegramEvent {
	handle(data: any) {
		if(data.business_message) {
			const message = new Message(this.client, data.business_message)
			this.client.emit(Events.BusinessMessage, message)
		}
	}
}