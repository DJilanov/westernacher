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

    constructor() {
        this.updateUser = new EventEmitter();
        this.dataFetched = new EventEmitter();
        this.showUserModal = new EventEmitter();
    }

    public emitUpdateUser(data) {
        this.updateUser.emit(data);
    }

    public emitFetchedData(data) {
        this.dataFetched.emit(data);
    }

    public emitShowUserModal(data) {
        this.showUserModal.emit(data);
    }
}
