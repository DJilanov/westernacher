import { ActionsEnum } from '../../enums/actions.enum';
import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from '../../language/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'user-form',
    styleUrls: ['./user_form.component.css'],
    templateUrl: './user_form.component.html'
})

export class UserFormComponent implements OnInit {
    @Input()
    formOptions: Object;
    // we use them as strings becouse FormControl often has issues with the regex parse 
    private dateRegex:string = '([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})';
    private emailRegex:string = '^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$';

    private ngForm: FormGroup;

    ngOnInit() {
        this.ngForm = new FormGroup({
            "firstName": new FormControl('', [<any>Validators.required, <any>Validators.maxLength(40)]),
            "lastName": new FormControl('', [<any>Validators.required, <any>Validators.maxLength(40)]),
            "dateOfBirth": new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.dateRegex)]),
            "emailAddress": new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.emailRegex)])
        });
    }
    // when we use the form to update the user we must reinit the formgroup using the options
    // TODO: find a better way
    updateFormData(options) {
        this.ngForm = new FormGroup({
            "firstName": new FormControl(options.user.firstName, [<any>Validators.required, <any>Validators.maxLength(40)]),
            "lastName": new FormControl(options.user.lastName, [<any>Validators.required, <any>Validators.maxLength(40)]),
            "dateOfBirth": new FormControl(options.user.dateOfBirth, [<any>Validators.required, <any>Validators.pattern(this.dateRegex)]),
            "emailAddress": new FormControl(options.user.emailAddress, [<any>Validators.required, <any>Validators.pattern(this.emailRegex)])
        });
    }

    onSubmit(formData, action) {
        event.preventDefault();
        if((this.formOptions['action'] === this.actionsEnum.update) && (action !== this.actionsEnum.delete)) {
            action = this.formOptions['action'];
        }
        let formObject = Object.assign(formData.value, {'id':this.formOptions['user'].id});
        this.eventEmiterService.emitUpdateUser({
            'form': formObject,
            'options': this.formOptions,
            'id': this.formOptions['user'].id,
            'action': action
        });
    }

    constructor(
        private dictionary: Dictionary,
        private actionsEnum: ActionsEnum,
        private eventEmiterService: EventEmiterService
    ){
        this.eventEmiterService.showUserModal.subscribe(options => this.updateFormData(options));
    }
}
