const left = document.querySelector(".wrapper_l_col");
const right = document.querySelector(".wrapper_r_col");
const age = document.querySelector(".age");

age.innerHTML = Math.floor(
  (new Date() - new Date("03-27-1985")) / 1000 / 60 / 60 / 24 / 365.25
);
changeAnimation(left, right);
const transparent = "transparent";
const colorWhite = "white";

function changeAnimation(a, b) {
  if (!a || !b) {
    return;
  }
  let isPlay = true;
  setTimeout(function tick() {
    if (isPlay === true) {
      animationLeft(a);
      isPlay = false;
      setTimeout(tick, 3000);
    } else {
      animationRight(b);
      isPlay = true;
      setTimeout(tick, 3000);
    }
  }, 1000);
}

function animationLeft(el) {
  if (window.innerWidth < 768) return;
  el.animate(
    [
      // keyframes
      {
        borderTopColor: colorWhite,
        borderRightColor: transparent,
        borderBottomColor: transparent,
        borderLeftColor: transparent,
      },
      {
        borderTopColor: transparent,
        borderLeftColor: colorWhite,
        borderBottomColor: transparent,
        borderRightColor: transparent,
      },
      {
        borderTopColor: transparent,
        borderRightColor: transparent,
        borderBottomColor: colorWhite,
        borderLeftColor: transparent,
      },
    ],
    {
      // timing options
      duration: 3000,
      iterations: 1,
      easing: "cubic-bezier(0.12, 0, 0.39, 0)",
    }
  );
}

function animationRight(el) {
  if (window.innerWidth < 768) return;
  el.animate(
    [
      // keyframes
      {
        borderTopColor: transparent,
        borderRightColor: transparent,
        borderBottomColor: colorWhite,
        borderLeftColor: transparent,
      },
      {
        borderTopColor: transparent,
        borderBottomColor: transparent,
        borderLeftColor: transparent,
        borderRightColor: colorWhite,
      },
      {
        borderBottomColor: transparent,
        borderTopColor: colorWhite,
        borderRightColor: transparent,
        borderLeftColor: transparent,
      },
    ],
    {
      // timing options
      duration: 3000,
      iterations: 1,
      easing: "cubic-bezier(0.12, 0, 0.39, 0)",
    }
  );
}
