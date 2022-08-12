import CallbackQuery from '../../structures/CallbackQuery';
import Message from '../../structures/Message';
import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class CallbackQueryEvent extends TelegramEvent {
    handle(data: any) {
        if(data.callback_query) {
            let callbackQuery = new CallbackQuery(this.client, data.callback_query)
            this.client.emit(Events.CallbackQuery, callbackQuery)
        }
    }
}