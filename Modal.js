const overLay = document.getElementById("overLay");

function showModal({ gameIsOver, stage }) {
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

  if (gameIsOver) {
    if (heart > 0) {
      startBtn.textContent = `شروع مجدد مرحله ${stage} 🎮`;
      title.textContent = `.هنوز ${heart} فرصت برای انجام مرحله ${stage} باقی هست`;
    } else {
      startBtn.textContent = " شروع بازی جدید 🎮";
      title.textContent = " .شما تمام فرصت ها رو از دست دادید ☠️";
    }
    modalContainer.classList.remove("superMario");
    modalContainer.classList.remove("superMarioSuccess");
    modalContainer.classList.add("superMarioDeath");
  } else {
    if (stage <= 3) {
      modalContainer.classList.add("superMario");
      modalContainer.classList.remove("superMarioSuccess");
      title.textContent = ` چالش های مرحله ${stage} 👾`;
      startBtn.textContent = `شروع مرحله ${stage} 🎮`;
    } else if (stage === 4) {
      title.textContent = ` شما بازی رو بردید`;
      startBtn.textContent = `شروع بازی جدید 🎮`;
      modalContainer.classList.remove("superMario");
      modalContainer.classList.add("superMarioSuccess");
    }
    const challanges = {
      1: ["باید 3 تا دشمن پیاده بکشی.", `${heart} فرصت بیشتر نداری.`],
      2: [
        "باید 3 تا دشمن پرنده بکشی.",
        `${heart} فرصت بیشتر نداری.`,
        "با گرفتن قارچ 🍄 فرصت بیشتری بدست میاری.",
      ],
      3: [
        "باید از هر نوع دشمن 3 تا بکشی.",
        `${heart} فرصت بیشتر نداری.`,
        "با گرفتن قارچ 🍄 فرصت بیشتری بدست میاری.",
      ],
    };
    // تابع برای نمایش چالش‌های مرحله
    const showChallanges = (stage) => {
      stageChallanges.innerHTML = ""; // حذف آیتم‌های قبلی
      (challanges[stage] || []).forEach((ch) => {
        const li = document.createElement("li");
        li.classList.add("challange");
        li.textContent = `💣 ${ch} `;
        stageChallanges.appendChild(li);
      });
    };
    // فراخوانی تابع برای مرحله جاری
    showChallanges(stage);
  }
  document.body.appendChild(modalContainer);
  modalContainer.appendChild(startBtn);
  modalContainer.appendChild(title);
  modalContainer.appendChild(stageChallanges);
  startBtn.style.display = "flex";
  startBtn.addEventListener("click", () => {
    closeModal({ startBtn, modalContainer, stage });
  });
}
const closeModal = ({ startBtn, modalContainer, stage }) => {
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
    resetGameData(startBtn);
  }
  if (movment) clearInterval(movment); // جلوگیری از اجرای چندین تایمر
  movment = setInterval(moving, 30);

  if (stage === 1 || heart === 0) {
    handleFirstStage();
  } else if (stage === 2 || stage === 3) {
    handleSecondStage();
  } else if (stage === 4) {
    resetGameData(startBtn);
    handleFirstStage();
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
  StageSpan.textContent = "مرحله اول";
  resetSingleEnemy({ enemy: walkEnemy, isAlive: true, firstComing });
}
function handleSecondStage() {
  if (modalIsOpen) return; // جلوگیری از اجرای تابع در صورت باز بودن مودال
  airEnemy.style.display = "flex";
  obstacles.style.display = "flex";
  mushroom.style.display = "flex";
  walkEnemy.style.display = "flex";
  StageSpan.textContent = "مرحله دوم";
  resetEnemies();
}
function handleLastStage() {
  let firstComing = true;
  airEnemy.style.display = "none";
  obstacles.style.display = "none";
  mushroom.style.display = "none";
  resetSingleEnemy({ enemy: walkEnemy, isAlive: true, firstComing });
}
