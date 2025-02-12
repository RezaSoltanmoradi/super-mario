// گرفتن المان‌های صفحه
const gameContainer = document.querySelector(".game");
const character = document.getElementById("character");
const walkEnemy = document.getElementById("walkEnemy");
const airEnemy = document.getElementById("airEnemy");
const killSpan = document.getElementById("killSpan");
const heartSpan = document.getElementById("heartSpan");
const StageSpan = document.getElementById("StageSpan");
const coinSpan = document.getElementById("coinSpan");
const collisionPoint = document.getElementById("Accident");
const topBtn = document.getElementById("goTop");
const rightBtn = document.getElementById("goRight");
const leftBtn = document.getElementById("goLeft");
const sitDownBtn = document.getElementById("sitDown");
const jumpSound = new Audio("./audio/jump.mp3");
const deathSound = new Audio("./audio/death.mp3");
const startSound = new Audio("./audio/starting.mp3");
const obstacles = document.getElementById("obstacles");
const obstacle = document.getElementById("obstacle");
const mushroom = document.getElementById("mushroom");

let killCounter = 0;
let coinCounts = [];
let characterX = 5; // مقدار اولیه برای موقعیت افقی کاراکتر
let backgroundX = 0; // مقدار اولیه پس‌زمینه
let isLeftMoving = false;
let isRightMoving = false;
let isJumping = false;
let isSitting = false;
let gameIsOver = false;
let lastDirection = "right"; // جهت پیش‌فرض ایستادن
let isOnWall = false;
let deathPos = { left: "", top: "" };
let mushIsActive = false;
let isSmallCharacter = true;
let mushAnimation = null;
let chance = 1;
let stage = 1;
// **اضافه کردن کنترل‌های کیبورد**
character.classList.remove("bigAnimate");
character.classList.add("smallAnimate");
character.classList.add("smCharacter");

topBtn.addEventListener("touchstart", () => jump());
sitDownBtn.addEventListener("touchstart", () => sitDown());
sitDownBtn.addEventListener("touchend", () => standUp());
leftBtn.addEventListener("touchstart", () => (isLeftMoving = true));
rightBtn.addEventListener("touchstart", () => (isRightMoving = true));

leftBtn.addEventListener("touchend", () => (isLeftMoving = false));
rightBtn.addEventListener("touchend", () => (isRightMoving = false));
document.addEventListener("keydown", handlerEvents);
document.addEventListener("keyup", stopMovement);
function handlerEvents(event) {
  if (event.key === " " && gameIsOver) {
    closeModal({ gameIsOver });
  }
  if (event.key === " " || event.key === "ArrowUp") {
    jump();
  }
  if (event.key === "ArrowDown") {
    sitDown();
  }
  if (event.key === "ArrowLeft") {
    isLeftMoving = true;
  }
  if (event.key === "ArrowRight") {
    isRightMoving = true;
  }
}
function stopMovement(event) {
  if (event.key === "ArrowRight") {
    isRightMoving = false;
  } else if (event.key === "ArrowLeft") {
    isLeftMoving = false;
  } else if (event.key === "ArrowDown") {
    standUp();
  }
}
let movment = setInterval(moving, 30);

