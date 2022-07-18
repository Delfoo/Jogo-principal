// Importar a próxima cena
import { fase2 } from "./fase2.js";

// Criar a cena 1
var fase1 = new Phaser.Scene("Fase 1");

// Variáveis locais
var map;
var book1;
var book2;
var book3;
var book4;
var book5;
var book6;
var book7;
var player1;
var player2;
var inventoryText;
var inventory = 0;
var sombra;
var mapa;
var bot1;
var parede;
var texto;
var voz;
var pointer;
var touchX;
var touchY;
var timedEvent;
var timer = -1;
var timerText;
var trilha;
var jogador;
var socket
var ice_servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
var localConnection;
var remoteConnection;
var midias;
const audio = document.querySelector("audio");

fase1.preload = function () {
  // Tilesets
  this.load.image("bibli", "assets/bibli.png");
  // Tilemap
  this.load.tilemapTiledJSON("map", "assets/biblioteca.json");

  // Jogador 1
  this.load.spritesheet("player1", "./assets/player1.png", { frameWidth: 72, frameHeight: 72, });

  // Jogador 2
  this.load.spritesheet("player2", "assets/player2.png", {
    frameWidth: 72,
    frameHeight: 72,
  });

  //Sombra
  this.load.spritesheet("sombra", "./assets/sombra.png", { frameWidth: 960, frameHeight: 960, });
 
  //Coletaveis
  this.load.spritesheet("book1", "./assets/book1.png", { frameWidth: 1000, frameHeight: 1000, });
  this.load.spritesheet("book2", "./assets/book2.png", { frameWidth: 1000, frameHeight: 1000, });
  this.load.spritesheet("book3", "./assets/book3.png", { frameWidth: 1000, frameHeight: 1000, });
  this.load.spritesheet("book4", "./assets/book4.png", { frameWidth: 1000, frameHeight: 1000, });
  this.load.spritesheet("book5", "./assets/book5.png", { frameWidth: 1000, frameHeight: 1000, });
  this.load.spritesheet("book6", "./assets/book6.png", { frameWidth: 1000, frameHeight: 1000, });
  this.load.spritesheet("book7", "./assets/book7.png", { frameWidth: 1000, frameHeight: 1000, });
  
  //Mapa
  this.load.spritesheet("mapa", "./assets/mapi.png", { frameWidth: 640, frameHeight: 360, });
  //this.load.spritesheet("bot1", "assets/bot1.png", {frameWidth: 60,frameHeight: 60,});
  // Trilha sonora
  this.load.audio("trilha", "assets/cena1.mp3");

  // Efeitos sonoros
  this.load.audio("parede", "assets/parede.mp3");
  this.load.audio("voz", "assets/voz.mp3");

  sombra = this.physics.add.sprite(100, 800, "sombra")


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
  //texto = this.add.text(120, 80, "Parabéns você é gay").setVisible(false);
};

