// Constant pour pouvoir dessiner
const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

// Dimension de notre canvas
canvas.width = 480;
canvas.height = 540;

let timer;
let player;
let aliens;

// Chargement de l'image du sprite avant de démarrer le jeu

const spritesheet = new Image();
spritesheet.src = '../img/spritesheet.png';
spritesheet.onload = function(){ // Fonction éxécutée lorsque le navigateur a fini de charger le PNG
    player = createPlayer();
    aliens = createAliens();

    // Démarrage de la boucle continue
    gameloop();
}

// Fonction pour les actions
function update() {
    animatePlayer(); //Fonction qui gèrera l'animation du joueur
    animateAliens(); // Fonction alien
}

// Fonction pour les dessins
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height); // On efface 60/s et on re dessine

    renderPlayer(); //Fonction qui gèrera le dessin du joueur
    renderAliens(); // Dessin de l'alien
    renderUI(); // Dessin éléments de l'interface 
}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop); // Permet d'éxecuter la fonction à chaque fois 
}



