<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Матрица Эйзенхауэра</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="matrix-container">
        <h1>Матрица Эйзенхауэра</h1>
        <table class="matrix">
            <tr>
                <td class="cell important-urgent">
                    <h4>Важное и срочное</h4>
                    <ul id="important-urgent"></ul>
                </td>
                <td class="cell important-not-urgent">
                    <h4>Важное, но не срочное</h4>
                    <ul id="important-not-urgent"></ul>
                </td>
            </tr>
            <tr>
                <td class="cell not-important-urgent">
                    <h4>Неважное, но срочное</h4>
                    <ul id="not-important-urgent"></ul>
                </td>
                <td class="cell not-important-not-urgent">
                    <h4>Неважное и не срочное</h4>
                    <ul id="not-important-not-urgent"></ul>
                </td>
            </tr>
        </table>
        <form class="task-form" id="task-form">
            <h2>Добавить новую задачу</h2>
            <input type="text" id="task-name" name="task-name" placeholder="Название задачи" required>
            <input type="text" style="opacity: 0; position: absolute; left: -9999px;"> <!-- Скрытое поле -->
            <label>
                <input type="checkbox" id="urgent">
                Срочное
            </label>
            <label>
                <input type="checkbox" id="important">
                Важное
            </label>
            <button type="submit">Добавить</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
