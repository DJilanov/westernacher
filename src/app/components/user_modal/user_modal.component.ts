import { Component, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Dictionary } from '../../language/dictionary.service';
import { CachingService } from '../../services/caching.service';
import { FormOptions } from '../../interfaces/form_options.interface';
import { EventEmiterService } from '../../services/event.emiter.service';

@Component({
    selector: 'users-modal',
    styleUrls: ['./user_modal.component.css'],
    templateUrl: './user_modal.component.html'
})

export class UserModalComponent {
    private title:string;
    // TODO: move that predefinitions to better place
    private formOptions: FormOptions = {
        'user': {
            'firstName': '',
            'lastName': '',
            'emailAddress': '',
            'dateOfBirth': ''
        },
        'action': '',
        'title': '', 
        "btnText": ''
    };

    @ViewChild('userModal') private userModal;

    private showUserModal(options):void {
        this.userModal.show();
        this.title = options.title;
        this.formOptions = options;
    }

    private hideUserModal():void {
        this.userModal.hide();
    }

    /**
     * @constructor on init
     */
    constructor(
        private dictionary: Dictionary,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.showUserModal.subscribe(options => this.showUserModal(options));
    }
}
