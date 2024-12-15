import "./styles.css";
import binImage from "./assets/images/trash.png";
import filledStar from "./assets/images/filled_star.svg";
import hollowStar from "./assets/images/hollow_star.svg";
import calendar from "./assets/images/calendar.svg";

// Add functionality to retrieve data from local storage and add data into local storage

let isImportant = false;

let currentlyActive;

let listArr = getAllList();

class Task {
    constructor(title, desc, dueDate, importance) {
        this.status = false;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.importance = importance;
    }
}

class DataManager {
    static all_list = { my_day: [], important: [], tasks: [] };
    static uniqueListCheck(listName, temp, modalForm) {
        if (!listName) {
            alert("List name cannot be empty");
            modalForm.reset();
            return false;
        }
        for (const key in this.all_list) {
            if (listName.toLowerCase() == key) {
                alert("List name already exist.");
                modalForm.reset();
                return false;
            }
        }

        if (!temp) {
            alert("Invalid Name");
            modalForm.reset();
            return false;
        }
        return true;
    }
    static createNewList(listName) {
        this.all_list[listName.toLowerCase()] = [];
    }
}

class UIManager {
    static addListInDOM(listName, temp, modalForm) {
        const listContainer = document.createElement("div");
        listContainer.classList.add(temp);
        listContainer.textContent = listName;
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.type = "button";
        const deleteImg = document.createElement("img");
        deleteImg.src = binImage;
        deleteImg.height = "20";
        deleteImg.alt = "Delete Icon";
        deleteButton.appendChild(deleteImg);
        listContainer.appendChild(deleteButton);
        lists.appendChild(listContainer);
        deleteButton.addEventListener(
            "click",
            deleteButtonFunctionality.bind(null, listName, listContainer, lists)
        );
        modalForm.reset();
        modal.close();
        return listContainer;
    }

    static activeListDOM(list, listClass, currentlyActive) {
        document
            .querySelector("." + currentlyActive)
            .classList.remove("active");
        list.classList.add("active");
        for (let key in DataManager.all_list) {
            let temp = key.replace(/\s+/g, "_");
            if (temp == listClass) {
                const reqList = DataManager.all_list[key];
                const taskList = document.querySelector(".task-list");
                taskList.innerHTML = "";
                for (let i = 0; i < reqList.length; i++) {
                    let entry = reqList[i];
                    let taskNo = i + 1;
                    const taskElement = document.createElement("li");
                    taskElement.classList.add(`task-${taskNo}`);

                    this.checkboxDisplay(taskElement, taskNo);
                    this.taskTitleDisplay(taskElement, taskNo, entry);
                    this.taskDueDisplay(taskElement, taskNo, entry);
                    this.taskImpDisplay(taskElement, taskNo, entry);
                    taskList.appendChild(taskElement);
                }
            }
        }
    }
    static checkboxDisplay(taskElement, taskNo) {
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("checkbox");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox__input");
        checkbox.id = `checkbox-${taskNo}`;
        const checkboxSpan = document.createElement("span");
        checkboxSpan.classList.add("checkbox__inner");
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(checkboxSpan);
        taskElement.appendChild(checkboxLabel);
    }
    static taskTitleDisplay(taskElement, taskNo, entry) {
        const taskTitle = document.createElement("div");
        taskTitle.classList.add(`task-${taskNo}-title`);
        taskTitle.classList.add("task-name");
        const taskDesc = document.createElement("span");
        taskDesc.classList.add(`task-${taskNo}-desc`);
        taskDesc.classList.add("task-desc");
        taskDesc.classList.add("hide");
        taskTitle.textContent = entry.title;
        taskDesc.textContent = entry.desc;
        taskTitle.appendChild(taskDesc);
        taskElement.appendChild(taskTitle);
    }
    static taskDueDisplay(taskElement, taskNo, entry) {
        const taskDue = document.createElement("div");
        taskDue.classList.add(`task-${taskNo}-date`, "task-date");
        taskDue.textContent = entry.dueDate;
        taskElement.appendChild(taskDue);
    }
    static taskImpDisplay(taskElement, taskNo, entry) {
        const taskImp = document.createElement("div");
        taskImp.classList.add(`task-${taskNo}-importance`, "task-imp");
        const impImg = document.createElement("img");
        impImg.height = "20";
        if (entry.importance == true) {
            impImg.src = filledStar;
        } else {
            impImg.src = hollowStar;
        }
        taskImp.appendChild(impImg);
        taskElement.appendChild(taskImp);
    }
}

