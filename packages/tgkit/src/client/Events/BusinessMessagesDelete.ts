import TelegramEvent from './Event'

export default class BusinessMessagesDeleteEvent extends TelegramEvent {
	handle(data: any) {
		if(data.business_messages_delete) {
			this.client.emit('Events.BusinessMessageEdit', data)
		}
	}
}