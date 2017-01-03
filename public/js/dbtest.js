var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:3000/pokedex'
});

knex.raw(`
  INSERT INTO pokemon(name)
  VALUES (?);
`, ['Pikachu']).then(function(data) {
  console.log(data);
});
