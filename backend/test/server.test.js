const test = require('node:test');
const assert = require('node:assert/strict');
const { getDbConfig } = require('../server');

test('getDbConfig uses default values when env is missing', () => {
  const config = getDbConfig({});

  assert.equal(config.host, '10.0.2.134');
  assert.equal(config.database, 'tienda_perritos');
  assert.equal(config.port, 3306);
});

test('getDbConfig reads values from env', () => {
  const config = getDbConfig({
    DB_HOST: 'db',
    DB_USER: 'alumno',
    DB_PASSWORD: 'secret',
    DB_NAME: 'demo',
    DB_PORT: '3307'
  });

  assert.equal(config.host, 'db');
  assert.equal(config.user, 'alumno');
  assert.equal(config.password, 'secret');
  assert.equal(config.database, 'demo');
  assert.equal(config.port, 3307);
});
