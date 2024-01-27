import Message from '../../structures/Message'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class ChannelPostEditEvent extends TelegramEvent {
	handle(data: any) {
		if(data.edited_channel_post) {
			const message = new Message(this.client, data.edited_channel_post)
			this.client.emit(Events.ChannelPostEdit, message)
		}
	}
}