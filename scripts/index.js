// Constant pour pouvoir dessiner
const canvas = document.getElementById('invaders');
const context = canvas.getContext('2d');

// Dimension de notre canvas
canvas.width = 480;
canvas.height = 540;

let timer = 0;
let player;
let aliens;

const sounds = {
    invader1 : document.getElementById('invader1'),
    invader2 : document.getElementById('invader2'),
    invader3 : document.getElementById('invader3'),
    invader4 : document.getElementById('invader4'),
    invader_killed : document.getElementById('invader_killed'),
    shoot : document.getElementById('shoot'),
    player_death : document.getElementById('player_death'),
}

const MODE_PLAYING = 1;
const MODE_GAME_OVER = 2;

let game_mode = MODE_PLAYING ;

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
    switch(game_mode){
        case MODE_PLAYING :
            animatePlayer(); //Fonction qui gère l'animation du joueur
            animateAliens(); // Fonction qui gère l'animation de l'alien
            break;
        }
}

// Fonction pour les dessins
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height); // On efface 60/s et on re dessine

    switch(game_mode){
        case MODE_PLAYING :
            renderPlayer(); // Fonction qui gèrera le dessin du joueur
            renderAliens(); // Fonction qui gère le dessin de l'alien
            break;
        case MODE_GAME_OVER : 
            renderGameOver(); // Fonction qui gère le game over
            break;
        }
    renderUI(); // Dessin éléments de l'interface 
}

// Fonction gérant la boucle de jeu
function gameloop() {
    update();
    render();

    timer = window.requestAnimationFrame(gameloop); // Permet d'éxecuter la fonction à chaque fois 
}

let go_color = 0;
let go_size = 0;

// Fonction gérant le mode game over
function renderGameOver(){

    go_color += 20;
    go_size = 24 - (timer % 4);

    if(game_mode === MODE_GAME_OVER){

        context.textAlign = "center"; // Alligner
        context.fillStyle = "hsl(" +go_color+ " , 100% ,50%)"; // Couleur clignotter
        context.font = 'normal' +go_size+ "Arial"; // Police
        context.fillText('GAME OVER', canvas.width/2, canvas.height/2); // Texte

        context.fillStyle = '#fff';
        context.font="18px Arial";
        context.fillText("Press Echap ", canvas.width/2, canvas.height/2+30)

    }else if(game_mode === MODE_PLAYING){
        render();
    }
}