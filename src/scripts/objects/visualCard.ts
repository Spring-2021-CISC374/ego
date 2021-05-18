import Card from './card';
import eventDispatcher from './EventDispatcher';
import EventDispatcher from './EventDispatcher';
import Player from './player';

export default class VisualCard extends Phaser.GameObjects.Sprite{
    card: Card;

    constructor(scene, x: number, y: number, card: Card, player: Player, enemy: Player){
        super(scene, x, y, 'card' + card.getIndex());
        this.card = card;

        this.setDisplaySize(130, 150);
        this.setOrigin(0, 1);

        this.setInteractive();
        this.on('pointerdown', this.mouseclick, this);

        scene.add.existing(this);
    }

    mouseclick(){
        //console.log('im ' + this.card.getName());
        eventDispatcher.emit('USE_CARD', this.card);
        this.destroy();
    }
}
