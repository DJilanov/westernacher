import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class EventEmiterService {

    public updateUser: EventEmitter<any>;
    public dataFetched: EventEmitter<any>;
    public showUserModal: EventEmitter<any>;
    public workingOnline: EventEmitter<any>;
    public workingOffline: EventEmitter<any>;

    constructor() {
        this.updateUser = new EventEmitter();
        this.dataFetched = new EventEmitter();
        this.showUserModal = new EventEmitter();
        this.workingOnline = new EventEmitter();
        this.workingOffline = new EventEmitter();
    }

    /**
    * @emitUpdateUser emit with information about updated user
    * @data {Object} data to emit
    */
    public emitUpdateUser(data) {
        this.updateUser.emit(data);
    }

    /**
    * @emitFetchedData emit with information about fetched user data
    * @data {Object} data to emit
    */
    public emitFetchedData(data) {
        this.dataFetched.emit(data);
    }

    /**
    * @emitShowUserModal emit with information about the modal that we have to show
    * @data {Object} data to emit
    */
    public emitShowUserModal(data) {
        this.showUserModal.emit(data);
    }

    /**
    * @emitWorkingOnline emit that server become online
    * @data {Object} data to emit
    */
    public emitWorkingOnline(data) {

    }

    /**
    * @emitShowUserModal emit that server become offline
    * @data {Object} data to emit
    */
    public emitWorkingOffline(data) {
        
    }
}
}
