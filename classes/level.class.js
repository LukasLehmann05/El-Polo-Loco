class Level {

    constructor() {
    }

    loadLevelData(world,enemies, clouds, backgrounds, collectables) {
        world.enemies.push(...enemies)
        world.clouds.push(...clouds)
        world.backgrounds.push(...backgrounds)
        world.collectables.push(...collectables)
    }

}