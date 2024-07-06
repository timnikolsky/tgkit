import Client from '../Client'
import TelegramEvent from './Event'
import MessageEvent from './Message'
import MessageEditEvent from './MessageEdit'
import ChannelPostEvent from './ChannelPost'
import ChannelPostEditEvent from './ChannelPostEdit'
import BusinessConnectionEvent from './BusinessConnection'
import BusinessMessageEvent from './BusinessMessageEdit'
import BusinessMessageEditEvent from './BusinessMessageEdit'
import BusinessMessagesDeleteEvent from './BusinessMessagesDelete'
import InlineQueryEvent from './InlineQuery'
import ChosenInlineResultEvent from './ChosenInlineResult'
import CallbackQueryEvent from './CallbackQuery'
import ShippingQueryEvent from './ShippingQuery'
import PreCheckoutQueryEvent from './PreCheckoutQuery'
import PollEvent from './Poll'
import PollAnswerEvent from './PollAnswer'
import ChatMeUpdateEvent from './ChatMeUpdate'
import ChatMemberUpdateEvent from './ChatMemberUpdate'
import ChatJoinRequestEvent from './ChatJoinRequest'
import ChatBoostEvent from './ChatBoost'
import ChatBoostRemoveEvent from './ChatBoostRemove'

export default class EventManager {
	client: Client
	events: TelegramEvent[]

	constructor(client: Client) {
		this.client = client
		this.events = []
        
		this.register(MessageEvent)
		this.register(MessageEditEvent)
		this.register(ChannelPostEvent)
		this.register(ChannelPostEditEvent)
		this.register(BusinessConnectionEvent)
		this.register(BusinessMessageEvent)
		this.register(BusinessMessageEditEvent)
		this.register(BusinessMessagesDeleteEvent)
		this.register(InlineQueryEvent)
		this.register(ChosenInlineResultEvent)
		this.register(CallbackQueryEvent)
		this.register(ShippingQueryEvent)
		this.register(PreCheckoutQueryEvent)
		this.register(PollEvent)
		this.register(PollAnswerEvent)
		this.register(ChatMeUpdateEvent)
		this.register(ChatMemberUpdateEvent)
		this.register(ChatJoinRequestEvent)
		this.register(ChatBoostEvent)
		this.register(ChatBoostRemoveEvent)
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