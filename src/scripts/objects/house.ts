export default class House extends Phaser.GameObjects.Sprite{

    constructor(scene, battleCounter){
        var x = 750;
        var y = 400;
        if (battleCounter==0)
            super(scene,x,y,"houseLarge");
        if (battleCounter==1)
            super(scene,x,y,"houseMedium");
        if (battleCounter==2 )
            super(scene,x,y,"houseSmall");
        else
            super(scene,x,y,'houseLarge');
        
        this.setDisplaySize(400,250)
        this.setOrigin(0,0);
        scene.add.existing(this)
    }
} 