 // Steps on creating tasks
    // 1. Create an array to store tasks
    // 2. Create a function to add tasks to the array
    // 3. Create a function to render tasks
    // 4. Create a function to delete tasks
    // 5. Create a function to clear all tasks



    let tasksArray = [];

    document.getElementById('task-form').addEventListener('submit', function(e){
        e.preventDefault();
        let task = document.getElementById('task-input').value;
        
        addTask(task);
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Load tasks from localStorage
        if (localStorage.getItem('tasksArray')) {
            tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
        } else {
            tasksArray = [];
        }
        renderTasks();
    });
    
    function saveTasks() {
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    }

    function addTask(task) {
        if (task === '') {
            console.log('Please enter a task');
            document.getElementById('task-input').placeholder = 'Please enter a task';
            document.getElementById('task-input').style.borderColor = 'red';
            return;
        } else {
            document.getElementById('task-input').placeholder = 'add task';
            document.getElementById('task-input').style.borderColor = 'black';
            tasksArray.push({ task: task, completed: false });
            renderTasks();
            document.getElementById('task-input').value = '';
        }
   }


    function renderTasks() {
        const tasks = document.getElementById('tasks');
        tasks.innerHTML = '';
        tasksArray.sort((a, b) => a.completed - b.completed);
        tasksArray.forEach(function(taskObj, index) {
            let li = document.createElement('li');
            let checkbox = document.createElement('input');
            let button = document.createElement('button');
            let span = document.createElement('span');
            
            tasks.appendChild(li);

            li.innerHTML = `
                <input type="checkbox" name="task1" id="${index}" ${taskObj.completed ? 'checked' : ''}> 
                <span style="${taskObj.completed ? 'text-decoration: line-through' : ''}">${taskObj.task}</span>
                <button id="${index}">Delete</button>
            `;

            span.addEventListener('click', function() {
                checkbox.click();
            });
        });
        saveTasks();
    }

    // Clear all tasks
    document.getElementById('clear-tasks').addEventListener('click', function(){
        let tasks = document.getElementById('tasks');
        tasks.innerHTML = '';
        tasksArray = [];
        saveTasks();
    });

    
    document.getElementById('tasks').addEventListener('click', function(e) {
        console.log(e);
        if (e.target.tagName === 'BUTTON') {
            let index = e.target.id;
            tasksArray.splice(index, 1);
            renderTasks();
        } else if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            let index = e.target.id;
            tasksArray[index].completed = e.target.checked;
            renderTasks();
        } else if (e.target.tagName === 'SPAN') {
            let index = e.target.previousElementSibling.id;
            tasksArray[index].completed = !tasksArray[index].completed;
            console.log(index);
            renderTasks();
        } else if (e.target.tagName === 'LI') {
            let index = e.target.firstElementChild.id;
            console.log(index);
            tasksArray[index].completed = !tasksArray[index].completed;
            renderTasks();
        }
    });
