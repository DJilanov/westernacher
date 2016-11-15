/**
 * @dbFinder Used to search in the db
 */
(function() {
    // we use it for creation of new object ids
    var ObjectId = require('mongodb').ObjectID;
    var mongoose = require('mongoose');
    var config = require('./config').getConfig();
    var validator = require('./validator');
    var cache = null;

    /**
     * @setCache set the cache as local variable
     * @cacheModule {Object} The cache module
     */
    function setCache(cacheModule) {
        cache = cacheModule;
    }

    /**
     * @validateInputs validate all of the inputs that are sended
     * @body {Object} The form data
     */
    function validateInputs(body) {
        // we validate the input
        var isValid = validator.validateString(body.firstName) && validator.validateString(body.lastName)
                        && validator.validateEmail(body.emailAddress) && validator.validateDate(body.dateOfBirth)
        return isValid;
    }

    /**
     * @buildQuery build the search by id query
     * @id {String} The id of the sended user
     */
    function buildQuery(id) {
        var query = {
            "_id": new ObjectId(id)
        };
        return query;
    }

    /**
     * @buildData build the data in the way the db is structure
     * @body {Object} The form data
     * @TODO: Must be splited to different module for a bigger app architecture
     */
    function buildData(body) {
        var data = {
            "first_name": body.firstName,
            "last_name": body.lastName,
            "email_address": body.emailAddress,
            "date_of_birth": body.dateOfBirth
        };
        return data;
    }

    /**
     * @createUser creates new user and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function createUser(req, res) {
        var body = req.body;
        // validate the input
        if(!validateInputs(body)) {
            returnProblem('Wrong input information', res);
            return;
        }
        var query = buildData(body);
        mongoose.connection.db.collection('users', function(err, collection) {
            if(!collection) {
                return;
            }
            // return data about the new user
            collection.insertOne(query, function(err, docs) {
                var response = {
                    id: docs.insertedId.toHexString(),
                    "firstName": body.firstName,
                    "lastName": body.lastName,
                    "emailAddress": body.emailAddress,
                    "dateOfBirth": body.dateOfBirth
                };
                handleCallback(err, res, response, 'create');
            });
        });
    }

    /**
     * @updateUser updates user and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function updateUser(req, res) {
        var body = req.body;
        // validate the input
        if(!validateInputs(body)) {
            returnProblem('Wrong input information', res);
            return;
        }
        var query = buildQuery(body.id);
        var update = buildData(body);
        mongoose.connection.db.collection('users', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.update(query, update, function(err, docs) {
                handleCallback(err, res, body, 'update');
            });
        });
    }

    /**
     * @deleteUser deletes user and send it to the db
     * @req {Object} The query from the front-end
     * @res {Object} The res to the front-end
     */
    function deleteUser(req, res) {
        var id = req.param('id');
        var response = { id: id };
        var query = buildQuery(id);
        console.log(query);
        mongoose.connection.db.collection('users', function(err, collection) {
            if(!collection) {
                return;
            }
            collection.remove(query, function(err, docs) {
                handleCallback(err, res, response, 'delete');
            });
        });
    }

    /**
     * @handleCallback creates new user and send it to the db
     * @err {Object} Error object from the database
     * @res {Object} The res to the front-end
     * @response {Object} The response from the database
     * @operation {Object} Operation we did to the database
     */
    function handleCallback(err, res, response, operation) {
        if(!err) {
            cache.changeUsers(response, operation);
            returnSuccess(res, response);
        } else {
            returnProblem(err, res);
        }
    }

    /**
     * @returnSuccess returns success data to the front-end
     * @res {Object} The res to the front-end
     * @response {Object} The response from the database
     */
    function returnSuccess(res, response) {
        res.json({
            done: true,
            reason: null,
            user: response
        });
    }

    /**
     * @returnProblem Returns the error to the front-end ( when delete non existing user or there is some problem )
     * @err {Object} Error object from the database
     * @res {Object} The res to the front-end
     * @info There were 2 options: return 4** with error body or return 200 with reason. I chouse 200 becouse there is no problem
     *          with the back-end... there is problem with your call.. 4** must be returned if there is problem with the API
     */
    function returnProblem(err, res) {
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
        setCache: setCache,
        connectDb: connectDb,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
}());
