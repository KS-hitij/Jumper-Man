import { Scene } from 'phaser';
import { Player } from './Player'
import { Beast, Knight, Wizard } from './Enemies';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.clouds = [];
        this.tileWidth = 86;
        this.tileHeight = 87;
        this.ground = [];
        this.trees = [];
        this.mountains = [];
        this.treeHeight = 452;
        this.treeWidth = 305;
        this.cloudSpeed = 0.5;
        this.groundSpeed = 5;
        this.smallGapSize = 172;
        this.bigGapSize = this.tileWidth * 3;
        this.knight = null;
        this.enemyCnt = false;
        this.wizard = null
        this.beast = null;
        this.startTime = null;
        this.enemy = null;
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('cloud1', 'cloud1.png');
        this.load.image('cloud2', 'cloud2.png');
        this.load.image('cloud3', 'cloud3.png');
        this.load.image('cloud4', 'cloud4.png');
        this.load.image('tile', "tile.png");
        this.load.image('tree', "tree.png");
        this.load.image('mountain', 'mountain.png');
        this.load.spritesheet('player', '/Jumper man/running.png', {
            frameWidth: 1228 / 4,
            frameHeight: 408
        });
        this.load.spritesheet('wizard', '/Enemies/Wizard.png', {
            frameWidth: 576 / 6,
            frameHeight: 96
        });
        this.load.spritesheet('knight', '/Enemies/Knight.png', {
            frameWidth: 576 / 6,
            frameHeight: 96
        })
        this.load.spritesheet('beast', '/Enemies/Beast.png', {
            frameWidth: 576 / 6,
            frameHeight: 96
        });
        this.load.spritesheet('coin', '/goldCoin.png', {
            frameWidth: 80 / 5,
            frameHeight: 16
        })
    }
    createEnemy() {
        this.wizard = new Wizard(this, -250, 0, 'wizard');
        this.physics.add.collider(this.ground, this.wizard);
        this.physics.add.collider(this.wizard, this.player, this.handleEnemyCollision, null, this);

        this.knight = new Knight(this, -250, 0, 'knight');
        this.physics.add.collider(this.ground, this.knight);
        this.physics.add.collider(this.knight, this.player, this.handleEnemyCollision, null, this);

        this.beast = new Beast(this, -250, 0, 'beast');
        this.physics.add.collider(this.ground, this.beast);
        this.physics.add.collider(this.beast, this.player, this.handleEnemyCollision, null, this);

    }
    spawnEnemy() {
        const enemyTypes = ['wizard', 'beast', 'knight'];
        const enemyClasses = {
            wizard: this.wizard,
            beast: this.beast,
            knight: this.knight
        }
        // Randomly select an enemy type
        const randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];

        const enemy = enemyClasses[randomType];
        enemy.x = this.cameras.main.width + 15;
    }
    create() {
        this.startTime = this.time.now;
        //making clouds
        this.clouds.push(this.add.image(450, 160, 'cloud1'));
        this.clouds.push(this.add.image(1600, 100, 'cloud2'));
        this.clouds.push(this.add.image(1150, 300, 'cloud3'));
        this.clouds.push(this.add.image(770, 120, 'cloud4'));
        this.clouds[0].setDisplaySize(350, 300);
        this.clouds[1].setDisplaySize(200, 200);
        this.clouds[2].setDisplaySize(200, 200);
        this.clouds[3].setDisplaySize(480, 400);


        //ground
        for (let i = 0; i <= 20; i++) {
            let x = i * this.tileWidth - this.tileWidth / 2;
            this.ground.push(this.physics.add.image(x, this.cameras.main.height - this.tileHeight / 2, "tile"));
            let tile = this.ground[i];
            this.physics.world.enable(tile);
            tile.body.immovable = true; // prevents tiles from moving during collision
            tile.body.allowGravity = false;
            tile.body.setSize(this.tileWidth, this.tileHeight);
        }
        //trees
        for (let i = 0; i <= this.cameras.main.width + this.treeWidth; i += this.treeWidth * 2) {
            this.trees.push(this.add.image(i + this.treeWidth / 2, this.cameras.main.height - this.treeHeight / 3, "tree"));
        }
        for (let i = 0; i < this.trees.length; i++) {
            this.trees[i].setDisplaySize(200, 200);
        }
        //this.scene.pause('Game');

        //player Physics
        this.player = new Player(this, 100, this.cameras.main.height - this.tileHeight - 45, 'player');
        this.groundCollider = this.physics.add.collider(this.player, this.ground);
        this.player.definePlayerAnimations();
        this.input.keyboard.on('keydown-SPACE', () => {
            this.player.jump();
        });

        this.createEnemy();
        //spawn Enemy
        this.spawnEnemy();
        this.time.addEvent({
            delay: 3000,
            callback: this.spawnEnemy,
            callbackScope: this, // Ensure correct `this` context
            loop: true // Repeat the event
        })
    }

    handleEnemyCollision() {
        console.log(`Game Over!!\n You survived for ${(this.time.now - this.startTime) / 1000} seconds`);
        this.scene.pause();
    }
    enemyMove() {
        if (this.beast.x + this.beast.width >= 0) {
            this.beast.update(this.groundSpeed);
        }
        else
            this.beast.anims.stop();
        if (this.knight.x + this.knight.width >= 0) {
            this.knight.update(this.groundSpeed);
        }
        else
            this.knight.anims.stop();
        if (this.wizard.x + this.wizard.width >= 0) {
            this.wizard.update(this.groundSpeed);
        }
        else
            this.wizard.anims.stop();
    }
    update() {

        //move clouds
        this.clouds.forEach((cloud, index) => {
            cloud.x -= this.cloudSpeed;
            if (cloud.x + cloud.width <= 0) {
                cloud.x = this.cameras.main.width + cloud.width / 2;
                cloud.y = Math.random() * (this.cameras.main.height / 2);//randomly generate new cloud's y position
            }
        });

        //move ground
        for (let i = 0; i < this.ground.length; i++) {
            let tile = this.ground[i];
            this.ground[i].x -= this.groundSpeed;
            if (this.ground[i].x + this.tileWidth <= this.cameras.main.x) {
                let rightBound = this.cameras.main.x;
                for (let j = 0; j < 20; j++) {
                    if (this.ground[j].x > rightBound)
                        rightBound = this.ground[j].x;
                }
                this.ground[i].x = rightBound + this.tileWidth;
            }
        }
        //move trees
        this.trees.forEach((tree, index) => {
            tree.x -= this.groundSpeed;
            if (tree.x + this.treeWidth <= this.cameras.main.x) {
                tree.x = this.cameras.main.width + 150;
            }
        })

        //player animate
        this.player.update();

        this.enemyMove();
    }
}
