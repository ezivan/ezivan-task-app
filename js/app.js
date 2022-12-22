export default function app() {
  const d = document,
    ls = localStorage,
    $input = d.getElementById("homework-input"),
    $list = d.getElementById("list");

  const hiddenMenu = () => {
    d.getElementById("menu").classList.remove("active");
    d.querySelector(".menu-btn").firstElementChild.classList.remove("none");
    d.querySelector(".menu-btn").lastElementChild.classList.add("none");
  };

  const saveHomework = () => {
    const task = {
      id: crypto.randomUUID(),
      textContent: $input.value,
    };

    if (ls.getItem("myTasks") === null) {
      let chores = [];
      chores.push(task);
      ls.setItem("myTasks", JSON.stringify(chores));
    } else {
      let myTasks = JSON.parse(ls.getItem("myTasks"));
      myTasks.push(task);
      ls.setItem("myTasks", JSON.stringify(myTasks));
    }
    showData();
    $input.value = "";
  };

  const showData = () => {
    let allTasks = JSON.parse(ls.getItem("myTasks"));
    $list.innerHTML = "";

    if (ls.getItem("myTasks") !== null && allTasks.length !== 0) {
      allTasks.forEach((el) => {
        $list.innerHTML += `
        <li class="task-list-item" data-id="${el.id}">
            <p>${el.textContent}</p>
            <div>
              <img class="task-delete-icon" id="${el.id}" src="assets/delete-icon.svg" alt="Delete">
            </div>
          </li>
          `;
      });
    } else {
      $list.innerHTML = `
      <li class="default-message">No tienes ninguna tarea</li>
      `;
    }
  };

  const removeTask = (id) => {
    let myTasks = JSON.parse(ls.getItem("myTasks"));

    for (let i = 0; i < myTasks.length; i++) {
      if (id === myTasks[i].id) {
        myTasks.splice(i, 1);
      }
    }
    ls.setItem("myTasks", JSON.stringify(myTasks));
    showData();
  };

  const deleteAll = () => {
    let allTasks = JSON.parse(ls.getItem("myTasks"));
    allTasks = [];
    ls.setItem("myTasks", JSON.stringify(allTasks));
    showData();
  };

  // EVENTS
  d.addEventListener("DOMContentLoaded", showData);

  d.addEventListener("click", (e) => {
    if (e.target.matches(".add-task-btn *")) {
      if ($input.value !== "" && $input.value.trim() !== "") {
        saveHomework();
      } else {
        d.querySelector(".input-error-message").classList.add("active");
        setTimeout(
          () =>
            d.querySelector(".input-error-message").classList.remove("active"),
          2000
        );
      }
    }

    if (e.target.matches(".task-delete-icon")) removeTask(e.target.id);

    if (e.target.matches("#confirm-btn")) {
      d.querySelector(".modal-confirm-container").classList.remove("active");
      deleteAll();
      hiddenMenu();
    }
    if (e.target.matches(".task-list")) hiddenMenu();
  });

  d.addEventListener("keyup", (e) => {
    if (e.key === "Enter") saveHomework();
  });
}
