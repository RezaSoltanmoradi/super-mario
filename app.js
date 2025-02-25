// گرفتن المان‌های صفحه
const gameContainer = document.querySelector(".gameContainer");
const gameImage = document.querySelector(".game");
const character = document.getElementById("character");
const walkEnemy = document.getElementById("walkEnemy");
const airEnemy = document.getElementById("airEnemy");
const killSpan = document.getElementById("killSpan");
const heartSpan = document.getElementById("heartSpan");
const StageSpan = document.getElementById("StageSpan");
const coinSpan = document.getElementById("coinSpan");
const topBtn = document.getElementById("goTop");
const rightBtn = document.getElementById("goRight");
const leftBtn = document.getElementById("goLeft");
const sitDownBtn = document.getElementById("sitDown");
const jumpSound = new Audio("./assets/audio/jump.mp3");
const deathSound = new Audio("./assets/audio/death.mp3");
const startSound = new Audio("./assets/audio/starting.mp3");

const obstacles = document.getElementById("obstacles");
const obstacle = document.getElementById("obstacle");
const mushroom = document.getElementById("mushroom");
const killDetail = document.getElementById("killDetail");
const birdKillSpan = document.getElementById("birdKillSpan");
const walkKillSpan = document.getElementById("walkKillSpan");
let deviceWidth = window.innerWidth; // عرض دستگاه
let imageWidth = gameImage.getBoundingClientRect().width;
let characterRect;

let isSmallCharacter = true;
let modalIsOpen = false;
let movment = null;
let lastDirection = "right"; // جهت پیش‌فرض ایستادن
let heart = 2;
let stage = 1;
let isLeftMoving = false;
let isRightMoving = false;
let isJumping = false;
let isSitting = false;
let gameIsOver = false;
let isOnWall = false;
let deathCounter = { walkDeath: 0, airDeath: 0 };
let mushIsActive = false;
let mushAnimation = null;
let characterX = 50;
let characterSpeed = deviceWidth <= 760 ? 2 : 5;
let enemySpeed = deviceWidth <= 760 ? 40 : 20;
let scrollPosition = 0;
let coinCounts = [];
let killCoins = 0;
let totalCoins = 0;

function resetGameData(startBtn) {
  isSmallCharacter = true;
  modalIsOpen = false;
  lastDirection = "right"; // جهت پیش‌فرض ایستادن
  characterX = 50;
  character.style.bottom = "30px";
  character.style.left = "50px";
  heart = 2;
  stage = 1;
  isLeftMoving = false;
  isRightMoving = false;
  isJumping = false;
  isSitting = false;
  gameIsOver = false;
  isOnWall = false;
  deathCounter = { walkDeath: 0, airDeath: 0 };
  mushIsActive = false;
  mushroom.classList.remove(mushAnimation);
  mushAnimation = null;
  characterSpeed = deviceWidth <= 760 ? 2 : 5;
  scrollPosition = 0;
  totalCoins = 0;
  killCoins = 0;
  coinCounts = [];
  if (startBtn) {
    startBtn.style.display = "none";
  }
  character.classList.remove("standingLeft");
  character.classList.remove("bigAnimate");
  character.classList.add("smallAnimate");
  character.classList.add("smCharacter");
  mushroom.style.display = "none";
  obstacles.style.display = "none";
  const obsChildren = obstacles.children;
  for (i = 0; i < obsChildren.length; i++) {
    obsChildren[i].classList.remove("emptyObstacle");
  }
}

// **اضافه کردن کنترل‌های کیبورد**
character.classList.remove("bigAnimate");
character.classList.add("smallAnimate");
character.classList.add("smCharacter");

