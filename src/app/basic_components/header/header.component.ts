import { Component } from '@angular/core';
import { Dictionary } from '../../language/dictionary.service';

@Component({
    selector: 'custom-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    /**
    * @changeLanguage handle the icon click and change the language of the app
    */
    private changeLanguage():void {
      this.dictionary.changeLanguage();
    }

    constructor(
        private dictionary: Dictionary
    ) {};
}
