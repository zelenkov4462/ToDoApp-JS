const addTaskBtn = document.querySelector('#add-task-btn');
const deskTaskInput = document.querySelector('#description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
let todoItemElems = [];

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Task (description) {
    this.description = description;
    this.completed = false;
}

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const createTemplate = (task, index) => {
    return `
              <div class="todo-item ${task.completed ? 'checked': '' }">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick="completeTask(${index})" type="checkbox" class = 'btn-complete' ${task.completed ? 'checked' : ""}>
                    <button onclick="deleteTask(${index})" class = 'btn-delete'>Delete</button>
                </div>
              </div>
           `
}

const filterTask = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks]
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (tasks.length > 0) {
        filterTask();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item')
    }
}
fillHtmlList();

const completeTask = (index) => {
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
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = "";
})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 500)
}