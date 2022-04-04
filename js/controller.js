var AppController = function (model, view) {
  this.model = model;
  this.view = view;
  this.init();
};

AppController.prototype = {
  addItem: function (title) {
    if (title.trim() === '') {
      return;
    }

    this.model.createTodo(title, function () {
      this.view.render('clearNewTodo');
    });
  },

  setupHandlers: function () {
    this.addToDo.addEventListener('change', function () {
      this.addItem(this.addToDo.value);
    }.bind(this));

  },

  init: function () {
    this.setupHandlers();
  }
}