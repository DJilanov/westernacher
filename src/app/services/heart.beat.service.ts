import { Injectable, EventEmitter } from '@angular/core';
import { FetcherService } from './fetcher.service';
import { Dictionary } from '../language/dictionary.service';
import { ErrorHandlerService } from './error.handler.service';
import { EventEmiterService } from '../services/event.emiter.service';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

import { Config } from '../config';

@Injectable()

/**
 * @HearthBeatService used to activate hearth beat service that tell us is the back-end live
 */
export class HeartBeatService {
	// we use any becouse interval is function that typescript thinks is number...
	private interval:any;
	// holder for the last heart beat successful response
	private lastSuccess:Date = new Date();
	// do the app works online
	public online:boolean = true;
    /**
    * @setHeartbeat set the heart beat interval
    */
	public setHeartbeat():void {
		// we clear the old interval ( we doesnt need 2 intervals )
		clearInterval(this.interval);
        let self = this;
		// we set the interval as hearthbeat calls
		this.interval = setInterval(function(self) {
			self.fetcher.heartbeat().subscribe(
	            // Validate the input by the user model
	            data => self.handleHeartbeat(data),
	            err => self.errorHandlerService.handleHeartBeatError(err)
	        );
		}, Config.hearthBeatIntervalInSeconds * 1000, self);
	}
    /**
    * @stopHeartbeat stops the heart beat interval
    */
	public stopHeartbeat():void {
		clearInterval(this.interval);
	}
    /**
    * @handleHeartbeat handle heart beat response
    */
	private handleHeartbeat(data):void {
		// TODO: ADD MORE FUNCTIONALLITY
        // TODO: IMPLEMENT LOGIC FOR DATA CHANGES SO IT CAN WORK LIKE SOCKETS AND CHECK THE QUERY FOR POTENTIAL DOUBLE CHANGE OF USER
		this.lastSuccess = new Date();
		if(!this.online) {
			this.startOnlineMode();
		}
	}

	private startOnlineMode():void {
        this.eventEmiterService.emitWorkingOnline({});
		this.online = true;
        this.toasterService.pop({
            type: 'success',
            title: this.dictionary.getTexts('success'),
            body: this.dictionary.getTexts('onlineMode'),
            showCloseButton: true
        });
	}

    public startOfflineMode():void {
        this.online = false;
    }

    constructor(
        private dictionary: Dictionary,
    	private fetcher: FetcherService,
        private toasterService: ToasterService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {
        this.eventEmiterService.workingOffline.subscribe(users => this.startOfflineMode());
    }
}
