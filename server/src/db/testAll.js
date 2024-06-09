import db from './index.js';

async function testConnections() {
  try {
    // Test della connessione al database degli agenti
    const agentResult = await db.queryAgents('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    console.log('Tables in agents_db:', agentResult.rows);

    // Test della connessione al database degli utenti
    const userResult = await db.queryUsers('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    console.log('Tables in users_db:', userResult.rows);

    // Selezione di tutti gli agenti dal database degli agenti
    const agents = await db.queryAgents('SELECT * FROM "AGENTS"');
    console.log('Agents:', agents.rows);

    // Selezione di tutti gli utenti dal database degli utenti
    const users = await db.queryUsers('SELECT * FROM "users"');
    console.log('Users:', users.rows);

    // Selezione degli ordini di un customer
    const orders = await db.queryAgents('SELECT * FROM "ORDERS" WHERE "CUST_CODE" = $1', ['C00007']);
    console.log('Orders:', orders.rows);

    const agent = await db.queryAgents('SELECT * FROM "AGENTS" WHERE "AGENT_CODE" = $1', ['A010']);
    console.log('agente:', agent.rows[0])

    const customer = await db.queryAgents('SELECT * FROM "CUSTOMER" WHERE "CUST_CODE" = $1', ['C00019']);
    console.log('cliente:', customer.rows[0])
  } catch (error) {
    console.error('Error testing connections:', error);
  } finally {
    // Chiudi i pool di connessione
    await db.closePools();
  }
}

testConnections();