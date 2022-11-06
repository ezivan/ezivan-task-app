const d = document;
export default function darkTheme(btn) {
  const $btn = d.getElementById(btn);

  $btn.addEventListener("click", () => {
    $btn.firstElementChild.classList.toggle("none");
    $btn.lastElementChild.classList.toggle("none");
    d.body.classList.toggle("dark");

    if (d.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  if (localStorage.getItem("theme") === "dark") {
    d.body.classList.add("dark");
    $btn.firstElementChild.classList.add("none");
    $btn.lastElementChild.classList.remove("none");
  } else {
    d.body.classList.remove("dark");
    $btn.firstElementChild.classList.remove("none");
    $btn.lastElementChild.classList.add("none");
  }
}
