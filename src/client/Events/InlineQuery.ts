import Message from '../../structures/Message'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class InlineQueryEvent extends TelegramEvent {
	handle(data: any) {
		if(data.inline_query) {
			const message = new Message(this.client, data.message)
			this.client.emit(Events.InlineQuery, message)
		}
	}
}