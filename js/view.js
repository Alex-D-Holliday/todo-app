var AppView = function () {
  this.template = new AppTemp();

  this.ENTER_KEY = 13;

  this.toDoList = document.querySelector('.todo-list');
  this.counter = document.querySelector('.todo-count');
  this.clearCompleted = document.querySelector('.clear-completed');
  this.footer = document.querySelector('.footer');
  this.main = document.querySelector('.main');
  this.addToDo = document.querySelector('.add-todo');
  this.toggleAll = document.querySelector('.toggle-all');
};

AppView.prototype = {
  newTodo: function () {

  },

  render: function (rendered, data) {
    var renderView = {
      todos: function () {
        this.toDoList.innerHTML = this.template.renderTodoItem(data);
      },
    };
    renderView[rendered]();
  }
}