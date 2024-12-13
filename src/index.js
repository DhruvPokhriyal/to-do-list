import "./styles.css";

const myTask = [];
const importantTask = [];
const tasks = [];

const isImportant = false;

class Task {
    constructor(title, desc, dueDate, importance) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.importance = importance;
    }
}

const lists = document.querySelector(".lists");
const modal = document.querySelector(".modal");
modal.showModal();

const newListButton = document.querySelector(".new-list");

const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
