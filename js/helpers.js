var AppHelper = function () {
  this.activeFilter = document.querySelector('.selected');
}

AppHelper.prototype = {
  inputRules: function (text, form) {
    if (text && text.length > 0 && text.length < 3) {
      form.style.background = 'rgba(255,0,0,0.67)';
      return false;
    }
    form.style.background = null;
    return true;
  },

  filterSelect: function (filter) {
    var filterClass = filter.innerHTML.toLowerCase();
    if (filterClass === 'asc' || filterClass === 'desc') {
      return;
    }

    var state = document.querySelector('.' + filterClass);

    this.activeFilter.classList.remove('selected');
    state.classList.add('selected');
    this.activeFilter = state;
  },

  applyFilter: function (filterNode, todoList) {
    var filter = filterNode.innerHTML.toLowerCase();

    switch (filter) {
      case 'all':
        return todoList;
      case 'active':
        return todoList.filter(function (todo) {
          return !todo.completed;
        });
      case 'completed':
        return todoList.filter(function (todo) {
          return todo.completed;
        });
    }
  },

  sortList: function (sortNode, todoList) {
    var sort = sortNode.innerHTML.toLowerCase();

    switch (sort) {
      case 'asc':
        return todoList.sort(function (firstEl, secondEl) {
          return firstEl === secondEl
            ? firstEl.id - secondEl.id
            : firstEl.name.localeCompare(secondEl.name)
        });
      case 'desc':
        return todoList.sort(function (firstEl, secondEl) {
          return firstEl === secondEl
            ? secondEl.id - firstEl.id
            : secondEl.name.localeCompare(firstEl.name)
        });
    }
  },

  editEnd: function (li, text) {
    li.className = li.className.replace('editing', '');
    li.querySelector('.edit').innerHTML = text;
  },

  getItemById: function (element) {
    var li = element.parentNode;
    return parseInt(li.dataset.id, 10);
  },

  getItemDataById: function (id) {
    return document.querySelector('[data-id="' + id + '"]');
  },

  showBarAndToggleAll: function (items, label, toggleAllButton, footer) {
    var total = items.length;
    var completed = items.filter(function (item) {
      return item.completed;
    });
    var value = total ? 'block' : 'none';
    label.style.display = value;
    toggleAllButton.checked = total === completed.length;
    footer.style.display = value;
  },

  showClearCompleted: function (items, clearCompletedButton) {
    clearCompletedButton.style.display = items.filter(function (item) {
      return item.completed;
    }).length ? 'block' : 'none';
  }
}


