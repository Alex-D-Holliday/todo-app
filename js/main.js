var appStore = new AppStore('data');
var appModel = new AppModel(appStore);
var appView = new AppView();
var appController = new AppController(appModel, appView);
appController.init();