/**
 * @file level1.js
 * @description Provides level1 functionality for the El Polo Loco game.
 */
/**
 * Executes loadLevel1.
 * @param {*} world
 */
function loadLevel1(world) {
    let levelCount = 1
    let levelBeginn = 0
    let level = new Level()
    level.loadLevelData(world,

    [
        new SmallChicken(600),
        new SmallChicken(900),
        new SmallChicken(1200),
        new Chicken(1600),
        new Chicken(1800),
    ],

    [
        new Cloud(levelBeginn),
        new Cloud(levelBeginn),
    ],

    [
        new Background("../img/background/layers/air.png", levelBeginn),
        new Background("../img/background/layers/air.png", 1280 * levelCount),
        new Background("../img/background/layers/air.png", -1280),
        new Background("../img/background/layers/3_third_layer/1.png", levelBeginn),
        new Background("../img/background/layers/3_third_layer/2.png", 1280 * levelCount),
        new Background("../img/background/layers/3_third_layer/2.png", -1280),
        new Background("../img/background/layers/2_second_layer/1.png", levelBeginn),
        new Background("../img/background/layers/2_second_layer/2.png", 1280 * levelCount),
        new Background("../img/background/layers/2_second_layer/2.png", -1280),
        new Background("../img/background/layers/1_first_layer/1.png", levelBeginn),
        new Background("../img/background/layers/1_first_layer/2.png", 1280 * levelCount),
        new Background("../img/background/layers/1_first_layer/2.png", -1280),
    ],
    [
        new bottleCollectable(levelBeginn + 400),
        new bottleCollectable(levelBeginn + 800),
        new bottleCollectable(levelBeginn + 1200),
        new coinCollectable(levelBeginn + 700),
        new coinCollectable(levelBeginn + 1100),
        new coinCollectable(levelBeginn + 2100),
    ]
    )
}
