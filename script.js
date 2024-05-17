document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const urgentCheckbox = document.getElementById('urgent');
    const importantCheckbox = document.getElementById('important');

    const taskLists = {
        'important-urgent': document.getElementById('important-urgent'),
        'important-not-urgent': document.getElementById('important-not-urgent'),
        'not-important-urgent': document.getElementById('not-important-urgent'),
        'not-important-not-urgent': document.getElementById('not-important-not-urgent'),
    };

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(task) {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => editTask(task.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        const category = getCategory(task);
        taskLists[category].appendChild(listItem);
    }

    function getCategory(task) {
        if (task.important && task.urgent) return 'important-urgent';
        if (task.important) return 'important-not-urgent';
        if (task.urgent) return 'not-important-urgent';
        return 'not-important-not-urgent';
    }

    form.addEventListener('submit', addTask);
    
    function addTask(event) {
        event.preventDefault();
        const taskName = taskNameInput.value;
        const urgent = urgentCheckbox.checked;
        const important = importantCheckbox.checked;
    
        if (taskName.trim() === '') return;
    
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = { id: Date.now(), name: taskName, urgent, important };
        tasks.push(task);
        saveTasks(tasks);
        addTaskToDOM(task);
    
        form.reset();
        taskNameInput.blur(); // Скрыть клавиатуру после отправки формы
    }


    function editTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        taskNameInput.value = task.name;
        urgentCheckbox.checked = task.urgent;
        importantCheckbox.checked = task.important;

        deleteTask(taskId);
    }

    function deleteTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        saveTasks(updatedTasks);
        refreshTaskLists();
    }

    function refreshTaskLists() {
        Object.values(taskLists).forEach(list => list.innerHTML = '');
        loadTasks();
    }
    function addTaskToDOM(task) {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;

        const editIcon = document.createElement('span');
        editIcon.innerHTML = '&#9998;'; // Значок карандаша для редактирования
        editIcon.classList.add('edit-icon');
        editIcon.addEventListener('click', () => editTask(task.id));

        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&#10006;'; // Значок крестика для удаления
        deleteIcon.classList.add('delete-icon');
        deleteIcon.addEventListener('click', () => deleteTask(task.id));

        listItem.appendChild(editIcon);
        listItem.appendChild(deleteIcon);

        const category = getCategory(task);
        taskLists[category].appendChild(listItem);
    }
    form.addEventListener('submit', addTask);

    function addTask(event) {
        event.preventDefault();
        const taskName = taskNameInput.value;
        const urgent = urgentCheckbox.checked;
        const important = importantCheckbox.checked;

        if (taskName.trim() === '') return;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = { id: Date.now(), name: taskName, urgent, important };
        tasks.push(task);
        saveTasks(tasks);
        addTaskToDOM(task);

        form.reset();
        taskNameInput.blur(); // Скрыть клавиатуру после отправки формы
    }

    form.addEventListener('submit', addTask);
    loadTasks();
});
