import { Scene } from "phaser";

export default class Character extends Phaser.Physics.Arcade.Sprite {
    
    private speed: number;
    private isFlippedX: boolean;
    private isFlippedY: boolean;
    private xDestination: number;
    private yDestination: number;
    theScene:Scene;
    direction: String;

    mySprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "idle");
        this.theScene = scene;
        this.speed = 1;
        this.direction = "south";

    }

    movement(direction: string) {
        this.direction = direction;
        if (direction == "up") {
            this.y -= this.speed;
            this.yDestination = this.y;
        } else if (direction == "down") {
            this.y += this.speed;
            this.yDestination = this.y;
    
        } else if (direction == "left") {
            this.setFlipX(true);
            this.x -= this.speed;
            this.xDestination = this.x;
    
        } else if (direction == "right") {
            this.setFlipX(false);
            this.x += this.speed;
            this.xDestination = this.x;
        }
    }

    getDirection(){
        return this.direction;
    }
}