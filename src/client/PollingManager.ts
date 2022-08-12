import { PollingOptions } from 'typings';
import Client from './Client';

export default class PollingManager {
    client: Client
    offset?: number
    pollInterval: number = 2_000
    pollTimeout?: NodeJS.Timeout

    constructor(client: Client) {
        this.client = client
    }

    start() {
        this.poll()
        return true;
    }

    stop() {
        if (this.pollTimeout) {
            clearTimeout(this.pollTimeout);
        }
    }

    poll() {
        this.client.rest.request('getUpdates', {
            timeout: 30,
            offset: this.offset
        })
            .then((updates) => {
                if (updates.length) this.offset = updates[updates.length - 1].update_id + 1
                for (let update of updates) this.client.eventManager.processUpdate(update)
            })
            .catch((error) => {
                if (error.status === 404) return
                throw error
            })
            .finally(() => this.poll())
    }
}