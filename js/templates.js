var AppTemp = function () {
  
};

AppTemp.prototype = {
  todoData: function (text) {
    return {
      name: text,
      completed: false
    };
  },
  
  renderTodo: function (todos, parent) {
    todos.forEach(function (todo) {
      var li = document.createElement('li');
      li.setAttribute('data-id', todo.id);

      var text = document.createElement('span');
      text.textContent = todo.name;

      var input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.checked = todo.completed;
      input.setAttribute('data-id', todo.id);
      input.classList.add('toggle');
      if (input.checked) {
        li.classList.add('complete');
      }

      var deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.setAttribute('data-id', todo.id);

      li.append(input, text, deleteBtn);
      parent.append(li);
    });
  },

  itemCounter: function (items) {
    var activeTodos = items.filter(function (item) {
      return !item.completed;
    }).length;
    var plural = activeTodos === 1 ? '' : 's';

    return activeTodos + ' item' + plural + ' left';
  }
};