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
    * @getUser get specific user
    * @return {Promise} http request
    */
    public getUser(id:string) {
        let usersUrl = Config.changeUsersUrl.replace('{{id}}', id);
        return this.http.get( usersUrl );
    }
    /**
    * @createUser create user
    * @return {Promise} http request
    */
    public createUser(body:Array<any>) {
        return this.http.post( Config.usersUrl, body );
    }
    /**
    * @updateUser edit user
    * @return {Promise} http request
    */
    public updateUser(body:Array<any>, id:string) {
        let usersUrl = Config.changeUsersUrl.replace('{{id}}', id);
        return this.http.patch( usersUrl, body );
    }
    /**
    * @deleteUser delete user
    * @return {Promise} http request
    */
    public deleteUser(body:Array<any>, id:string) {
        let usersUrl = Config.changeUsersUrl.replace('{{id}}', id);
        return this.http.delete( usersUrl );
    }

    constructor( private http: Http ) {}
}
