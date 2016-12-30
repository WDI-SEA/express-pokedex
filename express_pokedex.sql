CREATE DATABASE express_pokedex;
\connect express_pokedex;

DROP TABLE IF EXISTS pokemon CASCADE;

CREATE TABLE pokemon (
  name text
);
