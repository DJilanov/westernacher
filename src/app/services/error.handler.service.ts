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

    /**
    * @handleError handle standart error
    * @err {Object} error object and information
    * @options {Object} data from the back-end about the request
    */
    public handleError(err, options) {
        // TODO: WHEN THERE IS PROBLEM WITH CONNECTION TO THE BACK-END CHECK IT BY THE ERROR AND THE OPTIONS MUST 
        //       BE SAVED FOR FUTURE SENDING
        
    }

    /**
    * @handleInitError handle the error from the init
    * @err {Object} error object and information
    */
    public handleInitError(err) {
        // TODO: WHEN THERE IS PROBLEM WITH INIT
    }

    /**
    * @handleHeartBeatError handle the heart beat error
    * @err {Object} error object and information
    */
    public handleHeartBeatError(err) {

    }

    /**
    * @emitError get specific user
    * @err {Object} error object and information
    */
    public emitError(data) {
        this.errorEmitter.emit(data);
    }
}
