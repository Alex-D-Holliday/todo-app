var AppModel = function (storage) {
  this.data = storage;
}

AppModel.prototype = {
  createTodo: function (todoText, callback) {
    todoText = todoText || '';
    callback = callback || function () {};

    var addTodo = {
      title: todoText.trim(),
      completed: false
    };
    this.data.save(addTodo, callback);
  },

  getTodos: function () {
  },

  getCount: function () {
  },

  updateTodo: function (todo) {
  },

  removeTodo: function (todo) {
  },

  removeAllTodos: function () {
  }
}