function draw() {
   //nettoyer le canvas sur toute sa surface a chaque appel pour ensuite rappeler les fonctions suivantes//
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   //
   //APPELLE DES FONCTIONS DE JEU//
   fond();
   joueur();
   rectHaut();
   rectBas();
   Star();
   collision();

   //FIN D APPELLE DES FONCTIONS//
   score.innerHTML = monScore;

   barre.value = barrProg;
   if (monScore == 10) {
      alert("le jeu est fini, vous avez gagné!!!!!");
   }
}

setInterval(draw, 35);
