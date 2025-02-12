const validAccident = (enemyRec, enemy) => {
  const characterRect = character.getBoundingClientRect();
    let rightDepth = enemyRec.right - characterRect.left;
    let leftDepth = characterRect.right - enemyRec.left;
    let topDepth = enemyRec.bottom - characterRect.top;
    let bottomDepth = characterRect.bottom - enemyRec.top;
    let rightValid = rightDepth > 10 && characterRect.right >= enemyRec.left;
    let leftValid = leftDepth > 10 && characterRect.left <= enemyRec.right;
    let topValid = topDepth > 10 && characterRect.bottom >= enemyRec.top;
    let bottomValid = bottomDepth > 10 && characterRect.top <= enemyRec.bottom;
    let isDeath = rightValid && leftValid && topValid && bottomValid;
    let headAccident = bottomValid && leftValid && rightValid && !topValid;
    let jumpOnWall = topValid && rightValid && leftValid && !bottomValid;

    return {
      isDeath,
      rightValid,
      leftValid,
      topValid,
      bottomValid,
      rightDepth,
      leftDepth,
      topDepth,
      bottomDepth,
      headAccident,
      jumpOnWall,
      enemy,
      enemyRec,
    };
  };