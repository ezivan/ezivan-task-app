import {hiddenMenu} from "./menu.js"

const d = document,
    $btnDelete = d.getElementById("deleteAll"),
    $modal = d.querySelector(".modal-confirm-container");

export default function modal() {
  d.addEventListener("click", (e) => {
    if (e.target === $btnDelete && localStorage.myTasks !== "[]")
      $modal.classList.add("active");
    if (e.target.matches("#reject-btn")) {
      $modal.classList.remove("active");
      hiddenMenu()
    }
  });
}
