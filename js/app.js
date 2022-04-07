var TodoApp = function (storage) {
  this.storage = new AppStore(storage);
  this.newTodo = new AppTemp();
  this.helpers = new AppHelper();
  this.extensions = new AppExtensions();

  this.ENTER_KEY = 13;

  this.toDoList = document.querySelector('.todo-list');
  this.counter = document.querySelector('.todo-count');
  this.clearCompleted = document.querySelector('.clear-completed');
  this.footer = document.querySelector('.footer');
  this.addToDo = document.querySelector('.add-todo');
  this.selectAll = document.querySelector('.toggle-all');
  this.label = document.querySelector('.toggle-label');

  this.eventListeners();
  this.renderList(this.helpers.activeFilter);
}

TodoApp.prototype = {
  createTodo: function (text) {
    var todo = this.newTodo.todoData(text);

    this.storage.save(todo, function () {
      this.renderList(this.helpers.activeFilter);
    }.bind(this));
  },

  addTodo: function (event) {
    var element = event.target;
    var text = element.value.trim();
    var inputRule = this.helpers.inputRules(text, element);
    if (text && event.keyCode === this.ENTER_KEY && inputRule) {
      this.createTodo(text);
      element.value = '';
    }
    return text;
  },
  
  edit: function() {
      
  },

  removeTodo: function (todoId) {
    this.storage.remove(todoId, function () {
      var li = this.helpers.getItemDataById(todoId);
      this.toDoList.removeChild(li);
      this.renderList(this.helpers.activeFilter);
    }.bind(this));
  },

  deleteTodo: function (event) {
    if (event.target.classList.value !== 'delete-btn') {
      return;
    }
    var element = this.helpers.getItemById(event.target);
    this.removeTodo(element);
  },

  deleteCompleted: function () {
    this.storage.getAll(function (items) {
      items.filter(function (item) {
        return item.completed;
      }).forEach(function (item) {
        this.removeTodo(item.id);
      }.bind(this));
    }.bind(this));
  },

  toggle: function (event) {
    if (event.target.classList.value !== 'toggle') {
      return;
    }
    var id = this.helpers.getItemById(event.target);
    this.toggleSave(id);
    this.renderList(this.helpers.activeFilter);
  },

  toggleAll: function (event) {
    var checked = event.target.checked;

    this.storage.getAll(function (items) {
      items.forEach(function (item) {
        item.completed = checked;
        this.storage.save(item, function () {
        });
      }.bind(this));

      this.renderList(this.helpers.activeFilter);
    }.bind(this));
  },

  toggleSave: function (id) {
    this.storage.get(id, function (item) {
      item.completed = !item.completed;
      this.storage.save(item, function (item) {
        var li = this.helpers.getItemDataById(item.id);
        li.className = item.completed ? 'complete' : '';
      }.bind(this));
    }.bind(this));
  },


  showControls: function () {
    this.storage.getAll(function (items) {
      this.helpers.showBarAndToggleAll(items, this.label, this.selectAll, this.footer);
      this.helpers.showClearCompleted(items, this.clearCompleted);
    }.bind(this));
  },

  renderList: function (filter) {
    this.toDoList.innerHTML = '';
    this.storage.getAll(function (items) {
      this.helpers.loadExtensions('/js/extensions.js', function () {
      }, items);
      this.showControls();
      items = this.helpers.applyFilter(filter, items);
      this.newTodo.renderTodo(items, this.toDoList);
      this.counter.innerHTML = this.newTodo.itemCounter(items);
    }.bind(this));
  },

  eventListeners: function () {
    this.addToDo.addEventListener('keyup', this.addTodo.bind(this));

    this.toDoList.addEventListener('click', this.deleteTodo.bind(this));
    this.toDoList.addEventListener('click', this.toggle.bind(this));

    this.selectAll.addEventListener('click', this.toggleAll.bind(this));

    this.clearCompleted.addEventListener('click', this.deleteCompleted.bind(this));

    //document.addEventListener('change', this.renderList.bind(this.helpers.activeFilter));
    //window.addEventListener('storage', this.renderList.bind(this.helpers.activeFilter));

  }

}
