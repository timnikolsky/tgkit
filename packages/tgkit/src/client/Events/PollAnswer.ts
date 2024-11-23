import PollAnswer from '../../structures/PollAnswer';
import Events from '../../utils/Events';
import TelegramEvent from './Event';

export default class PollAnswerEvent extends TelegramEvent {
	handle(data: any) {
		if (data.poll_answer) {
			const pollAnswer = new PollAnswer(this.client, data.poll_answer);
			this.client.emit(Events.PollAnswer, pollAnswer);
		}
	}
}
