import Message from '../../structures/message/Message';
import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class ChosenInlineResultEvent extends TelegramEvent {
	handle(data: any) {
		if (data.chosen_inline_result) {
			this.client.emit(Events.ChosenInlineResult, data.chosen_inline_result);
		}
	}
}
