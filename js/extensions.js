var AppExtensions = function () {
  this.filters = document.querySelector('.filters');
  this.activeFilter = document.querySelector('.selected');
  this.exEventListeners();
}

AppExtensions.prototype = {
  editStart: function () {

  },

  renderByFilter: function (event) {
    var filter = event.target;
    
    this.filterSelect(filter);
    //this.renderList(this.helpers.activeFilter);
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
  

  exEventListeners: function(){
    this.filters.addEventListener('click', this.renderByFilter.bind(this));
  }
}