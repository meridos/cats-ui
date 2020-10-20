const appUrl =
  process.env.REACT_APP_UI_PROD || process.env.NODE_ENV === 'production'
    ? 'https://meowle.qa-fintech.tcsbank.ru'
    : 'http://localhost:3000';

module.exports = {
  appUrl,
};
