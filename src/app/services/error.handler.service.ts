import { Injectable, EventEmitter } from '@angular/core';
import { EventEmiterService } from '../services/event.emiter.service';
import { CachingService } from './caching.service';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class ErrorHandlerService {

    public errorEmitter: EventEmitter<any>;

    constructor(
        private cachingService: CachingService,
        private eventEmiterService: EventEmiterService
    ) {
        this.errorEmitter = new EventEmitter();
    }

    private emitOfflineMode() {
        this.eventEmiterService.emitWorkingOffline({});
    }

    /**
    * @handleError handle standart error
    * @err {Object} error object and information
    * @options {Object} data from the back-end about the request
    */
    public handleError(err, options):void {
        this.emitOfflineMode();
        this.cachingService.addRequestToQuery(options);
        // TODO: ADD ANGULAR 2 TOASTER TO TELL THE USER THAT IS IN THE QUERY
        this.eventEmiterService.emitHideUserModal();
        
    }

    /**
    * @handleInitError handle the error from the init
    * @err {Object} error object and information
    */
    public handleInitError(err):void {
        this.emitOfflineMode();
        // TODO: WHEN THERE IS PROBLEM WITH INIT
    }

    /**
    * @handleHeartBeatError handle the heart beat error
    * @err {Object} error object and information
    */
    public handleHeartBeatError(err):void {
        this.emitOfflineMode();
        // TODO: Start saving everything into a query

    }

    /**
    * @emitError get specific user
    * @err {Object} error object and information
    */
    public emitError(data):void {
        this.errorEmitter.emit(data);
    }
}
