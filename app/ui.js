class Ui {
  displayMessage(container, errMessage) {
    let errLi = document.createElement("li");
    errLi.className = "err-message";
    errLi.textContent = errMessage;
    container.appendChild(errLi);
    setInterval(() => {
      errLi.remove();
    }, 2000);
  }
  addTaskUi(container, paramsInput, date) {
    let isTrue = container.firstElementChild
      ? container.firstElementChild.className === "err-message"
      : null;

    if (isTrue) {
      container.removeChild(container.firstElementChild);
    }
    container.innerHTML += `
  <li>
  <p>
  <span id="text">
      ${paramsInput}
      </span>
      <sub id='date'>${date}</sub>
      
  </p>
  <div class="right_content">

    
      <div class="delete_icon">
          <i class="fas fa-trash"></i>
      </div>
  </div>
</li>
  `;
  }

  clearInput(paramsInput) {
    paramsInput.value !== "" ? (paramsInput.value = "") : null;
  }

  noTaskMessage(container, category, errMessage) {
    let errLi = document.createElement("li");
    errLi.className = "err-message";
    errLi.textContent = category + " " + errMessage;
    container.appendChild(errLi);
  }

  deleteLiByTrash(targetSpace) {
    targetSpace.parentElement.parentElement.parentElement.remove();
  }
  filterTask(task, isTrue = true) {
    isTrue
      ? task.parentElement.parentElement.removeAttribute("style")
      : task.parentElement.parentElement.setAttribute("style", "display:none");
  }
}
