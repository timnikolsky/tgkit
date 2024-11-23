import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class ChatBoostEvent extends TelegramEvent {
	handle(data: any) {
		if (data.chat_boost) {
			this.client.emit(Events.ChatBoost, data.chat_boost);
		}
	}
}
