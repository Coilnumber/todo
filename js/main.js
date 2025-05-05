//находим элементы на странице
const form = document.querySelector('form')
const taskInput = document.querySelector('#taskInput')
const  tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

if (localStorage.getItem('tasksHTML')){
    tasksList.innerHTML = localStorage.getItem('tasksHTML')
}


form.addEventListener('submit', addTask)

tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)

function addTask(event){
    event.preventDefault()


    // достаем текст задачи из инпута
    const taskText=taskInput.value

    //Формируем разметку для новой задачи
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`



    //
    tasksList.insertAdjacentHTML('beforeend', taskHTML)

    //

    taskInput.value = ''
    taskInput.focus()

    //

    if (tasksList.children.length > 1){
        emptyList.classList.add('none')
    }
    saveHTMLtoLS()

}

function deleteTask(event){
    if (event.target.dataset.action === 'delete'){
        const parenNode = event.target.closest('.list-group-item')
        parenNode.remove()
        if (tasksList.children.length === 1){
            emptyList.classList.remove('none')
        }
        saveHTMLtoLS()
    }


}

function doneTask(event){
    if (event.target.dataset.action ==='done'){
        const parenNode = event.target.closest('.list-group-item')
        const taskTitle = parenNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }
    saveHTMLtoLS()
}

function  saveHTMLtoLS(){
    localStorage.setItem('tasksHTML', tasksList.innerHTML)
}
