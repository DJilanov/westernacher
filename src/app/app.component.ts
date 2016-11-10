import { Component, Inject, EventEmitter } from '@angular/core';
import { FetcherService } from './services/fetcher.service';
import { CachingService } from './services/caching.service';
import { User } from './interfaces/user.interface';
import { ActionsEnum } from './enums/actions.enum';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';

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
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {
        fetcher.getUsers().subscribe(
            // Validate the input by the user model
            users => this.setUsers(users),
            err => this.errorHandlerService.handleError(err)
        );
        this.eventEmiterService.updateUser.subscribe(options => this.updateUser(options));
    };

    private updateUser(options) {
        switch (options.options.action) {
            case this.actionsEnum.delete:
                 this.fetcher.deleteUser(options.form, options.id).subscribe(
                    // Validate the input by the user model
                    users => this.setUsers(users),
                    err => this.errorHandlerService.handleError(err)
                );
                break;
            case this.actionsEnum.update:
                 this.fetcher.updateUser(options.form, options.id).subscribe(
                    // Validate the input by the user model
                    users => this.setUsers(users),
                    err => this.errorHandlerService.handleError(err)
                );
                break;
            case this.actionsEnum.create:
                 this.fetcher.createUser(options.form).subscribe(
                    // Validate the input by the user model
                    users => this.setUsers(users),
                    err => this.errorHandlerService.handleError(err)
                );
                break;
            default:
                throw "Something get wrong and you try to update on a strange way! Debug it!";
        }
        // debugger;
    }

    private setUsers(users) {
        // validate the data that is in the format of the interface. 
        // It will trow error if there is difference so we can easy change it and update it
        this.users = <User[]>users.json();
        this.eventEmiterService.emitFetchedData(this.users);
    }
}
