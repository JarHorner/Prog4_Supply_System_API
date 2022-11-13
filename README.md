# COMP3504_Assign2

COMP3504_Assign2 is nodejs API for basic functionallity recieving, editing and deleting data from a database.

## Installation

Before everything, make sure the database you are using is up and running. The API will not function otherwise.

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

### GET

- ` / `\
    Gets default API call: Displays status of API
    > **RESPONSE:**  API staus response

<br />

- ` /api/items`\
    Gets items currently present in database
    > **RESPONSE:**  JSON Object

<br />

- ` /api/items/:id` \
    Gets items currently present in database by item ID number
    > **RESPONSE:**  JSON Object


### POST

- ` /api/items`\
    Add a new item to the database
    > **REQUEST BODY:** JSON Object with required attributes: 
    `{
    "name" : "test",
    "stockQuantity" : 8,
    "price" : 9.80,
    "supplierId" : 5010
    }`
    > **RESPONSE:**  JSON Object

<br />

<br><br> `POST      /api/items` <br><br>

Creates an item from the database by posting a JSON body containing the name, stockQuantity, price and supplierId.

<br><br> `PATCH      /api/items/:id` <br><br>

Retrieves a certain item from the database by its id, and changes the stockQuantity by the amount in the given JSON body.

<br><br> `DELETE      /api/items/:id` <br><br>

Removes an item from the database by its id.
