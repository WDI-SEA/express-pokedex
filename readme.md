# Express Pokedex

Working with databases, especially through ORMs, can present quite a learning curve. We'll start by incorporating one database model into an application to save favorite Pokemon.

#### Backstory: Pokemon

If you're not familiar with Pokemon, Pokemon is a franchise/universe created by Satoshi Tajiri in 1995. It's a famous franchise in both the US and Japan. Fun facts:

* Pokemon is short for "Pocket Monsters"
* The Pokemon universe extends to games, trading cards, and TV
* [The Pokemon Company](https://en.wikipedia.org/wiki/The_Pok%C3%A9mon_Company) is headquartered in Bellevue, WA.

![Pikachu Image](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/English_Pok%C3%A9mon_logo.svg/2000px-English_Pok%C3%A9mon_logo.svg.png)

## Getting Started

We'll be using an existing application that uses the [PokeAPI](http://pokeapi.co/), a Pokemon API that allows us to get a list of Pokemon.

* Fork and clone this repository
* Run `npm install` to install dependencies
  * Use `nodemon` to start the server
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS

#### Read the Code

* After setup, **STOP**. You're using an existing application, so make sure to read the code and ensure what the application does. Some questions you may want to ask yourself:
  * How does the app retrieve a list of Pokemon?
  * How many Pokemon does the API call retrieve? Why that many?
  * What are the routes defined in the application?
  * Try adding a Pokemon to your favorites.
    * How is this data being submitted?
    * What will you have to do to save this data to a database?
    * What will you have to do to display favorite Pokemon?

## User Stories

* As a user, I want to select my favorite Pokemon and add them to a list of favorites.
* As a user, once I add a Pokemon to my list of favorites, I want to be redirected to my favorites page.

## Requirements

#### Part 1: Setup Database

Your first step will be to create a SQL database for your application as well as corresponding setup and seed files. Refer back to the notes as necessary.

#### Part 2: Create a Pokemon Table

Your second step will involve writing a SQL setup file to create a SQL table in your database to store your favorite Pokemon. It's recommended that you name this table `pokemon`. It will only store one attribute, the Pokemon's `name`.

Once you have created the setup file, run the file against your database to create your tables. (This of course, can be done directly in psql/postico if you wish.) Then be sure to test connectivity to and the functionality of your database. This can be done in a separate file. An example:

**dbTest.js**

```js

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

```

Be sure to also test querying against the pokemon table.

#### Part 3: Integrating the database with the app

You'll want to add functionality to the following routes by incorporating the `pokemon` table you created.

* `GET /pokemon`
  * View: `views/pokemon/index.ejs`
  * Purpose: Retrieve all favorited Pokemon and display them on the page
* `POST /pokemon`
  * View: none (redirect to `/pokemon`)
  * Purpose: Creates a new Pokemon and redirects back to `/pokemon`

#### Part 4: Styling

When finished with the above, style the application appropriately with CSS.

## API Limits
You might notice the API doesn't return all the data it has at once. It has a
default limit of 20. That means if it has a list of 150 (or more) Pokemon it
will only return 20 at a time, by default.

<http://pokeapi.co/api/v2/pokemon/>

The API has a way to get around this limit. You can pass a different limit in
the query string. The limit allows you to ask the API to return more than it's
default amount.

Remember, query strings are parameters passed in the URL after a question mark
and seperated with ampersands. They look like this:

```
http://mapwebsite.com/?lat=40.284&long=110.133&zoom=12
```

This is a URL. It consists of four parts:
1. the *protocol* is `http://`
2. the *domain* is `mapwebsite.com`
3. the *path* is `/` (the root path)
4. the *query string* is `?lat=40.284&long=110.133`

The query string is like a JavaScript object. There's keys and values.
This query string has three keys and values:

| Key  | Value   |
| ---  | ---     |
| lat  | 40.284  |
| long | 110.133 |
| zoom | 12  |

The Pokemon API is configured to read all sorts of keys and values from
the query string. Perhaps the most useful one we'll use is `limit`. Specifying
smaller or larger limits tells the server to send back more or less data.

Specify a limit of just one to see the first item in the list:
<http://pokeapi.co/api/v2/pokemon?limit=1>

Specify a limit of 151 to see all 151 pokemon!
<http://pokeapi.co/api/v2/pokemon?limit=151>

## Bonuses

* Add the ability to DELETE Pokemon from the favorites list.
* For each Pokemon on the favorites page, create a show page to display additional information about that Pokemon.
  * You'll need to create an additional route.
  * You can get detailed information about a Pokemon by passing the Pokemon's name to PokeAPI. You can retrieve images, abilities, stats, and moves through the API.
  * Example: http://pokeapi.co/api/v2/pokemon/bulbasaur/

---

## Licensing
1. All content is licensed under a CC-BY-NC-SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
