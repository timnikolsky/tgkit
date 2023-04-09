import Client from '../Client'
import CallbackQueryEvent from './CallbackQuery'
import ChannelPostCreateEvent from './ChannelPostCreate'
import ChannelPostEditEvent from './ChannelPostEdit'
import ChatJoinRequestEvent from './ChatJoinRequest'
import ChatMemberUpdateEvent from './ChatMemberUpdate'
import ChatMeUpdateEvent from './ChatMeUpdate'
import ChosenInlineResultEvent from './ChosenInlineResult'
import TelegramEvent from './Event'
import InlineQueryEvent from './InlineQuery'
import MessageCreateEvent from './Message'
import MessageEditEvent from './MessageEdit'
import PollEvent from './Poll'
import PollAnswerEvent from './PollAnswer'
import PreCheckoutQueryEvent from './PreCheckoutQuery'
import ShippingQueryEvent from './ShippingQuery'

export default class EventManager {
	client: Client
	events: TelegramEvent[]

	constructor(client: Client) {
		this.client = client
		this.events = []
        
		this.register(CallbackQueryEvent)
		this.register(ChannelPostCreateEvent)
		this.register(ChannelPostEditEvent)
		this.register(ChatJoinRequestEvent)
		this.register(ChatMemberUpdateEvent)
		this.register(ChatMeUpdateEvent)
		this.register(ChosenInlineResultEvent)
		this.register(InlineQueryEvent)
		this.register(MessageCreateEvent)
		this.register(MessageEditEvent)
		this.register(PollEvent)
		this.register(PollAnswerEvent)
		this.register(PreCheckoutQueryEvent)
		this.register(ShippingQueryEvent)
	}

	processUpdate(data: any) {
		this.client.emit('raw', data)

		for(const event of this.events) {
			event.handle(data)
		}
	}

	register(event: typeof TelegramEvent) {
		this.events.push(new event(this.client))
	}
}