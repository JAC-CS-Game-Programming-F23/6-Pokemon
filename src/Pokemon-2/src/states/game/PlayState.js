import State from "../../../lib/State.js";
import { CANVAS_HEIGHT, context, keys, stateStack } from "../../globals.js";
import Map from "../../services/Map.js";
import Tile from "../../services/Tile.js";
import DialogueState from "./DialogueState.js";

export default class PlayState extends State {
	constructor(mapDefinition) {
		super();

		this.map = new Map(mapDefinition);
	}

	update(dt) {
		this.map.update(dt);

		if (keys.Enter) {
			keys.Enter = false;

			stateStack.push(new DialogueState());
		}
	}

	render() {
		this.map.render();
		this.renderStateStack();
	}

	renderStateStack() {
		context.save();

		context.fillStyle = 'rgba(0, 0, 0, 0.75)';
		context.fillRect(0, 0, Tile.SIZE * 5, CANVAS_HEIGHT);

		stateStack.states.forEach((state, index) => {
			const spacing = Math.min(20, CANVAS_HEIGHT / (stateStack.states.length + 1));
			context.font = `${spacing}px PowerRed`;
			context.fillStyle = index !== stateStack.states.length - 1 ? 'grey' : 'white';
			context.textBaseline = 'alphabetic';
			context.fillText(`${state.constructor.name} (${index})`, 5, CANVAS_HEIGHT - (index * spacing + 5));
		});

		context.restore();
	}
}
