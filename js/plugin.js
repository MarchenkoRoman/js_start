let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let ul = document.querySelector('.list-group');
let form = document.forms['addToDoItem'];
let inputText = form.elements['todoText'];
let notificationAlert = document.querySelector('.notification-alert');


function generateId() {
    let id = '';
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    for (let i = 0; i < 15; i++) {
        let position  = Math.floor(Math.random() * words.length);
        id += words[position];
    }
    return id;
}

function listTemplate(task) {
    let li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';
    li.setAttribute('data-id', task.id);
    let span = document.createElement('span');
    span.textContent = task.text;

    let iDelete = document.createElement('i');
    iDelete.className = 'fas fa-trash delete-item ml-2';

    let iEdit = document.createElement('i');
    iEdit.className = 'fas fa-edit edit-item ml-auto';

    li.appendChild(span);
    li.appendChild(iEdit);
    li.appendChild(iDelete);
    return li;
}

function clearList() {
    ul.innerHTML = '';
}

function generateList(tasksArray) {

    clearList();

    for (let i = 0; i < tasksArray.length; i++) {
        let li = listTemplate(tasksArray[i]);
        ul.appendChild(li);
    }
}

function addList (list) {
    let newTask = {
        id: generateId(),
        text: list
    };
    tasks.push(newTask);
    ul.insertAdjacentElement('beforeend', listTemplate(newTask));
    //Add to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/*function setDeleteEvent() {
    for (let i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', function(e) {
            console.log('click');
        });
    }
}*/

function deleteListItem(id) {

    for (let i  = 0; i < tasks.length; i++) {
        if ( tasks[i].id === id ) {
            tasks.splice(i, 1);
            break;
        }
    }

    //Update to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Task deleted success',
        cssClass: 'alert-danger',
        timeout: 4000
    });
}

function editListItem(id, newValue) {
    for (let i  = 0; i < tasks.length; i++) {
        if ( tasks[i].id === id ) {
            tasks[i].text = newValue;
            break;
        }
    }
    //Update to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    message({
        text: 'Task updated success',
        cssClass: 'alert-success',
        timeout: 4000
    });
}

function message(settings) {
    notificationAlert.classList.add(settings.cssClass);
    notificationAlert.textContent = settings.text;
    notificationAlert.classList.add('show');

    setTimeout(function () {
        notificationAlert.classList.remove('show')
    }, settings.timeout)
}

ul.addEventListener('click',function(e) {
    if (e.target.classList.contains('delete-item') ) {
        let parent = e.target.closest('li');
        let id = parent.dataset.id;
        deleteListItem(id);
        parent.remove();
    } else if (e.target.classList.contains('edit-item') ) {
        e.target.classList.toggle('fa-save');
        let id = e.target.closest('li').dataset.id;
        let span = e.target.closest('li').querySelector('span');


        if (e.target.classList.contains('fa-save')) {
            span.setAttribute('contenteditable', true);
            span.focus();
        } else {
            span.setAttribute('contenteditable', false);
            span.blur;
            editListItem(id, span.textContent);
        }
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if ( !inputText.value ) {
        inputText.classList.add('is-invalid')
    } else {
        inputText.classList.remove('is-invalid');
        addList(inputText.value);
        form.reset();
    }
});

inputText.addEventListener('keyup', function () {
    if (inputText.value) {
        inputText.classList.remove('is-invalid');
    }
});
generateList(tasks);

/*let body = document.body;
let taskWrap = document.querySelector('.tasks-wrap');
let container = document.querySelector('.container');
let listCard = document.querySelector('.list-card');
let cardBody = document.querySelector('.list-card .card-body');
let listGroup = document.querySelector('.list-group');

listGroup.addEventListener('click', function (e) {
    console.log('list-group');
});

cardBody.addEventListener('click', function (e) {
    console.log('list-card card-body');
});

listCard.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    console.log('listCard');
});

container.addEventListener('click', function (e) {
    console.log('container');
});

taskWrap.addEventListener('click', function (e) {
    console.log('tasks-wrap');
});

//Погружение
listGroup.addEventListener('click', function (e) {
    console.log('list-group');
}, true);

cardBody.addEventListener('click', function (e) {
    console.log('list-card card-body');
}, true);

listCard.addEventListener('click', function (e) {
    e.stopImmediatePropagation();
    console.log('listCard');
}, true);

container.addEventListener('click', function (e) {
    console.log('container');
}, true);

taskWrap.addEventListener('click', function (e) {
    console.log('tasks-wrap');
}, true);*/

//console.log(deleteButton);

// let btn = document.querySelector('.clear-btn');
//
// btn.addEventListener("click", function(e) {
//     console.log(e);
// })
// console.dir(btn);