import { Game as MainGame } from './scenes/Game';
import { AUTO, Scale,Game, Physics } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
    scene: [
        MainGame
    ],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y:550},
            debug:false,
            fps: 60
        }
    }
};

export default new Game(config);
