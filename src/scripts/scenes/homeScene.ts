import "phaser";
const config: GameConfig= {
    title: "EGO",
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game"
}
export default class homeScene extends Phaser.Scene{
    constructor() {
        super('homeScene');
    }
    preload() [
        this.load.image("egoLogo", "assets/img/ego-main-screen.jpg");

    ]

}

