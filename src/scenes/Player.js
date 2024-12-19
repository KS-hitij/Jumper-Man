export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene,x,y,'player');
        scene.add.existing(this); //will add player to scene
        scene.physics.world.enable(this); //will allow player to interact with game physics
        this.setCollideWorldBounds(true);
        this.setDisplaySize(54, 80);
        this.isJumping = false;
    }
    definePlayerAnimations(){
        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
            frameRate:15,
            repeat:-1
        });
    }
    update(){
        this.anims.play('run', true);

        // Update jump state
        if (this.body.touching.down) {
            this.isJumping = false; // Reset jump state when landing
        }
    }
    jump()
    {
        // check if the player is not already jumping
        if (!this.isJumping) {
            this.isJumping = true;

            // Apply upward velocity to simulate the jump
            this.setVelocityY(-500); // Adjust the value for jump height
        }
    }
}
