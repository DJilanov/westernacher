import { Component, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Language } from '../../language/language.service';
import { CachingService } from '../../services/caching.service';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'users-modal',
    styleUrls: ['./user_modal.component.css'],
    templateUrl: './user_modal.component.html'
})

export class UserModalComponent {
    private title:string;
    private user: User;

    @ViewChild('addNewUserModal') public addNewUserModal;

    public showAddNewUserModal(options):void {
        this.addNewUserModal.show();
        this.title = options.title;
    }

    public hideAddNewUserModal():void {
        this.addNewUserModal.hide();
    }

    /**
     * @constructor on init
     */
    public constructor(
        private language: Language,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.addNewUser.subscribe(options => this.showAddNewUserModal(options));
    }
}
