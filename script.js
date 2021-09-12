//my second git push
console.log("ok")

// dom elements

const btnAddTask = document.querySelector(".task-input-btn");
const btnClearAll = document.querySelector(".clear-all-btn");

const taskInput = document.querySelector(".task-input");
const taskContainer = document.querySelector(".list");
const taskCountEl = document.querySelector(".task-count");

//initial values

let taskCount = 0;


//event listeners
btnAddTask.addEventListener("click", addTask);
taskInput.addEventListener("keypress", addTaskOnEnter);

document.addEventListener("click", deleteTask);
btnClearAll.addEventListener("click", clearAllTasks);


//functions
function addTaskOnEnter(e) {
  if (e.key === "Enter") addTask();
}

function addTask() {

  if (!taskInput.value.trim()) return;

  const taskHtml = `<li class="item">
                    <p>${taskInput.value}</p>
                    <div class="btn delete-btn"><i class="fas fa-trash"></i></div>
                   </li>`;

  taskContainer.insertAdjacentHTML("beforeend", taskHtml);
  taskInput.value = "";
  taskInput.focus();
  taskCount++;
  taskCountEl.textContent = taskCount;
}

function deleteTask(e) {

  if (e.target.classList.contains("delete-btn")) {
    e.target.closest(".item").remove();
    taskCount--;
    taskCountEl.textContent = taskCount;

  }
}

function clearAllTasks() {
  taskContainer.innerHTML = "";
  taskCount = 0;
  taskCountEl.textContent = taskCount;
}
