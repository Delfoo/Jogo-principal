
var fase2 = new Phaser.Scene("Fase 2");

var button;

fase2.preload = function () {
  // Tilesets
  this.load.image("Quadra", "assets/Quadra.png");

  // Tilemap

  // Jogador 1
  this.load.spritesheet("player1", "assets/player1.png", {
    frameWidth: 60,
    frameHeight: 60,
  });

  // Jogador 2
  this.load.spritesheet("player2", "assets/player2.png", {
    frameWidth: 60,
    frameHeight: 60,
  });

  this.load.spritesheet("bot1", "assets/bot1.png", {
    frameWidth: 60,
    frameHeight: 60,
  });
  // Trilha sonora
  this.load.audio("trilha", "assets/cena1.mp3");

  // Efeitos sonoros
  this.load.audio("parede", "assets/parede.mp3");
  this.load.audio("voz", "assets/voz.mp3");

  this.load.image("texto", "assets/texto.png");

  // Tela cheia
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 32,
    frameHeight: 32,
  });

  // D-pad
  this.load.spritesheet("esquerda", "assets/esquerda.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("direita", "assets/direita.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("cima", "assets/cima.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("baixo", "assets/baixo.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
};

fase2.create = function () {
  var button = this.add.image(320, 180, "cadeado", 0).setInteractive();

  // Ao clicar no botão, inicia a cena 1
  button.on(
    "pointerdown",
    function () {
      this.scene.start(fase3);
    },
    this
  );
};

fase2.update = function () {};
export { fase2 };
