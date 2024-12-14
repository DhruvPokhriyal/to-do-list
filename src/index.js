import "./styles.css";
import binImage from "./assets/images/trash.png";
import filledStar from "./assets/images/filled_star.svg";
import hollowStar from "./assets/images/hollow_star.svg";
import calendar from "./assets/images/calendar.svg";

const all_list = { my_day: [], important: [], tasks: [] };

const isImportant = false;

class Task {
    constructor(title, desc, dueDate, importance) {
        this.status = false;
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.importance = importance;
    }
}

// Testing info

all_list.important.push(
    new Task(
        "Dummy",
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

function uniqueListCheck(listName, temp, modalForm) {
    if (!listName) {
        alert("List name cannot be empty");
        modalForm.reset();
        return false;
    }
    for (const key in all_list) {
        if (listName == key) {
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

function deleteButtonFunctionality(listName, listContainer, lists) {
    lists.removeChild(listContainer);
    delete all_list[listName];
}

function addListInDom(listName, temp, modalForm) {
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
}

function addNewList(listName, temp, modalForm) {
    let unique = uniqueListCheck(listName, temp, modalForm);
    if (unique == false) return false;
    all_list[listName] = [];
    addListInDom(listName, temp, modalForm);
    return true;
}

modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const listName = modalForm.querySelector("input").value.trim();
    const temp = listName.replace(/\s+/g, "_");
    let status = addNewList(listName, temp, modalForm);
    if (status == false) return;
});

const listArr = Array.from(
    document.querySelectorAll(".my-day,.important,.lists > div")
);

for (const list of listArr) {
    list.addEventListener("click", () => {
        const listClass = list.className;
        const classList = listClass.split(" ");
        if (classList.length == 2) {
            return;
        } else {
            for (let key in all_list) {
                let temp = key.replace(/\s+/g, "_");
                if (temp == listClass) {
                    const reqList = all_list[key];
                    const taskList = document.querySelector(".task-list");
                    taskList.innerHTML = "";
                    for (let i = 0; i < reqList.length; i++) {
                        let entry = reqList[i];
                        let taskNo = i + 1;
                        const taskElement = document.createElement("li");
                        taskElement.classList.add(`task-${taskNo}`);

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

                        const taskDue = document.createElement("div");
                        taskDue.classList.add(
                            `task-${taskNo}-date`,
                            "task-date"
                        );
                        taskDue.textContent = entry.dueDate;
                        taskElement.appendChild(taskDue);

                        const taskImp = document.createElement("div");
                        taskImp.classList.add(
                            `task-${taskNo}-importance`,
                            "task-imp"
                        );
                        const impImg = document.createElement("img");
                        impImg.height = "20";
                        if (entry.importance == true) {
                            impImg.src = filledStar;
                        } else {
                            impImg.src = hollowStar;
                        }
                        taskImp.appendChild(impImg);
                        taskElement.appendChild(taskImp);

                        taskList.appendChild(taskElement);
                    }
                }
            }
        }
    });
}

//main

// New Task

const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
