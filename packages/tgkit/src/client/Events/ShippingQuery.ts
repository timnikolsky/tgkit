import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class ShippingQueryEvent extends TelegramEvent {
	handle(data: any) {
		if (data.shipping_query) {
			this.client.emit(Events.ShippingQuery, data.shipping_query);
		}
	}
}
