import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class ChatMemberUpdateEvent extends TelegramEvent {
	handle(data: any) {
		if (data.chat_member) {
			this.client.emit(Events.ChatMemberUpdate, data.chat_member);
		}
	}
}
