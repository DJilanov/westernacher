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
     * @newUsers <User[]> the new users array
     */
    function setUsers(newUsers) {
        users = newUsers;
    }

    /**
    * @changeUsers it controll how the user must be saved to the cache
    * @users <User> selected user
    * @operation <string> selected operation
    */
    function changeUsers(user, operation) {
        user = {
            "first_name": user.firstName,
            "last_name": user.lastName,
            "email_address": user.emailAddress,
            "date_of_birth": user.dateOfBirth,
            "_id": user.id
        };
        switch(operation) {
            case 'create':
                users.push(user);
            break;
            case 'update':
                users = users.map(function(el) {
                    if(user._id === el._id.toString()) {
                        user._id = el._id;
                        return user;
                    }
                    return el;
                });
            break;
            case 'delete':
                users = users.filter(function(el) {
                    return el._id.toString() !== user._id;
                });
            break;
            default:
                console.log('error occured on caching user: ' + JSON.stringify(user) + ' and operation ' + operation);
            break;
        }
    }

    module.exports = {
        getUsers: getUsers,
        setUsers: setUsers,
        changeUsers: changeUsers
    };
}());
