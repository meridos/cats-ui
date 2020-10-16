const MainPage = require('./page-objects/main-page');

Feature('Главная старница');

Scenario('Заголовок страницы', ({ I }) => {
  I.amOnPage('/');
  I.see('meowle', MainPage.title);
});

Scenario('Иконка кота', ({ I }) => {
  I.amOnPage('/');
  I.seeAttributesOnElements(MainPage.logo, {
    src: 'https://meowle.qa-fintech.tcsbank.ru/img/cat.png',
  });
});
