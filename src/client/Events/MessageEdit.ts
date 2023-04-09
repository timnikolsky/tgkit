import Message from '../../structures/Message'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class MessageEditEvent extends TelegramEvent {
	handle(data: any) {
		if(data.edited_message) {
			const message = new Message(this.client, data.edited_message)
			this.client.emit(Events.MessageEdit, message)
		}
	}
}