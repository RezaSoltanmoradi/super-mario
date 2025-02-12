function gameIsOverHandler(walkRect, airRect, enemy, charRect) {
    walkEnemy.style.left = `${walkRect.left}px`;
    airEnemy.style.left = `${airRect.left}px`;
    enemy.style.animation = "none";
    deathPos = {
      top: `${(charRect.top + charRect.bottom) / 2}px`,
      left: `${(charRect.right + charRect.left) / 2}px`,
    };
    character.style.display = "none";
    collisionPoint.style.display = "flex";
    collisionPoint.style.left = deathPos.left;
    collisionPoint.style.top = deathPos.top;
    startSound.pause();
    deathSound.play();
    gameIsOver = true;
    showModal({ gameIsOver });
    
  }