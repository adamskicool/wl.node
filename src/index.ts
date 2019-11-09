const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://localhost:11002", neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD));
const session = driver.session();

const personName = 'Alice';
const resultPromise = session.run(
  'MATCH (n: Exercise) return n',
  {name: personName}
);

resultPromise.then((result: any) => {
  session.close();
  //here you can do something with the result.

  // on application exit:
  driver.close();
});