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

    public removeUserByID(response) {
        this.usersList = this.usersList.filter(function(user) {
            return user.id !== response.user.id;
        });
        this.eventEmiterService.emitUserListUpdates(this.usersList);
    }

    public updateUserByID(parameters) {
        this.usersList = this.usersList.map(function(user) {
            if(user.id === parameters.user.id) {
                return parameters.user;
            } 
            return user;
        });
        this.eventEmiterService.emitUserListUpdates(this.usersList);
    }

    public createUser(parameters) {
        this.usersList.push(parameters.user);
        this.eventEmiterService.emitUserListUpdates(this.usersList);
    }

    private findUserByID(id) {
        return this.usersList.map(function(user) {
            if(user.id == id) {
                return user;
            }
        })[0];
    }

    private cacheUsers(users) {
        // save them to the local storage
        this.localStorageService.set('users', users);
    }

    private updateUsersList(users) {
        // todo validate them
        this.usersList = users;
        this.cacheUsers(users);
    }

    public getUsersList() {
        // use localstorage users if the back-end doesnt respond. The error handler has to call the cache service in case 
        // of problem and it must emit event to the main that we have the cachied copies and warn the user!
        return this.usersList;
    }

    public addRequestToQuery(data) {
        var a = [];
        // Parse the serialized data back into an aray of objects
        a = JSON.parse(localStorage.getItem('query'));
        // Push the new data (whether it be an object or anything else) onto the array
        if(a == null) {
            a = [];
        }
        a.push(data);
        // Re-serialize the array back into a string and store it in localStorage
        localStorage.setItem('query', JSON.stringify(a));
    }

    public getQueryRequests() {
        var a = [];
        a = JSON.parse(localStorage.getItem('query'));
        return a;
    }

    public clearQueryRequests() {
        localStorage.setItem('query', '[]');
    }

    // todo emit changes to the other screens

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
