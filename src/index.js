import "./styles.css";
import binImage from "./assets/images/trash.png";

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
                    const taskList = document.querySelector(".task-list");
                    taskList.innerHTML = "";
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
