import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Player from "../entities/Player.js";
import ImageName from "../enums/ImageName.js";
import Tile from "./Tile.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	DEBUG,
	images,
} from "../globals.js";

export default class Map {
	static WIDTH = 15;
	static HEIGHT = 11;

	/**
	 * The collection of layers, sprites,
	 * and characters that comprises the world.
	 *
	 * @param {object} mapDefinition JSON from Tiled map editor.
	 */
	constructor(mapDefinition) {
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			Tile.SIZE,
			Tile.SIZE,
		);

		this.tiles = Map.generateTiles(mapDefinition, sprites);
		this.player = new Player({ position: new Vector(7, 5) }, this);
	}

	update(dt) {
		this.player.update(dt);
	}

	render() {
		this.renderMap();

		if (DEBUG) {
			Map.renderGrid();
		}

		this.player.render();
	}

	renderMap() {
		for (let y = 0; y < Map.HEIGHT; y++) {
			for (let x = 0; x < Map.WIDTH; x++) {
				this.getTile(x, y).render(x, y);
			}
		}
	}

	/**
	 * The Y coordinate is multiplied by the map width
	 * to get us to the correct row, then the X coordinate
	 * is added to get us to the correct column in that row.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @returns The Tile that lives at (x, y) in the layer.
	 */
	getTile(x, y) {
		return this.tiles[x + y * Map.WIDTH];
	}

	/**
	 * @param {object} layerData The exported layer data from Tiled.
	 * @param {array} sprites
	 * @returns An array of Tile objects.
	 */
	static generateTiles(layerData, sprites) {
		const tiles = [];

		layerData.forEach((tileId) => {
			// map.json indexes tiles starting from 1 and not 0, so we must adjust it.
			tileId--;

			// -1 means there should be no tile at this location.
			const tile = tileId === -1 ? null : new Tile(tileId, sprites);

			tiles.push(tile);
		});

		return tiles;
	}

	/**
	 * Draws a grid of squares on the screen to help with debugging.
	 */
	static renderGrid() {
		context.save();
		context.strokeStyle = 'white';

		for (let y = 1; y < CANVAS_HEIGHT / Tile.SIZE; y++) {
			context.beginPath();
			context.moveTo(0, y * Tile.SIZE);
			context.lineTo(CANVAS_WIDTH, y * Tile.SIZE);
			context.closePath();
			context.stroke();

			for (let x = 1; x < CANVAS_WIDTH / Tile.SIZE; x++) {
				context.beginPath();
				context.moveTo(x * Tile.SIZE, 0);
				context.lineTo(x * Tile.SIZE, CANVAS_HEIGHT);
				context.closePath();
				context.stroke();
			}
		}

		context.restore();
	}
}
