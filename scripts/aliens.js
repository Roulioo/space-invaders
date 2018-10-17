const NB_ALIENS_PER_LINE = 11;

ALIEN_SPACE_X = 35;
ALIEN_SPACE_Y = 28;

const aliensMap = [
    40,40,40,40,40,40,40,40,40,40,40,
    20,20,20,20,20,20,20,20,20,20,20,
    20,20,20,20,20,20,20,20,20,20,20,
    10,10,10,10,10,10,10,10,10,10,10,
    10,10,10,10,10,10,10,10,10,10,10,
];

const alienSprites = { // Changer tous les noms avec dessus F2#
    40 : [
        { x:6 , y:3  , width:16 , height:16 },
        { x:6 , y:25 , width:16 , height:16 }
    ],
    20 : [
        { x:32 , y:3  , width:22 , height:16 },
        { x:32 , y:25 , width:22 , height:16 }
    ],
    10 : [
        { x:60 , y:25 , width:24 , height:16 },
        { x:60 , y:3  , width:24 , height:16 }
    ]
};

let aliensTimer = 1000; // Rapidité des aliens
let lastAlienMovement = 0; // instant t du dernier déplacement déplacement des aliens
let alienExplosions = []; // Tableau qui servira à stocker les sprites d'explosion 
let alienSoundNb = 1; // Numéro son alien (variera de 1 à 4 en boucle)

function createAliens(){
    const aliens = [];

    for(let i = 0, line = 0; i<aliensMap.length; i++){

        let alienWidth = alienSprites[ aliensMap[i] ][ 0 ].width;
        let alienHeight = alienSprites[ aliensMap[i] ][ 0 ].height;

        if(i % NB_ALIENS_PER_LINE === 0){
            line ++;
        }

        aliens.push({ // | permet darrondir à lentier supérieur (Math.round)
            x : 12 + i % NB_ALIENS_PER_LINE * ALIEN_SPACE_X + (24 - alienWidth) / 2 | 0, // Gérer espacement chaque aliens
            y : 100 + line *  ALIEN_SPACE_Y, 
            width : alienWidth,
            height : alienHeight,
            points : aliensMap[i],
            direction : 1,
            spriteIndex : 0
            // id : aliensMap[i] // A, B ou C
        });
    }
    return aliens;
}

function animateAliens(){
    // Parcours du tableau d'aliens pour mise à jour 
    
    // Mouvement des aliens de gauche à droite et vers le bas
    if(Date.now() - lastAlienMovement > aliensTimer){
        lastAlienMovement = Date.now(); // Mise à jour de linstant du dernier mouvement du joueur à maintenant 

        /*sounds['invader' + alienSoundNb].play();
        alienSoundNb ++;
        if(alienSoundNb > 4){
            alienSoundNb = 1;
        }*/

        sounds['invader' + (alienSoundNb++ %4 + 1)].play();

        // Récupération du X de lalien le plus à droite (et à gauche)
        let extremeRightAlien = Math.max( ... aliens.map(a => a.x) ) + ALIEN_SPACE_X;
        let extremeLeftAlien = Math.min( ... aliens.map(a => a.x) );

        // Parcours du tableau des aliens pour mise à jour
        for (let i = 0; i < aliens.length; i ++){

            if(
                extremeRightAlien > canvas.width && aliens[i].direction === 1 ||
                extremeLeftAlien <= 0 && aliens[i].direction === -1
            ) {
                aliens[i].direction *= -1;
                aliens[i].y += 22;
            }
            else{
                aliens[i].x += 12 * aliens[i].direction;
            }

            aliens[i].spriteIndex = (aliens[i].spriteIndex === 0) ? 1 : 0;

            /*if(aliens[i].spriteIndex === 0){
                aliens[i].spriteIndex = 1;
            }else{
                aliens[i].spriteIndex = 0;
            }*/

        }
    }

    // Vérification si un alien se prend un tir de "player.bullet"
    if(player.bullet !== null){
        for(let i = 0; i < aliens.length; i++){
            if(player.bullet.x > aliens[i].x &&
                player.bullet.x <= aliens[i].x + aliens[i].width && 
                player.bullet.y > aliens[i].y &&
                player.bullet.y <= aliens[i].y + aliens[i].height){
                    // Collision !
                    createExplosion(aliens[i]); // Fonction pour l'explosion de l'aliens
                    // Son
                    sounds['invader_killed'].play();
                    // Augmentation du score du joueur 
                    player.score += aliens[i].points;
                    player.bullet = null;
                    // Augmentation de la vistesse générale des aliens
                    aliensTimer -= 10;
                    if(aliensTimer < 75){
                        aliensTimer = 75;
                    }
                    //Suppression de lalien du tableau 
                    aliens.splice(i,1);
                    break;
            }
        }
    }

    // Suppression des animations d'explosion ayant dépassé les 100ms

    for(let i = 0; i < alienExplosions.length; i++){
        if(Date.now() - alienExplosions[i].dateCreated > 100){
            alienExplosions.splice(i, 1);
            i--;       
        }
    }

} // Fin du mouvement des aliens (animateAliens) 

function renderAliens(){
    for(let i = 0; i < aliens.length; i++){ // Boucle qui dessine les aliens en eux mêmes

        let points = aliens[i].points;
        let spriteIndex = aliens[i].spriteIndex;

        context.drawImage(
            spritesheet, 

            alienSprites[points][spriteIndex].x,
            alienSprites[points][spriteIndex].y,
            alienSprites[points][spriteIndex].width,
            alienSprites[points][spriteIndex].height,

            aliens[i].x,
            aliens[i].y,
            alienSprites[points][spriteIndex].width,
            alienSprites[points][spriteIndex].height

        );
    }

    // Dessiner l'image de l'explosion
    for(let i = 0; i< alienExplosions.length; i++){
        context.drawImage(
            spritesheet,

            alienExplosions[i].sprite.x,
            alienExplosions[i].sprite.y,
            alienExplosions[i].sprite.width,
            alienExplosions[i].sprite.height,

            alienExplosions[i].x,
            alienExplosions[i].y,
            alienExplosions[i].sprite.width,
            alienExplosions[i].sprite.height,
        )
    }
}

function createExplosion(aliens){ // Fonction qui créé un objet représentant une explosion, à partir d'un alien
    alienExplosions.push({
        x : aliens.x,
        y : aliens.y,
        sprite : { // Sprite de l'explosion trouver graçe a photoshop
            x : 88,
            y : 25,
            width : 26,
            height : 16
        },
        dateCreated : Date.now()
    })
}