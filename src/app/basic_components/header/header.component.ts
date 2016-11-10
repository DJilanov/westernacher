import { Component } from '@angular/core';
import { Dictionary } from '../../language/dictionary.service';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    constructor(
        private dictionary: Dictionary
    ) {};

    private changeLanguage() {
      this.dictionary.changeLanguage();
    }
}
