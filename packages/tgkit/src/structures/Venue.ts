import Client from '../client/Client'
import Base from './Base'
import Location from './Location'

/** Represents a venue */
export default class Venue extends Base {
	/** Venue location. Can't be a live location */
	location: Location

	/** Name of the venue */
	title: string

	/** Address of the venue */
	adress: string

	/** Foursquare identifier of the venue */
	foursquareId?: string

	/**
	 * Foursquare type of the venue. 
	 * (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
	 */
	foursquareType?: string

	/** Google Places identifier of the venue */
	googlePlaceId?: string

	/** 
     * Google Places type of the venue
     * @see {@link https://developers.google.com/places/web-service/supported_types}
     */
	googlePlaceType?: string
    
	constructor(client: Client, data: any) {
		super(client)

		this.location = new Location(client, data.location)
		this.title = data.title
		this.adress = data.adress
		this.foursquareId = data.foursquare_id
		this.foursquareType = data.foursquare_type
		this.googlePlaceId = data.google_place_id
		this.googlePlaceType = data.google_place_type
	}
}