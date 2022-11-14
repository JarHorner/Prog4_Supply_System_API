const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.set('Content-Type', 'application/json');

    next();  
});

//res = database.query("SELECT * FROM items WHERE ID = 3000")
//console.log(res);

const startServer = async _ => {
    const database = require("./src/database");
    let db = await database.setup();

    const route = require('./src/routes');
    route.register(app, db);

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
      console.log('Press Ctrl+C to quit.');
    });
    process.on('unhandledRejection', err => {
      console.error(err);
      throw err;
    });

    return server;
}

startServer();