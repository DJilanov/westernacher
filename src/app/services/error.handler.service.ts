import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class ErrorHandlerService {

    public errorEmitter: EventEmitter<any>;

    constructor() {
        this.errorEmitter = new EventEmitter();
    }

    public handleError(err, options) {
        // TODO: WHEN THERE IS PROBLEM WITH CONNECTION TO THE BACK-END CHECK IT BY THE ERROR AND THE OPTIONS MUST 
        //       BE SAVED FOR FUTURE SENDING
        
    }

    public handleInitError(err) {
        // TODO: WHEN THERE IS PROBLEM WITH INIT
    }

    public handleHeartBeatError(err) {

    }

    public emitError(data) {
        this.errorEmitter.emit(data);
    }
}
