const NB_ALIENS_PER_LINE = 11;

ALIEN_SPACE_X = 35;
ALIEN_SPACE_Y = 28;
aliensTimer = 500;


let lastAlienMovement = 0; // instant t du dernier déplacement déplacement des aliens

const aliensMap = [
    '40','40','40','40','40','40','40','40','40','40','40',
    '20','20','20','20','20','20','20','20','20','20','20',
    '20','20','20','20','20','20','20','20','20','20','20',
    '10','10','10','10','10','10','10','10','10','10','10',
    '10','10','10','10','10','10','10','10','10','10','10',
];

const alienSprites = { // Mettre aliens avec appuie et F2
    40 : [
            {x : 6, y : 3, width : 16, height : 16 },
            {x : 6, y : 25, width : 16, height : 16}
    ],
    20 : [
            {x : 6, y : 3, width : 16, height : 16 },
            {x : 6, y : 25, width : 16, height : 16}
    ],
    10 : [
            {x : 6, y : 3, width : 16, height : 16 },
            {x : 6, y : 25, width : 16, height : 16}
    ] 
};

function createAliens(){
    const aliens = [];

    for(let i = 0, line = 0; i<aliensMap.length; i++){

        let alienWidth = alienSprites[ aliensMap[i] ][ 0 ].width;
        let alienHeight = alienSprites[ aliensMap[i] ][ 0 ].height;

        if(i % NB_ALIENS_PER_LINE === 0){
            line ++;
        }

        aliens.push({
            x : 12 + i % NB_ALIENS_PER_LINE * ALIEN_SPACE_X, // Gérer espacement chaque aliens
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
        lastAlienMovement = Date.now(); // Mise à jour de l'instant du dernier mouvement du joueur à maintenant 

        // Récupération du X de l'alien le plus à droite (et à gauche)
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

        aliens[i].x += 12 * aliens[i].direction;
        }
    }
} // Fin du mouvement des aliens 

function renderAliens(){
    for(let i = 0; i < aliens.length; i++){

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
}