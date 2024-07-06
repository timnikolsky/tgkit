import BusinessConnection from 'structures/BusinessConnection'
import CallbackQuery from '../../structures/CallbackQuery'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class BusinessConnectionEvent extends TelegramEvent {
	handle(data: any) {
		if(data.business_connection) {
			const businessConnection = new BusinessConnection(this.client, data.business_connection)
			this.client.emit(Events.BusinessConnection, businessConnection)
		}
	}
}