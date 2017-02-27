var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

knex.raw(`
  INSERT INTO pokemon(name)
  VALUES (?);
`, ['Pikachu']).then(function(data) {
  console.log(data);
});