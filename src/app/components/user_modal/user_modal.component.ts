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
            'dateOfBirth': Date()
        },
        'action': '',
        'title': '', 
        "btnText": ''
    };

    @ViewChild('userModal') private userModal;

    /**
    * @showUserModal used to show the user modal with the data we sended to it
    * @options {Object} user data
    */
    private showUserModal(options):void {
        this.userModal.show();
        this.title = options.title;
        this.formOptions = options;
    }

    /**
    * @hideUserModal used to hide user modal
    */
    private hideUserModal():void {
        this.userModal.hide();
    }

    constructor(
        private dictionary: Dictionary,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.hideUserModal.subscribe(options => this.hideUserModal());
        this.eventEmiterService.showUserModal.subscribe(options => this.showUserModal(options));
    }
}
