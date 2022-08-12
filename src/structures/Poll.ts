import { PollType } from 'typings'
import Client from '../client/Client'
import Base from './Base'
import MessageEntity from './MessageEntity'
import PollOption from './PollOption'
import User from './User'

/** Contains information about a poll */
export default class Poll extends Base {
    /** Unique poll identifier */
    id: string

    /** Poll question */
    question: string

    /** List of poll options */
    options: PollOption[]

    /** Total number of users that voted in the poll */
    totalVoterCount: number

    /** True, if the poll is closed */
    isClosed: boolean

    /** True, if the poll is anonymous */
    isAnonymous: boolean

    /** Poll type */
    type: PollType

    /** True, if the poll allows multiple answers */
    allowsMultipleAnswers: boolean

    /** 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot. */
    correctOptionId?: number

    /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
    explanation?: string

    /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll */
    explanationEntities?: MessageEntity[]

    /** Amount of time in seconds the poll will be active after creation */
    openPeriod?: number

    /** Point in time when the poll will be automatically closed */
    closeDate?: Date

    constructor(client: Client, data: any) {
        super(client)

        this.id = data.id
        this.question = data.question
        this.options = data.options.map((optionData: any) => new PollOption(client, optionData))
        this.totalVoterCount = data.total_voter_counter
        this.isClosed = data.is_closed
        this.isAnonymous = data.is_anonymous
        this.type = data.type
        this.allowsMultipleAnswers = data.allows_multiple_answers
        this.correctOptionId = data.correct_option_id
        this.explanation = data.explanation
        this.explanationEntities = data.explanation_entities.map((entityData: any) => new MessageEntity(client, entityData))
        this.openPeriod = data.open_period
        this.closeDate = new Date(data.close_date * 1000)
    }
}