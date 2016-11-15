import { Component, Inject, EventEmitter } from '@angular/core';
import { FetcherService } from './services/fetcher.service';
import { CachingService } from './services/caching.service';
import { User } from './interfaces/user.interface';
import { ActionsEnum } from './enums/actions.enum';
import { Dictionary } from './language/dictionary.service';
import { HeartBeatService } from './services/heart.beat.service';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    private users: Array<Object>;

    constructor(
        private fetcher: FetcherService,
        private dictionary: Dictionary,
        private actionsEnum: ActionsEnum,
        private toasterService: ToasterService,
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

    /**
    * @sendQueryRequests handle heart beat response
    * @data Event data
    */
    private sendQueryRequests(data) {
        let requests = this.cachingService.getQueryRequests();
        let self = this;
        this.heartBeatService.online = true;
        if(requests != null) {
            for(let reqCounter = 0; reqCounter < requests.length; reqCounter++) {
                this.updateUser(requests[reqCounter]);
                // we tell the user which change occurred
                this.toasterService.pop({
                    type: 'success',
                    title: this.dictionary.getTexts('success'),
                    body: this.dictionary.getTexts('onlineUpdate').replace('{{firstName}}', requests[reqCounter].form.firstName),
                    showCloseButton: true
                });
            }
        }
        this.cachingService.clearQueryRequests();
    }

    /**
    * @updateUser handle heart beat response
    * @options<object> Form data with user changes
    */
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
            // ofline mode query adding
            this.toasterService.pop({
                type: 'error',
                title: this.dictionary.getTexts('error'),
                body: this.dictionary.getTexts('offlineUpdate'),
                showCloseButton: true
            });
            this.eventEmiterService.emitHideUserModal();
            this.cachingService.addRequestToQuery(options);
        }
        
    }

    /**
    * @checkApiResponse handle API response of changes
    * @response<Object> Api response
    * @action action of the request
    */
    private checkApiResponse(response, action) {
        this.eventEmiterService.emitHideUserModal();
        this.toasterService.pop({
            type: 'success',
            title: this.dictionary.getTexts('changeWasSccessful'),
            body: this.dictionary.getTexts('userChange').replace('{{firstName}}', response.user.firstName),
            showCloseButton: true
        });
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
    }

    /**
    * @fetchedData emit that we work online and set the users that we fetch from the back-end
    * @users <User[]> The users from the API
    */
    private fetchedData(users) {
        this.setUsers(users);
        this.eventEmiterService.emitWorkingOnline(this.users);
    }

    /**
    * @setUsers we set the users to the app
    * @users <User[]> The users from the API
    */
    private setUsers(users) {
        this.users = <User[]>users;
        this.eventEmiterService.emitFetchedData(this.users);
    }
}
