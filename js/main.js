// ********** Imports **********
import app from "./app.js";
import darkTheme from "./change-theme.js";
import menu from "./menu.js";
import modal from "./modal-confirm.js";

document.addEventListener("DOMContentLoaded", () => {
  menu();
  modal();
  darkTheme("btn-theme");
});

app();
