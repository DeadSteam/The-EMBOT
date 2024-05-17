document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const urgentCheckbox = document.getElementById('urgent');
    const importantCheckbox = document.getElementById('important');
    const hiddenInput = document.getElementById('hidden-input'); // Добавленное скрытое поле

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

    function getCategory(task) {
        if (task.important && task.urgent) return 'important-urgent';
        if (task.important) return 'important-not-urgent';
        if (task.urgent) return 'not-important-urgent';
        return 'not-important-not-urgent';
    }

    form.addEventListener('submit', addTask);
    
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
        if (window.innerWidth <= 600) { // Проверяем ширину экрана
            hiddenInput.focus(); // Перемещаем фокус на скрытое поле
        }
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

    // Добавляем обработчик события focus для поля ввода задачи
    taskNameInput.addEventListener('focus', hideKeyboard);

    // Функция для скрытия клавиатуры
    function hideKeyboard() {
        if (window.innerWidth <= 600) { // Проверяем ширину экрана
            taskNameInput.blur(); // Снимаем фокус с поля ввода
        }
    }

    form.addEventListener('submit', addTask);
    loadTasks();
});
