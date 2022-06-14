class Todo{

	constructor(tasklist){
		this.totalTasks = null  //li of tasks
		this.tasklist = tasklist //ul holding li's
		
	}
	createDate(date){
		return new Date(date +' PST').toLocaleDateString("en-US", {timeZone: "PST"})
	}
	getContent(task){
		return task.querySelector('[data-task-content]').textContent
	}
	getDeadline(task){
		return task.querySelector('[data-task-deadline]').textContent
	}
    /*Adding Item to Todo List
	Needs content and deadline to be added
	*/
    addTodo(content, deadline){
		if(content.value === '' || deadline.value === ''){
			return
		}
		const li = document.createElement('li')
		li.classList.add('todo-list', 'todo-item')
		li.setAttribute("data-task","")
        li.innerHTML = `<div class = "task-content" data-task-content >${content.value}</div>
		<div class = "task-deadline" data-task-deadline> ${this.createDate(deadline.value)}</div>`
		this.tasklist.appendChild(li);

		this.totalTasks = document.querySelectorAll('[data-task]')
		li.addEventListener('click', () =>{
			if(li.classList.contains('completed') ==false){
				li.style.textDecoration = 'line-through'
				li.classList.add('completed')
				if(filterToggleBtn.innerText.startsWith('H')){
					return
				}
				else{
					li.classList.add('hidden')
				}
			}
			else if(li.classList.contains('completed') == true){
				li.style.textDecoration = 'none'
				li.classList.remove('completed')
				
				}
			
		})
		li.addEventListener('dblclick', ()=>{
			this.totalTasks = document.querySelector('[data-task-list]')
			this.totalTasks.removeChild(li)
			this.totalTasks = document.querySelectorAll('[data-task]')
		})
		content.value = ''
		deadline.value = ''
		//this.totalTasks = document.getElementById("li")
	}
	
	filterCompletedTasks(){
		if(filterToggleBtn.innerText.startsWith('H')){
			filterToggleBtn.innerText = 'Show Completed Tasks'
		}
		else{
			filterToggleBtn.innerText = 'Hide Completed Tasks'
		}

		if(this.totalTasks ===null){
			return
		}
		
		this.totalTasks.forEach(e => {
			console.log(e)
			if(!e.classList.contains('completed')){
				return
			}
			e.classList.toggle('hidden')
		})
	}
	/*
	Sorts the list by the deadline
	in Ascending order
	*/
	sortByDeadlineAscending(){
		console.log(this.totalTasks)
		Array.from(this.totalTasks)
		.sort((x,y) => {

			const dateX = new Date (this.getDeadline(x) + ' PST')
			console.log(dateX)
			const dateY = new Date (this.getDeadline(y) + ' PST')
			return dateX-dateY
		})
		.forEach(li => this.tasklist.appendChild(li))
	}
	/*
	Sorts list in descending order by
	deadline
	*/
	sortByDeadlineDescending(){
		if(this.totalTasks === null) {
			return
		}

		Array.from(this.totalTasks)
		.sort((x,y) => {
			const dateX = new Date (this.getDeadline(x) + ' PST')
			console.log(this.getDeadline(x))
			const dateY = new Date (this.getDeadline(y) + ' PST')
			
			return dateY-dateX
		})
		.forEach(li => this.tasklist.appendChild(li))		
	}
	sortByName(){
		Array.from(this.totalTasks)
		.sort((x,y) =>{
			const name1= this.getContent(x)
			const name2 = this.getContent(y)
			return name1.localeCompare(name2)
		})
		.forEach(li => this.tasklist.appendChild(li))
		
	}
	filterByDate(date){
		if(this.totalTasks ===null || date.value ===''){
			return
		}
		this.totalTasks.forEach(e=> {
			const day = this.createDate(date.value)
			const deadline = this.createDate(this.getDeadline(e))
			console.log(e)
			if(e.classList.contains('hidden') && deadline === day){
				e.classList.remove('hidden')
			}
			else if(day != deadline){
				e.classList.add('hidden')
			}
		})
        date.value = ''
	}
	filterReset(){
		this.totalTasks.forEach(e=> {
			if(e.classList.contains('hidden')){
				e.classList.remove('hidden')
			}
		})
	}
}
// Button Declaration
const addToDoBtn= document.querySelector('[data-submit]')
const filterDeadlineAscendingBtn = document.querySelector('[data-filter-deadline-ascending]')
const filterDeadlineDescendingBtn = document.querySelector('[data-filter-deadline-descending]')
const filterNameBtn = document.querySelector('[data-filter-name]')
const filterToggleBtn = document.querySelector('[data-filter-toggle]')
const filterTasksByDayInput = document.querySelector('[data-filter-tasks-day]')
const filterTasksByDayBtn = document.querySelector('[data-filter-tasks-day-apply]')
const filterTasksResetBtn = document.querySelector('[data-filter-tasks-day-reset]')
const taskList = document.querySelector('[data-task-list]')


const todo = new Todo(taskList)
// Event Listeners

//Add using "ADD TODO" button
addToDoBtn.addEventListener('click',() =>{
    const content = document.querySelector('[data-new-task-content]')
	const deadline = document.querySelector('[data-new-task-deadline]')
	todo.addTodo(content,deadline);
})
//Filter Deadline by Ascending order using btn
filterDeadlineAscendingBtn.addEventListener('click', () =>{
	todo.sortByDeadlineAscending()
})
//Filter Deadline by descending order using btn
filterDeadlineDescendingBtn.addEventListener('click', () => {
	todo.sortByDeadlineDescending()
})
//Filter list by name order using btn
filterNameBtn.addEventListener('click', () => {
	todo.sortByName()
})
//Show/Hide Completed tasks
filterToggleBtn.addEventListener('click', ()=> {
	todo.filterCompletedTasks()
})
//Show only tasks from given day
filterTasksByDayBtn.addEventListener('click', ()=>{
	const date = document.querySelector('[data-filter-tasks-day]')
	todo.filterByDate(date)
})

filterTasksResetBtn.addEventListener('click', ()=>{
	todo.filterReset()
})
