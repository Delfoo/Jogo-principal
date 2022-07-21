// Importar a próxima cena
import { fase1 } from "./fase1.js";

// Criar a cena 0
var inicio = new Phaser.Scene("inicio");

inicio.preload = function () {
  // Imagem de fundo
  this.load.image("cadeado", "assets/inicio.png");
};

inicio.create = function () {
  // Botão com a imagem de fundo
  var button = this.add.image(320, 180, "cadeado", 0)
  .setInteractive()
  .setScale(0.33);

  // Ao clicar no botão, inicia a cena 1
  button.on(
    "pointerdown",
    function () {
      this.scale.startFullscreen();
      this.scene.start(fase1);
    },
    this
  );
};

inicio.update = function () {};

// Exportar a cena
export { inicio };
