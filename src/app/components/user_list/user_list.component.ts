import { Component, Input, Output } from '@angular/core';
import { Language } from '../../language/language.service';
import { CachingService } from '../../services/caching.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'users-list',
    styleUrls: ['./user_list.component.css'],
    templateUrl: './user_list.component.html'
})

export class UserListComponent {
    // used as a single source of truth for the users
    @Input()
    users: Array<Object> = [];

    private sortByColumn():void {
        let dataset = event.target['dataset'];
        if(dataset.asc == 'true') {
            this.users = this.users.sort((a,b)=>b[dataset.sortBy]-a[dataset.sortBy]);
            dataset.asc = 'false';
        } else {
            this.users = this.users.sort((a,b)=>a[dataset.sortBy]-b[dataset.sortBy]);
            dataset.asc = 'true';
        }
    }

    private addNewUser():void {
        this.eventEmiterService.emitAddNewUser({'title':'addNewUser'});
    }

    /**
     * @constructor on init
     */
    public constructor(
        private language: Language,
        private eventEmiterService: EventEmiterService
    ) {}
}
