import GameEntity from "./GameEntity.js";
import { getRandomPositiveInteger } from "../../lib/RandomNumberHelpers.js";

export default class Pokemon extends GameEntity {
	/**
	 * The titular monster/creature that the whole game is
	 * based around. A Pokemon is nothing more than a box of
	 * numbers at the end of the day. One Pokemon's numbers
	 * are compared to another Pokemon's numbers, and things
	 * happen as a result. It's really a genius concept!
	 *
	 * @param {object} definition Defined in config/pokemon.json.
	 * @param {number} level
	 */
	constructor(name, definition, level) {
		super();

		this.name = name;
		this.level = level;

		this.baseHealth = definition.baseHealth;
		this.baseAttack = definition.baseAttack;
		this.baseDefense = definition.baseDefense;
		this.baseSpeed = definition.baseSpeed;

		this.initializeIndividualValues();

		this.health = 0;
		this.attack = 0;
		this.defense = 0;
		this.speed = 0;

		this.calculateStats();

		this.currentHealth = this.health;
	}

	/**
	 * @see https://bulbapedia.bulbagarden.net/wiki/Individual_values
	 */
	initializeIndividualValues() {
		this.healthIV = getRandomPositiveInteger(0, 31);
		this.attackIV = getRandomPositiveInteger(0, 31);
		this.defenseIV = getRandomPositiveInteger(0, 31);
		this.speedIV = getRandomPositiveInteger(0, 31);
	}

	/**
	 * @see https://bulbapedia.bulbagarden.net/wiki/Individual_values#Determination_of_stats_2
	 */
	calculateStats() {
		this.health = this.calculateHealth();
		this.attack = this.calculateStat(this.baseAttack, this.attackIV);
		this.defense = this.calculateStat(this.baseDefense, this.defenseIV);
		this.speed = this.calculateStat(this.baseSpeed, this.speedIV);
	}

	calculateHealth() {
		return Math.floor(((2 * this.baseHealth + this.healthIV) * this.level) / 100) + this.level + 10;
	}

	calculateStat(base, iv) {
		return Math.floor(((2 * base + iv) * this.level) / 100) + 5;
	}
}
