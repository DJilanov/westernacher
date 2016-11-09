import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../../language/language.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'user-form',
    styleUrls: ['./user_form.component.css'],
    templateUrl: './user_form.component.html'
})

export class UserFormComponent implements OnInit {
    @Input()
    formOptions: Object;

    private dateRegex:RegExp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    private emailRegex:string = '^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    private ngForm: FormGroup;

    ngOnInit() {
        this.ngForm = new FormGroup({
            "firstName": new FormControl('', [<any>Validators.required, <any>Validators.maxLength(40)]),
            "lastName": new FormControl('', [<any>Validators.required, <any>Validators.maxLength(40)]),
            "emailAddress": new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.emailRegex)]),
            "dateOfBirth": new FormControl('', [<any>Validators.required, <any>Validators.pattern(this.emailRegex)])
        });
    }

    onSubmit(formData) {
        event.preventDefault();
        // this.formSubmit(formData, this.formOptions['owner']);
    }

    constructor(
        private language: Language
    ){

    }
}
