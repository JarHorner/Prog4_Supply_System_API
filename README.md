# COMP3504_Assign2

COMP3504_Assign2 is nodejs API for basic functionallity recieving, editing and deleting data from a database.

## Installation

- Open terminal in vscode and make sure you are in the react file path
> .........../ ...../COMP3504_Assign2

- Install the dependancies
`npm install`

- ensure the .env file has the correct properties to be able to connect to the proper database. 
> Open .env in vscode to change

- Once all dependancies are installed and .env file is proper, run the API to test
`npm start`

-if running on your own machine, go to `http://localhost:8080/` and you should see it working. 
if not, make sure to check if the database is running or the .env file has the proper information.

## Documentation

Here are all the calls you can make using this API:

<br> `GET     /` <br><br>

Confirms a connection is made with the API.

<br><br> `GET      /api/items` <br><br>

Retrieves all the items in the database.

<br><br> `GET      /api/items/:id` <br><br>

Retrieves a certain item from the database by its id.

<br><br> `POST      /api/items` <br><br>

Creates an item from the database by posting a JSON body containing the name, stockQuantity, price and supplierId.

<br><br> `PATCH      /api/items/:id` <br><br>

Retrieves a certain item from the database by its id, and changes the stockQuantity by the amount in the given JSON body.

<br><br> `DELETE      /api/items/:id` <br><br>

Removes an item from the database by its id.
