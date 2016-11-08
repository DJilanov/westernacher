import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end
 */
export class FetcherService {
    /**
    * @getUsers get all users
    * @return {Promise} http request
    */
    public getUsers() {
        return this.http.get( Config.usersUrl );
    }
    /**
    * @getUsers get specific user
    * @return {Promise} http request
    */
    public getUser(id) {
        let usersUrl = Config.changeUsersUrl.replace('{{id}}', id);
        return this.http.get( usersUrl );
    }
    /**
    * @getUsers create user
    * @return {Promise} http request
    */
    public createUser(body) {
        return this.http.post( Config.usersUrl, body );
    }
    /**
    * @getUsers edit user
    * @return {Promise} http request
    */
    public editUser(body, id) {
        let usersUrl = Config.changeUsersUrl.replace('{{id}}', id);
        return this.http.patch( usersUrl, body );
    }
    /**
    * @getUsers delete user
    * @return {Promise} http request
    */
    public deleteUser(body, id) {
        let usersUrl = Config.changeUsersUrl.replace('{{id}}', id);
        return this.http.delete( usersUrl );
    }

    constructor( private http: Http ) {}
}
