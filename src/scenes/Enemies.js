class Enemies extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, img) {
        super(scene, x, y, img);
        scene.add.existing(this); //will add enemy to scene
        scene.physics.add.existing(this);
        scene.physics.world.enable(this);//will allow enemy to interact with game physics

    }
    defineEnemyAnimation() {

    }
    update(groundSpeed) {
        this.x -= groundSpeed;
        if (this.x + this.width / 2 <= 0) {
            this.destroy();
        }
    }
}
export class Wizard extends Enemies {
    constructor(scene, x, y, img) {
        y=610;
        super(scene, x, y, img);
        this.setDisplaySize(196, 156);
        this.setSize(31, 46);
        this.defineEnemyAnimation()
        this.body.allowGravity = false;
    }
    defineEnemyAnimation() {
        this.anims.create({
            key: 'wizardMove',
            frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        })
    }
    update(groundSpeed) {
        this.x -= groundSpeed;
        if (this.x+this.width>=0)
            this.anims.play('wizardMove', true);
        else
            this.anims.stop();
    }
}
export class Knight extends Enemies {
    constructor(scene, x, y, img) {
        y=646;
        super(scene, x, y, img);
        this.setDisplaySize(196, 146);
        this.setSize(46, 46);
        this.defineEnemyAnimation();
        this.body.allowGravity = false;
    }
    defineEnemyAnimation() {
        this.anims.create({
            key: 'knightMove',
            frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 5 }),
            frameRate: 14,
            repeat: -1
        })
    }
    update(groundSpeed) {
        this.x -= groundSpeed;
        if (this.width+this.x>=0)
            this.anims.play('knightMove', true);
        else
            this.anims.stop();
    }
}
export class Beast extends Enemies {
    constructor(scene, x, y, img) {
        y=657;
        super(scene, x, y, img);
        this.setDisplaySize(196, 156);
        this.setSize(52,28);
        this.defineEnemyAnimation();
        this.body.allowGravity=false;
    }
    defineEnemyAnimation() {
        this.anims.create({
            key: 'beastMove',
            frames: this.anims.generateFrameNumbers('beast', { start: 0, end: 5 }),
            frameRate: 18,
            repeat: -1
        })
    }
    update(groundSpeed) {
        this.x -= groundSpeed;
        if (this.x+this.width>=0)
            this.anims.play('beastMove', true);
        else
            this.anims.stop();
    }
}