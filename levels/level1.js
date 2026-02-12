const level1 = new Level (
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
)