import Client from '../client/Client'
import Base from './Base'

/** Represents a point on the map */
export default class Location extends Base {
	/** Longitude as defined by sender */
	longtitude: number

	/** Latitude as defined by sender */
	latitude: number

	/** The radius of uncertainty for the location, measured in meters; 0-1500 */
	horizontalAccuracy: number

	/**
	 * Time relative to the message sending date, during which the location can be updated; in seconds.
	 * For active live locations only.
	 */
	livePeriod?: number

	/** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
	heading?: number

	/**
	 * Maximum distance for proximity alerts about approaching another chat member, in meters.
	 * For sent live locations only.
	 */
	proximityAlertRadius?: number
    
	constructor(client: Client, data: any) {
		super(client)

		this.longtitude = data.longtitude
		this.latitude = data.latitude
		this.horizontalAccuracy = data.horizontal_accuracy
		this.livePeriod = data.live_period
		this.heading = data.heading
		this.proximityAlertRadius = data.proximity_alert_radius
	}
}