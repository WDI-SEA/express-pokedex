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

#### Part 1: Setup Sequelize

Your first step will be adding Sequelize to this project. Refer back to the notes on how to install, initialize, and configure Sequelize, as well as create a database that Sequelize can connect to.

#### Part 2: Create a Pokemon Model

Your second step will involve creating a Sequelize model to store favorite Pokemon. It's recommended that you name this model `pokemon`. It will only store one attribute, the Pokemon's `name`.

Once this model has been created, run the migration for the model and test the model's functionality. This can be done in a separate file. An example:

**dbTest.js**

```js
var db = require('./models');

db.pokemon.create({
  name: 'Pikachu'
}).then(function(newPokemon) {
  console.log(newPokemon.get());
});
```

Be sure to also test querying Pokemon.

#### Part 3: Integrating the model with the app

You'll want to add functionality to the following routes by incorporating the `pokemon` model you created.

* `GET /pokemon`
  * View: `views/pokemon/index.ejs`
  * Purpose: Retrieve all favorited Pokemon and display them on the page (`findAll`)
* `POST /pokemon`
  * View: none (redirect to `/pokemon`)
  * Purpose: Creates a new Pokemon (`create`) and redirects back to `/pokemon`

#### Part 4: Styling

When finished with the above, style the application appropriately with CSS.

##Bonuses

* Add the ability to DELETE Pokemon from the favorites list.
* For each Pokemon on the favorites page, create a show page to display additional information about that Pokemon.
  * You'll need to create an additional route.
  * You can get detailed information about a Pokemon by passing the Pokemon's name to PokeAPI. You can retrieve images, abilities, stats, and moves through the API.
  * Example: http://pokeapi.co/api/v2/pokemon/bulbasaur/
