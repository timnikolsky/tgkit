import { WebhookOptions } from '../types'
import Client from './Client'

export default class WebhookManager {
	client: Client
	active: boolean
	options?: WebhookOptions

	constructor(client: Client, options?: WebhookOptions) {
		this.client = client
		this.active = Boolean(options)
		this.options = options
	}
}