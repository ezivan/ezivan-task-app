const d = document,
   $btn = d.querySelector(".menu-btn"),
   $menu = d.getElementById("menu");

export function hiddenMenu() {
  $menu.classList.remove("active");
  $btn.firstElementChild.classList.remove("none");
  $btn.lastElementChild.classList.add("none");
}

export default function menu() {

  d.addEventListener("click", (e) => {
    if (e.target.matches(`.menu-btn *`)) {
      $btn.firstElementChild.classList.toggle("none");
      $btn.lastElementChild.classList.toggle("none");
      $menu.classList.toggle("active");
    };
    if (e.target.matches(".task-list")) {
     hiddenMenu();
    };
  })
}
