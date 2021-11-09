# After setup, STOP. You're using an existing application, so make sure to read the code and ensure what the application does.

## Some questions you may want to ask yourself:
* How does the app retrieve a list of Pokemon?
axios.get on line 16
`{ apiResponse.data.results }`

* How many Pokemon does the API call retrieve? Why that many?
  * API response returns 20 objects.
from [docs](https://pokeapi.co/docs/v2#resource-listspagination-section)
"Resource Lists/Pagination (group)
Calling any API endpoint without a resource ID or name will return a paginated list of available resources for that API. By default, a list "page" will contain up to 20 resources. If you would like to change this just add a 'limit' query parameter to the GET request, e.g. ?=60. You can use 'offset' to move to the next page, e.g. ?limit=60&offset=60."
* What are the routes defined in the application?
  * both routes are for the index, or the home route, one for the get method and one for the post method

* Think about adding a Pokemon to your favorites.
  * this will be done through the post route

* How will this data be submitted?
  * will need to use sequelize to create and save favorties to table. A model will be able to take data from the api object and manp it onto the db.
* What will you have to do to save this data to a database?
  * I will need to create a model
* What will you have to do to display favorite Pokemon?
   * should create a `.get('/favs',   )` route through which to access the favorites db, something aking to `db.favorite.findAll()`. 
 Need to use the command line to create a model for the favorites.