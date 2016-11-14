import { Component, Inject, EventEmitter } from '@angular/core';
import { FetcherService } from './services/fetcher.service';
import { CachingService } from './services/caching.service';
import { User } from './interfaces/user.interface';
import { ActionsEnum } from './enums/actions.enum';
import { HeartBeatService } from './services/heart.beat.service';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    private users: Array<Object>;

    constructor(
        private fetcher: FetcherService,
        private actionsEnum: ActionsEnum,
        private cachingService: CachingService,
        private heartBeatService: HeartBeatService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService,
        private localStorageService: LocalStorageService
    ) {
        // we start the heartbeating of the application
        heartBeatService.setHeartbeat();
        // we make the init request of the data
        fetcher.getUsers().subscribe(
            // Validate the input by the user model
            users => this.fetchedData(users.json()),
            err => this.errorHandlerService.handleInitError(err)
        );
        this.eventEmiterService.updateUser.subscribe(options => this.updateUser(options));
        this.eventEmiterService.workingOnline.subscribe(data => this.sendQueryRequests(data));
        this.eventEmiterService.userListUpdates.subscribe(userList => this.setUsers(userList));
    };

    private sendQueryRequests(data) {
        var requests = this.cachingService.getQueryRequests();
        var self = this;
        this.heartBeatService.online = true;
        if(requests != null) {
            for(var reqCounter = 0; reqCounter < requests.length; reqCounter++) {
                this.updateUser(requests[reqCounter]);
            }
        }
        this.cachingService.clearQueryRequests();
    }

    private updateUser(options) {
        if(this.heartBeatService.online) {
            switch (options.action) {
                case this.actionsEnum.delete:
                    this.fetcher.deleteUser(options.form, options.id).subscribe(
                        response => this.checkApiResponse(response.json(), options.action),
                        err => this.errorHandlerService.handleError(err, options)
                    );
                    break;
                case this.actionsEnum.update:
                    this.fetcher.updateUser(options.form, options.id).subscribe(
                        response => this.checkApiResponse(response.json(), options.action),
                        err => this.errorHandlerService.handleError(err, options)
                    );
                    break;
                case this.actionsEnum.create:
                    this.fetcher.createUser(options.form).subscribe(
                        response => this.checkApiResponse(response.json(), options.action),
                        err => this.errorHandlerService.handleError(err, options)
                    );
                    break;
                default:
                    throw "Something get wrong and you try to update on a strange way! Debug it!";
            }
        } else {
            // TODO: ADD ANGULAR 2 TOASTER TO TELL THE USER THAT IS IN THE QUERY
            this.eventEmiterService.emitHideUserModal();
            this.cachingService.addRequestToQuery(options);
        }
        
    }

    private checkApiResponse(response, action) {
        this.eventEmiterService.emitHideUserModal();
        switch (action) {
            case this.actionsEnum.delete:
                this.cachingService.removeUserByID(response);
                break;
            case this.actionsEnum.update:
                this.cachingService.updateUserByID(response);
                break;
            case this.actionsEnum.create:
                this.cachingService.createUser(response);
                break;
            default:
                throw "Something get wrong and you try to update on a strange way! Debug it!";
        }
        // TODO: ALL OF THE TIME THERE MUST BE HEARTHBEAT EVERY 30 SEC. WHEN NET COMES BACK SEND ALL SAVED
        // TODO: ADD ANGULAR TOASTER OR SOMETHING LIKE THAT TO SHOW THE USER WHAT HAPPENED
        // TODO: FIND A WAY TO TELL THE USER HE IS IN OFFLINE MODE
        // TODO: ADD LOADER ON THE BUTTON WE CLICKED AND DISABLE THE OTHER. THE USER CAN LEAVE MODAL AND CONTINUE DOING THINGS. 
        //       IF ERROR OCCURS WE FILL QUERY WITH TASKS FOR THE BACK-END.
        // TODO: IF USER WANT TO QUIT WE TELL HIM HE WILL LOSE THE THINGS HE DID IN THE OFFLINE MODE IF HE QUIT
    }

    private fetchedData(users) {
        this.setUsers(users);
        this.eventEmiterService.emitWorkingOnline(this.users);
    }

    private setUsers(users) {
        this.users = <User[]>users;
        this.eventEmiterService.emitFetchedData(this.users);
    }
}
