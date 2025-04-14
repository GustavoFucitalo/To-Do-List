document.querySelector("#btnID").addEventListener("click", addTask);

const input = document.querySelector("#toDoListID");

function addTask() {
  const myUL = document.querySelector("#myUl");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = createTaskElement(taskText, false);
  myUL.appendChild(li);

  saveTasks();

  input.value = "";
}

input.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    addTask();
  }
});

function createTaskElement(taskText, isChecked = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("myCheckBox");
  checkBox.checked = isChecked;

  checkBox.addEventListener("change", saveTasks);

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
  li.append(checkBox, span, buttonContainer);

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

  const checkBoxSave = [];
  document.querySelectorAll("input.myCheckBox").forEach((checkbox) => {
    checkBoxSave.push(checkbox.checked);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("checkboxes", JSON.stringify(checkBoxSave));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedValue = localStorage.getItem("inputValue");
  if (savedValue) {
    input.value = savedValue;
  }

  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const savedCheckBoxes = JSON.parse(localStorage.getItem("checkboxes")) || [];

  const myUl = document.querySelector("#myUl");

  savedTasks.forEach((task, index) => {
    const li = createTaskElement(task, savedCheckBoxes[index] || false);
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
