function renderUI(){
    context.fillStyle = '#0f0'; // Couleur
    context.font = 'normal 15px "Press Start 2P", cursive';

    context.textAlign = 'left'; // Alligner gauche
    context.fillText('SCORE : ' + player.score, 20, 30);

    context.textAlign = 'right'; // Alligner droite
    context.fillText('LIFE : ' + player.lives, canvas.width -20, 30);

    // Dessin de la ligne verte horizontale

    context.strokeStyle = '#0f0';
    context.moveTo(20, canvas.height - 40);
    context.lineTo(canvas.width - 20, canvas.height - 40);
    context.stroke();

}