/**
 * @validator Used to validate the data from the login form in the admin panel
 */
(function() {
    var config = require('./config').getConfig();
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /**
     * @validate it returns boolean for is the request sended by the admin user
     * @userData {Object} The user login information from the front-end
     */
    function validateDate(date) {
        return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
    }

    function validateString(string) {
        return (typeof string === 'string' || string instanceof String)
    }

    function validateEmail(email) {
        return emailRegex.test(email)
    }

    module.exports = {
        validateDate: validateDate,
        validateEmail: validateEmail,
        validateString: validateString
    };
}());
