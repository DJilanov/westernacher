import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class EventEmiterService {

    public addNewUser: EventEmitter<any>;
    public dataFetched: EventEmitter<any>;

    constructor() {
        this.addNewUser = new EventEmitter();
        this.dataFetched = new EventEmitter();
    }

    public emitFetchedData(data) {
        this.dataFetched.emit(data);
    }

    public emitAddNewUser(data) {
        this.addNewUser.emit(data);
    }
}
