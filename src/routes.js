module.exports.register = (app, database) => {

  //base call, shows the api works
  app.get("/", async (req, res) => {
    res.status(200).send("The API is connected properly! ").end();
  });

  //retrieves all the items in the database.
  app.get("/api/items", async (req, res) => {
    res.status(200).send("The API will retrieve all the items from the database!").end();
  });

  //retrieves a specific item with an id
  app.get("/api/items/:id", async (req, res) => {
    res.status(200).send("The API will retrieve an item from the database by either name or id!").end();
  });

  //Adds a new item to the Item table in the database
  app.post("/api/items", async (req, res) => {
    res.status(200).send("The API will add a new item to the database!").end();
  });

  // will be able to change the quantity in the database
  app.patch("/api/items/:itemId", async (req, res) => {
    res.status(200).send("The API will change the quantity of an item in the database by the id!").end();
  });

  // will be able to delete an item by id in the database
  app.delete("/api/items/:itemId", async (req, res) => {
    
    let success = false;
    let itemID = req.body.id;

    if(NaN(itemID)){

      res.status(400)
         .send({
          tried: "Deleting Selected Item",
          success: success,
          error: error,
          message: "Could not process request. Please check if the information provided is correct."
         })

    } else {
      try {

        database.query('DELETE FROM items WHERE item_id = ?')[itemID];

      } catch (error){

        switch(error.status){
          case 404:
            res.status(404)
               .send({
                tried: "Deleting Selected Item",
                success: success,
                error: error,
                message: "Item not found. Please select a valid and existing item."
               })

          case 500:
            res.status(500)
               .send({
                tried: "Deleting Selected Item",
                success: success,
                error: error,
                message: "Unable to connect to API. Please make sure that the server is up and running."
               })
        }
      }
    }

    res.status(200).send("The API will delete an item in the database by the id!").end();

  });

  // will be able to delete an item by name in the database
  app.delete("/api/items/:itemName", async (req, res) => {
    
    let success = false;
    let itemName = req.body.id;

    if(NaN(itemName)){

      res.status(400)
         .send({
          tried: "Deleting Selected Item",
          success: success,
          error: error,
          message: "Could not process request. Please check if the information provided is correct."
         })

    } else {
      try {

        database.query('DELETE FROM items WHERE item_name = ?')[itemName];

      } catch (error){

        switch(error.status){
          case 404:
            res.status(404)
               .send({
                tried: "Deleting Selected Item",
                success: success,
                error: error,
                message: "Item not found. Please select a valid and existing item."
               })

          case 500:
            res.status(500)
               .send({
                tried: "Deleting Selected Item",
                success: success,
                error: error,
                message: "Unable to connect to API. Please make sure that the server is up and running."
               })
        }
      }
    }

    res.status(200).send("The API will delete an item in the database by the id!").end();
    
  });
};
