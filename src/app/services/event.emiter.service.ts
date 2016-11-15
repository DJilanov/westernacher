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
    public hideUserModal: EventEmitter<any>;
    public workingOnline: EventEmitter<any>;
    public workingOffline: EventEmitter<any>;
    public userListUpdates: EventEmitter<any>;

    /**
    * @emitUpdateUser emit with information about updated user
    * @data {Object} data to emit
    */
    public emitUpdateUser(data):void {
        this.updateUser.emit(data);
    }

    /**
    * @emitUserListUpdates emit with information about updated userlist
    * @data {Object} data to emit
    */
    public emitUserListUpdates(data):void {
        this.userListUpdates.emit(data);
    }

    /**
    * @emitFetchedData emit with information about fetched user data
    * @data {Object} data to emit
    */
    public emitFetchedData(data):void {
        this.dataFetched.emit(data);
    }

    /**
    * @hideUserModal emit to show the user modal
    */
    public emitHideUserModal():void {
        this.hideUserModal.emit();
    }

    /**
    * @emitShowUserModal emit with information about the modal that we have to show
    * @data {Object} data to emit
    */
    public emitShowUserModal(data):void {
        this.showUserModal.emit(data);
    }

    /**
    * @emitWorkingOnline emit that server become online
    * @data {Object} data to emit
    */
    public emitWorkingOnline(data):void {
        this.workingOnline.emit(data);
    }

    /**
    * @emitWorkingOffline emit that server become offline
    * @data {Object} data to emit
    */
    public emitWorkingOffline(data):void {
        this.workingOffline.emit(data);
    }

    constructor() {
        this.updateUser = new EventEmitter();
        this.dataFetched = new EventEmitter();
        this.showUserModal = new EventEmitter();
        this.hideUserModal = new EventEmitter();
        this.workingOnline = new EventEmitter();
        this.workingOffline = new EventEmitter();
        this.userListUpdates = new EventEmitter();
    }
}
