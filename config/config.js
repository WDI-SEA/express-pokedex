export default{
  "development": {
    "username": process.env.user,
    "password": process.env.pass,
    "database": process.env.db_name,
    "host": process.env.hostname,
    "dialect": "postgres",
    "operatorsAliases": false
  }
}
