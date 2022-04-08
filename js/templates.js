var AppTemp = function () {

};

AppTemp.prototype = {
  todoData: function (text) {
    return {
      name: text,
      completed: false
    };
  },

  editTodo: function (li, text) {
    var editInput = document.createElement('input');
    editInput.classList.add('edit');
    editInput.setAttribute('maxlength', '200');

    li.replaceChild(editInput, text);
    li.lastChild.style.display = 'none';
    li.className += 'editing';

    editInput.value = text.textContent;
    editInput.focus();
    return editInput;
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