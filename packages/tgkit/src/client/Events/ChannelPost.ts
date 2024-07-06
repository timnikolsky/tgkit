import Message from '../../structures/Message'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class ChannelPostEvent extends TelegramEvent {
	handle(data: any) {
		if(data.channel_post) {
			const message = new Message(this.client, data.channel_post)
			this.client.emit(Events.ChannelPost, message)
		}
	}
}