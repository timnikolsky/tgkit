import { PollingOptions } from '../../types'
import Client from './Client'

export default class PollingManager {
	client: Client
	offset?: number
	options: PollingOptions
	pollTimeout?: NodeJS.Timeout

	constructor(client: Client, options: PollingOptions = {
		timeout: 30
	}) {
		this.client = client
		this.options = options
	}

	start() {
		this.poll()
		this.client.emit('ready', this.client)
	}

	stop() {
		if (this.pollTimeout) {
			clearTimeout(this.pollTimeout)
		}
	}

	async poll() {
		this.client.rest.request('getUpdates', {
			timeout: this.options.timeout,
			offset: this.offset
		})
			.then((updates) => {
				if (updates.length) {
					this.offset = updates[updates.length - 1].update_id + 1
				}
				for (const update of updates) {
					this.client.eventManager.processUpdate(update)
				}
			})
			.catch((error) => {
				if (error.status === 404) {
					return
				}
				throw error
			})
			.finally(() => this.poll())
	}
}