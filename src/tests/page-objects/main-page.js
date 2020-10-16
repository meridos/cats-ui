class MainPage {
  constructor() {
    this.title = '//*[@data-autotest-id="title"]';
    this.logo = '//*[@data-autotest-id="cat-logo"]';
  }
}

module.exports = new MainPage();
