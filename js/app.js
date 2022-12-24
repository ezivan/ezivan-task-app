import { hiddenMenu } from "./menu.js";

const d = document,
  lS = localStorage,
  $input = d.getElementById("homework-input"),
  $list = d.getElementById("list");

export default function app() {
  const saveHomework = () => {
    const task = {
      textContent: $input.value,
      id: crypto.randomUUID(),
    };

    if (lS.getItem("tasks") === null) {
      let chores = [];
      chores.push(task);
      lS.setItem("tasks", JSON.stringify(chores));
    } else {
      let myTasks = JSON.parse(lS.getItem("tasks"));
      myTasks.push(task);
      lS.setItem("tasks", JSON.stringify(myTasks));
    }
    showData();
    $input.value = "";
  };

  const showData = () => {
    let allTasks = JSON.parse(lS.getItem("tasks"));
    $list.innerHTML = "";

    if (lS.getItem("tasks") !== null && allTasks.length !== 0) {
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
    let myTasks = JSON.parse(lS.getItem("tasks"));

    for (let i = 0; i < myTasks.length; i++) {
      if (id === myTasks[i].id) {
        myTasks.splice(i, 1);
      }
    }
    lS.setItem("tasks", JSON.stringify(myTasks));
    showData();
  };

  const deleteAll = () => {
    let allTasks = JSON.parse(lS.getItem("tasks"));
    allTasks = [];
    lS.setItem("tasks", JSON.stringify(allTasks));
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
  });

  d.addEventListener("keyup", (e) => {
    if (e.key === "Enter") saveHomework();
  });
}
