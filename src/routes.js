
const { query } = require("express");

module.exports.register = (app, database) => {
  //base call, shows the api works
  app.get("/", async (req, res) => {
    try {
      res.status(200).send("The API is connected properly! ").end();
    } catch (error) {
      res.status(error?.status).send({
        tried: "Base call",
        status: `FAILED`,
        error: error?.message || error,
        message: "Not properly connected to the API",
        detail: "Ensure you are correctly connected to the API",
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
  
  // will be able to delete an item in the database
  app.delete("/api/items/delete/:id", async (req, res) => {
    let itemID = req.params.id
    let success = false;

    if(!isNaN(itemID)) {

      database.query(`DELETE FROM items WHERE item_id = ?`, [itemID], (errors, results, fields) => {

        if(errors != null){
          if(errors.code == 'ETIMEDOUT') {
            res.status(500).send({
              tried: "Deleting Item",
              success: success,
              message: "Unable to connect to API. Please make sure server is running."
            }).end();
            return;
          }
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
  //retrieves a specific item with an id or add
  app.get("/api/items/:identifier" , async (req, res) => {
    
    let query = ""; 
    let _identifier = req.params.identifier;
    let items; 
    let _status = 500;

    if(isNaN(_identifier)){
      query = database.query("SELECT * FROM items WHERE item_name =?", [_identifier]);
    }else{
      query = database.query("SELECT * FROM items WHERE item_id =?", [_identifier]);
    }

    try {
         items = await query;
        
        if(items.length != 0) {
          res.status(200).send(JSON.stringify(items)).end()
        }else{
           _status = 400; 
           throw error  
        }
      
        
    } catch (error) {
      if(_status === 400){
        res
        .status(_status)
        .send({
            tried: 'The API will retrieve an item from the database by either name or id!', 
            status: "FAILED", 
            error: error?.message || error,
            message: 'The id or name entered in is either mis-formatted or incorrect' ,
            detail: 'Ensure you are including a correct id or name that exists'
          });
      }else if(_status === 500){
        res
      .status(_status)
      .send({
          tried: 'The API will retrieve an item from the database by either name or id!', 
          status: `FAILED`, 
          error: error?.message || error,
          message: 'Not properly connected to the API' ,
          detail: 'Ensure you are correctly connected to the API'
        });
      }
    }
  
  }
      
      
  );

  //Adds a new item to the Item table in the database
  app.post("/api/items", async (req, res) => {
    let _name = req.body.name;
    let _stockQuantity = req.body.stockQuantity;
    let _price = req.body.price;
    let _supplierId = req.body.supplierId;
    let _id = req.body.id;
    let _status = "";

    if (
      typeof _name === "undefined" ||
      typeof _stockQuantity === "undefined" ||
      typeof _price === "undefined" ||
      typeof _supplierId === "undefined" ||
      typeof _id === "undefined"
    ) {
      _status = "Unsuccess";
    } else {
      try {
        database.query(
          "insert into items(item_id, item_name, item_quantity,item_price, item_supplier_id) values (?, ?, ?, ?, ?)",
          [_id, _name, _stockQuantity, _price, _supplierId]
        );
        _status = "Success";
      } catch (error) {
        if (error?.status === 400) {
          res.status(error?.status).send({
            tried: "Adding a new item",
            status: `FAILED`,
            error: error?.message || error,
            message:
              "Information in the body is either mis-formatted or incorrect",
            detail:
              "Ensure you are including the correct information in the body, and in the right order",
          });
        } else if (error?.status === 500) {
          res.status(error?.status).send({
            tried: "Adding a new item",
            status: `FAILED`,
            error: error?.message || error,
            message: "Not properly connected to the API",
            detail: "Ensure you are correctly connected to the API",
          });
        }
      }

      let messsage =
        '{"status":"' +
        _status +
        '", "data":{"_name":"' +
        _name +
        '","_stockQuantity":"' +
        _stockQuantity +
        '","_price":"' +
        _price +
        '", "_supplierId":"' +
        _supplierId +
        '"}}';
      const obj_messsage = JSON.parse(messsage);
      res.status(200).send(obj_messsage).end();
    }
  });

  // will be able to change the quantity in the database
  app.patch("/api/items/:id", async (req, res) => {
    let success = false;
    let itemID = req.params.id;
    let newQuantity = req.body.quantity;
    if (isNaN(itemID) || isNaN(newQuantity)) {
      res.status(400).send({
        tried: "Updating Item Quantity",
        success: success,
        messsage:
          "Could not process request. Please check if the information provided is correct",
      });
    } else {
        database.query(
          "UPDATE items SET item_quantity = ? WHERE item_id = ?",
          [newQuantity, itemID],
          (errors, results, fields) => {
            if (errors != undefined) {
              res.status(500).send({
                tried: "Updating Item Quantity",
                success: success,
                error: errors.message,
                messsage:
                  "Unable to connect to API. Please ensure the server is running",
              }).end();
            }
            console.log(results);
            if (results.affectedRows == 0) {
              res.status(404).send({
                tried: "Updating Item Quantity",
                success: success,
                error: errors,
                messsage: "Item not found. Please add the Item first",
              }).end();
            }
            else {
              res.status(200).send({ success: !success }).end();
            }
          }
        );
      }
  });
  };