// ثبت سرویس وورکر
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => {})
    .catch((err) => console.error(err));
}

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
      isSmallCharacter &&
      !mushAnimation &&
      !modalIsOpen
    ) {
      setTimeout(() => {
        mushIsActive = true;
      }, 200);
      const mushMoves = ["mushroomAnimate1", "mushroomAnimate2"];
      const randomMushMovment =
        mushMoves[Math.floor(Math.random() * mushMoves.length)];
      mushAnimation = randomMushMovment;
      mushroom.classList.add(mushAnimation);
    } else if (
      mushroomAccident.isDeath &&
      mushIsActive &&
      isSmallCharacter &&
      !obstaclesAccident.headAccident &&
      !isJumping
    ) {
      character.classList.remove("smallJumpAnimate");
      character.classList.remove("smCharacter");
      mushIsActive = false;
      isSmallCharacter = false;
      mushroom.classList.remove(mushAnimation);
      character.style.bottom = characterRect.bottom;
      character.classList.remove("smallAnimate");
      character.classList.add("bigAnimate");
      mushAnimation = null;
    } else if (
      !mushroomAccident.isDeath &&
      mushIsActive &&
      isSmallCharacter &&
      (mushroomRect.right < 0 || mushroomRect.left > gameImage.clientWidth)
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
      character.style.bottom = `30px`;
    }
    if (obstaclesAccident.jumpOnWall && !isOnWall) {
      character.classList.remove("jumpAnimate");
      character.classList.remove("fellAnimate");
      character.style.left = `${characterRect.left}px`;
      character.style.bottom = `${
        gameImage.clientHeight - obstaclesRect.top - 5
      }px`;
      isOnWall = true;
    }
    if (!obstaclesAccident.jumpOnWall && isOnWall) {
      isOnWall = false;
      character.classList.add("fellAnimate");
      character.style.bottom = `30px`;
    }
    if (walkEnemyRect.left < -50) {
      resetSingleEnemy({ enemy: walkEnemy });
    } else if (airEnemyRect.left < -50) {
      resetSingleEnemy({ enemy: airEnemy });
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
          smallCharacterHandler();
        } else {
          gameIsOverHandler(walkEnemyRect, airEnemyRect, enemy, characterRect);
        }
      } else if (leftDepth === maxDepth) {
        if (!isSmallCharacter) {
          smallCharacterHandler();
        } else {
          gameIsOverHandler(walkEnemyRect, airEnemyRect, enemy, characterRect);
        }
      } else if (topDepth === maxDepth) {
        if (modalIsOpen) return;
        killCoins += 100;
        if (enemy === walkEnemy && stage !== 2) {
          deathCounter.walkDeath++;
        } else if (enemy === airEnemy) {
          deathCounter.airDeath++;
        }
        stageHandler();
        resetSingleEnemy({ enemy });
      } else if (bottomDepth === maxDepth) {
        if (!isSmallCharacter) {
          smallCharacterHandler();
        } else {
          gameIsOverHandler(walkEnemyRect, airEnemyRect, enemy, characterRect);
        }
      }
      function smallCharacterHandler() {
        if (!gameIsOver) {
          isSmallCharacter = true;
          character.classList.remove("bigAnimate");
          character.classList.add("smallAnimate");
          setTimeout(() => {
            character.classList.add("smCharacter");
          }, 200);
          resetSingleEnemy({ enemy });
          return;
        }
      }
    }
    function resultHandler() {
      let calcCoins = coinCounts.map((c) => c.coin); // گرفتن تعداد سکه‌های جمع‌شده
      let updateCoins =
        calcCoins.length > 0
          ? calcCoins.reduce((num1, num2) => num1 + num2) * 100
          : 0;

      totalCoins = killCoins + updateCoins; // مقدار قبلی را نگه دار و مقدار جدید را اضافه کن
      coinSpan.textContent = totalCoins;
      let updateKilling;
      if (stage === 1) {
        updateKilling = deathCounter.walkDeath;
      } else if (stage === 2) {
        updateKilling = deathCounter.airDeath;
      } else {
        updateKilling = deathCounter.airDeath + deathCounter.walkDeath;
      }
      killSpan.textContent = updateKilling;
      birdKillSpan.textContent = deathCounter.airDeath;
      walkKillSpan.textContent = deathCounter.walkDeath;
      heartSpan.textContent = heart;
    }

    resultHandler();
    function stageHandler() {
      const stages = {
        one: deathCounter.walkDeath >= 3 && stage === 1,
        two: deathCounter.airDeath >= 3 && stage === 2,
        three:
          deathCounter.airDeath >= 3 &&
          deathCounter.walkDeath >= 3 &&
          stage === 3,
      };
      Object.keys(stages).forEach((number) => {
        if (stages[number]) {
          stage++;
          showModal({ gameIsOver });
        }
      });
    }
  }, 10);
}
showModal({ gameIsOver });
checkAccident();
