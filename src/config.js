const local = {
  catsApi: 'http://localhost:3001',
  reactionApi: 'http://localhost:3001',
};
const production = {
  catsApi: '/api',
  reactionApi: '/api/likes',
};

export const urls = process.env.NODE_ENV === 'production' ? production : local;
