import CallbackQuery from '../../structures/CallbackQuery';
import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class CallbackQueryEvent extends TelegramEvent {
	handle(data: any) {
		if (data.callback_query) {
			const callbackQuery = new CallbackQuery(this.client, data.callback_query);
			this.client.emit(Events.CallbackQuery, callbackQuery);
		}
	}
}
