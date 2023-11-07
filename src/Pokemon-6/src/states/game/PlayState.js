import State from "../../../lib/State.js";
import { keys, stateStack } from "../../globals.js";
import Panel from "../../user-interface/elements/Panel.js";
import Map from "../../services/Map.js";
import DialogueState from "./DialogueState.js";
import PokemonStatsState from "./PokemonStatsState.js";

export default class PlayState extends State {
	constructor(mapDefinition) {
		super();

		this.map = new Map(mapDefinition);
	}

	update(dt) {
		this.map.update(dt);
		this.healFaintedPokemon();

		if (keys.Enter) {
			keys.Enter = false;

			stateStack.push(new DialogueState(
				`We're no strangers to love. You know the rules and so do I. \
				A full commitment's what I'm thinking of. You wouldn't get \
				this from any other guy. I just wanna tell you how I'm feeling. \
				Gotta make you understand. Never gonna give you up. Never gonna \
				let you down. Never gonna run around and desert you. Never gonna \
				make you cry. Never gonna say goodbye. Never gonna tell a lie \
				and hurt you.`,
				Panel.BOTTOM_DIALOGUE
			));
		}

		if (keys.Escape) {
			keys.Escape = false;

			stateStack.push(new PokemonStatsState(this.map.player.party[0]));
		}
	}

	render() {
		this.map.render();
	}

	/**
	 * If you're familiar with the real Pokemon games,
	 * you'll know that this is where you'd be teleported
	 * to the Pokemon Center. Since we don't have one, we're
	 * going to use this as a temporary measure instead.
	 */
	healFaintedPokemon() {
		if (this.map.player.party.some((pokemon) => pokemon.currentHealth > 0)) {
			return;
		}

		this.map.player.healParty();

		const message = `Your Pokemon have been healed back to full health...\n \n\
						Be extra careful next time!`;

		stateStack.push(new DialogueState(
			message,
			Panel.BOTTOM_DIALOGUE,
		));
	}
}
