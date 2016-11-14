import { Injectable, EventEmitter } from '@angular/core';
import { FetcherService } from './fetcher.service';

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
	private online:boolean = true;
    /**
    * @setHeartbeat set the heart beat interval
    */
	public setHeartbeat() {
		// we clear the old interval ( we doesnt need 2 intervals )
		clearInterval(this.interval);
		// we set the interval as hearthbeat calls
		this.interval = setInterval(function() {
			 this.fetcher.heartbeat().subscribe(
	            // Validate the input by the user model
	            data => this.handleHeartbeat(data),
	            err => this.errorHandlerService.handleHeartbeatError(err)
	        );
		}, Config.hearthBeatIntervalInSeconds * 1000);
	}
    /**
    * @stopHeartbeat stops the heart beat interval
    */
	public stopHeartbeat() {
		clearInterval(this.interval);
	}
    /**
    * @handleHeartbeat handle heart beat response
    */
	private handleHeartbeat(data) {
		// TODO: ADD MORE FUNCTIONALLITY
		this.lastSuccess = new Date();
		if(!this.online) {
			this.startOnlineMode();
		}
	}

	private startOnlineMode() {

		this.online = true;
	}

	public startOfflineMode() {

	}

    constructor(
    	private fetcher: FetcherService
    ) {}
}
