export default function app() {
  const d = document,
    $input = d.getElementById("homework-input"),
    $list = d.getElementById("list");

  const hiddeMenu = () => {
    d.getElementById("menu").classList.remove("active");
    d.querySelector(".menu-btn").firstElementChild.classList.remove("none");
    d.querySelector(".menu-btn").lastElementChild.classList.add("none");
  };

  const saveHomework = () => {
    let id = crypto.randomUUID();

    const chores = {
      content: $input.value,
      id: id,
    };

    if (localStorage.getItem("myTasks") === null) {
      let array = [];
      array.push(chores);
      localStorage.setItem("myTasks", JSON.stringify(array));
    } else {
      let myTasks = JSON.parse(localStorage.getItem("myTasks"));
      myTasks.push(chores);
      localStorage.setItem("myTasks", JSON.stringify(myTasks));
    }

    if (localStorage.myTasks !== "[]") showData();
    $input.value = "";
  };

  const showData = () => {
    let taskObtained = JSON.parse(localStorage.getItem("myTasks"));
    $list.innerHTML = "";

    if (localStorage.myTasks === "[]") {
      $list.innerHTML = `
      <li class="default-message">No tienes ninguna tarea</li>
      `;
    }

    taskObtained.forEach((el) => {
      $list.innerHTML += `
        <li class="task-list-item" data-id="${el.id}">
          <p>${el.content}</p>
          <div>
            <img class="task-check-icon" data-id="${el.id}" src="assets/check-icon.svg" alt="Cheked">
            <img class="task-delete-icon" id="${el.id}" src="assets/delete-icon.svg" alt="Delete">
          </div>
        </li>
      `;
    });
  };

  const markHomework = (id) => {
    let tasksItems = d.querySelectorAll(".task-list-item");
    tasksItems.forEach((el) => {
      if (el.dataset.id === id) {
        el.classList.toggle("complete");
      }
    });
  };

  const removeTask = (id) => {
    let myTasks = JSON.parse(localStorage.getItem("myTasks"));

    for (let i = 0; i < myTasks.length; i++) {
      if (id === myTasks[i].id) {
        myTasks.splice(i, 1);
      }
    }
    localStorage.setItem("myTasks", JSON.stringify(myTasks));
    showData();
  };

  const deleteAll = () => {
    if (localStorage.myTasks !== "[]") {
      let taskObtained = JSON.parse(localStorage.getItem("myTasks"));
      taskObtained = [];
      localStorage.setItem("myTasks", JSON.stringify(taskObtained));
      showData();
    } else {
      alert("No tienes tareas que eliminar");
    }
  };

  // EVENTS
  d.addEventListener("DOMContentLoaded", () => {
    if (localStorage.myTasks !== "[]") showData();
  });

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
    if (e.target.matches(".task-check-icon")) {
      console.log(e.target);
      markHomework(e.target.dataset.id);
    }

    if (e.target.matches("#confirm-btn")) {
      d.querySelector(".confirm-container").classList.remove("active");
      deleteAll();
      hiddeMenu();
    }
    if (e.target.matches(".task-list")) hiddeMenu();
  });

  d.addEventListener("keyup", (e) => {
    if (e.key === "Enter") saveHomework();
  });
}
