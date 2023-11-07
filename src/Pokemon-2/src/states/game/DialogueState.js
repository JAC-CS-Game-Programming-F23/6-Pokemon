import { getRandomPositiveInteger, pickRandomElement } from "../../../lib/RandomNumberHelpers.js";
import State from "../../../lib/State.js";
import { keys, stateStack } from "../../globals.js";
import Textbox from "../../user-interface/elements/Textbox.js";

export default class DialogueState extends State {
	/**
	 * State that presents a Textbox to the player
	 * to demonstrate that only the top state in the
	 * stack gets updated and the rest are only rendered.
	 */
	constructor() {
		super();

		this.textbox = new Textbox(
			getRandomPositiveInteger(5, 7),
			getRandomPositiveInteger(0, 8),
			getRandomPositiveInteger(4, 8),
			getRandomPositiveInteger(3, 4),
			pickRandomElement([
				"I'm a textbox!",
				"Someone ask for a Textbox?",
				"Uhh... you wanted a Textbox? Sorry, I'm a flexbox :|",
				"Textbox operational.",
				"Textbox online.",
				"Hey! How'd I get here?",
				"Can I take your order?",
				"Need a Textbox?",
				"Somebody call for an Textbox?",
				"You wanna piece of this Textbox, boy?",
				"Prepped and ready.",
				"Textbox reporting.",
				"Textbox good to go, sir.",
				"Ready to roll out!",
				"Textbox, prepared.",
				"Alright! Bring it on!",
				"Textbox awaiting launch orders.",
			]),
			{ isAdvanceable: true }
		);
	}

	update() {
		if (keys.Escape) {
			keys.Escape = false;
			this.textbox.next();
		}

		if (keys.Enter) {
			keys.Enter = false;
			stateStack.push(new DialogueState());
		}

		if (this.textbox.isClosed) {
			stateStack.pop();
		}
	}

	render() {
		this.textbox.render();
	}
}
