import { Component } from '@angular/core';
import { Language } from '../../language/language.service';

@Component({
    selector: 'custom-details',
    styleUrls: ['./details.component.css'],
    templateUrl: './details.component.html'
})

export class DetailsComponent {

    private user: Object;

    constructor(
        private language: Language
    ) {};
}
