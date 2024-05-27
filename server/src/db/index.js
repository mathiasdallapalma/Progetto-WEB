// https://node-postgres.com/guides/async-express

import pg from 'pg'
const { Pool } = pg
 
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    port: '5432',
    max: 20,
    database: 'mydb',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
 
export const query = (text, params) => pool.query(text, params)



//  - Acqua Mutaforma uwu