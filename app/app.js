let Form = document.getElementById("form");
let InputTask = document.getElementById("InputAdd");
let InputFilter = document.getElementById("InputFilter");
let List = document.getElementById("UlList");
let SelectBox = document.getElementById("Category");
let FooterButtons = document.querySelector(".buttons");
let Delete_btn = document.getElementById("delete_btn");
let Clear_btn = document.getElementById("clear_btn");
let Li_date = document.getElementById("date");

let ui = new Ui();
let storage = new Storage();

let TaskDate;

eventListeners();
function eventListeners() {
  Form.addEventListener("submit", formValidationController);
  SelectBox.addEventListener("change", selectCategory);
  List.addEventListener("click", deleteByTrash);
  InputFilter.addEventListener("keyup", FilterTask);
  Delete_btn.addEventListener("click", deleteLastElement);
  Clear_btn.addEventListener("click", ClearCategoryList);
  document.addEventListener("DOMContentLoaded", categoryLoaded);
}

function formValidationController(e) {
  let TaskInput = InputTask.value.trim();
  let Category = SelectBox.value;
  TaskDate = new Date().toLocaleDateString();
  if (TaskInput === "") {
    ui.displayMessage(List, "Pls Insert Input !");
  } else {
    ui.addTaskUi(List, TaskInput, TaskDate);
    ui.clearInput(InputTask);
    storage.addTaskToStorage(Category, { TaskInput, TaskDate });
  }

  e.preventDefault();
}

function selectCategory() {
  localStorage.setItem("category", SelectBox.value);
  let AllTasks = storage.getTaskFromStorage(SelectBox.value);
  if (AllTasks && AllTasks.length > 0) {
    cleraUi(List);
    addUi(AllTasks);
  } else {
    if (List.children && List.childElementCount > 0) {
      cleraUi(List);
    }
    ui.noTaskMessage(List, SelectBox.value, " Category is Empty !");
  }
}
function cleraUi(list) {
  while (list.firstElementChild !== null) {
    list.removeChild(list.firstElementChild);
  }
}

function addUi(tasks) {
  tasks.forEach((element) => {
    let { TaskInput, TaskDate } = element;
    ui.addTaskUi(List, TaskInput, TaskDate);
  });
}

function categoryLoaded() {
  SelectBox.value = localStorage.getItem("category");
  let AllTask = storage.getTaskFromStorage(SelectBox.value);

  if (AllTask.length > 0) {
    AllTask.forEach((element) => {
      let { TaskInput, TaskDate } = element;
      ui.addTaskUi(List, TaskInput, TaskDate);
    });
  } else {
    ui.noTaskMessage(List, SelectBox.value, " Category is Empty !");
  }
}

function deleteByTrash(e) {
  let targetSpace = e.target;

  if (targetSpace.className === "fas fa-trash") {
    let targetText =
      targetSpace.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent.trim();
    let counter = List.childElementCount;
    if (counter === 1) {
      ui.noTaskMessage(List, SelectBox.value, " Category is Empty !");
    }
    ui.deleteLiByTrash(targetSpace);
    storage.deleteLiStorageAsyc(SelectBox.value, targetText);
  }
}

function FilterTask() {
  let filterInput = InputFilter.value.trim().toLowerCase();
  let targetText = document.querySelectorAll("#text");
  targetText.forEach((task) => {
    let text = task.textContent.trim().toLowerCase();
    if (text.indexOf(filterInput) === -1) {
      ui.filterTask(task, false);
    } else {
      ui.filterTask(task, true);
    }
  });
}

function deleteLastElement() {
  let deleteLiText =
    List.lastElementChild.firstElementChild.firstElementChild.textContent.trim();
  storage.deleteLiStorageAsyc(SelectBox.value, deleteLiText);
  List.removeChild(List.lastElementChild);
  let counter = List.childElementCount;
  if (counter === 0) {
    ui.noTaskMessage(List, SelectBox.value, " Category is Empty !");
  }
}

function ClearCategoryList() {
  let allElement = List.childElementCount;
  if (confirm("are you sure ?")) {
    while (List.firstElementChild !== null) {
      List.removeChild(List.firstElementChild);
    }
    storage.ClearCategoryList(SelectBox.value);
    ui.noTaskMessage(List, SelectBox.value, " Category is Empty !");
    alert(`${allElement} Task deleted !`);
  } else {
    alert("no element deleted !");
  }
}
