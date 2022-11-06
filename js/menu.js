const d = document;
export default function menu() {
  const $btn = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btn.addEventListener("click", () => {
    $btn.firstElementChild.classList.toggle("none");
    $btn.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("active");
  });
}
