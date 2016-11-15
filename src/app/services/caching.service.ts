import { Injectable, EventEmitter } from '@angular/core';
import { EventEmiterService } from './event.emiter.service';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from 'angular-2-local-storage';

import { Config } from '../config';

@Injectable()

/**
 * @CachingService used to cache the data to have offline mode
 */
export class CachingService {
    // TODO: cache the users in the front-end localstorage
    private usersList;

    /**
    * @removeUserByID: remove user from the array based on its ID
    * @response:<Object> Contins the expected user that must be removed from the list
    */
    public removeUserByID(response) {
        this.usersList = this.usersList.filter(function(user) {
            return user.id !== response.user.id;
        });
        this.eventEmiterService.emitUserListUpdates(this.usersList);
    }

    /**
    * @updateUserByID: update user from the array based on its ID
    * @parameters:<Object> Contins the expected user that must be updated on the list
    */
    public updateUserByID(parameters) {
        this.usersList = this.usersList.map(function(user) {
            if(user.id === parameters.user.id) {
                return parameters.user;
            } 
            return user;
        });
        this.eventEmiterService.emitUserListUpdates(this.usersList);
    }

    /**
    * @createUser: add new user to the current array
    * @parameters:<Object> Contins the expected user that must be added to the list
    */
    public createUser(parameters) {
        this.usersList.push(parameters.user);
        this.eventEmiterService.emitUserListUpdates(this.usersList);
    }

    /**
    * @findUserByID: finds user from the array based on its ID
    * @id:<String> the id that we use to search in the array
    */
    private findUserByID(id:string) {
        let user = {};
        for(let userCounter = 0; userCounter < this.usersList.length; userCounter++) {
            if(this.usersList[userCounter].id == id) {
                return this.usersList[userCounter];
            }
        }
    }

    /**
    * @cacheUsers: saves the changes over the users array in the localstorage
    * @users:<Users[]> Contins the expected array with the changed users
    */
    private cacheUsers(users) {
        // save them to the local storage
        this.localStorageService.set('users', users);
    }

    /**
    * @updateUsersList: updated the user list based on the recieved one
    * @users:<User[]> Contins the users array
    */
    private updateUsersList(users) {
        // todo validate them
        this.usersList = users;
        this.cacheUsers(users);
    }

    /**
    * @getUsersList: returns the users array
    */
    public getUsersList() {
        // use localstorage users if the back-end doesnt respond. The error handler has to call the cache service in case 
        // of problem and it must emit event to the main that we have the cachied copies and warn the user!
        return this.usersList;
    }

    /**
    * @addRequestToQuery: add more user changes to the query
    * @data:<Object> Contins the expected user that must be changed when we get online
    */
    public addRequestToQuery(data) {
        let query = [];
        // Parse the serialized data back into an aray of objects
        query = JSON.parse(localStorage.getItem('query'));
        // Push the new data (whether it be an object or anything else) onto the array
        if(query == null) {
            query = [];
        }
        query.push(data);
        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('query', JSON.stringify(query));
    }

    /**
    * @getQueryRequests: returns the users changes that are waiting
    */
    public getQueryRequests() {
        let query = [];
        query = JSON.parse(localStorage.getItem('query'));
        return query;
    }

    /**
    * @clearQueryRequests: clears the query from the old requests
    */
    public clearQueryRequests() {
        localStorage.setItem('query', '[]');
    }

    constructor(
        private eventEmiterService: EventEmiterService,
        private localStorageService: LocalStorageService
    ) {
        this.eventEmiterService.dataFetched.subscribe(options => this.updateUsersList(options));
        this.usersList = this.localStorageService.get('users');
        // we empty the old query
        this.clearQueryRequests();
    }
}
