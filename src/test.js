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
  
    //Adds a new item to the Item table in the database
    app.post("/api/items", async (req, res) => {
      let _name = req.body.name;
      let _stockQuantity = req.body.stockQuantity;
      let _price = req.body.price;
      let _supplierId = req.body.supplierId;
      let _status = "";
  
      if (
        typeof _name === "undefined" ||
        typeof _stockQuantity === "undefined" ||
        typeof _price === "undefined" ||
        typeof _supplierId === "undefined"
      ) {
        _status = "Unsuccess";
      } else {
        try {
          database.query(
            "insert into items(name, stockQuantity, price, supplierId) values (?, ?, ?, ?)",
            [_name, _stockQuantity, _price, _supplierId]
          );
          _status = "Success";
        } catch (error) {
          if (error?.status === 400) {
            res
            .status(error?.status)
            .send({ 
              tried: 'Adding a new item', 
              status: `FAILED`, 
              error: error?.message || error,
              message: 'Information in the body is either mis-formatted or incorrect' ,
              detail: 'Ensure you are including the correct information in the body, and in the right order'
            });
          } else if (error?.status === 500) {
            res
            .status(error?.status)
            .send({ 
              tried: 'Adding a new item', 
              status: `FAILED`, 
              error: error?.message || error,
              message: 'Not properly connected to the API' ,
              detail: 'Ensure you are correctly connected to the API'
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
  
    
    // will be able to delete an item in the database
    app.delete("/api/items/delete/:id", async (req, res) => {
      let success = false;
      let error = true;
      let itemID = req.params.id
  
      let sql = 'DELETE FROM items WHERE item_id = ' + itemID;
      
      database.query(sql, (error, results, fields) => {
        if(error){
          return console.error(error.message);
        }
        console.log(results);
      });
  
      res.end();
  
      // if(isNaN(itemID)){
      //     res.status(400)
      //        .send({
      //         tried: "Deleting Item",
      //         success: success,
      //         error: error,
      //         message: "Could not process request. Please check if the information is correct."
      //        })
      //        .end();
      // }
  
      // try{
  
      //   database.query('DELETE FROM items WHERE item_id = ?', [itemID]);
  
      // } catch (error) {
      //   switch(error.status){
      //     case 401:
      //       res.status(401)
      //          .send({
      //           tried: "Deleting Item",
      //           success: success,
      //           error: error,
      //           message: "Unauthorized access. Please make sure user has the rights to perform this action."
      //          })
      //          .end()
      //     case 404:
      //       res.status(404)
      //          .send({
      //           tried: "Deleting Item",
      //           success: success,
      //           error: error,
      //           message: "Item not found. Please delete an existing item."
      //          })
      //          .end()
      //     case 500:
      //       res.status(500)
      //          .send({
      //           tried: "Deleting Item",
      //           success: success,
      //           error: error,
      //           message: "Unable to connec to API. Please make sure that the server is running."
      //          })
      //          .end()
      //   }
      // } 
  
      // res.status(200)
      //      .send("The API will delete the selected item in the database by id.")
      //      .end();
  
    });
  };
  