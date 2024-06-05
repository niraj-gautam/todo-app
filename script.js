let todoCount = 0;
let todoDone = 0;
let todoItemList = [];
let completedItemsCount = [];

let secondaryTextDisp = document.getElementById("secondary-text");
let todoCountDisp = document.getElementById("todo-count");
let todoInputText = document.getElementById("todo-input");
let createTodoBtn = document.getElementById("create-btn");
let todoListDisp = document.getElementById("todo-list");
let itemCheckBtn = document.getElementById(`item${todoCount}-check-btn`);
let editBtn = document.getElementById(`item${todoCount}-edit-btn`);
let deleteBtn = document.getElementById(`item${todoCount}-delete-btn`);
let itemName = document.getElementById(`item${todoCount}-name`);

if (localStorage.length > 1) {
    completedItemsCount = localStorage.getItem("todo(s)-done").split(",");
    if (completedItemsCount.includes("1")) {
        todoDone = completedItemsCount.filter((item) => item == "1").length;
    }
    for (let i = 0; i < localStorage.length - 1; i++) {
        todoItemList.push(localStorage.getItem(`${i}`));
    }
    for (let i = 0; i < todoItemList.length; i++) {
        todoCount++;
        todoListDisp.innerHTML += `<div class="todo-items" id="todo-items-${todoCount}">
    <div class="items" id="item${todoCount}">
        <div
             id="item${todoCount}-check-btn"
            class="item-check ${
                completedItemsCount[i] == "0"
                    ? "item-unchecked"
                    : "item-checked"
            }"
            title="Mark as done" onclick="markDone('${todoCount}', '${
            todoItemList[i]
        }')"
        ></div>
        <label for="item" class="item-name ${
            completedItemsCount[i] == "0" ? "" : "item-name-checked"
        }" id="item${todoCount}-name"
            >${todoItemList[i]}</label
        >
    </div>
    <div class="modify-btns">
        <button class="edit-btn" id="item${todoCount}-edit-btn" title="Edit" onclick="editTodo(${todoCount}, '${
            todoItemList[i]
        }')">
            <img
                src="assets/edit-button.svg"
                alt="edit-button"
            />
        </button>
        <button
            class="delete-btn"
            id="item${todoCount}-delete-btn"
            title="Delete" onclick="deleteTodo(${todoCount}, '${
            todoItemList[i]
        }')"
        >
            <img src="assets/trash.svg" alt="delete-button" />
        </button>
    </div>
</div>`;
    }

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;

    if (todoItemList.length == 0) {
        secondaryTextDisp.textContent = "Create a Todo";
    } else if (todoDone == 0) {
        secondaryTextDisp.textContent = "Finish the todo";
    } else {
        secondaryTextDisp.textContent = "Keep it up";
    }
}

createTodo = () => {
    if (
        todoInputText.value != "" &&
        todoInputText.value.length > 3 &&
        !todoItemList.includes(todoInputText.value)
    ) {
        todoCount++;
        todoItemList.push(todoInputText.value);
        completedItemsCount.push("0");

        localStorage.setItem(
            todoItemList.indexOf(todoInputText.value),
            todoItemList[todoItemList.indexOf(todoInputText.value)]
        );
        localStorage.setItem("todo(s)-done", completedItemsCount.join(","));

        todoListDisp.innerHTML += `<div class="todo-items" id="todo-items-${todoCount}">
    <div class="items" id="item${todoCount}">
        <div
             id="item${todoCount}-check-btn"
            class="item-check item-unchecked"
            title="Mark as done" onclick="markDone('${todoCount}', '${todoInputText.value}')"
        ></div>
        <label for="item" class="item-name" id="item${todoCount}-name"
            >${todoInputText.value}</label
        >
    </div>
    <div class="modify-btns">
        <button class="edit-btn" id="item${todoCount}-edit-btn" title="Edit" onclick="editTodo(${todoCount}, '${todoInputText.value}')">
            <img
                src="assets/edit-button.svg"
                alt="edit-button"
            />
        </button>
        <button
            class="delete-btn"
            id="item${todoCount}-delete-btn"
            title="Delete" onclick="deleteTodo(${todoCount}, '${todoInputText.value}')"
        >
            <img src="assets/trash.svg" alt="delete-button" />
        </button>
    </div>
</div>`;
        todoInputText.value = "";
    }

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
    secondaryTextDisp.textContent =
        todoItemList.length == 0 ? "Create a Todo" : "Finish the todo";
};

