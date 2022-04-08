var AppStore = function (key) {
  this.key = key;
  if (!localStorage[key]) {
    localStorage[key] = JSON.stringify([]);
  }
}

AppStore.prototype = {
  save: function (item, callback) {
    var items = JSON.parse(localStorage[this.key]);

    if (item.id) {
      items = items.map(function (x) {
        if (x.id === item.id) {
          for (var prop in item) {
            x[prop] = item[prop];
          }
        }
        return x;
      });
    } else {
      item.id = new Date().getTime();
      items.push(item);
    }

    localStorage[this.key] = JSON.stringify(items);

    callback.call(this, item);
  },

  get: function (id, callback) {
    var items = JSON.parse(localStorage[this.key]);
    var item = items.filter(function (item) {
      return id === item.id;
    });
    callback.call(this, item[0] || {});
  },

  getAll: function (callback) {
    callback.call(this, JSON.parse(localStorage[this.key]));
  },
  
  updateAll: function (list, callback) {
    localStorage[this.key] = JSON.stringify(list);    
    callback.call(this, JSON.parse(localStorage[this.key]));
  },

  remove: function (id, callback) {
    var items = JSON.parse(localStorage[this.key]);

    items = items.filter(function (x) {
      return x.id !== id;
    });

    localStorage[this.key] = JSON.stringify(items);
    callback.call(this, id);
  }
}