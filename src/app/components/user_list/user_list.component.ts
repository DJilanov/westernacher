import { Component, Input, Output } from '@angular/core';
import { Language } from '../../language/language.service';
import { CachingService } from '../../services/caching.service';

@Component({
    selector: 'users-list',
    styleUrls: ['./user_list.component.css'],
    templateUrl: './user_list.component.html'
})

export class UserListComponent {
    // used as a single source of truth for the users
    @Input()
    users: Array<Object> = [];

    // used to filter and play with the users array on the view
    @Input()
    filteredUsers: Array<Object> = [];

    /**
     * @constructor on init
     */
    public constructor(
        private language: Language
    ) {}
}