function resetMushroom() {
  mushIsActive = false;
  mushroom.classList.remove(mushAnimation);
  mushAnimation = null;
}
// **بررسی برخورد با موانع**
let checkAccidentTimer;
function checkAccident() {
  checkAccidentTimer = setInterval(() => {
    const characterRect = character.getBoundingClientRect();
    const walkEnemyRect = walkEnemy.getBoundingClientRect();
    const airEnemyRect = airEnemy.getBoundingClientRect();
    const obstaclesRect = obstacles.getBoundingClientRect();
    const mushroomRect = mushroom.getBoundingClientRect();
    const walkAccident = validAccident(walkEnemyRect, walkEnemy);
    const airAccident = validAccident(airEnemyRect, airEnemy);
    const obstaclesAccident = validAccident(obstaclesRect, obstacles);
    const mushroomAccident = validAccident(mushroomRect, mushroom);
    if (
      mushroomAccident.headAccident &&
      !mushIsActive &&
      !isOnWall &&
      isSmallCharacter
    ) {
      setTimeout(() => {
        mushIsActive = true;
      }, 200);
      const mushMoves = ["mushroomAnimate1", "mushroomAnimate2"];
      const randomMushMovment =
        mushMoves[Math.floor(Math.random() * mushMoves.length)];
      if (mushAnimation) return;
      mushAnimation = randomMushMovment;
      mushroom.classList.add(mushAnimation);
    } else if (mushroomAccident.isDeath && mushIsActive && isSmallCharacter) {
      mushIsActive = false;
      isSmallCharacter = false;
      mushroom.classList.remove(mushAnimation);
      character.classList.remove("smallJumpAnimate");
      character.classList.remove("smCharacter");
      character.classList.remove("smallAnimate");
      character.classList.add("bigAnimate");
      chance++;
      mushAnimation = null;
    } else if (
      !mushroomAccident.isDeath &&
      mushIsActive &&
      isSmallCharacter &&
      (mushroomRect.right < 0 || mushroomRect.left > gameContainer.clientWidth)
    ) {
      resetMushroom();
    }
    if (obstaclesAccident.headAccident) {
      const children = obstacles.children;
      let obstacleRect, obstacle, exactCoin;
      for (let i = 0; i < children.length; i++) {
        obstacle = children[i];
        obstacleRect = obstacle.getBoundingClientRect();
        const obsId = obstacle.id;

        // بررسی اینکه آیا این مانع قبلاً کوین داده است
        let existingObstacle = coinCounts.find((coin) => coin.id === obsId);
        if (!existingObstacle && (obsId !== "obstacle2" || mushIsActive)) {
          coinCounts.push({ id: obsId, coin: 0 });
        } else if (validAccident(obstacleRect).headAccident) {
          const foundCoinIndex = coinCounts.findIndex(
            (coin) => coin.id === obsId
          );
          exactCoin = obstacle.children[0];

          if (foundCoinIndex !== -1 && !coinCounts[foundCoinIndex].collected) {
            exactCoin.classList.add("coinJump");
            coinCounts[foundCoinIndex].collected = true; // علامت‌گذاری به عنوان جمع‌آوری‌شده
            if (coinCounts[foundCoinIndex].coin < 5) {
              coinCounts[foundCoinIndex].coin += 1;
            } else if (coinCounts[foundCoinIndex].coin >= 5) {
              if (obstacle.classList.contains("obstacleAnim")) {
                obstacle.classList.remove("obstacleAnim");
                void obstacle.offsetWidth; // ترفند ریست CSS
              }
              exactCoin.classList.remove("coinJump");
              obstacle.classList.add("obstacleAnim");
              obstacle.classList.add("emptyObstacle");
            }
            setTimeout(() => {
              obstacle.classList.remove("obstacleAnim");
              exactCoin.classList.remove("coinJump");
              coinCounts[foundCoinIndex].collected = false;
            }, 1000);
          }
        }
      }

      character.classList.remove("jumpAnimate");
      character.style.bottom = `10px`;
    }

    if (obstaclesAccident.jumpOnWall && !isOnWall) {
      character.classList.remove("jumpAnimate");
      character.classList.remove("fellAnimate");
      character.style.left = `${characterRect.left}px`;
      character.style.bottom = `${
        gameContainer.clientHeight - obstaclesRect.top - 5
      }px`;
      isOnWall = true;
    }
    if (!obstaclesAccident.jumpOnWall && isOnWall) {
      isOnWall = false;
      character.classList.add("fellAnimate");
      character.style.bottom = `10px`;
    }
    if (walkEnemyRect.left < -50) {
      resetSingleEnemy(walkEnemy, true);
    } else if (airEnemyRect.left < -50) {
      resetSingleEnemy(airEnemy, true);
    } else if (walkAccident.isDeath) {
      endGameHandler(walkAccident);
    } else if (airAccident.isDeath) {
      endGameHandler(airAccident);
    }
    function endGameHandler(accident) {
      const { rightDepth, leftDepth, topDepth, bottomDepth, enemy, enemyRec } =
        accident;
      const maxDepth = Math.max(rightDepth, leftDepth, topDepth, bottomDepth);

      if (rightDepth === maxDepth) {
        if (!isSmallCharacter) {
          isSmallCharacter = true;
          character.classList.remove("bigAnimate");
          character.classList.add("smallAnimate");
          chance--;
          setTimeout(() => {
            character.classList.add("smCharacter");
          }, 200);
          resetSingleEnemy(enemy);
          return;
        } else {
          gameIsOverHandler(walkEnemyRect, airEnemyRect, enemy, characterRect);
        }
      } else if (leftDepth === maxDepth) {
        if (!isSmallCharacter) {
          isSmallCharacter = true;
          chance--;
          character.classList.remove("bigAnimate");
          character.classList.add("smallAnimate");
          setTimeout(() => {
            character.classList.add("smCharacter");
          }, 200);
          resetSingleEnemy(enemy);
          return;
        } else {
          gameIsOverHandler(walkEnemyRect, airEnemyRect, enemy, characterRect);
        }
      } else if (topDepth === maxDepth) {
        deathPos = {
          top: `${(enemyRec.top + enemyRec.bottom) / 2}px`,
          left: `${(enemyRec.left + enemyRec.right) / 2}px`,
        };
        resetSingleEnemy(enemy);
        killCounter++;
      } else if (bottomDepth === maxDepth) {
        if (!isSmallCharacter) {
          isSmallCharacter = true;
          chance--;
          character.classList.remove("bigAnimate");
          character.classList.add("smallAnimate");
          setTimeout(() => {
            character.classList.add("smCharacter");
          }, 200);
          resetSingleEnemy(enemy);
          return;
        } else {
          gameIsOverHandler(walkEnemyRect, airEnemyRect, enemy, characterRect);
        }
      }
    }
    let allCoins = [];
    let totalCoins = 0;
    if (coinCounts.length > 0) {
      coinCounts.forEach((c) => {
        allCoins.push(c.coin);
      });
      totalCoins = allCoins.reduce((num1, num2) => num1 + num2);
    }
    coinSpan.textContent = (totalCoins + killCounter) * 100;
    killSpan.textContent = killCounter;
    heartSpan.textContent = chance;
    if (killCounter >= 5 && stage === 1) {
      stage++;
      setTimeout(() => {
        showModal({ stage, gameIsOver });
      }, 1000);
    }
    if (killCounter >= 10 && stage === 2) {
      stage++;
      setTimeout(() => {
        showModal({ stage, gameIsOver });
      }, 1000);
    }
  }, 10);
}
setTimeout(() => {
  showModal({ stage, gameIsOver });
}, 1000);
checkAccident();
resetEnemies();
