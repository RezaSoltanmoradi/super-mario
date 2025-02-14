const overLay = document.getElementById("overLay");
const battleIcon = document.getElementById("battleIcon");
const convertToTxt = {
  1: "اول",
  2: "دوم",
  3: "سوم",
};
function showModal() {
  modalIsOpen = true;
  walkEnemy.style.display = "none";
  airEnemy.style.display = "none";
  overLay.style.display = "flex";
  clearInterval(checkAccidentTimer);
  const modalContainer = document.createElement("div");
  const title = document.createElement("p");
  const startBtn = document.createElement("button");
  const stageChallanges = document.createElement("ul");
  modalContainer.classList.add("modal");
  modalContainer.style.display = "flex";
  setTimeout(() => {
    modalContainer.classList.add("openModal");
    gameContainer.classList.add("moveGameArea");
  }, 10);
  title.classList.add("title");
  startBtn.classList.add("startbtn");
  stageChallanges.classList.add("challanges");
  const challanges = {
    1: [
      "باید 3 دشمن معمولی بکشید.",
      `${heart} قلب بیشتر ندارید.`,
      `${totalCoins + 100} سکه دارید.`,
      ` ${deathCounter.walkDeath} دشمن معمولی کشته شده، کافی نیست!`,
    ],
    2: [
      "باید 3 دشمن پرنده بکشید.",
      `${heart} قلب بیشتر ندارید.`,
      `${totalCoins + 100} سکه بدست آمده.`,
      ` ${deathCounter.airDeath} دشمن پرنده کشته شده، کافی نیست!`,
      "با گرفتن قارچ 🍄 شانس بیشتری بدست میاری.",
    ],
    3: [
      "باید از هر نوع دشمن 3 تا بکشید.",
      `${heart} قلب بیشتر ندارید.`,
      `${totalCoins + 100} سکه بدست امده.`,
      `${deathCounter.walkDeath} دشمن معمولی 👾 و ${deathCounter.airDeath} دشمن پرنده 🦅 کشته شده، کافی نیست!`,
      "با گرفتن قارچ 🍄 شانس بیشتری بدست میاری.",
    ],
    4: [
      `تمام دشمنان از بین رفتن✔️`,
      `${heart} قلب اضافی آمد.`,
      `${totalCoins + 100} سکه بدست آمد.`,
      `${deathCounter.walkDeath} دشمن معمولی 👾 و ${deathCounter.airDeath} دشمن  پرنده 🦅 کشته شد✔️`,
    ],
  };
  // تابع برای نمایش چالش‌های مرحله
  const showChallanges = (stage) => {
    stageChallanges.innerHTML = ""; // حذف آیتم‌های قبلی
    (challanges[stage] || []).forEach((chall, challIndex) => {
      const li = document.createElement("li");
      const iconSpan = document.createElement("span");
      const txtSpan = document.createElement("span");
      txtSpan.classList.add("text");
      iconSpan.classList.add(`span${challIndex}`);
      if (stage === 2 && iconSpan.classList.contains("span3")) {
        iconSpan.style.backgroundImage = 'url("./icons/airIcon.png")';
        console.log("stage 2");
      }

      li.classList.add("challange");
      li.appendChild(iconSpan);
      li.appendChild(txtSpan);
      txtSpan.textContent = chall;
      stageChallanges.appendChild(li);
    });
  };
  // فراخوانی تابع برای مرحله جاری
  showChallanges(stage);

  if (gameIsOver) {
    if (heart > 0) {
      startBtn.textContent = `شروع مجدد مرحله ${convertToTxt[stage]} 🎮`;
      title.textContent = `.هنوز ${heart} فرصت برای مرحله ${convertToTxt[stage]} باقی هست  🎯`;
    } else {
      startBtn.textContent = " شروع بازی جدید 🎮";
      title.textContent = " .شما باختید☠️";
    }
    modalContainer.classList.remove("superMario");
    modalContainer.classList.remove("superMarioSuccess");
    modalContainer.classList.add("superMarioDeath");
  } else {
    if (stage <= 3) {
      modalContainer.classList.add("superMario");
      modalContainer.classList.remove("superMarioSuccess");
      title.textContent = ` چالش های مرحله ${convertToTxt[stage]}  🎯`;
      startBtn.textContent = `شروع مرحله ${convertToTxt[stage]} 🎮`;
    } else if (stage === 4) {
      title.textContent = ` شما بازی رو بردید 🏆`;
      startBtn.textContent = `شروع بازی جدید 🎮`;
      modalContainer.classList.remove("superMario");
      modalContainer.classList.add("superMarioSuccess");
    }
  }
  document.body.appendChild(modalContainer);
  modalContainer.appendChild(startBtn);
  modalContainer.appendChild(title);
  modalContainer.appendChild(stageChallanges);
  startBtn.style.display = "flex";
  startBtn.addEventListener("click", () => {
    closeModal({ startBtn, modalContainer });
  });
}
const closeModal = ({ startBtn, modalContainer }) => {
  deathCounter = { walkDeath: 0, airDeath: 0 };
  gameContainer.classList.remove("moveGameArea");
  modalIsOpen = false;
  gameIsOver = false;
  modalContainer.classList.remove("openModal");
  modalContainer.classList.add("closeModal");
  collisionPoint.style.display = "none";
  character.style.display = "flex";
  character.offsetHeight;
  setTimeout(() => {
    modalContainer.remove();
    overLay.style.display = "none";
  }, 500);
  if (heart <= 0) {
    stage = 1;
    resetGameData(startBtn);
  }
  if (movment) clearInterval(movment); // جلوگیری از اجرای چندین تایمر
  movment = setInterval(moving, 30);

  if (stage === 1 || heart === 0) {
    handleFirstStage();
  } else if (stage <= 3) {
    handleSecondStage();
  } else if (stage === 4) {
    resetGameData(startBtn);
    handleFirstStage();
    stage = 1;
    mushroom.style.display = "none";
  }
  setTimeout(() => {
    checkAccident();
  }, 500);
};
function handleFirstStage() {
  if (modalIsOpen) return; // جلوگیری از اجرای تابع در صورت باز بودن مودال
  let firstComing = true;
  walkEnemy.style.display = "flex";
  airEnemy.style.display = "none";
  obstacles.style.display = "none";
  mushroom.style.display = "none";
  killDetail.style.display = "none";
  battleIcon.style.backgroundImage = 'url("./icons/walkIcon.png")';

  StageSpan.textContent = `مرحله ${convertToTxt[stage]}`;
  resetSingleEnemy({ enemy: walkEnemy, isAlive: true, firstComing });
}
function handleSecondStage() {
  if (modalIsOpen) return; // جلوگیری از اجرای تابع در صورت باز بودن مودال
  airEnemy.style.display = "flex";
  obstacles.style.display = "flex";
  mushroom.style.display = "flex";
  walkEnemy.style.display = "flex";
  battleIcon.style.backgroundImage = 'url("./icons/airIcon.png")';

  if (stage === 3) {
    killDetail.style.display = "flex";
    battleIcon.style.backgroundImage = 'url("./icons/battleIcon.png")';
  }
  StageSpan.textContent = `مرحله ${convertToTxt[stage]}`;
  resetEnemies();
}
function handleLastStage() {
  let firstComing = true;
  airEnemy.style.display = "none";
  obstacles.style.display = "none";
  mushroom.style.display = "none";
  resetSingleEnemy({ enemy: walkEnemy, isAlive: true, firstComing });
}
