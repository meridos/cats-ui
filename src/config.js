const local = {
  catsApi: 'http://localhost:6003',
  reactionApi: 'http://localhost:6002',
  photosApi: 'http://localhost:6001',
};
const production = {
  catsApi: '/api/core',
  reactionApi: '/api/likes',
  photosApi: '/api/photos',
};

export const urls = process.env.NODE_ENV === 'production' ? production : local;
