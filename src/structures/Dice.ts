import { DiceEmoji } from 'typings';
import Client from '../client/Client';
import Base from './Base';

/** Represents an animated emoji that displays a random value */
export default class Dice extends Base {
    /** Emoji on which the dice throw animation is based */
    emoji: DiceEmoji

    /** Value of the dice, 1-6 for '🎲', '🎯' and '🎳' base emoji, 1-5 for '🏀' and '⚽' base emoji, 1-64 for '🎰' base emoji */
    value: number

    constructor(client: Client, data: any) {
        super(client)

        this.emoji = data.emoji
        this.value = data.value
    }
}