var AppTemp = function () {
  this.defaultTemplate
    = '<li data-id="idTemp" class="isCompleted">'
    + '<div class="view">'
    + '<input class="toggle" type="checkbox" isChecked>'
    + '<label>titleTemp</label>'
    + '<button class="destroy"></button>'
    + '</div>'
    + '</li>';
};

AppTemp.prototype = {
  renderTodoItem: function (data) {
    var i, l;
    var view = '';

    for (i = 0, l = data.length; i < l; i++) {
      var template = this.defaultTemplate;
      var completed = '';
      var checked = '';

      if (data[i].completed) {
        completed = 'completed';
        checked = 'checked';
      }

      template = template.replace('idTemp', data[i].id);
      template = template.replace('titleTemp', data[i].title);
      template = template.replace('isCompleted', completed);
      template = template.replace('isChecked', checked);

      view = view + template;
    }

    return view;
  },

  itemCounter: function (activeTodos) {
    var plural = activeTodos === 1 ? '' : 's';

    return '<strong>' + activeTodos + '</strong> item' + plural + ' left';
  },

  clearCompletedButton: function (completedTodos) {
    if (completedTodos > 0) {
      return 'Clear completed';
    }
    return '';
  }
};