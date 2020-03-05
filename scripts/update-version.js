const fs = require('fs');

fs.writeFile(
  './build/version.json',
  JSON.stringify({
    ui: process.env.CI_COMMIT_REF_NAME || null,
  }),
  () => {}
);
