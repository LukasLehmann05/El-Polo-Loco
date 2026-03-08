/**
 * @file level.class.js
 * @description Recives data from level scripts and loads the level data into the world class.
 */
class Level {

    /**
     * Class initialization.
     */
    constructor() {
    }

    /**
     * Loads given level data into world to be displayed.
     * @param {class} world world class where data is being loaded into.
     * @param {array} enemies all enemies from the level.
     * @param {array} clouds all clouds from the level.
     * @param {array} backgrounds all backgrounds from the level.
     * @param {array} collectables all collectables from the level.
     */
    loadLevelData(world,enemies, clouds, backgrounds, collectables) {
        world.enemies.push(...enemies)
        world.clouds.push(...clouds)
        world.backgrounds.push(...backgrounds)
        world.collectables.push(...collectables)
    }

}
