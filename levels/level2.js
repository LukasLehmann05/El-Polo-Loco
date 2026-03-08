/**
 * @file level2.js
 * @description Provides level2 functionality for the El Polo Loco game.
 */
/**
 * Executes loadLevel2.
 * @param {*} world
 */
function loadLevel2(world) {
    let levelCount = 2
    let levelBeginn = 2560 * (levelCount - 1)
    let level = new Level()
    level.loadLevelData(world,

    [
        new Chicken(levelBeginn),
        new Chicken(levelBeginn),
        new Chicken(levelBeginn),
        new SmallChicken(levelBeginn),
        new Endboss(levelBeginn)
    ],

    [
        new Cloud(levelBeginn),
        new Cloud(levelBeginn),
    ],

    [
        new Background("../img/background/layers/air.png", levelBeginn),
        new Background("../img/background/layers/air.png", 2560 * levelCount),
        new Background("../img/background/layers/3_third_layer/1.png", levelBeginn),
        new Background("../img/background/layers/3_third_layer/2.png", 2560 * levelCount),
        new Background("../img/background/layers/2_second_layer/1.png", levelBeginn),
        new Background("../img/background/layers/2_second_layer/2.png", 2560 * levelCount),
        new Background("../img/background/layers/1_first_layer/1.png", levelBeginn),
        new Background("../img/background/layers/1_first_layer/2.png", 2560 * levelCount),
    ],
    [
        new bottleCollectable(levelBeginn + 400),
        new bottleCollectable(levelBeginn + 800),
        new bottleCollectable(levelBeginn + 1200),
        new coinCollectable(levelBeginn + 300),
        new coinCollectable(levelBeginn + 500),
        new coinCollectable(levelBeginn + 700),
        new coinCollectable(levelBeginn + 900),
        new coinCollectable(levelBeginn + 1100),
        new coinCollectable(levelBeginn + 1300),
        new coinCollectable(levelBeginn + 1700),
        new coinCollectable(levelBeginn + 2100),
    ]
    )
}
