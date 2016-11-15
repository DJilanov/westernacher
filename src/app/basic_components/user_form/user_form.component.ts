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
    private submited: boolean = false;
    private ngForm: FormGroup;

    /**
    * @updateFormData when we use the form to update the user we must reinit the formgroup using the options
    * @options {Object} data with options of the form
    */
    private updateFormData(options):void {
        // TODO: find a better way
        this.ngForm = new FormGroup({
            "firstName": new FormControl(options.user.firstName, [<any>Validators.required, <any>Validators.maxLength(40)]),
            "lastName": new FormControl(options.user.lastName, [<any>Validators.required, <any>Validators.maxLength(40)]),
            "dateOfBirth": new FormControl(options.user.dateOfBirth, [<any>Validators.required, <any>Validators.pattern(this.dateRegex)]),
            "emailAddress": new FormControl(options.user.emailAddress, [<any>Validators.required, <any>Validators.pattern(this.emailRegex)])
        });
    }

    /**
    * @onSubmit when we use the form to update the user we must reinit the formgroup using the options
    * @formData {Object} data with options of the form
    * @action {String} action of the form ( submit, delete , update )
    */
    private onSubmit(formData, action:string):void {
        event.preventDefault();
        this.submited = true;
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

    /**
    * @enableButtons when the callback from the server is recieved or we close the modal we enable the buttons of the modal
    */
    private enableButtons():void {
        this.submited = false;
    }
    
    /**
    * @ngOnInit handle the generation of the base validator version
    */
    ngOnInit():void {
        this.ngForm = new FormGroup({
            "firstName": new FormControl('', [<any>Validators.required, <any>Validators.maxLength(40)]),
            "lastName": new FormControl('', [<any>Validators.required, <any>Validators.maxLength(40)]),
            "dateOfBirth": new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.dateRegex)]),
            "emailAddress": new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.emailRegex)])
        });
    }

    constructor(
        private dictionary: Dictionary,
        private actionsEnum: ActionsEnum,
        private eventEmiterService: EventEmiterService
    ){
        this.eventEmiterService.hideUserModal.subscribe(options => this.enableButtons());
        this.eventEmiterService.showUserModal.subscribe(options => this.updateFormData(options));
    }
}
