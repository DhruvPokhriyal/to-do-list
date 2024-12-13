import "./styles.css";
import binImage from "./assets/images/trash.png";

const myTask = [];
const importantTask = [];
const tasks = [];

const all_list = { myTask, importantTask, tasks };

const isImportant = false;

class Task {
    constructor(title, desc, dueDate, importance) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.importance = importance;
    }
}

// Sidebar (Make this code modular)

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
    deleteButton.addEventListener("click", () => {
        lists.removeChild(listContainer);
        delete all_list[listName];
    });
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
    const temp = listName.replace(/\s+/g, "-");
    let status = addNewList(listName, temp, modalForm);
    if (status == false) return;
});

const taskForm = document.querySelector("#taskForm");

//main

// New Task

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