// Testing info

DataManager.all_list.important.push(
    new Task(
        "Dummy_1",
        "This is some testing data that i am writing here",
        "16/12/24",
        false
    )
);
DataManager.all_list.my_day.push(
    new Task(
        "Dummy_2",
        "This is some testing data that i am writing here",
        "16/12/24",
        false
    )
);
DataManager.all_list.tasks.push(
    new Task(
        "Dummy_3",
        "This is some testing data that i am writing here",
        "16/12/24",
        false
    )
);

// Testing info ends

// Sidebar
const lists = document.querySelector(".lists");
const modal = document.querySelector(".modal");

const newListButton = document.querySelector(".new-list");
newListButton.addEventListener("click", () => {
    modal.showModal();
});

const modalForm = modal.querySelector("form");
const closeButton = modalForm.querySelector(".close");

closeButton.addEventListener("click", () => {
    modalForm.reset();
    modal.close();
});

function deleteButtonFunctionality(listName, listContainer, lists) {
    lists.removeChild(listContainer);
    delete DataManager.all_list[listName];
}

function addNewList(listName, temp, modalForm) {
    let unique = DataManager.uniqueListCheck(listName, temp, modalForm);
    if (unique == false) return false;
    DataManager.createNewList(listName);
    let listElement = UIManager.addListInDOM(listName, temp, modalForm);
    // Get all list
    listElement.addEventListener("click", () => {
        listArr = getAllList();
        activeListSetup(listElement, listArr);
    });

    return true;
}

modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = modalForm.querySelector("input").value.trim();
    const temp = listName.toLowerCase().replace(/\s+/g, "_");
    let status = addNewList(listName, temp, modalForm);
    if (status == false) return;
});

// Abstract the code
// Add functionality to load My Day list on load

function getAllList() {
    return Array.from(
        document.querySelectorAll(".my_day,.important,.lists > div")
    );
}

function activeListCheck(classList) {
    if (classList.length == 2) {
        return true;
    } else {
        return false;
    }
}

function activeListClass(listArr) {
    for (let element of listArr) {
        let elementClass = element.className;
        let classArr = elementClass.split(" ");
        if (activeListCheck(classArr)) {
            return classArr[0];
        }
    }
}

function activeListSetup(list, listArr) {
    const listClass = list.className;
    const classList = listClass.split(" ");
    currentlyActive = activeListClass(listArr);
    if (activeListCheck(classList)) {
        return;
    } else {
        UIManager.activeListDOM(list, listClass, currentlyActive);
    }
}

window.onload = () => {
    UIManager.activeListDOM(
        document.querySelector(".my_day"),
        "my_day",
        "my_day"
    );
};

for (const list of listArr) {
    list.addEventListener("click", () => {
        activeListSetup(list, listArr);
    });
}

//main

// New Task

const taskForm = document.querySelector("#taskForm");

const importantButton = document.querySelector(".imp-icon-hollow-btn");
importantButton.addEventListener("click", () => {
    isImportant = 1 - isImportant;
    const buttonImg = importantButton.querySelector("img");
    if (isImportant) buttonImg.src = filledStar;
    else buttonImg.src = hollowStar;
});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskTitle = taskForm.querySelector("#task-title").value;
    const taskDesc = taskForm.querySelector("textarea").value;
    const taskDueDate = taskForm.querySelector("#dueDate").value;
});
