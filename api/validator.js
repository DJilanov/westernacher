/**
 * @validator Used to validate the data from the login form in the admin panel
 */
(function() {
    var config = require('./config').getConfig();
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /**
     * @validateDate it returns boolean for is it correct date or no
     * @date {Date} The user written date
     */
    function validateDate(date) {
        return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
    }
    /**
     * @validateString it returns boolean for is it correct string or no
     * @string {string} The user written string
     */
    function validateString(string) {
        return (typeof string === 'string' || string instanceof String)
    }
    /**
     * @validateEmail it returns boolean for is it correct email or no
     * @email {email} The user written email
     */
    function validateEmail(email) {
        return emailRegex.test(email)
    }

    module.exports = {
        validateDate: validateDate,
        validateEmail: validateEmail,
        validateString: validateString
    };
}());
