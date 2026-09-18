const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const appSource = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

test('the non-level-up reward message interpolates weapon values', () => {
  assert.match(
    appSource,
    /:`<p>毛筆攻擊 \$\{battle\.weapon\.attack\} · 下一級 \$\{E\.weapon\(r\.after\.level\+1\)\.attack\}<\/p>`/
  );
  assert.doesNotMatch(
    appSource,
    /:'<p>毛筆攻擊 \$\{battle\.weapon\.attack\}/
  );
});
