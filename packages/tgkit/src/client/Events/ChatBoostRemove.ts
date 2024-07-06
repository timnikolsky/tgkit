import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class ChatBoostRemoveEvent extends TelegramEvent {
	handle(data: any) {
		if(data.removed_chat_boost) {
			this.client.emit(Events.ChatBoostRemove, data.removed_chat_boost)
		}
	}
}