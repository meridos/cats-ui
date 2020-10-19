const MainPage = require('./page-objects/main-page');
const { appUrl } = require('./helpers/urls');

Feature('Главная старница');

Scenario('Заголовок страницы', ({ I }) => {
  I.amOnPage('/');
  I.see('meowle', MainPage.title);
});

Scenario('Иконка кота', ({ I }) => {
  I.amOnPage('/');
  I.seeAttributesOnElements(MainPage.logo, {
    src: `${appUrl}/img/cat.png`,
  });
});
