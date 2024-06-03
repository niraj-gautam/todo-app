let todoCount = 0;
let todoDone = 0;
let todoItemList = [];

let secondaryTextDisp = document.getElementById("secondary-text");
let todoCountDisp = document.getElementById("todo-count");
let todoInputText = document.getElementById("todo-input");
let createTodoBtn = document.getElementById("create-btn");
let todoListDisp = document.getElementById("todo-list");
let itemCheckBtn = document.getElementById(`item${todoCount}-check-btn`);
let editBtn = document.getElementById(`item${todoCount}-edit-btn`);
let deleteBtn = document.getElementById(`item${todoCount}-delete-btn`);
let itemName = document.getElementById(`item${todoCount}-name`);

createTodo = () => {
    if (todoInputText.value != "" && todoInputText.value.length > 3) {
        todoCount++;
        todoItemList.push(todoInputText.value);
        console.log(todoItemList);
        todoListDisp.innerHTML += `<div class="todo-items" id="todo-items-${todoCount}">
    <div class="items" id="item${todoCount}">
        <div
             id="item${todoCount}-check-btn"
            class="item-check item-unchecked"
            title="Mark as done" onclick="markDone('${todoCount}')"
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
    }
    console.log(todoItemList.indexOf(todoInputText.value));
    todoInputText.value = "";
    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
    secondaryTextDisp.textContent =
        todoItemList.length == 0 ? "Create a Todo" : "Finish the todo";
};

markDone = (todoNumber) => {
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
    } else {
        itemClassList.remove("item-checked");
        itemClassList.add("item-unchecked");
        todoDone--;
    }
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

    todoItemList.splice(todoItemList.indexOf(todoItemName), 1);

    console.log(document.getElementById(`item${todoNumber}-check-btn`));

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
    console.log(todoItemList);
};

deleteTodo = (todoNumber, todoItemName) => {
    if (
        document
            .getElementById(`item${todoNumber}-check-btn`)
            .classList.contains("item-checked")
    ) {
        todoDone--;
    }

    let todoItem = document.getElementById(`todo-items-${todoNumber}`);
    todoListDisp.removeChild(todoItem);

    if (todoItemList.length == 0) {
        secondaryTextDisp.textContent = "Create a Todo";
    } else if (todoDone == 0) {
        secondaryTextDisp.textContent = "Finish the todo";
    } else {
        secondaryTextDisp.textContent = "Keep it up";
    }

    todoItemList.splice(todoItemList.indexOf(todoItemName), 1);

    todoCountDisp.textContent = `${todoDone}/${todoItemList.length}`;
};
