const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');
let dateEnd = document.querySelector('.data-end')

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

function Task(description, date) {
    this.description = description;
    this.date = date;
    this.completed = false;
}

const createTemplate = (task,index) => {
    return `
        <div class = 'todo-item ${task.completed ? 'checked' : ""}'>
               <div class="description">${task.description}</div>
                <div class="buttons">
                    <div>${task.date}</div>
                    <input type="checkbox" onclick = "completeTask(${index})" class = 'btn-complete'  ${task.completed ? "cheсked" : ""}>
                    <button onclick = "deleteTask (${index})" class = "btn-delete">Delete</button>
                </div>
        </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks,...completedTasks]
}


const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem ('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value, dateEnd.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = "";
    dateEnd.value = "";
})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    },500)
}

