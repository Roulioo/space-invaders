function createPlayer(){
    const player = {
        x : 100,
        y : 450,
        speed : 3,
        lives : 3,
        sprite : {
            img : spritesheet,
            offsetX : 88,
            offsetY : 3,
            width : 26,
            height : 16
        }
    }; // Création d'un objet littéral JS représentant le joueur et ses propriétés

    // brackets []
    // curly brackets {}    

    return player;
}

function animatePlayer(){

    // Mouvement horizontal du joueur 
    if(Keyboard.RIGHT){
        player.x += player.speed;
    }
    if(Keyboard.LEFT){
        player.x -= player.speed
    }

    if(player.x < 0){
       player.x = 0;
    }else if(player.x + player.sprite.width > canvas.width){
        // sinon si trop à droite le joueur s'arrête 
        player.x = canvas.width - player.sprite.width;
    }
}

function renderPlayer(){

    // Dessin du joueur à ses coordonnées
    context.drawImage(
        player.sprite.img,

        player.sprite.offsetX, // Carrer à aller chercher dans le dessin
        player.sprite.offsetY,
        player.sprite.width,
        player.sprite.height,

        player.x, 
        player.y,
        player.sprite.width,
        player.sprite.height
        
    );
}

