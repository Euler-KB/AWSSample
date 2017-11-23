'use strict';

var port = process.env.PORT || 1337;
var express = require('express');
var bodyparser = require('body-parser');
const Sequelize = require('sequelize');

var app = express();

try {

    const sequelize = new Sequelize('books_db', 'root', 'Tywoon123', {
        host: 'aawkysx9kef8el.ckslkf27xn1r.us-east-2.rds.amazonaws.com',
        port: 3306,
        dialect: 'mysql'
    });

    const Books = sequelize.define('book', {
        title: { type: Sequelize.STRING(128), unique: true, allowNull: false },
        content: Sequelize.TEXT,
        date_created: Sequelize.DATE

    }, {
            freezeTableName: true
        });

    sequelize.sync().then(() => {

        //
        console.log('Database synchronized successfully!');

        //  setup express middleware
        setupMiddleware();

        //  setup routes
        setupRoutes();

        //  start server
        startServer();

    }).catch(err => {
        console.log('Failed connecting to database - ' + err.toString() );
    });

    function setupMiddleware() {
        app.use(bodyparser.json());
    }

    function setupRoutes() {

        app.get('/', (req, res) => {

            Books.findAll().then(books => {
                res.send(books);
            });

        });

        app.post('/', (req, res) => {

            let book = req.body;
            Books.create(book).then(instance => {
                res.status(201)(instance);
            }).catch(err => {
                res.status(400).send(err.toString());
            });


        });
    }

    function startServer() {

        app.listen(port, () => {
            console.log('Application started on port ' + port);
        });

    }

}
catch (ex) {
    console.log('Application failed to start ' + ex.toString());
}