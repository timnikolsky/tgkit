import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class MessageReactionEvent extends TelegramEvent {
	handle(data: any) {
		if(data.message_reaction) {
			this.client.emit(Events.MessageReaction, data)
		}
	}
}