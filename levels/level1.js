function loadLevel1(world) {
    let level = new Level()
    level.loadLevelData(world,

    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Cloud(),
        new Cloud(),
    ],

    [
        new Background("../img/background/layers/air.png", 0),
        new Background("../img/background/layers/air.png", 1280),
        new Background("../img/background/layers/air.png", -1280),
        new Background("../img/background/layers/3_third_layer/1.png", 0),
        new Background("../img/background/layers/3_third_layer/2.png", 1280),
        new Background("../img/background/layers/3_third_layer/2.png", -1280),
        new Background("../img/background/layers/2_second_layer/1.png", 0),
        new Background("../img/background/layers/2_second_layer/2.png", 1280),
        new Background("../img/background/layers/2_second_layer/2.png", -1280),
        new Background("../img/background/layers/1_first_layer/1.png", 0),
        new Background("../img/background/layers/1_first_layer/2.png", 1280),
        new Background("../img/background/layers/1_first_layer/2.png", -1280),
    ],
    [
        new bottleCollectable(400),
        new bottleCollectable(800),
        new bottleCollectable(1200),
        new coinCollectable(300),
        new coinCollectable(500),
        new coinCollectable(700),
        new coinCollectable(900),
        new coinCollectable(1100),
        new coinCollectable(1300),
        new coinCollectable(1700),
        new coinCollectable(2100),
    ]
    )
}