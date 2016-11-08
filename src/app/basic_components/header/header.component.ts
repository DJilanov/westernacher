import { Component } from '@angular/core';
import { Language } from '../../language/language.service';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    constructor(
        private language: Language
    ) {};

    private changeLanguage() {
      this.language.changeLanguage();
    }
}
