import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Dictionary } from '../../language/dictionary.service';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent {
    
    @Input()
    users: Array<Object>;

    private searchQuery:string = '';

    constructor(
        private dictionary: Dictionary
    ) {
      this.addTypeaheadField();
    };
    // add typeahed search
    private addTypeaheadField() {
    //   let params = '';
    //   for(var productCounter = 0; productCounter < this.products.length; productCounter++) {
    //     if(this.products[productCounter]['params']) {
    //       params = this.products[productCounter]['params'][this.language['language']].toString();
    //     } else {
    //       params = '';
    //     }
    //     this.products[productCounter]['typeahed'] = this.products[productCounter]['title'][this.language['language']] + ' ' + 
    //                                                 this.products[productCounter]['more_info'][this.language['language']] + ' ' +
    //                                                 this.products[productCounter]['description'][this.language['language']] + ' ' +
    //                                                 this.products[productCounter]['link'] + ' ' +
    //                                                 this.products[productCounter]['make'] + ' ' + params;
    //   }
    }
}
