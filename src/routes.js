module.exports.register = (app, database) => {
  //base call, shows the api works
  app.get("/", async (req, res) => {
    try {
      res.status(200).send("The API is connected properly! ").end();
    } catch (error) {
      res
        .status(error?.status)
        .send({ 
          tried: 'Base call', 
          status: `FAILED`, 
          error: error?.message || error,
          message: 'Not properly connected to the API' ,
          detail: 'Ensure you are correctly connected to the API'
        });
    }
  });



  //retrieves all the items in the database.
  app.get("/api/items", async (req, res) => {
    let query;
    try {
      query = database.query("SELECT * FROM items");

      console.log(query);
      const items = await query;

      res.status(200).send(JSON.stringify(items)).end();
    } catch (error) {
      res
        .status(error?.status)
        .send({ 
          tried: 'Retrieving all items', 
          status: `FAILED`, 
          error: error?.message || error,
          message: 'Not properly connected to the API' ,
          detail: 'Ensure you are correctly connected to the API'
        });
    }
  });

  //retrieves a specific item with an id
  app.get("/api/items/:id", async (req, res) => {
    res
      .status(200)
      .send(
        "The API will retrieve an item from the database by either name or id!"
      )
      .end();
  });

  
  // will be able to delete an item in the database
  app.delete("/api/items/delete/:id", async (req, res) => {
    let itemID = req.params.id
    let success = false;

    if(!isNaN(itemID)) {
      
      database.query(`DELETE FROM items WHERE item_id = ?`, [itemID], (errors, results, fields) => {
      
        if(errors.code == 'ETIMEDOUT') {
          res.status(500).send({
            tried: "Deleting Item",
            success: success,
            message: "Unable to connect to API. Please make sure server is running."
          }).end();
          return;
        }

        if(results.affectedRows == 0) {
          res.status(404).send({
            tried: "Deleting Item",
            success: success,
            message: "Item does not exist. Please delete an existing item."
          }).end();
          return;
        }
        
        res.status(200).send({ success: !success }).end();
        
      });
    } else {
      res.status(400).send({
        tried: "Deleting Item",
        success: success,
        messsage:
          "Could not process request. Please check if the information provided is correct",
      });
    }

  
  });
};
