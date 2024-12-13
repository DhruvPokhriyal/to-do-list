import "./styles.css";

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

const lists = document.querySelector(".lists");
const modal = document.querySelector(".modal");

const newListButton = document.querySelector(".new-list");
newListButton.addEventListener("click", () => {
    modal.showModal();
    const modalForm = modal.querySelector("form");
    const closeButton = modalForm.querySelector(".close");
    closeButton.addEventListener("click", () => {
        modalForm.reset();
        modal.close();
    });
    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const listName = modalForm.querySelector("input").value;
        for (const key in all_list) {
            if (listName == key) {
                alert("List name already exist.");
                modalForm.reset();
            } else {
                all_list[listName] = [];
            }
        }
    });
});

const taskForm = document.querySelector("#taskForm");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
});
