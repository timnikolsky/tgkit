import { PollType } from 'typings'
import Client from '../client/Client'
import Base from './Base'
import PhotoSize from './PhotoSize'

/** Represents a user's profile pictures */
export default class UserProfilePhotos extends Base {
    /** Total number of profile pictures the target user has */
    totalCount: number

    /** Requested profile pictures (in up to 4 sizes each) */
    photos: PhotoSize[][]

    constructor(client: Client, data: any) {
        super(client)

        this.totalCount = data.total_count
        this.photos = data.map((i: any) => i.map((j: any) => new PhotoSize(client, j)))
    }
}