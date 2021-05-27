const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'projet_pfe',
  password: 'postgres',
  port: 5432,
})
exports.pool = pool;