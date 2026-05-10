const themes = [
  "base",
  "summer",
  "dark",
  "ocean",
  "forest",
  "sunset",
  "coffee",
  "matrix",
  "sakura",
  "minimalist",
  "grape",
  "vaporwave",
  "desert",
  "space",
  "matcha",
  "vintage",
  "arctic",
  "lava",
  "candy",
];

const body = document.querySelector("body");
const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
  types: [
    {
      type: "info",
      background: "var(--bg-sidebar)",
      icon: {
        className: "nf nf-fae-palette_color",
        tagName: "i",
        color: "var(--main-color)",
      },
    },
  ],
});

const nextTheme = () => {
  themes.every((el) => {
    if (!body.classList.contains(el)) {
      return true;
    }
    /* 🍇 Tema Uva (Atrevida, geométrica y con personalidad) */

    body.classList.toggle(el);
    var index = themes.indexOf(el);
    console.log(index);

    if (index + 1 == themes.length) {
      index = 0;
    } else {
      index++;
    }

    body.classList.toggle(themes[index]);

    notyf.open({
      type: "info",
      message: "Tema cambiado a " + themes[index],
    });
    return false;
  });
};

let task;
const TIME = 4000;

const timer = () => {
  if (task == undefined) {
    console.log("timer had been started");

    notyf.open({
      type: "info",
      message:
        "Timer iniciado, cambiando tema cada " + TIME / 1000 + " segundos",
    });

    task = setInterval(() => {
      nextTheme();
    }, TIME);
  } else {
    console.log("Timer had been destroyed");

    notyf.open({
      type: "info",
      message: "Timer detenido",
    });

    clearInterval(task);
    task = undefined;
  }
};

document.addEventListener("keypress", (event) => {
  switch (event.key) {
    case " ":
      nextTheme();
      break;
    case "t":
      timer();
      break;
  }
});

const icon = document.querySelector(".perfil");

icon.addEventListener("click", () => {
  nextTheme();
});

const header = document.querySelector(".header");

header.addEventListener("click", () => {
  timer();
});

const menuButton = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("active");
  sidebar.classList.toggle("active");
});
