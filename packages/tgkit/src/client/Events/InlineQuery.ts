import InlineQuery from '../../structures/InlineQuery'
import Events from '../../utils/Events'
import TelegramEvent from './Event'

export default class InlineQueryEvent extends TelegramEvent {
	handle(data: any) {
		if(data.inline_query) {
			const inlineQuery = new InlineQuery(this.client, data.inline_query)
			this.client.emit(Events.InlineQuery, inlineQuery)
		}
	}
}