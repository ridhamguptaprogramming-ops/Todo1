let todos = [];

fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json())
    .then(data => {
        todos = data.slice(0, 20); // limit for display
        renderTodos(todos);
    });

function renderTodos(list) {
    const table = document.getElementById("todoTable");
    table.innerHTML = "";

    list.forEach(todo => {
        const row = document.createElement("tr");
        row.className = todo.completed ? "completed" : "pending";

        row.innerHTML = `
            <td>${todo.id}</td>
            <td>${todo.title}</td>
            <td>${todo.completed ? "Completed" : "Pending"}</td>
            <td>
                <button onclick="toggleStatus(${todo.id})">
                    Change Status
                </button>
            </td>
        `;
        table.appendChild(row);
    });
}

function toggleStatus(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos(todos);
}

function showCompleted() {
    renderTodos(todos.filter(todo => todo.completed));
}

function showPending() {
    renderTodos(todos.filter(todo => !todo.completed));
}

function showAll() {
    renderTodos(todos);
}
