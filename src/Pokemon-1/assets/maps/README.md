# Tiled Instructions

1. If you don't already have it installed, head over to [https://www.mapeditor.org/](https://www.mapeditor.org/) and download+install the Tiled map editor.
   - This is an excellent free and open source piece of software that we can leverage to make our lives easier when creating tilemaps.
2. Click `File > New > New Map` and enter the following configuration.
   - Change the name to whatever you'd like and save it to the `./Pokemon-1/assets/maps` folder.
3. You should now see a new blank map.
4. Click `File > New > New Tileset` and browse to the location of `./Pokemon-1/assets/images/tiles.png`.
   - Change the name to whatever you'd like and save it to the `./Pokemon-1/assets/maps` folder.
5. You should now see the tileset broken up automatically into tiles.
6. There should be two tabs at the top. The first one is the map editor, and the second one (screenshot above) is the tileset. Switch to the first tab so that we can start making our map!

## Creating a Map

1. At the top you'll find several tools at your disposal. For our purposes, we'll be sticking with the rectangle tool.
2. Select the rectangle tool, then select a grass tile from the top row of the tileset on the right you want to paint. In the main map grid view, drag your mouse from the top left of the map to the bottom right, and you should get something like this.
3. That looks too uniform! To vary it up, we could manually choose different grass tiles and paint them in various spots on the map, but there is an easier way.
   1. With the rectangle tool selected, select the dice icon 🎲 from the toolbar as well.
   2. Click and drag on the tileset to select multiple tiles.
   3. Just as before, in the main map grid view, drag your mouse from the top left of the map to the bottom right, and you should get something less uniform.

## Adding Layers

For our Pokemon game, we'll want to have 3 distinct layers to our map. The first layer will be the base or background that the character will walk on. The second layer will be tiles that the player should not be able to walk on, i.e., collidable tiles. The third layer will be tiles that should always be rendered on top of the player to create a more accurate visual effect.

1. Rename the layer we just painted with grass by going to the _Layers_ panel on the top right and double clicking the name of the layer. Call it _Bottom Layer_.
2. Click on the _New Layer_ icon and call the new layer _Collision Layer_.
3. Make sure this new _Collision Layer_ is selected in the _Layers_ panel. You'll know it's selected because it will be highlighted in blue.

   > 💡 Something I like to do is lock all layers except the one I'm currently editing by clicking the lock icon 🔒 next to each layer. Too many times I found myself editing one layer when I thought I was editing another, and this saved me that headache!

4. Paint tiles on the _Collision Layer_ that you want the character not to be able to walk over. This could be a tree, buildings, or other objects.

   > ⚠️ It's important that you only paint the tiles you want the character to bump into! Notice how I'm not painting the entire tree since I don't want the character to bump into the top of the tree, only the bottom.

5. Create a new layer just as before and call it _Top Layer_. On this new layer, paint tiles that you want to always be rendered in front of the character.
6. Finally, save the project file (`CTRL+S`/`CMD+S`) so that you can close the program and come back to it later.

## Loading the Map

1. Click `File > Export As` and save it as `./Pokemon-1/config/map.json`. It's important that the file is called exactly this and saved in this exact location.
2. Start up Live Server, navigate to `Pokemon-1` and you should see your map loaded in and your character should interact with the world properly.
3. Awesome! Lastly, there is functionality built into only this specific update that allows us to toggle each layer. Hopefully, this will illustrate how/when each layer is being drawn, and how the character fits in between the layers:
   1. Press `1` to toggle the bottom layer.
   2. Press `2` to toggle the bottom layer.
   3. Press `3` to toggle the bottom layer.
