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
    > **RESPONSE:**  API status response

<br />

- ` /api/items`\
    Gets items currently present in database
    > **RESPONSE:**  JSON Object

<br />

- ` /api/items/:id` \
    Gets items currently present in database by item ID number

    ATTRIBUTE | DESCRIPTION
    --------- | -----------
    id | Int: a specific number for item id    
    
      **REQUEST URL:**

      Example of a sample URl request:
      "http://35.209.74.28:8080/api/items/3001"


    > **RESPONSE:**  JSON Object

    {
        "status": "Success",
        "data": {
            "item_id": 3001,
            "item_name": "Widgets",
            "item_quantity": 10,
            "item_price": 35.5,
            "item_supplier_id": "50004"
        }
    }

### POST

- ` /api/items`\
    Add a new item to the database
    

    ATTRIBUTE | DESCRIPTION
    --------- | -----------
    name | String: a line of text for the item name 
    stockQuantity | INT: a number describing the stock count of the item 
    price | DOUBLE: a number describing the price of the item 
    supplierId | INT: a number for the Id of the supplier

    > **REQUEST BODY:** JSON Object with required attributes:

    Example of a sample JSON body request:
    ``````
    {
        "name" : "test",
        "stockQuantity" : 8,
        "price" : 9.80,
        "supplierId" : 5010
    }
    ``````
    > **RESPONSE:**  JSON Object

    Example of sucess response:
    `````````
    {
        "status": "Success",
        "data": {
            "_name": "test",
            "_stockQuantity": "8",
            "_price": "9.8",
            "_supplierId": "5010"
        }
    }
    `````````

<br />

### PATCH

- ` /api/items/:id`\
    Change an attribute of an item using it's Id in the database, like stockQuantity for example
    

    ATTRIBUTE | DESCRIPTION
    --------- | -----------
    Name Of Attribute | New value for that attribute
    

    > **REQUEST BODY:** JSON Object with new attributes:
     
    Example of a sample JSON body request:
    ``````
    {
        "stockQuantity" : 10
    }
    ``````
    > **RESPONSE:**  JSON Object

    Example of sucess response:
    `````````
    {
        "status": "Success",
        "data": {
            "_stockQuantity": "10",
        }
    }
    `````````

<br />

### DELETE

- ` /api/items/:id` \
    Deletes the item from the database using the item id
    > **RESPONSE:**  JSON Object


