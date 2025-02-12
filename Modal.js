const overLay = document.getElementById("overLay");

function showModal({ gameIsOver, stage }) {
  collisionPoint.style.display = "none";
  walkEnemy.style.display = "none";
  airEnemy.style.display = "none";
  gameContainer.classList.add("moveGameArea");
  clearInterval(checkAccidentTimer);

  overLay.style.display = "flex";
  const modalContainer = document.createElement("div");
  const title = document.createElement("p");
  const startBtn = document.createElement("button");
  const stageChallanges = document.createElement("ul");
  modalContainer.classList.add("modal");
  modalContainer.style.display = "flex";

  setTimeout(() => {
    modalContainer.classList.add("openModal");
  }, 10);

  title.classList.add("title");
  startBtn.classList.add("startbtn");
  stageChallanges.classList.add("challanges");
  if (gameIsOver) {
    title.textContent = " .شما باختید ☠️";
    startBtn.textContent = " شروع بازی جدید 🎮";
    modalContainer.classList.remove("superMario");
    modalContainer.classList.remove("superMarioSuccess");
    modalContainer.classList.add("superMarioDeath");
  } else if (stage) {
    if (stage <= 2) {
      modalContainer.classList.add("superMario");
      modalContainer.classList.remove("superMarioSuccess");
      title.textContent = ` چالش های مرحله ${stage} 👾`;
      startBtn.textContent = `شروع مرحله ${stage} 🎮`;
    } else if (stage === 3) {
      console.log('this is is true')
      title.textContent = ` شما بازی رو بردید`;

      modalContainer.classList.remove("superMario");
      modalContainer.classList.add("superMarioSuccess");
    }
    const challanges = {
      1: ["باید 5 تا دشمن پیاده بکشی.", "یک فرصت بیشتر نداری."],
      2: [
        "باید 5 تا دشمن پرنده بکشی.",
        "یک فرصت بیشتر نداری.",
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
    closeModal({ gameIsOver, startBtn, modalContainer, stage });
  });
}
const closeModal = ({ gameIsOver, startBtn, modalContainer, stage }) => {
  gameContainer.classList.remove("moveGameArea");

  if (gameIsOver) {
    location.reload();
    // gameIsOver= false;
    // stage= 1;
    // modalContainer.classList.remove("openModal");
    // modalContainer.classList.add("closeModal");
    // setTimeout(() => {
    //   modalContainer.style.display = "none";
    // }, 500);
    // overLay.style.display = "none";
    // setTimeout(() => {
    //   showModal({ stage, gameIsOver });
    // }, 1000);
  } else if (stage) {
    character.style.display = "flex";
    walkEnemy.style.display = "flex";
    startBtn.style.display = "none";
    if (stage === 1) {
      StageSpan.textContent = "مرحله اول";
    } else if (stage === 2) {
      airEnemy.style.display = "flex";
      obstacles.style.display = "flex";
      mushroom.style.display = "flex";

      StageSpan.textContent = "مرحله دوم";
    } else if (stage === 3) {
    }
    modalContainer.classList.remove("openModal");
    modalContainer.classList.add("closeModal");
    setTimeout(() => {
      modalContainer.style.display = "none";
    }, 500);
    overLay.style.display = "none";
    gameIsOver = false;
    resetEnemies();
    checkAccident();
  }
};
