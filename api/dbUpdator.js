/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    var validator = require('./validator');
    var valueForSearch = null;
    // TODO: USE SCHEMA FOR DATA MODELS!!!

    function validateInputs(body) {
        // we validate the input
        var isValid = validator.validateString(body.firstName) && validator.validateString(body.lastName)
                        && validator.validateEmail(body.emailAddress) && validator.validateDate(body.dateOfBirth)
        return isValid;
    }

    function buildQuery(body) {
        var query = {
            "first_name": body.firstName,
            "last_name": body.lastName,
            "email_address": body.emailAddress,
            "date_of_birth": body.dateOfBirth
        };
        return query;
    }

    function createUser(req, res) {
        var body = req.body;
        // validate the input
        if(!validateInputs(body)) {
            returnProblem('Wrong input information');
            return;
        }
        var query = buildQuery(body);
        mongoose.connection.db.collection('messages', function(err, collection) {
            collection.insertOne(query, handleCallback);
        });
    }

    function updateUser(req, res) {
        var body = req.body;
        // validate the input
        if(!validateInputs(body)) {
            returnProblem('Wrong input information');
            return;
        }
        var query = buildQuery(body);

    }

    function deleteUser(req, res) {
        var body = req.body;
        // validate the input
        if(!validateInputs(body)) {
            returnProblem('Wrong input information');
            return;
        }
        var query = buildQuery(body);

    }

    function handleCallback() {
        if(true) {
            returnSuccess();
        } else {
            returnProblem(err);
        }
    }

    function returnSuccess() {
        res.json({
            done: true,
            reason: null
        });
    }

    /**
     * @returnProblem Returns the error to the front-end ( when delete non existing user or there is some problem )
     * @info There were 2 options: return 4** with error body or return 200 with reason. I chouse 200 becouse there is no problem
     *          with the back-end... there is problem with your call.. 4** must be returned if there is problem with the API
     */
    function returnProblem(err) {
        res.json({
            done: false,
            reason: err
        });
    }

    /**
     * @connectDb Used to make the connection to the Database
     */
    function connectDb() {
       // we cache the product list when we open the back-end for faster working speed
        mongoose.connection.on('connected', function() {
            console.log('[dbConnector]Mongoose default connection open');
            mongoose.connection.db.collection('users', function(err, collection) {
                collection.find().toArray(function(err, users) {
                    cache.setUsers(users);
                });
            });
        });

        // If the connection throws an error
        mongoose.connection.on('error', function(err) {
            console.log('[dbConnector]Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function() {
            console.log('[dbConnector]Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function() {
                console.log('[dbConnector]Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
        // get database
        var dataBaseURL = config.dbAddress.replace('{{user}}', config.dbUser).replace('{{password}}', config.dbPassword);
        mongoose.connect(dataBaseURL);
    }

    module.exports = {
        connectDb: connectDb,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
}());
