import { Component, Input } from '@angular/core';
import { Language } from '../../language/language.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html'
})

export class HomeComponent {
    @Input()
    users: Array<Object>;

    constructor(
        private language: Language
    ) {};
}
