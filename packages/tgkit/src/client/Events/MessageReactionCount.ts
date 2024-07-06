import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class MessageReactionCountEvent extends TelegramEvent {
	handle(data: any) {
		if(data.message_reaction_count) {
			this.client.emit(Events.MessageReactionCount, data)
		}
	}
}