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


- `/`\
   Gets default API call: Displays status of API
   
      Example of a sample URl request:
      "http://35.209.74.28:8080"
      
      
  > **RESPONSE:** API status response
    
    Example of sucess response:
    `````````
    The API is connected properly!

<br />

- ` /api/items`

   Gets items currently present in database

  >**REQUEST URL:**

      Example of a sample URl request:
      "http://35.209.74.28:8080/api/items"
      
      
  > **RESPONSE:** JSON Object
    
    Example of sucess response:
    `````````
    {
        "status": "Success",
        "data": {
            "item_id": 3001,
            "item_name": "Widgets",
            "item_quantity": 10,
            "item_price": 35.5,
            "item_supplier_id": "50004"
        },
        {
            "item_id": 3002,
            "item_name": "Grommets",
            "item_quantity": 20,
            "item_price": 23.45,
            "item_supplier_id": "50001"
        },
        {
            "item_id": 3003,
            "item_name": "Wedges",
            "item_quantity": 15,
            "item_price": 10.15,
            "item_supplier_id": "50020"
        }........
    }
    `````````

<br />

- ` /api/items/:identifier` \
    Gets items currently present in database by item ID or Name

    ATTRIBUTE | DESCRIPTION
    --------- | -----------
    id | Int: a specific number for item id will be returned    
    name| String: a specific name for item will be returned 

    >**REQUEST URL:**

      Example of a sample URl request:
      "http://35.209.74.28:8080/api/items/3001"
      "http://35.209.74.28:8080/api/items/Bing Bobs"


    > **RESPONSE:**  JSON Object
    
    Example of sucess response:
    `````````
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
    `````````
     `````````
    {
        "status": "Success",
        "data": {
           "item_id": 3007,
          "item_name": "Bing Bobs",
          "item_quantity": 25,
          "item_price": 2.39,
          "item_supplier_id": "50005"
        }
    }
    `````````


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

    
<br />

### DELETE

- ` /api/items/delete/:id` \
    Deletes the item from the database using the item id
    ATTRIBUTE | DESCRIPTION
    --------- | -----------
    item_id   | Item ID of an existing item
    
     Example of sucess response:
    > **REQUEST BODY:** JSON Object with new attributes:
     
    Example of a sample JSON body request:
    ``````
    {
        "item_id" : 3040
    }
    ``````
    > **RESPONSE:**  JSON Object
    

    Example of success response:
    `````````
    {
        "success": True
    }
    `````````

### POST

- ` /api/items`\
   Add a new item to the database

  | ATTRIBUTE     | DESCRIPTION                                          |
  | ------------- | ---------------------------------------------------- |
  | name          | String: a line of text for the item name             |
  | stockQuantity | INT: a number describing the stock count of the item |
  | price         | DOUBLE: a number describing the price of the item    |
  | supplierId    | INT: a number for the Id of the supplier             |

  > **REQUEST BODY:** JSON Object with required attributes:

  Example of a sample JSON body request:

  ```
  {
      "name" : "test",
      "stockQuantity" : 8,
      "price" : 9.80,
      "supplierId" : 5010
  }
  ```

  > **RESPONSE:** JSON Object

  Example of sucess response:

  ```
  {
      "status": "Success",
      "data": {
          "_name": "test",
          "_stockQuantity": "8",
          "_price": "9.8",
          "_supplierId": "5010"
      }
  }
  ```

<br />

### PATCH

- ` /api/items/:id`\
   Change the quantity of an item using it's Id in the database, like quantity for example

  | ATTRIBUTE         | DESCRIPTION                  |
  | ----------------- | ---------------------------- |
  | quantity          | New value                    |

  > **REQUEST BODY:** JSON Object with new attributes:

  Example of a sample JSON body request:

  ```
  {
      "quantity" : 10
  }
  ```

  > **RESPONSE:** JSON Object

  Example of sucess response:

  ```
  {
      "success": "True",
  }
  ```

<br />
