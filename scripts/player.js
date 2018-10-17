function createPlayer(){
    const player = {
        x : 100,
        y : 450,
        speed : 3,
        lives : 3,
        score : 0,
        sprite : {
            img : spritesheet,
            offsetX : 88,
            offsetY : 3,
            width : 26,
            height : 16
        },
        bullet : null 
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
        // sinon si trop à droite le joueur s'arrête aussi
        player.x = canvas.width - player.sprite.width;
    }

    // Si le joueur tire
    if (Keyboard.SPACE){
        if(player.bullet === null ){
            player.bullet = {
                x : player.x + player.sprite.width / 2 - 2, // -2 car moitier de 4
                y : player.y, 
                width : 4,
                height : 10,
                color : '#0f0', // green
                speed : 10
            };

            sounds['shoot'].play(); // Aller chercher dans le tableau le son 
        }
    }

    // Etat d'avancement du shoot joueur
    if(player.bullet != null){
        player.bullet.y -= player.bullet.speed;
        if(player.bullet.y + player.bullet.height <0){
            player.bullet = null;
        }
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
        player.sprite.height,

    );

    // Dessin du shoot joueur 

    if(player.bullet != null){
        context.fillStyle = player.bullet.color;
        context.fillRect(player.bullet.x,
            player.bullet.y,
            player.bullet.width,
            player.bullet.height
            );
    }
}

