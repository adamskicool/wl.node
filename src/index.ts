require('dotenv').config()
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:11002", neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const session = driver.session();

import { initDB } from './neo4j/init';
//initialize database with template data
initDB(session);