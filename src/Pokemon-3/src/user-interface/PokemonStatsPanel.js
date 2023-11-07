import { context } from "../globals.js";
import Panel from "./elements/Panel.js";
import UserInterfaceElement from "./UserInterfaceElement.js";

export default class PokemonStatsPanel extends Panel {
	constructor(pokemon) {
		super(
			Panel.POKEMON_STATS.x,
			Panel.POKEMON_STATS.y,
			Panel.POKEMON_STATS.width,
			Panel.POKEMON_STATS.height,
		);

		this.pokemon = pokemon;
		this.font = `${UserInterfaceElement.FONT_SIZE}px ${UserInterfaceElement.FONT_FAMILY}`;
	}

	render() {
		super.render();

		context.save();
		context.translate(this.position.x, this.position.y);
		this.renderHeader();
		this.renderLabels();
		this.renderValues();
		context.restore();
	}

	renderHeader() {
		context.font = this.font;
		context.textAlign = 'center';
		context.fillText(`Lv${this.pokemon.level} ${this.pokemon.name}`, this.dimensions.x / 2, 40);
	}

	renderLabels() {
		context.textAlign = 'left';
		[
			`HP:`,
			`Attack:`,
			`Defense:`,
			`Speed:`,
		].forEach((text, index) => context.fillText(text, 35, index * 30 + 80));
	}

	renderValues() {
		context.textAlign = 'right';
		[
			`${this.pokemon.currentHealth} / ${this.pokemon.health}`,
			this.pokemon.attack,
			this.pokemon.defense,
			this.pokemon.speed,
		].forEach((text, index) => context.fillText(text, this.dimensions.x - 35, index * 30 + 80));
	}
}
