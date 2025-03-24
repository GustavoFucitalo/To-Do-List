document.querySelector("#btnID").addEventListener("click", addTask);

const input = document.querySelector("#toDoListID");

function addTask() {
  const myUL = document.querySelector("#myUl");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = createTaskElement(taskText);
  myUL.appendChild(li);

  saveTasks();

  input.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const editButton = createButton("Editar", "rgb(253, 253, 253)", () =>
    enableEdit(span, editButton, saveButton)
  );
  const saveButton = createButton("Salvar", "rgb(12, 237, 12)", () =>
    disableEdit(span, editButton, saveButton)
  );
  saveButton.style.display = "none";

  const removeButton = createButton("Deletar", "rgba(242, 7, 7, 0.88)", () => {
    li.remove();
    saveTasks();
  });

  buttonContainer.append(editButton, saveButton, removeButton);
  li.append(span, buttonContainer);

  return li;
}

function createButton(text, color, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.backgroundColor = color;
  button.addEventListener("click", onClick);
  return button;
}

function enableEdit(span, editButton, saveButton) {
  span.contentEditable = true;
  span.focus();
  editButton.style.display = "none";
  saveButton.style.display = "inline";
}

function disableEdit(span, editButton, saveButton) {
  span.contentEditable = false;
  editButton.style.display = "inline";
  saveButton.style.display = "none";
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#myUl li span").forEach((span) => {
    tasks.push(span.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedValue = localStorage.getItem("inputValue");

  if (savedValue) {
    input.value = savedValue;
  }

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => {
    const myUl = document.querySelector("#myUl");
    const li = createTaskElement(task);
    myUl.appendChild(li);
  });
});

function savedInput() {
  localStorage.setItem("inputValue", input.value);
  alert("Valor salvo!");
}

function clearInput() {
  localStorage.removeItem("inputValue");
  input.value = "";
  alert("Valor apagado!");
}
