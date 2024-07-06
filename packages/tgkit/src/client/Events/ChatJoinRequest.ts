import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class ChatJoinRequestEvent extends TelegramEvent {
	handle(data: any) {
		if(data.chat_join_request) {
			this.client.emit(Events.ChatJoinRequest, data.chat_join_request)
		}
	}
}