markDone = (todoNumber, todoItemName) => {
    const itemClassList = document.querySelector(
        `#item${todoNumber} #item${todoNumber}-check-btn`
    ).classList;

    const itemNameClassList = document.querySelector(
        `#item${todoNumber} #item${todoNumber}-name`
    ).classList;

    if (itemClassList.contains("item-unchecked")) {
        itemClassList.remove("item-unchecked");
        itemClassList.add("item-checked");
        todoDone++;
        completedItemsCount[todoItemList.indexOf(todoItemName)] = "1";
    } else {
        itemClassList.remove("item-checked");
        itemClassList.add("item-unchecked");
        todoDone--;
        completedItemsCount[todoItemList.indexOf(todoItemName)] = "0";
    }

    localStorage.setItem("todo(s)-done", completedItemsCount.join(","));

    itemNameClassList.toggle("item-name-checked");

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
    secondaryTextDisp.textContent =
        todoDone == 0 ? "Finish the todo" : "Keep it up";
};

editTodo = (todoNumber, todoItemName) => {
    if (
        document
            .getElementById(`item${todoNumber}-check-btn`)
            .classList.contains("item-checked")
    ) {
        todoDone--;
    }
    completedItemsCount.splice(todoItemList.indexOf(todoItemName), 1);
    localStorage.setItem("todo(s)-done", completedItemsCount.join(","));

    let todoItem = document.getElementById(`todo-items-${todoNumber}`);
    todoListDisp.removeChild(todoItem);

    if (todoItemList.length == 0) {
        secondaryTextDisp.textContent = "Create a Todo";
    } else if (todoDone == 0) {
        secondaryTextDisp.textContent = "Finish the todo";
    } else {
        secondaryTextDisp.textContent = "Keep it up";
    }

    todoInputText.value = todoItemList[todoItemList.indexOf(todoItemName)];
    todoInputText.focus();

    localStorage.removeItem(`${todoItemList.indexOf(todoItemName)}`);
    todoItemList.splice(todoItemList.indexOf(todoItemName), 1);
    todoItemList.forEach((item) => {
        localStorage.setItem(
            todoItemList.indexOf(item),
            todoItemList[todoItemList.indexOf(item)]
        );
        localStorage.removeItem(todoItemList.length);
    });

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
};

deleteTodo = (todoNumber, todoItemName) => {
    if (
        document
            .getElementById(`item${todoNumber}-check-btn`)
            .classList.contains("item-checked")
    ) {
        todoDone--;
    }
    completedItemsCount.splice(todoItemList.indexOf(todoItemName), 1);
    localStorage.setItem("todo(s)-done", completedItemsCount.join(","));

    let todoItem = document.getElementById(`todo-items-${todoNumber}`);
    todoListDisp.removeChild(todoItem);

    localStorage.removeItem(`${todoItemList.indexOf(todoItemName)}`);
    todoItemList.splice(todoItemList.indexOf(todoItemName), 1);

    todoItemList.forEach((item) => {
        localStorage.setItem(
            todoItemList.indexOf(item),
            todoItemList[todoItemList.indexOf(item)]
        );
        localStorage.removeItem(todoItemList.length);
    });

    if (todoItemList.length == 0) {
        secondaryTextDisp.textContent = "Create a Todo";
        localStorage.removeItem("todo(s)-done");
    } else if (todoDone == 0) {
        secondaryTextDisp.textContent = "Finish the todo";
    } else {
        secondaryTextDisp.textContent = "Keep it up";
    }

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
};
