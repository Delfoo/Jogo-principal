// Importar todas as cenas
import { inicio } from "./inicio.js";
import { fase1 } from "./fase1.js";
import { fase2 } from "./fase2.js";

import { fim } from "./fim.js";


// Configuração do jogo
const config = {
  type: Phaser.AUTO,
  width:  640,
  height:  360,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug:  true
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 640,
    height: 360,
  },
  scene: [inicio, fase1, fase2,  fim],
};

// Criar o objeto principal
const game = new Phaser.Game(config);