fase1.create = function () {
  // Trilha sonora
  trilha = this.sound.add("trilha");
  trilha.play();

  // Efeitos sonoros
  parede = this.sound.add("parede");
  voz = this.sound.add("voz");

  // Tilemap
  //Mapa e Colisão
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("bibli", "bibli");
  const belowLayer = map.createStaticLayer("belowplayer", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
  worldLayer.setCollisionByProperty({ collides: true });

  // Personagens
  player1 = this.physics.add.sprite(47, 940, "player1", 0).setScale(0.4);
  player1.setSize(36, 60, true);
  player2 = this.physics.add.sprite(910, 940, "player2").setScale(0.4);
  player2.setSize(100, 120, true);

  player1.body.immovable = true;
  player2.body.immovable = true;

  //Colisão Player e Mundo
  var physics = this.physics;
    physics.add.collider(player1, worldLayer);
    player1.setCollideWorldBounds(true);
    physics.add.collider(player2, worldLayer);
    player2.setCollideWorldBounds(true);

  // Animação do jogador 1: a esquerda
  this.anims.create({
    key: "left1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 4,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2: a esquerda
  this.anims.create({
    key: "left2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 4,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 1: a direita
  this.anims.create({
    key: "right1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 8,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do player 1 pra baixo
  this.anims.create({
    key: "descendo1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do player 1 pra cima
  this.anims.create({
    key: "subindo1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do player 2 pra baixo
  this.anims.create({
    key: "descendo2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do player 2 pra cima
  this.anims.create({
    key: "subindo2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animação do jogador 2: a direita
  this.anims.create({
    key: "right2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 8,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  //Itens
  book1 = this.physics.add.sprite(495, 385, "book1").setScale(0.4); //Vermelho OK
  book2 = this.physics.add.sprite(440, 567, "book2").setScale(0.4); //Amarelo OK
  book3 = this.physics.add.sprite(913, 47, "book3").setScale(0.4);
  book4 = this.physics.add.sprite(785, 272, "book4").setScale(0.4);
  book5 = this.physics.add.sprite(440, 810, "book5").setScale(0.4); //Azul OK
  book6 = this.physics.add.sprite(495, 50, "book6").setScale(0.4);
  book7 = this.physics.add.sprite(39, 265, "book7").setScale(0.4); //ok
  //Sombra
  sombra = this.physics.add.sprite(100, 800, "sombra")
  //Coleta dos livros
  this.physics.add.overlap(player1, book1, collectbook, null, this);
  this.physics.add.overlap(player1, book2, collectbook, null, this);
  this.physics.add.overlap(player1, book3, collectbook, null, this);
  this.physics.add.overlap(player1, book4, collectbook, null, this);
  this.physics.add.overlap(player1, book5, collectbook, null, this);
  this.physics.add.overlap(player1, book6, collectbook, null, this);
  this.physics.add.overlap(player1, book7, collectbook, null, this);

  //Animação do bot respirando
 // this.anims.create({key: "random",frames: this.anims.generateFrameNumbers("bot1", {start: 0,end: 1,}),frameRate: 2,repeat: -1,});
 // bot1.anims.play("random", true);
 // bot1.body.immovable = true;

  // Animação do jogador 1: ficar parado (e virado para a direita)
  this.anims.create({
    key: "stopped1",
    frames: this.anims.generateFrameNumbers("player1", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // Animação do jogador 2: ficar parado (e virado para a direita)
  this.anims.create({
    key: "stopped2",
    frames: this.anims.generateFrameNumbers("player2", {
      start: 0,
      end: 0,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // Interação por toque de tela (até 2 toques simultâneos: 0 a 1)
  pointer = this.input.addPointer(1);

  // Cena (960x960) maior que a tela (800x600)
  this.cameras.main.setBounds(0, 0, 960, 960);
  this.physics.world.setBounds(0, 0, 960, 960);

  // Botão de ativar/desativar tela cheia
  var button = this.add
    .image(640 - 16, 16, "fullscreen", 0)
    .setOrigin(1, 0)
    .setInteractive()
    .setScrollFactor(0);

  // Ao clicar no botão de tela cheia
  button.on(
    "pointerup",
    function () {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // Tecla "F" também ativa/desativa tela cheia
  var FKey = this.input.keyboard.addKey("F");
  FKey.on(
    "down",
    function () {
      if (this.scale.isFullscreen) {
        button.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        button.setFrame(1);
        this.scale.startFullscreen();
      }
    },
    this
  );

  // D-pad
  var esquerda = this.add
    .image(490, 275, "esquerda", 0)
    .setInteractive()
    .setScrollFactor(0);
  var direita = this.add
    .image(590, 275, "direita", 0)
    .setInteractive()
    .setScrollFactor(0);
  var cima = this.add
    .image(540, 230, "cima", 0)
    .setInteractive()
    .setScrollFactor(0);
  var baixo = this.add
    .image(540, 320, "baixo", 0)
    .setInteractive()
    .setScrollFactor(0);

    //Mapa
  mapa = this.physics.add.sprite(640, 780, "mapa")

  //Contador
  timerText = this.add.text(16, 16, timer, {
    fontSize: "32px",
    fill: "#ffffff",
  });
  timerText.setScrollFactor(0);
  
  // Conectar no servidor via WebSocket
  socket = io();

  var physics = this.physics;
  var cameras = this.cameras;
  var time = this.time;
// Disparar evento quando jogador entrar na partida
  socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);
      mapa.setVisible(false);

      //physics.add.collider(player1, bot1, hitARCa, null, this);
      //physics.add.collider(player1, bot1, texto, null, this);


      // Câmera seguindo o personagem 1
      cameras.main.startFollow(player1);

      // D-pad: para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player1.setVelocityX(-160);
          player1.anims.play("left1", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player1.setVelocityX(160);
          player1.anims.play("right1", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player1.setVelocityY(-160);
          player1.anims.play("subindo1", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player1.setVelocityY(160);
          player1.anims.play("descendo1", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo === socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
sombra.setVisible(false);
player2.setCollideWorldBounds(true);

      //physics.add.collider(player2, bot1, hitARCa, null, this);

      // Câmera seguindo o personagem 2
      cameras.main.startFollow(player2);

      // D-pad: para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player2.setVelocityX(-160);
          player2.anims.play("left2", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player2.setVelocityX(160);
          player2.anims.play("right2", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player2.setVelocityY(-160);
          player2.anims.play("subindo2", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player2.setVelocityY(160);
          player2.anims.play("descendo2", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              socket.emit("candidate", jogadores.primeiro, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit(
                "offer",
                jogadores.primeiro,
                localConnection.localDescription
              );
            });
        })
        .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 60;
      timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
      });
    }
  });

  socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", socketId, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", socketId, remoteConnection.localDescription);
      });
  });

  socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Desenhar o outro jogador
  socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x;
      player1.y = y;
    }
  });

  inventoryText = this.add.text(10, 770, "0", { fontSize: "16px", fill: "#fff", }).setScrollFactor(0)
};
fase1.update = function (time, delta) {
  let frame;
  // Controle do personagem por direcionais
  if (jogador === 1) {
    // Testa se há animação do oponente,
    // caso contrário envia o primeiro frame (0)
    try {
      frame = player1.anims.currentFrame.index;
    } catch (e) {
      frame = 0;
    }
    socket.emit("estadoDoJogador", {
      frame: frame,
      x: player1.body.x,
      y: player1.body.y,
    });
  } else if (jogador === 2) {
    // Testa se há animação do oponente,
    // caso contrário envia o primeiro frame (0)
    try {
      frame = player2.anims.currentFrame.index;
    } catch (e) {
      frame = 0;
    }
    socket.emit("estadoDoJogador", {
      frame: frame,
      x: player2.body.x,
      y: player2.body.y,
    });
  }

  // Se o contador chegar a zero, inicia a cena 2
  if (timer === 0) {
    trilha.stop();
    this.scene.start(fase2);
  }

  sombra.x = player1.body.position.x;
  sombra.y = player1.body.position.y;
};

function countdown() {
  // Reduz o contador em 1 segundo
  timer -= 1;
  timerText.setText(timer);
}

function collectbook(player1, book1) {
  //chave some quando coletada
  book1.disableBody(true, true);
  inventory += 1;
  inventoryText.setText(inventory);
}

// Exportar a cena
export { fase1 };
