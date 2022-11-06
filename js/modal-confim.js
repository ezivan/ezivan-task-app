const d = document;
export default function modal() {
  const $btnDelete = d.getElementById("deleteAll");

  d.addEventListener("click", (e) => {
    if (e.target === $btnDelete && localStorage.myTasks !== "[]")
      d.querySelector(".modal-confirm-container").classList.add("active");
    if (e.target.matches("#reject-btn")) {
      d.querySelector(".modal-confirm-container").classList.remove("active");
      d.querySelector(".menu").classList.remove("active");
      d.querySelector(".menu-btn").firstElementChild.classList.remove("none");
      d.querySelector(".menu-btn").lastElementChild.classList.add("none");
    }
  });
}
