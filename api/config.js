// used as container for the main constants of the back-end
(function() {
    var config = {
        // official db
        dbAddress: 'mongodb://{{user}}:{{password}}@ds147167.mlab.com:47167/westernacher',
        // used for the back-end
        dbUser: 'admin',
        dbPassword: '12321'
    };

    /**
    * @getConfig exporting function of the config object
    */
    function getConfig() {
        return config;
    }

    module.exports = {
        getConfig: getConfig
    };
}());
