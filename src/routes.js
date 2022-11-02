module.exports.register = (app, database) => {

  //base call, shows the api works
  app.get("/", async (req, res) => {
    res.status(200).send("The API is connected properly! ").end();
  });

  //retrieves all the items in the database.
  app.get("/api/items", async (req, res) => {
    let query;
    query = database.query("SELECT * FROM Items");

    console.log(query);
    const items = await query;

    res.status(200).send(JSON.stringify(items)).end();
  });

  //retrieves a specific item with an id
  app.get("/api/items/:id", async (req, res) => {
    res.status(200).send("The API will retrieve an item from the database by either name or id!").end();
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
      const query = database.query(
        "insert into Items(name, stockQuantity, price, supplierId) values (?, ?, ?, ?)",
        [_name, _stockQuantity, _price, _supplierId]
      );
      const items = await query;
      _status = "Success";
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
  });

  // will be able to change the quantity in the database
  app.patch("/api/items/:itemId", async (req, res) => {
    res.status(200).send("The API will change the quantity of an item in the database by the id!").end();
  });

  // will be able to delete an item in the database
  app.delete("/api/items/:itemId", async (req, res) => {
    res.status(200).send("The API will delete an item in the database by the id!").end();
  });
};