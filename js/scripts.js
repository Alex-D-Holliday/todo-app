var addToDo = document.querySelector('.add-todo');
var toDoList = document.querySelector('.todo-list');
var counter = document.querySelector('.todo-count');
var clearCompleted = document.querySelector('.clear-completed');
var footer = document.querySelector('.footer');

var all = document.querySelector('.all');
var active = document.querySelector('.active');
var completed = document.querySelector('.done');
var sort = document.querySelector('.sort');

var selectAll = document.querySelector('.toggle-all');
var selectLabel = document.querySelector('.toggle-label');
var switchIt = false;

var funcCall = 0;

function randomGen(str) {
  if (str === void 0) str = 'qwertyuio';

  return str.split('')
    .sort(function () {
      return Math.random() - 0.5
    })
    .join('') + '_' + Math.floor(Math.random() * 1000);
}

function displayBlock(condition, component) {
  return condition
    ? component.style = 'display: none;'
    : component.style = 'display: block';
}

function toDoCount() {
  var items = newToDo.todo.filter(function (todo) {
    return !todo.completed;
  }).length;
  counter.textContent = items + ' items left';
}

function filter(filter) {
  var active = document.querySelector('.selected');
  var state = document.querySelector('.' + filter);

  active.classList.remove('selected');
  state.classList.add('selected');
}

function sortList() {
  if (funcCall === 0) {
    newToDo.todo = newToDo.todo.sort(function (firstEl, secondEl) {
      return firstEl === secondEl
        ? firstEl - secondEl.date
        : firstEl.name.localeCompare(secondEl.name)
    });
    funcCall++;
  } else {
    newToDo.todo = newToDo.todo.sort(function (firstEl, secondEl) {
      return firstEl === secondEl
        ? secondEl.date - firstEl.date
        : secondEl.name.localeCompare(firstEl.name)
    });
    funcCall = 0;
  }

  localStorage.setItem('data', JSON.stringify(newToDo.todo));
  newToDo.render(toDoList);
}

var Todos = function Todos() {
  this.todo = JSON.parse(localStorage.getItem('data')) || [];
};

Todos.prototype.addTodo = function addTodo() {
  if (addToDo.value.length <= 3) {
    return;
  }
  this.todo = this.todo.concat({
    name: addToDo.value.trim(),
    date: Date.now(),
    completed: false,
    id: randomGen()
  })
};

Todos.prototype.render = function render(parent) {
  toDoList.innerHTML = '';

  this.todo.forEach(function (todo) {
    var li = document.createElement('li');
    li.setAttribute('data-key', todo.id);

    var text = document.createElement('span');
    text.textContent = todo.name;

    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = todo.completed;
    input.setAttribute('data-key', todo.id);
    input.classList.add('toggle');
    if (input.checked) {
      li.classList.add('completed');
    }

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('data-key', todo.id);

    li.append(input, text, deleteBtn);
    parent.append(li);

    var editFunc = function () {
      var editInput = document.createElement('input');
      editInput.classList.add('edit');

      li.replaceChild(editInput, text);
      editInput.value = todo.name;
      editInput.focus();

      var applyEdit = function (event) {
        console.log(event)
        if (event.keyCode === 13) {
          todo.name = editInput.value.trim();
          localStorage.setItem('data', JSON.stringify(newToDo.todo));
          editInput.removeEventListener('blur', applyEdit);
          newToDo.render(toDoList);
        } else if (event.type === 'blur') {
          todo.name = editInput.value.trim();
          localStorage.setItem('data', JSON.stringify(newToDo.todo));
          newToDo.render(toDoList);
        }
      }

      editInput.addEventListener('keyup', applyEdit);
      editInput.addEventListener('blur', applyEdit);
    }

    text.addEventListener('dblclick', editFunc);

    var deleteTodo = function (ref) {
      var target = ref.target;

      newToDo.todo = newToDo.todo.filter(function (todo) {
        return target.dataset.key !== todo.id;
      });

      localStorage.setItem('data', JSON.stringify(newToDo.todo));
      newToDo.render(toDoList);
      toDoCount();
    }

    deleteBtn.addEventListener('click', deleteTodo);

    var toggle = function (ref) {
      var target = ref.target;
      console.log(ref);
      newToDo.todo = newToDo.todo.map(function (todo) {
        if (target.dataset.key === todo.id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

      localStorage.setItem('data', JSON.stringify(newToDo.todo));
      newToDo.render(toDoList);
    }

    toDoCount();
    input.addEventListener('click', toggle);

    var items = newToDo.todo.filter(function (todo) {
      return todo.completed;
    }).length;

    displayBlock(!(items > 0), clearCompleted);
  })

  displayBlock(toDoList.innerHTML === '', footer);
  displayBlock(toDoList.innerHTML === '', selectLabel);
};

var newToDo = new Todos;

var enterToDo = function (event) {
  if (event.keyCode === 13) {
    if (event.target.value === '') {
      return;
    } else {
      newToDo.addTodo();
      event.target.value = '';
      localStorage.setItem('data', JSON.stringify(newToDo.todo));
      newToDo.render(toDoList);
    }
  }
  toDoCount();
}

var allFunc = function () {
  filter('all');
  newToDo.render(toDoList);
}

var activeFunc = function () {
  var newToDoActive = new Todos;

  newToDoActive.todo = newToDo.todo.filter(function (todo) {
    return todo.completed === false;
  });

  filter('active');
  newToDoActive.render(toDoList);
}

var completedFunc = function () {
  var newToDoCompleted = new Todos;

  newToDoCompleted.todo = newToDo.todo.filter(function (todo) {
    return todo.completed === true;
  });

  filter('done');
  newToDoCompleted.render(toDoList);
  displayBlock(newToDoCompleted.todo === [], footer);
}

var selectAllFunc = function () {
  if (switchIt === false) {
    newToDo.todo = newToDo.todo.map(function (todo) {
      todo.completed = true;
      return todo;
    });
  } else {
    newToDo.todo = newToDo.todo.map(function (todo) {
      todo.completed = false;
      return todo;
    });
  }

  switchIt = !switchIt;
  localStorage.setItem('data', JSON.stringify(newToDo.todo))
  newToDo.render(toDoList);
}

var clearSelected = function () {
  newToDo.todo = newToDo.todo.filter(function (todo) {
    return !todo.completed;
  });

  localStorage.setItem('data', JSON.stringify(newToDo.todo));
  newToDo.render(toDoList);
}

clearCompleted.addEventListener('click', clearSelected);
sort.addEventListener('click', sortList);

addToDo.addEventListener('keyup', enterToDo);

all.addEventListener('click', allFunc);
active.addEventListener('click', activeFunc);
completed.addEventListener('click', completedFunc);

selectAll.addEventListener('click', selectAllFunc);
newToDo.render(toDoList);