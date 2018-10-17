function renderUI(){
    context.fillStyle = '#0f0'; // Couleur
    context.font = 'normal 20px "Press Start 2P", cursive';
    context.textAlign = 'left'; // Alligner gauche
    context.fillText('SCORE : ' + player.score, 20, 30);
}