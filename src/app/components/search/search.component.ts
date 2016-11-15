import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Dictionary } from '../../language/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent {
    
    private users = [];
    private searchQuery:string = '';

    /**
    * @addTypeaheadField used to activate typeahead and search into our users
    */
    private addTypeaheadField() {
      let params = '';
      for(let userCounter = 0; userCounter < this.users.length; userCounter++) {
        this.users[userCounter]['typeahed'] = this.users[userCounter]['firstName'] + ' ' + 
                                                this.users[userCounter]['lastName'] + ' ' + 
                                                this.users[userCounter]['emailAddress'] + ' ' + 
                                                this.users[userCounter]['dateOfBirth'] + ' ' + 
                                                this.users[userCounter]['id'];
      }
    }

    /**
    * @onUserSelect event handler for when we select user from the typeahead
    * @users <User> selected user
    */
    private onUserSelect(user) {
        this.eventEmiterService.emitShowUserModal({
            'user': {
                'firstName': user.item.firstName,
                'lastName': user.item.lastName,
                'emailAddress': user.item.emailAddress,
                'dateOfBirth': user.item.dateOfBirth,
                'id': user.item.id
            },
            'action': 'update',
            'title':'editUser', 
            "btnText": "editUser"
        });
        // we empty the search becouse it will look better
        this.searchQuery = '';
    }

    /**
    * @updateUsersList used to update user list when we fetch the users from the back-end
    * @users <User[]> users array 
    */
    private updateUsersList(users) {
        this.users = users;
        this.addTypeaheadField();
    }
    

    constructor(
        private dictionary: Dictionary,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.dataFetched.subscribe(users => this.updateUsersList(users));
    };
}
