class Storage {
  getTaskFromStorage(paramsKey) {
    let AllTask;
    if (localStorage.getItem(paramsKey) === null) {
      AllTask = [];
    } else {
      AllTask = JSON.parse(localStorage.getItem(paramsKey));
    }
    return AllTask;
  }

  addTaskToStorage(paramsKey, paramValue) {
    let StorageTasks = this.getTaskFromStorage(paramsKey);
    StorageTasks.push(paramValue);
    console.log(paramValue);
    localStorage.setItem(paramsKey, JSON.stringify(StorageTasks));
  }

  deleteLiStorageAsyc(paramsKey, targetSpaceText) {
    let AllTask = this.getTaskFromStorage(paramsKey);

    AllTask.forEach((element, index) => {
      let { TaskInput } = element;
      if (TaskInput === targetSpaceText) {
        AllTask.splice(index, 1);
        console.log(index);
      }
    });
    localStorage.setItem(paramsKey, JSON.stringify(AllTask));
  }
  ClearCategoryList(paramsKey) {
    let AllTask = this.getTaskFromStorage(paramsKey);
    while (AllTask.length !== 0) {
      AllTask.splice(0, 1);
    }
    localStorage.setItem(paramsKey, JSON.stringify(AllTask));
  }
}
