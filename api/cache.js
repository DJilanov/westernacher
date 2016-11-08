/**
 * @cache Used to cache the data from the db for faster and easier workflow
 * It wont work corretly with multiple apps. If we want multiple apps for
 * back-end we wont be able to cache the info for skiping database calls
 */
(function() {
    var users = [];
    /**
     * @getProducts it returns all of the users that are currently cached
     */
    function getUsers() {
        return users;
    }
    /**
     * @setUsers it sets users to the cache
     */
    function setUsers(newUsers) {
        users = newUsers;
    }

    module.exports = {
        getUsers: getUsers,
        setUsers: setUsers
    };
}());
