import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class ChatMeUpdateEvent extends TelegramEvent {
	handle(data: any) {
		if(data.my_chat_member) {
			this.client.emit(Events.ChatMeUpdate, data.my_chat_member)
		}
	}
}