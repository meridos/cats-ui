const local = {
  catsApi: 'http://localhost:3003',
  reactionApi: 'http://localhost:3002',
  photosApi: 'http://localhost:3001',
};
const production = {
  catsApi: 'https://meowle.qa-fintech.tcsbank.ru/api/core',
  reactionApi: 'https://meowle.qa-fintech.tcsbank.ru/api/likes',
  photosApi: 'https://meowle.qa-fintech.tcsbank.ru/api/photos',
};

export const urls =
  process.env.REACT_APP_API_PROD || process.env.NODE_ENV === 'production'
    ? production
    : local;
