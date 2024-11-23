import Poll from '../../structures/Poll';
import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class PollEvent extends TelegramEvent {
	handle(data: any) {
		if (data.poll) {
			const poll = new Poll(this.client, data.poll);
			this.client.emit(Events.Poll, poll);
		}
	}
}
