/**
 * @file level2.js
 * @description Provides level2 functionality for the El Polo Loco game.
 */
/**
 * Executes loadLevel2.
 * @param {*} world
 */
function loadLevel3(world) {
    let levelCount = 3
    let levelBeginn = 2560 * (levelCount - 1)
    let level = new Level()
    level.loadLevelData(world,

    [
        new Chicken(levelBeginn + 200),
        new Endboss(levelBeginn + 600)
    ],

    [
        new Cloud(levelBeginn),
        new Cloud(levelBeginn),
    ],

    [
        new Background("../img/background/layers/air.png", levelBeginn),
        new Background("../img/background/layers/air.png", levelBeginn + 1280),
        new Background("../img/background/layers/3_third_layer/1.png", levelBeginn),
        new Background("../img/background/layers/3_third_layer/2.png", levelBeginn + 1280),
        new Background("../img/background/layers/2_second_layer/1.png", levelBeginn),
        new Background("../img/background/layers/2_second_layer/2.png", levelBeginn + 1280),
        new Background("../img/background/layers/1_first_layer/1.png", levelBeginn),
        new Background("../img/background/layers/1_first_layer/2.png", levelBeginn + 1280),
    ],
    [
        new bottleCollectable(levelBeginn + 400),
        new bottleCollectable(levelBeginn + 800),
        new bottleCollectable(levelBeginn + 1200),
        new coinCollectable(levelBeginn + 700),
        new coinCollectable(levelBeginn + 1300),
        new coinCollectable(levelBeginn + 2100),
    ]
    )
}
