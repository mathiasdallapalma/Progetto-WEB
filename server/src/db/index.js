// https://node-postgres.com/guides/async-express

import pg from 'pg'
const { Pool } = pg
 
const agentPool = new Pool({
    host: 'localhost',
    //user: 'postgres',
    //password: 'password',
    port: '5432',
    max: 20,
    database: 'postgres',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })

const userPool = new Pool({
    host: 'localhost',
    database: 'auth',
    port: '5432',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const db = {
  queryAgents: (text, params) => agentPool.query(text, params),
  queryUsers: (text, params) => userPool.query(text, params),
  closePools: async () => {
    await agentPool.end();
    await userPool.end();
  },
};

//export const query = (text, params) => pool.query(text, params)

export default db



//  - Acqua Mutaforma uwu