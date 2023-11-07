import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, stateStack, timer } from "../../globals.js";
import BattleOpponentPanel from "../../user-interface/battle/OpponentPanel.js";
import BattlePlayerPanel from "../../user-interface/battle/PlayerPanel.js";
import Panel from "../../user-interface/elements/Panel.js";
import Pokemon from "../../entities/Pokemon.js";
import BattleMenuState from "./BattleMenuState.js";
import BattleMessageState from "./BattleMessageState.js";
import Colour from "../../enums/Colour.js";
import Opponent from "../../entities/Opponent.js";

export default class BattleState extends State {
	static PLAYER_PLATFORM = { x: 0, y: 200 };
	static OPPONENT_PLATFORM = { x: 215, y: 80 };

	/**
	 * When a Player encounters a Pokemon in the wild the
	 * Player's Pokemon and Opponent Pokemon will battle.
	 * This state serves as the starting point for the battle.
	 *
	 * @param {Player} player
	 * @param {Opponent} opponent
	 */
	constructor(player, opponent) {
		super();

		this.player = player;
		this.opponent = opponent;
		this.playerPokemon = player.party[0];
		this.opponentPokemon = opponent.party[0];

		this.playerPokemon.prepareForBattle(Pokemon.BACK_POSITION);
		this.opponentPokemon.prepareForBattle(Pokemon.FRONT_POSITION);

		this.panel = new Panel(
			Panel.BOTTOM_DIALOGUE.x,
			Panel.BOTTOM_DIALOGUE.y,
			Panel.BOTTOM_DIALOGUE.width,
			Panel.BOTTOM_DIALOGUE.height,
		);
		this.playerPanel = new BattlePlayerPanel(
			Panel.BATTLE_PLAYER.x,
			Panel.BATTLE_PLAYER.y,
			Panel.BATTLE_PLAYER.width,
			Panel.BATTLE_PLAYER.height,
			this.playerPokemon,
		);
		this.opponentPanel = new BattleOpponentPanel(
			Panel.BATTLE_OPPONENT.x,
			Panel.BATTLE_OPPONENT.y,
			Panel.BATTLE_OPPONENT.width,
			Panel.BATTLE_OPPONENT.height,
			this.opponentPokemon,
		);
	}

	enter() {
		this.triggerBattleStart();
	}

	render() {
		this.renderBackground();
		this.renderForeground();
	}

	renderBackground() {
		context.save();
		context.fillStyle = Colour.White;
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
	}

	renderForeground() {
		this.playerPokemon.render();
		this.opponentPokemon.render();
		this.panel.render();
		this.playerPanel.render();
		this.opponentPanel.render();
	}

	triggerBattleStart() {
		timer.tween(this.opponentPokemon.position, ['x'], [Pokemon.FRONT_POSITION.end.x], 0.75, () => this.triggerStartingDialogue());
	}

	triggerStartingDialogue() {
		stateStack.push(new BattleMessageState(`A wild ${this.opponentPokemon.name} appeared!`, 0, () => {
			stateStack.push(new BattleMessageState(`Go ${this.playerPokemon.name}!`, 0, () => this.sendOutPlayerPokemon()));
		}));
	}

	sendOutPlayerPokemon() {
		timer.tween(this.playerPokemon.position, ['x'], [Pokemon.BACK_POSITION.end.x], 0.75, () => {
			stateStack.push(new BattleMenuState(this))
		});
	}
}
