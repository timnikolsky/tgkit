import Message from '../../structures/Message';
import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class ChannelPostCreateEvent extends TelegramEvent {
    handle(data: any) {
        if(data.channel_post) {
            let message = new Message(this.client, data.channel_post)
            this.client.emit(Events.ChannelPostCreate, message)
        }
    }
}