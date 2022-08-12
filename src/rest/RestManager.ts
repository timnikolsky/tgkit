import Client from '../client/Client';
import axios from 'axios';

export default class RestManager {
    client: Client

    constructor(client: Client) {
        this.client = client
    }

    async request(method: string, params?: object) {
        try {
            const response = await axios.post(`https://api.telegram.org/bot${this.client.token}/${method}`, params)
            return response.data.result
        } catch (error) {
            console.error(error)
        }
    }
}