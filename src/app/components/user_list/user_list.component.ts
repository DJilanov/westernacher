import { Component } from '@angular/core';
import { StatusEnum } from '../../enums/status.enum';
import { Dictionary } from '../../language/dictionary.service';
import { CachingService } from '../../services/caching.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'users-list',
    styleUrls: ['./user_list.component.css'],
    templateUrl: './user_list.component.html'
})

export class UserListComponent {
    // used as a single source of truth for the users
    private users: Array<Object> = [];

    private backendStatus: string = '';

    /**
    * @updateUsersList used to update on fetch the user list
    * @users {Array<User>} user list
    */
    private updateUsersList(users) {
        this.users = users;
    }

    /**
    * @sortByColumn used to sort the table by column
    */
    private sortByColumn():void {
        let dataset = event.target['parentElement']['dataset'];
        if(dataset.asc == 'true') {
            this.users = this.users.sort(function (a, b) {
                if(a[dataset.sortBy].toUpperCase() > b[dataset.sortBy].toUpperCase()) {
                    return 1;
                } else {
                    return -1;
                }
            });
            dataset.asc = 'false';
        } else {
            this.users = this.users.sort(function (a, b) {
                if(a[dataset.sortBy].toUpperCase() < b[dataset.sortBy].toUpperCase()) {
                    return 1;
                } else {
                    return -1;
                }
            });
            dataset.asc = 'true';
        }
    }

    /**
    * @editUser used to show edit user modal that is filled by the user data
    * @user {Object} user options
    */
    private editUser(user):void {
        this.eventEmiterService.emitShowUserModal({
            'user': {
                'firstName': user.firstName,
                'lastName': user.lastName,
                'emailAddress': user.emailAddress,
                'dateOfBirth': user.dateOfBirth,
                'id': user.id
            },
            'action': 'update',
            'title':'editUser', 
            "btnText": "editUser"
        });
    }

    /**
    * @addNewUser used to show create user modal that is empty
    */
    private addNewUser():void {
        this.eventEmiterService.emitShowUserModal({
            'user': {
                'firstName': '',
                'lastName': '',
                'emailAddress': '',
                'dateOfBirth': '',
                'id': ''
            },
            'action': 'create',
            'title':'addNewUser', 
            "btnText": "addNewUser"
        });
    }

    /**
    * @setBackEndStatus used to show the status of the back-end to the user
    * @status {String} status
    */
    private setBackEndStatus(status:string):void {
        this.backendStatus = this.statusEnum[status];
    }

    public constructor(
        private statusEnum: StatusEnum,
        private dictionary: Dictionary,
        private cachingService: CachingService,
        private eventEmiterService: EventEmiterService
    ) {
        this.backendStatus = statusEnum['false'];
        this.updateUsersList(cachingService.getUsersList());
        this.eventEmiterService.dataFetched.subscribe(users => this.updateUsersList(users));
        this.eventEmiterService.workingOnline.subscribe(users => this.setBackEndStatus('true'));
        this.eventEmiterService.workingOffline.subscribe(users => this.setBackEndStatus('false'));
    }
}
