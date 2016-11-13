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

	public setHeartbeat() {
		this.interval = setInterval(function() {
			 this.fetcher.heartbeat().subscribe(
	            // Validate the input by the user model
	            users => this.handleHeartbeat(users),
	            err => this.errorHandlerService.handleHeartbeatError(err)
	        );
		}, Config.hearthBeatIntervalInSeconds * 1000);
	}

	public stopHeartbeat() {
		clearInterval(this.interval);
	}

	public handleHeartbeat() {

	}

    constructor(
    	private fetcher: FetcherService
    ) {}
}
